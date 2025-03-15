"use client"

import { useEffect, useState } from "react"
import { pusherClient } from "@/lib/pusher"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, Clock, AlertTriangle, XCircle, Loader2 } from "lucide-react"
import type { GitHubWorkflowRunStatus, GitHubWorkflowJob, GitHubWorkflowStep } from "@/lib/github-service"

interface RealTimeDeploymentViewerProps {
  initialRunId?: string
  owner: string
  repo: string
}

export function RealTimeDeploymentViewer({ initialRunId, owner, repo }: RealTimeDeploymentViewerProps) {
  const [deploymentStatus, setDeploymentStatus] = useState<GitHubWorkflowRunStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch initial deployment status
  useEffect(() => {
    if (initialRunId) {
      fetchDeploymentStatus(initialRunId)
    } else {
      setLoading(false)
    }
  }, [initialRunId])

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = pusherClient.subscribe("github-events")

    channel.bind("workflow-run-update", (data: any) => {
      if (data.repository === `${owner}/${repo}` && (!initialRunId || data.runId.toString() === initialRunId)) {
        // Update our local state with the new data
        updateDeploymentStatus(data)
      }
    })

    channel.bind("workflow-job-update", (data: any) => {
      if (data.repository === `${owner}/${repo}` && deploymentStatus && data.runId.toString() === deploymentStatus.id) {
        // Update the specific job in our deployment status
        updateJobStatus(data)
      }
    })

    return () => {
      pusherClient.unsubscribe("github-events")
    }
  }, [owner, repo, initialRunId, deploymentStatus])

  const fetchDeploymentStatus = async (runId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/github/workflow-run?owner=${owner}&repo=${repo}&runId=${runId}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch deployment status: ${response.statusText}`)
      }

      const data = await response.json()
      setDeploymentStatus(data)
    } catch (err: any) {
      setError(err.message || "Failed to fetch deployment status")
    } finally {
      setLoading(false)
    }
  }

  const updateDeploymentStatus = (data: any) => {
    if (!deploymentStatus) {
      // If we don't have a deployment status yet, fetch the full details
      fetchDeploymentStatus(data.runId.toString())
      return
    }

    setDeploymentStatus((prev) => {
      if (!prev) return null

      return {
        ...prev,
        status: data.status,
        conclusion: data.conclusion,
        updatedAt: data.timestamp || new Date().toISOString(),
      }
    })
  }

  const updateJobStatus = (data: any) => {
    setDeploymentStatus((prev) => {
      if (!prev) return null

      const updatedJobs = prev.jobs.map((job) => {
        if (job.id === data.jobId.toString()) {
          return {
            ...job,
            status: data.status,
            conclusion: data.conclusion,
            completedAt: data.status === "completed" ? new Date().toISOString() : job.completedAt,
          }
        }
        return job
      })

      return {
        ...prev,
        jobs: updatedJobs,
        updatedAt: data.timestamp || new Date().toISOString(),
      }
    })
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center items-center h-40">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Loading deployment status...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!deploymentStatus) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No deployment in progress</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate overall progress
  const totalSteps = deploymentStatus.jobs.reduce((acc, job) => acc + job.steps.length, 0)
  const completedSteps = deploymentStatus.jobs.reduce(
    (acc, job) => acc + job.steps.filter((step) => step.status === "completed").length,
    0,
  )
  const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Deployment Status</CardTitle>
            <CardDescription>
              {deploymentStatus.name} #{deploymentStatus.runNumber}
            </CardDescription>
          </div>
          <StatusBadge status={deploymentStatus.status} conclusion={deploymentStatus.conclusion} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} />
        </div>

        <div className="space-y-4">
          {deploymentStatus.jobs.map((job) => (
            <JobStatus key={job.id} job={job} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status, conclusion }: { status: string; conclusion: string | null }) {
  if (status === "queued") {
    return (
      <Badge variant="outline" className="flex gap-1 items-center">
        <Clock className="h-3 w-3" /> Queued
      </Badge>
    )
  }

  if (status === "in_progress") {
    return (
      <Badge variant="secondary" className="flex gap-1 items-center bg-blue-100 text-blue-800">
        <Loader2 className="h-3 w-3 animate-spin" /> In Progress
      </Badge>
    )
  }

  if (status === "completed") {
    if (conclusion === "success") {
      return (
        <Badge variant="default" className="flex gap-1 items-center bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3" /> Success
        </Badge>
      )
    }

    if (conclusion === "failure") {
      return (
        <Badge variant="destructive" className="flex gap-1 items-center">
          <XCircle className="h-3 w-3" /> Failed
        </Badge>
      )
    }

    if (conclusion === "cancelled") {
      return (
        <Badge variant="outline" className="flex gap-1 items-center">
          <XCircle className="h-3 w-3" /> Cancelled
        </Badge>
      )
    }

    return (
      <Badge variant="outline" className="flex gap-1 items-center">
        {conclusion || "Unknown"}
      </Badge>
    )
  }

  return <Badge variant="outline">{status}</Badge>
}

function JobStatus({ job }: { job: GitHubWorkflowJob }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="space-y-2">
      <div
        className="flex justify-between items-center cursor-pointer hover:bg-muted p-2 rounded-md"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="font-medium">{job.name}</div>
        <StatusBadge status={job.status} conclusion={job.conclusion} />
      </div>

      {expanded && (
        <div className="pl-4 border-l-2 border-muted space-y-2 ml-2">
          {job.steps.map((step) => (
            <StepStatus key={step.number} step={step} />
          ))}
        </div>
      )}
    </div>
  )
}

function StepStatus({ step }: { step: GitHubWorkflowStep }) {
  return (
    <div className="flex justify-between items-center text-sm py-1">
      <div>{step.name}</div>
      <StatusBadge status={step.status} conclusion={step.conclusion} />
    </div>
  )
}

