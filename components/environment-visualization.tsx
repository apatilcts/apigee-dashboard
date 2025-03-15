import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function EnvironmentVisualization() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-heading">Environment Architecture</CardTitle>
        <CardDescription>Visual representation of your Apigee X environments</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="w-full overflow-auto">
          <div className="min-w-[600px]">
            {/* Development */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Development Pipeline</h3>
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
                <div className="relative z-10 flex justify-between">
                  <EnvironmentNode name="Development" status="healthy" />
                  <EnvironmentNode name="Testing" status="healthy" />
                  <EnvironmentNode name="UAT" status="warning" />
                  <EnvironmentNode name="Production" status="healthy" />
                </div>
              </div>
            </div>

            {/* Environment Groups */}
            <div>
              <h3 className="text-lg font-medium mb-4">Environment Groups</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <EnvironmentGroup name="EDD" envs={["dev", "test", "uat", "prod"]} />
                <EnvironmentGroup name="WOW" envs={["dev", "test", "uat", "prod"]} />
                <EnvironmentGroup name="Homerun" envs={["dev", "test", "uat", "prod"]} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EnvironmentNode({ name, status }: { name: string; status: "healthy" | "warning" | "error" }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          w-12 h-12 rounded-full flex items-center justify-center border-4
          ${status === "healthy" ? "border-green-500 bg-green-100" : ""}
          ${status === "warning" ? "border-yellow-500 bg-yellow-100" : ""}
          ${status === "error" ? "border-red-500 bg-red-100" : ""}
        `}
      >
        <span className="text-sm font-bold">{name.substring(0, 1)}</span>
      </div>
      <span className="mt-2 text-sm font-medium">{name}</span>
      <Badge
        className={`mt-1 text-xs
          ${status === "healthy" ? "bg-green-100 text-green-800" : ""}
          ${status === "warning" ? "bg-yellow-100 text-yellow-800" : ""}
          ${status === "error" ? "bg-red-100 text-red-800" : ""}
        `}
      >
        {status}
      </Badge>
    </div>
  )
}

function EnvironmentGroup({ name, envs }: { name: string; envs: string[] }) {
  return (
    <div className="border rounded-lg p-4 bg-slate-50">
      <h4 className="font-medium mb-2">{name}</h4>
      <div className="flex flex-wrap gap-2">
        {envs.map((env) => (
          <Badge key={env} variant="outline" className="bg-white">
            {name.toLowerCase()}-{env}
          </Badge>
        ))}
      </div>
    </div>
  )
}

