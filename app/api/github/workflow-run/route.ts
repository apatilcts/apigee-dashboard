import { type NextRequest, NextResponse } from "next/server"
import { GitHubService } from "@/lib/github-service"

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const owner = searchParams.get("owner")
    const repo = searchParams.get("repo")
    const runId = searchParams.get("runId")

    // Validate required parameters
    if (!owner || !repo || !runId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Get GitHub token from environment variables
    const githubToken = process.env.GITHUB_TOKEN
    if (!githubToken) {
      return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 })
    }

    // Create GitHub service and get workflow run details
    const githubService = new GitHubService(githubToken)
    const runDetails = await githubService.getWorkflowRunDetails(owner, repo, Number.parseInt(runId))

    if (!runDetails) {
      return NextResponse.json({ error: "Failed to fetch workflow run details" }, { status: 404 })
    }

    return NextResponse.json(runDetails)
  } catch (error) {
    console.error("Error fetching workflow run:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

