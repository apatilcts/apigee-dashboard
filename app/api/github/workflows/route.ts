import { type NextRequest, NextResponse } from "next/server"
import { Octokit } from "@octokit/rest"

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const owner = searchParams.get("owner")
    const repo = searchParams.get("repo")

    // Validate required parameters
    if (!owner || !repo) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Get GitHub token from environment variables
    const githubToken = process.env.GITHUB_TOKEN
    if (!githubToken) {
      return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 })
    }

    // Create Octokit instance
    const octokit = new Octokit({ auth: githubToken })

    // First validate the repository exists
    try {
      await octokit.repos.get({
        owner,
        repo,
      })
    } catch (error: any) {
      return NextResponse.json(
        {
          error: `Repository not found: ${owner}/${repo}`,
          details: error.message,
        },
        { status: 404 },
      )
    }

    // Get workflows
    try {
      const response = await octokit.actions.listRepoWorkflows({
        owner,
        repo,
      })

      const workflows = response.data.workflows.map((workflow) => ({
        id: workflow.id.toString(),
        name: workflow.name,
        path: workflow.path,
      }))

      return NextResponse.json({ workflows })
    } catch (error: any) {
      console.error("Error fetching workflows:", error)
      return NextResponse.json(
        {
          error: `Failed to fetch workflows: ${error.message}`,
          details: error.message,
        },
        { status: error.status || 500 },
      )
    }
  } catch (error: any) {
    console.error("Error in workflows API:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}

