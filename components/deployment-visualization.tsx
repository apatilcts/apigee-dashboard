import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudDeploymentIcon, GitHubIcon, ApigeeIcon } from "./platform-icons"
import { GitHubActionsIcon } from "./platform-icons"

export function DeploymentVisualization() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-heading">Deployment Flow</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
              {/* GitHub */}
              <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-slate-50 w-full md:w-1/3">
                <GitHubIcon className="h-12 w-12 mb-2 text-gray-800" />
                <h3 className="font-medium">GitHub Repository</h3>
                <p className="text-sm text-muted-foreground">API proxy code and configuration</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-muted-foreground">→</div>
              <div className="block md:hidden text-muted-foreground">↓</div>

              {/* GitHub Actions */}
              <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-purple-50 w-full md:w-1/3">
                <GitHubActionsIcon className="h-12 w-12 mb-2 text-purple-600" />
                <h3 className="font-medium">GitHub Actions</h3>
                <p className="text-sm text-muted-foreground">Automated workflow execution</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-muted-foreground">→</div>
              <div className="block md:hidden text-muted-foreground">↓</div>

              {/* Apigee */}
              <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-green-50 w-full md:w-1/3">
                <ApigeeIcon className="h-12 w-12 mb-2 text-green-600" />
                <h3 className="font-medium">Apigee X</h3>
                <p className="text-sm text-muted-foreground">API deployment and management</p>
              </div>
            </div>

            <div className="mt-8 p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-3">
                <CloudDeploymentIcon className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-medium">Continuous Deployment</h3>
                  <p className="text-sm text-muted-foreground">
                    Automated deployment across development, testing, and production environments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

