export function DeploymentLogs() {
  // Mock log data - in a real app, this would come from an API
  const logs = [
    "2023-06-15 14:30:05 - Starting deployment workflow for WeatherForecastAPI-gha",
    "2023-06-15 14:30:07 - Processing environment configuration",
    "2023-06-15 14:30:10 - Environment group: edd, Environment types: dev,test,uat,prod",
    "2023-06-15 14:30:12 - Starting API proxy validation",
    "2023-06-15 14:30:35 - Running apigeelint with profile apigeex",
    "2023-06-15 14:30:57 - API proxy validation passed with 0 errors and 2 warnings",
    "2023-06-15 14:31:00 - Warning: PO007 - Avoid use of RegexProtection in default fault rule",
    "2023-06-15 14:31:02 - Warning: PO013 - Quota policy should have appropriate reuseQuota settings",
    "2023-06-15 14:31:05 - Starting build and upload process",
    "2023-06-15 14:31:15 - Creating API bundle zip file",
    "2023-06-15 14:31:30 - Uploading bundle to Apigee X organization",
    "2023-06-15 14:31:58 - Successfully uploaded bundle, revision: 12",
    "2023-06-15 14:32:00 - Starting deployment to edd-dev environment",
    "2023-06-15 14:32:10 - Checking deployment status for edd-dev",
    "2023-06-15 14:32:20 - Proxy deployment status is: PROGRESSING",
    "2023-06-15 14:32:30 - Deployment to edd-dev completed with status: READY",
    "2023-06-15 14:32:32 - Starting deployment to edd-test environment",
    "2023-06-15 14:32:42 - Checking deployment status for edd-test",
    "2023-06-15 14:32:50 - Proxy deployment status is: PROGRESSING",
    "2023-06-15 14:33:00 - Deployment to edd-test completed with status: READY",
    "2023-06-15 14:33:05 - Starting deployment to edd-uat environment",
    "2023-06-15 14:33:15 - Checking deployment status for edd-uat",
    "2023-06-15 14:33:25 - Proxy deployment status is: PROGRESSING",
    "2023-06-15 14:33:40 - Deployment to edd-uat completed with status: READY",
    "2023-06-15 14:33:45 - Creating production approval issue",
    "2023-06-15 14:33:50 - Production approval issue created: #45",
    "2023-06-15 14:34:55 - Production deployment approved by john.doe",
    "2023-06-15 14:35:00 - Starting deployment to edd-prod environment",
    "2023-06-15 14:35:10 - Checking deployment status for edd-prod",
    "2023-06-15 14:35:20 - Proxy deployment status is: PROGRESSING",
    "2023-06-15 14:35:45 - Deployment to edd-prod completed with status: READY",
    "2023-06-15 14:35:50 - Creating and pushing deployment tag",
    "2023-06-15 14:35:55 - Deployment completed successfully",
  ]

  return (
    <div className="max-h-[400px] overflow-auto rounded-md border bg-slate-50 p-4 font-mono">
      <pre className="text-xs">
        {logs.map((log, index) => (
          <div key={index} className="py-0.5">
            {log}
          </div>
        ))}
      </pre>
    </div>
  )
}

