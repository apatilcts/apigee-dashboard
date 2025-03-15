import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ApigeeIcon } from "@/components/icons"
import { GitHubTokenChecker } from "@/components/github-token-checker"
import { ArrowLeft } from "lucide-react"

export default function SettingsPage() {
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
          <Link href="/deployments" className="text-muted-foreground hover:text-foreground">
            Deployments
          </Link>
          <Link href="/environments" className="text-muted-foreground hover:text-foreground">
            Environments
          </Link>
          <Link href="/settings" className="text-foreground">
            Settings
          </Link>
        </nav>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>GitHub Integration</CardTitle>
                <CardDescription>Configure your GitHub integration settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <GitHubTokenChecker />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environment Variables</CardTitle>
                <CardDescription>Required environment variables for the dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">GitHub Integration</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">GITHUB_TOKEN</code>
                        <p className="text-sm text-muted-foreground mt-1">
                          Personal access token with repo and workflow scopes
                        </p>
                      </li>
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">GITHUB_WEBHOOK_SECRET</code>
                        <p className="text-sm text-muted-foreground mt-1">
                          Secret for validating GitHub webhook payloads
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Pusher (Real-time Updates)</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">PUSHER_APP_ID</code>
                        <p className="text-sm text-muted-foreground mt-1">Pusher application ID</p>
                      </li>
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">PUSHER_KEY</code>
                        <p className="text-sm text-muted-foreground mt-1">Pusher API key</p>
                      </li>
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">PUSHER_SECRET</code>
                        <p className="text-sm text-muted-foreground mt-1">Pusher API secret</p>
                      </li>
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_PUSHER_KEY</code>
                        <p className="text-sm text-muted-foreground mt-1">
                          Same as PUSHER_KEY, but exposed to the client
                        </p>
                      </li>
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_PUSHER_CLUSTER</code>
                        <p className="text-sm text-muted-foreground mt-1">Pusher cluster region (e.g., ap4)</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>GitHub Token Setup Guide</CardTitle>
                <CardDescription>How to create a GitHub token with the correct permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">1. Go to GitHub Settings</h3>
                  <p className="text-sm">
                    Navigate to your GitHub account settings by clicking on your profile picture in the top right corner
                    and selecting "Settings".
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">2. Access Developer Settings</h3>
                  <p className="text-sm">Scroll down to the bottom of the sidebar and click on "Developer settings".</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">3. Create a Personal Access Token</h3>
                  <p className="text-sm">Click on "Personal access tokens" and then "Generate new token" (classic).</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">4. Configure Token Permissions</h3>
                  <p className="text-sm">Give your token a descriptive name and select the following scopes:</p>
                  <ul className="list-disc pl-5 text-sm">
                    <li>
                      <strong>repo</strong> - Full control of private repositories
                    </li>
                    <li>
                      <strong>workflow</strong> - Update GitHub Action workflows
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">5. Generate and Copy Token</h3>
                  <p className="text-sm">
                    Click "Generate token" and immediately copy the token value. GitHub will only show it once!
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">6. Add to Environment Variables</h3>
                  <p className="text-sm">
                    Add the token as the <code className="bg-muted px-1 py-0.5 rounded">GITHUB_TOKEN</code> environment
                    variable in your deployment platform.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webhook Setup Guide</CardTitle>
                <CardDescription>How to configure GitHub webhooks for real-time updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">1. Generate a Webhook Secret</h3>
                  <p className="text-sm">
                    Generate a random string to use as your webhook secret. You can use a command like:
                  </p>
                  <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">openssl rand -hex 20</pre>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">2. Add to Environment Variables</h3>
                  <p className="text-sm">
                    Add the secret as the <code className="bg-muted px-1 py-0.5 rounded">GITHUB_WEBHOOK_SECRET</code>{" "}
                    environment variable.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">3. Configure Repository Webhook</h3>
                  <p className="text-sm">
                    Go to your GitHub repository settings, click "Webhooks", then "Add webhook".
                  </p>
                  <ul className="list-disc pl-5 text-sm">
                    <li>
                      Payload URL:{" "}
                      <code className="bg-muted px-1 py-0.5 rounded">https://your-domain.com/api/github/webhook</code>
                    </li>
                    <li>
                      Content type: <code className="bg-muted px-1 py-0.5 rounded">application/json</code>
                    </li>
                    <li>Secret: Your webhook secret</li>
                    <li>Events: Select "Workflow runs" and "Workflow jobs"</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

