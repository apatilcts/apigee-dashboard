import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function NewDeploymentButton() {
  return (
    <Button asChild className="font-medium">
      <Link href="/new-deployment" className="flex items-center gap-1">
        <Plus className="h-4 w-4" />
        New Deployment
      </Link>
    </Button>
  )
}

