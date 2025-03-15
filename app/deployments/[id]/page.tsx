import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DeploymentTimeline } from "@/components/deployment-timeline"
import { DeploymentLogs } from "@/components/deployment-logs"
import { DeploymentValidation } from "@/components/deployment-validation"
import { DeploymentArchitecture } from "@/components/deployment-architecture"
import { AppLayout } from "@/components/layout/app-layout"
import { CheckCircle, Clock, GitBranch, GitCommit, GitPullRequest } from "lucide-react"
import { GitHubActionsIcon } from "@/components/platform-icons"

export default function DeploymentDetailsPage({ params }: { params: { id: string } }) {
  return (
    <AppLayout title="Deployment Details" backLink={{ href: "/deployments", label: "Back to deployments" }}>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-heading font-bold">WeatherForecastAPI-gha</h2>
        <Badge className="ml-2">Successful</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5 space-y-6">
          <Card className="dashboard-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span>WeatherForecastAPI-gha</span>
                    <Badge variant="outline" className="font-mono">
                      Revision 12
                    </Badge>
                  </CardTitle>
                  <CardDescription>Deployed to edd-dev, edd-test, edd-uat, edd-prod</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Successful</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Status</div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Completed Successfully</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Deployment Time</div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>2023-06-15 14:32:45</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Duration</div>
                    <div className="font-mono">3m 24s</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Source</div>
                  <div className="grid gap-2 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4" />
                      <span className="font-mono text-sm">main</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitCommit className="h-4 w-4" />
                      <span className="truncate font-mono text-sm">a1b2c3d</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitPullRequest className="h-4 w-4" />
                      <span className="font-mono text-sm">PR #123</span>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList className="bg-muted/50 p-1 w-full grid grid-cols-3">
                    <TabsTrigger value="timeline" className="text-sm">
                      Timeline
                    </TabsTrigger>
                    <TabsTrigger value="logs" className="text-sm">
                      Logs
                    </TabsTrigger>
                    <TabsTrigger value="validation" className="text-sm">
                      Validation
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="timeline">
                    <DeploymentTimeline />
                  </TabsContent>
                  <TabsContent value="logs">
                    <DeploymentLogs />
                  </TabsContent>
                  <TabsContent value="validation">
                    <DeploymentValidation />
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          <DeploymentArchitecture />
        </div>

        <div className="space-y-6 md:col-span-2">
          <Card className="dashboard-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-heading">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Redeploy</Button>
              <Button variant="outline" className="w-full">
                View in GitHub
              </Button>
              <Button variant="outline" className="w-full">
                View in Apigee
              </Button>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-heading">Deployment Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium text-muted-foreground">Proxy Name</div>
                  <div className="text-sm font-mono">WeatherForecastAPI-gha</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium text-muted-foreground">Proxy Directory</div>
                  <div className="text-sm font-mono">apiproxy</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium text-muted-foreground">Environment Group</div>
                  <div className="text-sm font-mono">edd</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium text-muted-foreground">Environment Types</div>
                  <div className="text-sm font-mono">dev,test,uat,prod</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium text-muted-foreground">Workflow</div>
                  <div className="text-sm font-mono">apigeex-proxy-deploy.yml</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card overflow-hidden">
            <CardHeader className="pb-3 bg-purple-50 border-b">
              <div className="flex items-center gap-2">
                <GitHubActionsIcon className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-sm font-heading">GitHub Actions Workflow</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Status</span>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Run ID</span>
                  <span className="font-mono text-xs">{params.id}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Workflow</span>
                  <span className="font-mono text-xs">apigeex-proxy-deploy.yml</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View Workflow
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

