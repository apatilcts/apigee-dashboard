"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CloudDeploymentIcon } from "@/components/platform-icons"
import { GitHubDeploymentForm } from "@/components/github-deployment-form"
import { GitHubTokenHelp } from "@/components/github-token-help"
import { AppLayout } from "@/components/layout/app-layout"

export default function NewDeploymentPage() {
  const [deploymentType, setDeploymentType] = useState("github")

  return (
    <AppLayout
      title="New Deployment"
      subtitle="Configure and trigger an API proxy deployment"
      backLink={{ href: "/", label: "Back to dashboard" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 rounded-lg border overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <CloudDeploymentIcon className="h-16 w-16" />
            <div>
              <h2 className="text-2xl font-heading font-bold mb-2">Deploy API Proxy to Apigee X</h2>
              <p className="text-blue-100">
                Configure your deployment settings and trigger a GitHub Actions workflow to deploy your API proxy to
                Apigee X environments.
              </p>
            </div>
          </div>
        </div>

        <GitHubTokenHelp />

        <div className="mt-6">
          <Tabs defaultValue="github" onValueChange={setDeploymentType}>
            <TabsList className="bg-muted/50 p-1 w-full grid grid-cols-2">
              <TabsTrigger value="github" className="text-sm">
                GitHub Actions
              </TabsTrigger>
              <TabsTrigger value="manual" className="text-sm">
                Manual Deployment
              </TabsTrigger>
            </TabsList>
            <TabsContent value="github" className="space-y-6 pt-4">
              <GitHubDeploymentForm />
            </TabsContent>
            <TabsContent value="manual" className="space-y-6 pt-4">
              <div className="text-center p-8 text-muted-foreground">
                Manual deployment functionality is coming soon.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  )
}

