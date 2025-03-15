import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ApigeeIcon, GoogleCloudIcon } from "./platform-icons"

export function DashboardHero() {
  return (
    <Card className="overflow-hidden border-none bg-gradient-to-r from-teal-500/90 to-emerald-500/90 text-white">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <ApigeeIcon className="h-8 w-8" />
              <GoogleCloudIcon className="h-8 w-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">Apigee X Deployment Dashboard</h2>
            <p className="text-teal-50 max-w-md">
              Streamline your API deployments with our integrated dashboard for Apigee X on Google Cloud Platform.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="bg-white text-teal-600 hover:bg-teal-50 hover:text-teal-700 border-0">
                <Link href="/new-deployment">New Deployment</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <a href="https://cloud.google.com/apigee" target="_blank" rel="noopener noreferrer">
                  Learn About Apigee X
                </a>
              </Button>
            </div>
          </div>
          <div className="relative h-48 md:h-auto md:w-1/3 bg-gradient-to-br from-teal-600/30 to-emerald-600/30 flex items-center justify-center p-6">
            <ApigeeIcon className="h-24 w-24 text-white/70" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

