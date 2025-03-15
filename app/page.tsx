import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DeploymentsList } from "@/components/deployments-list"
import { DeploymentStats } from "@/components/deployment-stats"
import { NewDeploymentButton } from "@/components/new-deployment-button"
import { EnvironmentStatus } from "@/components/environment-status"
import { AppLayout } from "@/components/layout/app-layout"
import { DashboardHero } from "@/components/dashboard-hero"
import { PlatformLogos } from "@/components/platform-logos"
import { DeploymentVisualization } from "@/components/deployment-visualization"
import { EnvironmentVisualization } from "@/components/environment-visualization"

export default function DashboardPage() {
  return (
    <AppLayout title="Dashboard" subtitle="Monitor and manage your Apigee X deployments">
      <div className="space-y-6">
        <DashboardHero />

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-medium">Welcome back</h2>
            <p className="text-sm text-muted-foreground">Here's what's happening with your API deployments</p>
          </div>
          <NewDeploymentButton />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview" className="text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="deployments" className="text-sm">
              Deployments
            </TabsTrigger>
            <TabsTrigger value="environments" className="text-sm">
              Environments
            </TabsTrigger>
            <TabsTrigger value="visualization" className="text-sm">
              Visualization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <DeploymentStats title="Total Deployments" value="128" description="Last 30 days" />
              <DeploymentStats title="Success Rate" value="94%" description="Last 30 days" trend="up" />
              <DeploymentStats title="Avg. Deploy Time" value="3m 24s" description="Last 30 days" />
              <DeploymentStats title="Failed Deployments" value="8" description="Last 30 days" trend="down" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2 dashboard-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-heading">Recent Deployments</CardTitle>
                  <CardDescription>Latest API proxy deployments across all environments</CardDescription>
                </CardHeader>
                <CardContent>
                  <DeploymentsList limit={5} />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/deployments">View all deployments</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="dashboard-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-heading">Environment Status</CardTitle>
                  <CardDescription>Current status of deployment environments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <EnvironmentStatus name="edd-dev" status="healthy" proxyCount={12} />
                    <EnvironmentStatus name="edd-test" status="healthy" proxyCount={10} />
                    <EnvironmentStatus name="edd-uat" status="warning" proxyCount={8} />
                    <EnvironmentStatus name="edd-prod" status="healthy" proxyCount={6} />
                    <EnvironmentStatus name="wow-dev" status="healthy" proxyCount={15} />
                    <EnvironmentStatus name="wow-prod" status="healthy" proxyCount={12} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/environments">View all environments</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <PlatformLogos />
          </TabsContent>

          <TabsContent value="deployments" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-heading">All Deployments</CardTitle>
                <CardDescription>Complete history of API proxy deployments</CardDescription>
              </CardHeader>
              <CardContent>
                <DeploymentsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environments" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-heading">Environment Groups</CardTitle>
                <CardDescription>Manage and monitor environment groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium font-heading">EDD</h3>
                    <div className="grid gap-4 md:grid-cols-4">
                      <EnvironmentStatus name="edd-dev" status="healthy" proxyCount={12} detailed />
                      <EnvironmentStatus name="edd-test" status="healthy" proxyCount={10} detailed />
                      <EnvironmentStatus name="edd-uat" status="warning" proxyCount={8} detailed />
                      <EnvironmentStatus name="edd-prod" status="healthy" proxyCount={6} detailed />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium font-heading">WOW</h3>
                    <div className="grid gap-4 md:grid-cols-4">
                      <EnvironmentStatus name="wow-dev" status="healthy" proxyCount={15} detailed />
                      <EnvironmentStatus name="wow-test" status="healthy" proxyCount={14} detailed />
                      <EnvironmentStatus name="wow-uat" status="error" proxyCount={0} detailed />
                      <EnvironmentStatus name="wow-prod" status="healthy" proxyCount={12} detailed />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium font-heading">Homerun</h3>
                    <div className="grid gap-4 md:grid-cols-4">
                      <EnvironmentStatus name="homerun-dev" status="healthy" proxyCount={8} detailed />
                      <EnvironmentStatus name="homerun-test" status="healthy" proxyCount={7} detailed />
                      <EnvironmentStatus name="homerun-uat" status="healthy" proxyCount={6} detailed />
                      <EnvironmentStatus name="homerun-prod" status="healthy" proxyCount={5} detailed />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visualization" className="space-y-6">
            <DeploymentVisualization />
            <EnvironmentVisualization />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

