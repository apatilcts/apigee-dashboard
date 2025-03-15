import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DeploymentStatsProps {
  title: string
  value: string
  description: string
  trend?: "up" | "down"
}

export function DeploymentStats({ title, value, description, trend }: DeploymentStatsProps) {
  return (
    <Card className={cn("stat-card overflow-hidden border")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {trend === "up" && <ArrowUpIcon className="h-4 w-4 text-green-500" />}
        {trend === "down" && <ArrowDownIcon className="h-4 w-4 text-red-500" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

