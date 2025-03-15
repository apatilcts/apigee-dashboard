import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"

export function GitHubTokenHelp() {
  return (
    <Alert>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>GitHub Token Setup</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          To access private organization repositories, your GitHub token needs specific permissions:
        </p>
        <ul className="list-disc pl-5 mb-2 space-y-1">
          <li>
            The <code>repo</code> scope (full access to repositories)
          </li>
          <li>
            The <code>workflow</code> scope (ability to trigger workflows)
          </li>
          <li>Organization access if the repository is in an organization</li>
        </ul>
        <p className="mb-2">For organization repositories, you may need to:</p>
        <ul className="list-disc pl-5 mb-2 space-y-1">
          <li>Create a token with SSO enabled for your organization</li>
          <li>Use a GitHub App with appropriate permissions</li>
          <li>Ensure the token has been authorized for the specific organization</li>
        </ul>
        <div className="mt-2">
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
              Manage GitHub Tokens
            </a>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}

