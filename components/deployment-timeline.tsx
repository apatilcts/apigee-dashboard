import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function DeploymentTimeline() {
  // Mock data - in a real app, this would come from an API
  const timelineEvents = [
    {
      stage: "Validation",
      status: "success",
      timestamp: "14:30:12",
      duration: "45s",
      details: "API proxy validation passed with 0 errors and 2 warnings",
    },
    {
      stage: "Build & Upload",
      status: "success",
      timestamp: "14:31:05",
      duration: "53s",
      details: "Created and uploaded API bundle revision 12",
    },
    {
      stage: "Deploy to edd-dev",
      status: "success",
      timestamp: "14:31:58",
      duration: "32s",
      details: "Successfully deployed to edd-dev environment",
    },
    {
      stage: "Deploy to edd-test",
      status: "success",
      timestamp: "14:32:30",
      duration: "28s",
      details: "Successfully deployed to edd-test environment",
    },
    {
      stage: "Deploy to edd-uat",
      status: "success",
      timestamp: "14:33:05",
      duration: "35s",
      details: "Successfully deployed to edd-uat environment",
    },
    {
      stage: "Production Approval",
      status: "success",
      timestamp: "14:33:40",
      duration: "1m 15s",
      details: "Production deployment approved by john.doe",
    },
    {
      stage: "Deploy to edd-prod",
      status: "success",
      timestamp: "14:35:02",
      duration: "43s",
      details: "Successfully deployed to edd-prod environment",
    },
  ]

  return (
    <div className="space-y-4 py-2">
      {timelineEvents.map((event, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border",
                event.status === "success" ? "bg-green-50 border-green-200" : "bg-background",
              )}
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            {index < timelineEvents.length - 1 && <div className="h-full w-px bg-border" />}
          </div>
          <div className="space-y-1 pb-4">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{event.stage}</h4>
              <Badge variant="outline" className="text-xs font-mono bg-slate-50">
                {event.duration}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="font-mono text-xs">{event.timestamp}</span>
            </div>
            <p className="text-sm">{event.details}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

