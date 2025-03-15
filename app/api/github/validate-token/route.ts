import { type NextRequest, NextResponse } from "next/server"
import { Octokit } from "@octokit/rest"

export async function GET(req: NextRequest) {
  try {
    // Get GitHub token from environment variables
    const githubToken = process.env.GITHUB_TOKEN
    if (!githubToken) {
      return NextResponse.json(
        {
          valid: false,
          error: "GitHub token not configured. Please add GITHUB_TOKEN to your environment variables.",
        },
        { status: 200 },
      )
    }

    // Create Octokit instance
    const octokit = new Octokit({ auth: githubToken })

    // Check token validity by getting the authenticated user
    try {
      const response = await octokit.users.getAuthenticated()

      // Get the scopes from the response headers
      const scopes = response.headers["x-oauth-scopes"] || "unknown"

      // Check if the token has the workflow scope
      const hasWorkflowScope = scopes.includes("workflow")

      return NextResponse.json({
        valid: true,
        username: response.data.login,
        scopes,
        hasWorkflowScope,
        message: hasWorkflowScope
          ? "Token is valid and has the workflow scope"
          : "Token is valid but missing the workflow scope, which is required to trigger workflows",
      })
    } catch (error: any) {
      console.error("Token validation error:", error)

      return NextResponse.json({
        valid: false,
        error: error.message,
        status: error.status,
        message: "Failed to validate GitHub token. It may be invalid or expired.",
      })
    }
  } catch (error: any) {
    console.error("Error in token validation API:", error)
    return NextResponse.json(
      {
        valid: false,
        error: "Internal server error",
        details: error.message,
      },
      { status: 200 },
    )
  }
}

