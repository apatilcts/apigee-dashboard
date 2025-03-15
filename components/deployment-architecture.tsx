import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApigeeIcon, GitHubIcon } from "./platform-icons"
import { GitHubActionsIcon } from "./platform-icons"

export function DeploymentArchitecture() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-heading">Deployment Architecture</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="border rounded-lg p-4 bg-slate-50">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded border">
              <GitHubIcon className="h-8 w-8 text-gray-800" />
              <div>
                <h3 className="font-medium">Source Repository</h3>
                <p className="text-sm text-muted-foreground">woolworthslimited/wlx-github-actions</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-8 w-px bg-slate-300"></div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded border border-purple-200">
              <GitHubActionsIcon className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-medium">GitHub Actions Workflow</h3>
                <p className="text-sm text-muted-foreground">apigeex-proxy-deploy.yml</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-8 w-px bg-slate-300"></div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded border border-green-200">
              <ApigeeIcon className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-medium">Apigee X Deployment</h3>
                <p className="text-sm text-muted-foreground">WeatherForecastAPI-gha (Revision 12)</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-8 w-px bg-slate-300"></div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="p-2 bg-blue-50 rounded border border-blue-200 text-center">
                <p className="text-xs font-medium">edd-dev</p>
              </div>
              <div className="p-2 bg-blue-50 rounded border border-blue-200 text-center">
                <p className="text-xs font-medium">edd-test</p>
              </div>
              <div className="p-2 bg-blue-50 rounded border border-blue-200 text-center">
                <p className="text-xs font-medium">edd-uat</p>
              </div>
              <div className="p-2 bg-blue-50 rounded border border-blue-200 text-center">
                <p className="text-xs font-medium">edd-prod</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

