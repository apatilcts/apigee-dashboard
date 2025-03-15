"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { GitHubIcon, GitHubActionsIcon, ApigeeIcon } from "./platform-icons"

interface Workflow {
  id: string
  name: string
  path: string
}

export function GitHubDeploymentForm() {
  const router = useRouter()
  const [isDeploying, setIsDeploying] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [availableWorkflows, setAvailableWorkflows] = useState<Workflow[]>([])
  const [validationError, setValidationError] = useState<string | null>(null)
  const [manualMode, setManualMode] = useState(false)
  const [formData, setFormData] = useState({
    owner: "woolworthslimited",
    repo: "wlx-github-actions",
    workflowId: "",
    workflowPath: "apigeex-api-proxy-deploy.yml", // Default workflow file path
    ref: "main",
    proxyName: "",
    proxyDirectory: "apiproxy",
    envGroup: "edd",
    envTypes: "dev",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleManualMode = () => {
    setManualMode(!manualMode)
    // Clear validation error when switching modes
    setValidationError(null)
  }

  // Fetch available workflows when repository info changes (only in auto mode)
  useEffect(() => {
    const fetchWorkflows = async () => {
      if (manualMode || !formData.owner || !formData.repo) return

      try {
        setIsValidating(true)
        setValidationError(null)

        const response = await fetch(`/api/github/workflows?owner=${formData.owner}&repo=${formData.repo}`)

        if (!response.ok) {
          const errorData = await response.json()
          setValidationError(errorData.error || "Failed to fetch workflows")
          setAvailableWorkflows([])
          return
        }

        const data = await response.json()
        setAvailableWorkflows(data.workflows || [])

        // Set the first workflow as default if none is selected
        if (!formData.workflowId && data.workflows && data.workflows.length > 0) {
          setFormData((prev) => ({ ...prev, workflowId: data.workflows[0].id }))
        }
      } catch (error: any) {
        setValidationError(error.message || "Failed to fetch workflows")
        setAvailableWorkflows([])
      } finally {
        setIsValidating(false)
      }
    }

    fetchWorkflows()
  }, [formData.owner, formData.repo, manualMode])

  const handleDeploy = async () => {
    try {
      setIsDeploying(true)

      // Validate form data
      if (!formData.proxyName) {
        toast({
          title: "Validation Error",
          description: "Proxy name is required",
          variant: "destructive",
        })
        return
      }

      if (!manualMode && !formData.workflowId) {
        toast({
          title: "Validation Error",
          description: "Workflow is required",
          variant: "destructive",
        })
        return
      }

      if (manualMode && !formData.workflowPath) {
        toast({
          title: "Validation Error",
          description: "Workflow path is required",
          variant: "destructive",
        })
        return
      }

      // Prepare inputs for GitHub workflow
      const inputs = {
        proxyName: formData.proxyName,
        proxyDirectory: formData.proxyDirectory,
        envGroup: formData.envGroup,
        environmentTypes: formData.envTypes,
        deployToProduction: formData.envTypes.includes("prod") ? "true" : "false",
      }

      // Trigger the workflow
      const response = await fetch("/api/github/trigger-workflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: formData.owner,
          repo: formData.repo,
          workflowId: manualMode ? formData.workflowPath : formData.workflowId,
          ref: formData.ref,
          inputs,
          manualMode,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // If we got a list of available workflows, update our state
        if (data.availableWorkflows) {
          setAvailableWorkflows(data.availableWorkflows)
          throw new Error(`${data.error}: ${data.message}`)
        }

        throw new Error(data.error || "Failed to trigger deployment")
      }

      toast({
        title: "Deployment Triggered",
        description: `Your deployment has been triggered successfully using workflow: ${data.workflowName || formData.workflowPath}`,
      })

      // Redirect to deployments page
      router.push("/deployments")
    } catch (error: any) {
      toast({
        title: "Deployment Failed",
        description: error.message || "Failed to trigger deployment",
        variant: "destructive",
      })
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-heading">Deploy via GitHub Actions</CardTitle>
          <div className="flex items-center gap-2">
            <GitHubIcon className="h-6 w-6 text-gray-800" />
            <GitHubActionsIcon className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="manual-mode">Manual Workflow Entry</Label>
          <Switch id="manual-mode" checked={manualMode} onCheckedChange={toggleManualMode} />
        </div>

        {validationError && !manualMode && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Repository Error</AlertTitle>
            <AlertDescription>
              {validationError}
              <div className="mt-2">
                <Button variant="outline" size="sm" onClick={toggleManualMode}>
                  Switch to Manual Mode
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="owner">GitHub Organization</Label>
            <Input id="owner" name="owner" value={formData.owner} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repo">Repository</Label>
            <Input id="repo" name="repo" value={formData.repo} onChange={handleChange} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {manualMode ? (
            <div className="space-y-2">
              <Label htmlFor="workflowPath">Workflow File Path</Label>
              <Input
                id="workflowPath"
                name="workflowPath"
                value={formData.workflowPath}
                onChange={handleChange}
                placeholder="e.g., apigeex-api-proxy-deploy.yml"
              />
              <p className="text-xs text-muted-foreground">
                Enter the path to the workflow file in the .github/workflows directory
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="workflowId">Workflow</Label>
              <Select
                value={formData.workflowId}
                onValueChange={(value) => handleSelectChange("workflowId", value)}
                disabled={isValidating || availableWorkflows.length === 0}
              >
                <SelectTrigger id="workflowId">
                  <SelectValue placeholder={isValidating ? "Loading workflows..." : "Select workflow"} />
                </SelectTrigger>
                <SelectContent>
                  {availableWorkflows.map((workflow) => (
                    <SelectItem key={workflow.id} value={workflow.id}>
                      {workflow.name || workflow.path.replace(".github/workflows/", "")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isValidating && <p className="text-xs text-muted-foreground mt-1">Loading available workflows...</p>}
              {!isValidating && availableWorkflows.length === 0 && !validationError && (
                <p className="text-xs text-muted-foreground mt-1">No workflows found in this repository</p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="ref">Branch</Label>
            <Input id="ref" name="ref" value={formData.ref} onChange={handleChange} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="proxyName">Proxy Name</Label>
            <Input
              id="proxyName"
              name="proxyName"
              value={formData.proxyName}
              onChange={handleChange}
              placeholder="e.g., WeatherForecastAPI"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proxyDirectory">Proxy Directory</Label>
            <Input
              id="proxyDirectory"
              name="proxyDirectory"
              value={formData.proxyDirectory}
              onChange={handleChange}
              placeholder="e.g., apiproxy"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="envGroup">Environment Group</Label>
          <Select value={formData.envGroup} onValueChange={(value) => handleSelectChange("envGroup", value)}>
            <SelectTrigger id="envGroup">
              <SelectValue placeholder="Select environment group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="edd">EDD</SelectItem>
              <SelectItem value="wow">WOW</SelectItem>
              <SelectItem value="homerun">Homerun</SelectItem>
              <SelectItem value="wpay">WPay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Environment Types</Label>
          <RadioGroup value={formData.envTypes} onValueChange={(value) => handleSelectChange("envTypes", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dev" id="env-dev-only" />
              <Label htmlFor="env-dev-only" className="font-normal">
                Development only (dev)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dev,test" id="env-dev-test" />
              <Label htmlFor="env-dev-test" className="font-normal">
                Development and Testing (dev,test)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dev,test,uat" id="env-dev-test-uat" />
              <Label htmlFor="env-dev-test-uat" className="font-normal">
                All non-production (dev,test,uat)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dev,test,uat,prod" id="env-all" />
              <Label htmlFor="env-all" className="font-normal">
                All environments (dev,test,uat,prod)
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="rounded-md border p-4 bg-slate-50">
          <div className="flex items-center gap-4">
            <ApigeeIcon className="h-12 w-12 text-green-600" />
            <div>
              <h3 className="font-medium">Deploying to Apigee X</h3>
              <p className="text-sm text-muted-foreground">
                This will trigger a GitHub Actions workflow to deploy your API proxy to Apigee X
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleDeploy}
          disabled={isDeploying || (!manualMode && (isValidating || availableWorkflows.length === 0))}
        >
          {isDeploying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deploying...
            </>
          ) : (
            "Deploy"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

