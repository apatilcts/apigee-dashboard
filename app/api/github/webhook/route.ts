import { type NextRequest, NextResponse } from "next/server"
import { createHmac, timingSafeEqual } from "crypto"
import { pusherServer } from "@/lib/pusher"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("x-hub-signature-256") || ""

  // Verify webhook signature
  const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error("GitHub webhook secret not configured")
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 })
  }

  const hmac = createHmac("sha256", webhookSecret)
  const digest = `sha256=${hmac.update(body).digest("hex")}`

  if (!timingSafeEqual(Buffer.from(digest), Buffer.from(signature))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 })
  }

  // Parse the webhook payload
  const payload = JSON.parse(body)
  const event = req.headers.get("x-github-event")

  // Handle different webhook events
  if (event === "workflow_job") {
    await handleWorkflowJobEvent(payload)
  } else if (event === "workflow_run") {
    await handleWorkflowRunEvent(payload)
  } else if (event === "check_run") {
    await handleCheckRunEvent(payload)
  }

  return NextResponse.json({ success: true })
}

async function handleWorkflowJobEvent(payload: any) {
  const { action, workflow_job, repository } = payload

  // Only process jobs related to our Apigee deployment workflow
  if (workflow_job.name.includes("Deploy") || workflow_job.name.includes("Apigee")) {
    await pusherServer.trigger("github-events", "workflow-job-update", {
      action,
      jobId: workflow_job.id,
      jobName: workflow_job.name,
      status: workflow_job.status,
      conclusion: workflow_job.conclusion,
      runId: workflow_job.run_id,
      repository: repository.full_name,
      timestamp: new Date().toISOString(),
    })
  }
}

async function handleWorkflowRunEvent(payload: any) {
  const { action, workflow_run, repository } = payload

  // Only process workflow runs related to our Apigee deployment workflow
  if (workflow_run.name.includes("Apigee") || workflow_run.path.includes("apigeex")) {
    await pusherServer.trigger("github-events", "workflow-run-update", {
      action,
      runId: workflow_run.id,
      runName: workflow_run.name,
      status: workflow_run.status,
      conclusion: workflow_run.conclusion,
      repository: repository.full_name,
      branch: workflow_run.head_branch,
      commitSha: workflow_run.head_sha,
      timestamp: new Date().toISOString(),
    })
  }
}

async function handleCheckRunEvent(payload: any) {
  const { action, check_run, repository } = payload

  // Only process check runs related to our Apigee deployment workflow
  if (check_run.name.includes("Deploy") || check_run.name.includes("Apigee")) {
    await pusherServer.trigger("github-events", "check-run-update", {
      action,
      checkRunId: check_run.id,
      checkRunName: check_run.name,
      status: check_run.status,
      conclusion: check_run.conclusion,
      repository: repository.full_name,
      timestamp: new Date().toISOString(),
    })
  }
}

