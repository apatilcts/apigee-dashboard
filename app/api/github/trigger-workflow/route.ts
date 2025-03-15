import { type NextRequest, NextResponse } from "next/server"
import { GitHubService } from "@/lib/github-service"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { owner, repo, workflowId, ref, inputs, manualMode } = body

    // Validate required fields
    if (!owner || !repo || !workflowId || !ref) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get GitHub token from environment variables
    const githubToken = process.env.GITHUB_TOKEN
    if (!githubToken) {
      return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 })
    }

    // Create GitHub service
    const githubService = new GitHubService(githubToken)

    // Log the request for debugging
    console.log("Triggering workflow:", {
      owner,
      repo,
      workflowId,
      ref,
      inputs,
      manualMode,
    })

    // If in manual mode, use the workflow path directly
    if (manualMode) {
      try {
        // For manual mode, we still validate the repository exists
        const repoValidation = await githubService.validateRepository(owner, repo)
        if (!repoValidation.exists) {
          return NextResponse.json(
            {
              error: `Repository not found or access denied: ${owner}/${repo}`,
              details: repoValidation.error,
              message: "Please check your GitHub token has access to this repository.",
            },
            { status: 404 },
          )
        }

        // Use the workflow path directly
        const response = await githubService.octokit.actions.createWorkflowDispatch({
          owner,
          repo,
          workflow_id: workflowId, // This is the workflow file path in manual mode
          ref,
          inputs: inputs || {},
        })

        return NextResponse.json({
          success: true,
          message: "Workflow triggered successfully",
          workflowPath: workflowId,
        })
      } catch (error: any) {
        console.error("Error in manual workflow trigger:", error)

        // Handle specific error cases
        if (error.status === 404) {
          return NextResponse.json(
            {
              error: "Workflow not found",
              details: `The workflow file '${workflowId}' was not found in the repository.`,
              message: "Please check the workflow file path and ensure it exists in the .github/workflows directory.",
            },
            { status: 404 },
          )
        }

        if (error.status === 403) {
          return NextResponse.json(
            {
              error: "Permission denied",
              details: "Your GitHub token doesn't have permission to trigger workflows in this repository.",
              message: "Please ensure your token has the 'workflow' scope and access to this repository.",
            },
            { status: 403 },
          )
        }

        return NextResponse.json(
          {
            error: "Failed to trigger workflow",
            details: error.message,
            status: error.status,
            documentation_url: error.response?.data?.documentation_url,
          },
          { status: error.status || 500 },
        )
      }
    }

    // For auto mode, use the existing method
    const result = await githubService.triggerWorkflow(owner, repo, workflowId, ref, inputs || {})

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Workflow triggered successfully",
        workflowName: result.workflowName,
        workflowId: result.workflowId,
      })
    } else {
      console.error("Failed to trigger workflow:", result)

      if (result.availableWorkflows) {
        return NextResponse.json(
          {
            error: "Failed to trigger workflow",
            details: result.error,
            availableWorkflows: result.availableWorkflows,
            message: "The specified workflow was not found. Please choose from the available workflows.",
          },
          { status: 404 },
        )
      }

      return NextResponse.json(
        { error: "Failed to trigger workflow", details: result.error },
        { status: result.status || 500 },
      )
    }
  } catch (error: any) {
    console.error("Error triggering workflow:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}

