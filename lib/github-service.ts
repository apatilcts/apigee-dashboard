import { Octokit } from "@octokit/rest"
import { createAppAuth } from "@octokit/auth-app"

export interface GitHubWorkflowRunStatus {
  id: string
  name: string
  status: "queued" | "in_progress" | "completed"
  conclusion: "success" | "failure" | "cancelled" | "skipped" | "timed_out" | "action_required" | null
  repository: string
  branch: string
  commitSha: string
  runNumber: number
  url: string
  createdAt: string
  updatedAt: string
  jobs: GitHubWorkflowJob[]
  logs?: string[]
}

export interface GitHubWorkflowJob {
  id: string
  name: string
  status: "queued" | "in_progress" | "completed"
  conclusion: "success" | "failure" | "cancelled" | "skipped" | "timed_out" | "action_required" | null
  startedAt: string
  completedAt: string
  steps: GitHubWorkflowStep[]
}

export interface GitHubWorkflowStep {
  name: string
  status: "queued" | "in_progress" | "completed"
  conclusion: "success" | "failure" | "cancelled" | "skipped" | "timed_out" | "action_required" | null
  number: number
  startedAt: string
  completedAt: string
}

export class GitHubService {
  public octokit: Octokit

  constructor(token: string) {
    this.octokit = new Octokit({
      auth: token,
    })
  }

  // Alternative constructor using GitHub App authentication
  static createWithAppAuth(appId: number, privateKey: string, installationId: number) {
    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId,
        privateKey,
        installationId,
      },
    })

    const service = new GitHubService("")
    service.octokit = octokit
    return service
  }

  // Validate that the repository exists
  async validateRepository(owner: string, repo: string) {
    try {
      const response = await this.octokit.repos.get({
        owner,
        repo,
      })
      return { exists: true, data: response.data }
    } catch (error: any) {
      console.error("Repository validation error:", error.message)
      return {
        exists: false,
        error: error.message,
        status: error.status,
      }
    }
  }

  // Get workflow ID from name or path
  async getWorkflowId(owner: string, repo: string, workflowNameOrPath: string) {
    try {
      // First try to get the workflow directly (if it's an ID)
      try {
        if (/^\d+$/.test(workflowNameOrPath)) {
          const response = await this.octokit.actions.getWorkflow({
            owner,
            repo,
            workflow_id: Number.parseInt(workflowNameOrPath),
          })
          return { id: response.data.id.toString(), name: response.data.name }
        }
      } catch (error) {
        // If it's not a numeric ID, continue to the next approach
      }

      // List all workflows and find the matching one
      const response = await this.octokit.actions.listRepoWorkflows({
        owner,
        repo,
      })

      // Try to match by exact path
      let workflow = response.data.workflows.find(
        (w) => w.path === `.github/workflows/${workflowNameOrPath}` || w.path === workflowNameOrPath,
      )

      // If not found, try to match by name
      if (!workflow) {
        workflow = response.data.workflows.find((w) => w.name.toLowerCase() === workflowNameOrPath.toLowerCase())
      }

      if (workflow) {
        return { id: workflow.id.toString(), name: workflow.name }
      }

      // List all workflows for debugging
      console.log(
        "Available workflows:",
        response.data.workflows.map((w) => ({ id: w.id, name: w.name, path: w.path })),
      )

      return {
        error: `Workflow not found: ${workflowNameOrPath}`,
        availableWorkflows: response.data.workflows.map((w) => ({ id: w.id, name: w.name, path: w.path })),
      }
    } catch (error: any) {
      console.error("Workflow ID lookup error:", error.message)
      return {
        error: error.message,
        status: error.status,
      }
    }
  }

  async triggerWorkflow(owner: string, repo: string, workflowId: string, ref: string, inputs: Record<string, string>) {
    try {
      // First validate the repository
      const repoValidation = await this.validateRepository(owner, repo)
      if (!repoValidation.exists) {
        return {
          success: false,
          error: `Repository not found or access denied: ${owner}/${repo}`,
          details: repoValidation.error,
        }
      }

      // Then get the workflow ID
      const workflowInfo = await this.getWorkflowId(owner, repo, workflowId)
      if (workflowInfo.error) {
        return {
          success: false,
          error: workflowInfo.error,
          availableWorkflows: workflowInfo.availableWorkflows,
        }
      }

      // Now trigger the workflow
      const response = await this.octokit.actions.createWorkflowDispatch({
        owner,
        repo,
        workflow_id: workflowInfo.id,
        ref,
        inputs,
      })

      return {
        success: true,
        status: response.status,
        workflowName: workflowInfo.name,
        workflowId: workflowInfo.id,
      }
    } catch (error: any) {
      console.error("Error triggering workflow:", error)
      return {
        success: false,
        error: error.message,
        status: error.status,
        documentation_url: error.response?.data?.documentation_url,
      }
    }
  }

  async getWorkflowRuns(owner: string, repo: string, workflowId: string, perPage = 10) {
    try {
      const response = await this.octokit.actions.listWorkflowRuns({
        owner,
        repo,
        workflow_id: workflowId,
        per_page: perPage,
      })

      return response.data.workflow_runs.map((run) => ({
        id: run.id.toString(),
        name: run.name || "Workflow Run",
        status: run.status as any,
        conclusion: run.conclusion as any,
        repository: `${owner}/${repo}`,
        branch: run.head_branch || "unknown",
        commitSha: run.head_sha,
        runNumber: run.run_number,
        url: run.html_url,
        createdAt: run.created_at,
        updatedAt: run.updated_at,
        jobs: [],
      }))
    } catch (error) {
      console.error("Error getting workflow runs:", error)
      return []
    }
  }

  async getWorkflowRunDetails(owner: string, repo: string, runId: number): Promise<GitHubWorkflowRunStatus | null> {
    try {
      // Get the run details
      const runResponse = await this.octokit.actions.getWorkflowRun({
        owner,
        repo,
        run_id: runId,
      })

      const run = runResponse.data

      // Get the jobs for this run
      const jobsResponse = await this.octokit.actions.listJobsForWorkflowRun({
        owner,
        repo,
        run_id: runId,
      })

      const jobs = jobsResponse.data.jobs.map((job) => ({
        id: job.id.toString(),
        name: job.name,
        status: job.status as any,
        conclusion: job.conclusion as any,
        startedAt: job.started_at || "",
        completedAt: job.completed_at || "",
        steps: (job.steps || []).map((step) => ({
          name: step.name,
          status: step.status as any,
          conclusion: step.conclusion as any,
          number: step.number,
          startedAt: step.started_at || "",
          completedAt: step.completed_at || "",
        })),
      }))

      // Get logs if the run is completed
      let logs: string[] = []
      if (run.status === "completed") {
        try {
          const logsResponse = await this.octokit.actions.downloadWorkflowRunLogs({
            owner,
            repo,
            run_id: runId,
          })

          // This would normally return a binary stream that needs to be processed
          // For simplicity, we're just acknowledging we got the logs
          logs = ["Logs downloaded successfully"]
        } catch (error) {
          logs = ["Failed to download logs"]
        }
      }

      return {
        id: run.id.toString(),
        name: run.name || "Workflow Run",
        status: run.status as any,
        conclusion: run.conclusion as any,
        repository: `${owner}/${repo}`,
        branch: run.head_branch || "unknown",
        commitSha: run.head_sha,
        runNumber: run.run_number,
        url: run.html_url,
        createdAt: run.created_at,
        updatedAt: run.updated_at,
        jobs,
        logs,
      }
    } catch (error) {
      console.error("Error getting workflow run details:", error)
      return null
    }
  }
}

