import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RealTimeDeploymentViewer } from "@/components/real-time-deployment-viewer"
import { ApigeeIcon } from "@/components/icons"
import { ArrowLeft } from "lucide-react"

export default function LiveDeploymentPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the repository details from your database
  // based on the deployment ID
  const owner = "woolworthslimited"
  const repo = "wlx-github-actions"

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2">
          <ApigeeIcon className="h-6 w-6" />
          <span className="font-semibold">Apigee X Deployment Dashboard</span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/deployments" className="text-foreground">
            Deployments
          </Link>
          <Link href="/environments" className="text-muted-foreground hover:text-foreground">
            Environments
          </Link>
        </nav>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/deployments">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Live Deployment</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <div className="md:col-span-5">
            <RealTimeDeploymentViewer initialRunId={params.id} owner={owner} repo={repo} />
          </div>

          <div className="space-y-4 md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Information</CardTitle>
                <CardDescription>Details about this deployment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium text-muted-foreground">Repository</div>
                  <div className="text-sm">
                    {owner}/{repo}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium text-muted-foreground">Run ID</div>
                  <div className="text-sm">{params.id}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium text-muted-foreground">Workflow</div>
                  <div className="text-sm">apigeex-proxy-deploy.yml</div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`https://github.com/${owner}/${repo}/actions/runs/${params.id}`} target="_blank">
                    View in GitHub
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href={`/deployments/${params.id}/logs`}>View Detailed Logs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

