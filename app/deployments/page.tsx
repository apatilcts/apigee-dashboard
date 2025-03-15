import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DeploymentsList } from "@/components/deployments-list"
import { NewDeploymentButton } from "@/components/new-deployment-button"
import { AppLayout } from "@/components/layout/app-layout"
import { Search } from "lucide-react"

export default function DeploymentsPage() {
  return (
    <AppLayout title="Deployments" subtitle="View and manage all API proxy deployments">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search deployments..." className="pl-8" />
        </div>
        <NewDeploymentButton />
      </div>

      <Card className="dashboard-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-heading">All Deployments</CardTitle>
          <CardDescription>Complete history of API proxy deployments</CardDescription>
        </CardHeader>
        <CardContent>
          <DeploymentsList extended />
        </CardContent>
      </Card>
    </AppLayout>
  )
}

