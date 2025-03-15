"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Clock, XCircle } from "lucide-react"
import Link from "next/link"

interface DeploymentsListProps {
  limit?: number
  extended?: boolean
}

export function DeploymentsList({ limit, extended = false }: DeploymentsListProps) {
  // Mock data - in a real app, this would come from an API
  const deployments = [
    {
      id: "123",
      proxyName: "WeatherForecastAPI-gha",
      revision: "12",
      status: "success",
      environments: ["edd-dev", "edd-test", "edd-uat", "edd-prod"],
      timestamp: "2023-06-15 14:32:45",
      duration: "3m 24s",
      user: "github-actions[bot]",
      workflow: "apigeex-api-proxy-deploy.yml",
    },
    {
      id: "122",
      proxyName: "CustomerAPI",
      revision: "8",
      status: "success",
      environments: ["wow-dev", "wow-test"],
      timestamp: "2023-06-14 11:15:22",
      duration: "2m 51s",
      user: "john.doe",
      workflow: "apigeex-proxy-deploy.yml",
    },
    {
      id: "121",
      proxyName: "ProductCatalogAPI",
      revision: "15",
      status: "failed",
      environments: ["homerun-dev"],
      timestamp: "2023-06-13 09:45:11",
      duration: "1m 12s",
      user: "jane.smith",
      workflow: "apigeex-proxy-deploy.yml",
    },
    {
      id: "120",
      proxyName: "PaymentAPI",
      revision: "5",
      status: "success",
      environments: ["wpay-dev", "wpay-test", "wpay-uat"],
      timestamp: "2023-06-12 16:22:33",
      duration: "4m 05s",
      user: "github-actions[bot]",
      workflow: "apigeex-api-proxy-deploy.yml",
    },
    {
      id: "119",
      proxyName: "InventoryAPI",
      revision: "3",
      status: "success",
      environments: ["edd-dev"],
      timestamp: "2023-06-11 10:11:09",
      duration: "2m 33s",
      user: "john.doe",
      workflow: "apigeex-proxy-deploy.yml",
    },
    {
      id: "118",
      proxyName: "UserAuthAPI",
      revision: "7",
      status: "failed",
      environments: ["wow-dev"],
      timestamp: "2023-06-10 14:55:21",
      duration: "0m 45s",
      user: "github-actions[bot]",
      workflow: "apigeex-api-proxy-deploy.yml",
    },
    {
      id: "117",
      proxyName: "NotificationAPI",
      revision: "2",
      status: "success",
      environments: ["homerun-dev", "homerun-test"],
      timestamp: "2023-06-09 11:33:44",
      duration: "3m 12s",
      user: "jane.smith",
      workflow: "apigeex-proxy-deploy.yml",
    },
  ].slice(0, limit)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Proxy Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Environments</TableHead>
            {extended && <TableHead>Revision</TableHead>}
            <TableHead>Timestamp</TableHead>
            {extended && <TableHead>Duration</TableHead>}
            {extended && <TableHead>User</TableHead>}
            {extended && <TableHead>Workflow</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deployments.map((deployment) => (
            <TableRow key={deployment.id} className="hover:bg-muted/30">
              <TableCell className="font-medium">{deployment.proxyName}</TableCell>
              <TableCell>
                {deployment.status === "success" ? (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs font-medium text-green-700">Success</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-xs font-medium text-red-700">Failed</span>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {deployment.environments.map((env) => (
                    <Badge key={env} variant="outline" className="text-xs bg-slate-50">
                      {env}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              {extended && (
                <TableCell>
                  <Badge variant="secondary" className="font-mono">
                    {deployment.revision}
                  </Badge>
                </TableCell>
              )}
              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs">{deployment.timestamp}</span>
                </div>
              </TableCell>
              {extended && <TableCell className="font-mono text-sm">{deployment.duration}</TableCell>}
              {extended && <TableCell>{deployment.user}</TableCell>}
              {extended && (
                <TableCell className="max-w-[150px] truncate font-mono text-xs">{deployment.workflow}</TableCell>
              )}
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-primary hover:text-primary/80 hover:bg-primary/10"
                >
                  <Link href={`/deployments/${deployment.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

