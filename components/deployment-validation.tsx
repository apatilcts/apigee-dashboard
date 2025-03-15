import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle } from "lucide-react"

export function DeploymentValidation() {
  // Mock validation data - in a real app, this would come from an API
  const validationResults = {
    summary: {
      errors: 0,
      warnings: 2,
      status: "passed",
    },
    warnings: [
      {
        code: "PO007",
        name: "Avoid use of RegexProtection in default fault rule",
        description: "Using RegexProtection in the default fault rule may cause performance issues",
        severity: "warning",
        file: "apiproxy/policies/RegexProtection.xml",
      },
      {
        code: "PO013",
        name: "Quota policy should have appropriate reuseQuota settings",
        description: "Quota policies should have reuseQuota set to true for better performance",
        severity: "warning",
        file: "apiproxy/policies/Quota-1.xml",
      },
    ],
  }

  return (
    <div className="space-y-4 py-2">
      <div className="rounded-md border p-4 bg-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {validationResults.summary.status === "passed" ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
            <h3 className="font-medium">Validation {validationResults.summary.status}</h3>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-red-50 text-red-700">
              {validationResults.summary.errors} errors
            </Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
              {validationResults.summary.warnings} warnings
            </Badge>
          </div>
        </div>
      </div>

      {validationResults.warnings.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Warnings</h4>
          {validationResults.warnings.map((warning, index) => (
            <div key={index} className="rounded-md border p-4 bg-yellow-50/50">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-500" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium font-mono">{warning.code}</span>
                    <span>{warning.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{warning.description}</p>
                  <div className="text-xs text-muted-foreground font-mono">File: {warning.file}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

