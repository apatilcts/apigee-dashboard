import Link from "next/link"
import type { ReactNode } from "react"
import { ApigeeIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  backLink?: {
    href: string
    label: string
  }
}

export function AppLayout({ children, title, subtitle, backLink }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-sm px-6">
        <div className="flex items-center gap-2">
          <ApigeeIcon className="h-6 w-6 text-primary" />
          <span className="font-heading font-semibold text-lg">Apigee X Dashboard</span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium ml-8">
          <NavLink href="/" label="Dashboard" />
          <NavLink href="/deployments" label="Deployments" />
          <NavLink href="/environments" label="Environments" />
          <NavLink href="/settings" label="Settings" />
        </nav>
      </header>
      <main className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex flex-col gap-1">
          {backLink && (
            <Link
              href={backLink.href}
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-2 w-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              {backLink.label}
            </Link>
          )}
          <h1 className="text-3xl font-heading font-bold tracking-tight text-gray-900">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </main>
      <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Apigee X Deployment Dashboard</p>
      </footer>
    </div>
  )
}

interface NavLinkProps {
  href: string
  label: string
}

function NavLink({ href, label }: NavLinkProps) {
  // In a real app, you would use a router to determine if the link is active
  const isActive = typeof window !== "undefined" && window.location.pathname === href

  return (
    <Link href={href} className={cn("nav-link", isActive && "active")}>
      {label}
    </Link>
  )
}

