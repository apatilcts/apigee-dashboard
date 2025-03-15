import { Card, CardContent } from "@/components/ui/card"
import { ApigeeIcon, GitHubIcon, GitHubActionsIcon, GoogleCloudIcon } from "./platform-icons"

export function PlatformLogos() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-6">Powered by</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex flex-col items-center gap-2">
              <GoogleCloudIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xs text-muted-foreground">Google Cloud</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ApigeeIcon className="h-8 w-8 text-green-600" />
              <span className="text-xs text-muted-foreground">Apigee X</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <GitHubIcon className="h-8 w-8 text-gray-800" />
              <span className="text-xs text-muted-foreground">GitHub</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <GitHubActionsIcon className="h-8 w-8 text-purple-600" />
              <span className="text-xs text-muted-foreground">GitHub Actions</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

