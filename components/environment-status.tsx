import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface EnvironmentStatusProps {
  name: string
  status: "healthy" | "warning" | "error"
  proxyCount: number
  detailed?: boolean
}

export function EnvironmentStatus({ name, status, proxyCount, detailed = false }: EnvironmentStatusProps) {
  return detailed ? (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-md",
        status === "healthy" && "border-l-4 border-l-green-500",
        status === "warning" && "border-l-4 border-l-yellow-500",
        status === "error" && "border-l-4 border-l-red-500",
      )}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{name}</h3>
            {status === "healthy" && <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Healthy</Badge>}
            {status === "warning" && (
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Warning</Badge>
            )}
            {status === "error" && <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Error</Badge>}
          </div>
          <div className="text-sm text-muted-foreground">{proxyCount} active proxies</div>
          <div className="flex items-center gap-2 text-sm">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                status === "healthy" && "bg-green-500",
                status === "warning" && "bg-yellow-500",
                status === "error" && "bg-red-500",
              )}
            ></div>
            <span>100% uptime</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ) : (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        {status === "healthy" && <CheckCircle className="h-4 w-4 text-green-500" />}
        {status === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
        {status === "error" && <XCircle className="h-4 w-4 text-red-500" />}
        <span className="font-medium">{name}</span>
      </div>
      <div className="text-sm text-muted-foreground">{proxyCount} proxies</div>
    </div>
  )
}

