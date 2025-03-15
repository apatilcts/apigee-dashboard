"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from "lucide-react"

export function GitHubTokenChecker() {
  const [isChecking, setIsChecking] = useState(false)
  const [tokenStatus, setTokenStatus] = useState<{
    valid?: boolean
    username?: string
    scopes?: string
    hasWorkflowScope?: boolean
    message?: string
    error?: string
  } | null>(null)

  const checkToken = async () => {
    try {
      setIsChecking(true)
      setTokenStatus(null)

      const response = await fetch("/api/github/validate-token")
      const data = await response.json()

      setTokenStatus(data)
    } catch (error: any) {
      setTokenStatus({
        valid: false,
        error: error.message || "Failed to check token",
      })
    } finally {
      setIsChecking(false)
    }
  }

  // Check token on component mount
  useEffect(() => {
    checkToken()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub Token Status</CardTitle>
      </CardHeader>
      <CardContent>
        {isChecking ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Checking token...</span>
          </div>
        ) : tokenStatus ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              {tokenStatus.valid ? (
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Valid
                </Badge>
              ) : (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <XCircle className="h-3 w-3" /> Invalid
                </Badge>
              )}
            </div>

            {tokenStatus.username && (
              <div>
                <span className="font-medium">Authenticated as:</span> {tokenStatus.username}
              </div>
            )}

            {tokenStatus.scopes && (
              <div>
                <span className="font-medium">Scopes:</span> {tokenStatus.scopes}
              </div>
            )}

            {tokenStatus.hasWorkflowScope !== undefined && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Workflow Scope:</span>
                {tokenStatus.hasWorkflowScope ? (
                  <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Present
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <XCircle className="h-3 w-3" /> Missing
                  </Badge>
                )}
              </div>
            )}

            {tokenStatus.message && (
              <Alert
                variant={tokenStatus.valid ? (tokenStatus.hasWorkflowScope ? "default" : "warning") : "destructive"}
              >
                {tokenStatus.valid ? (
                  tokenStatus.hasWorkflowScope ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {tokenStatus.valid ? (tokenStatus.hasWorkflowScope ? "Token Valid" : "Warning") : "Token Invalid"}
                </AlertTitle>
                <AlertDescription>{tokenStatus.message}</AlertDescription>
              </Alert>
            )}

            {tokenStatus.error && !tokenStatus.message && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{tokenStatus.error}</AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">No token information available</div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
            Manage GitHub Tokens
          </a>
        </Button>
        <Button onClick={checkToken} disabled={isChecking}>
          {isChecking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Refresh"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

