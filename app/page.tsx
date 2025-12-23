"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ArrowRight, Activity, BarChart3, Settings, Database } from "lucide-react"
import GoogleDrive from "./flows/google-drive"
import Gmail from "./flows/gmail"
import GoogleCalendar from "./flows/google-calendar"
import GoogleSheets from "./flows/google-sheets"
import GoogleDocs from "./flows/google-docs"
import GoogleMeet from "./flows/google-meet"
import GoogleWorkspace from "./flows/google-workspace"
import GoogleContacts from "./flows/google-contacts"
import GoogleAnalytics from "./flows/google-analytics"
import GoogleAnalyticsDataImport from "./flows/google-analytics-data-import"
import GoogleAnalyticsMeasurementProtocol from "./flows/google-analytics-measurement-protocol"
import GoogleAnalyticsReporting from "./flows/google-analytics-reporting"

type OS = "mac" | "windows" | "linux"
type IntegrationType =
  | "google-drive"
  | "gmail"
  | "google-calendar"
  | "google-sheets"
  | "google-docs"
  | "google-meet"
  | "google-workspace"
  | "google-contacts"
  | "google-analytics"
  | "google-analytics-data-import"
  | "google-analytics-measurement-protocol"
  | "google-analytics-reporting"

export default function Home() {
  const [selectedFlow, setSelectedFlow] = useState<IntegrationType | null>(null)
  const [selectedOS, setSelectedOS] = useState<OS>("mac")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [selectedFlow])

  if (selectedFlow === "google-drive") {
    return <GoogleDrive onBack={() => setSelectedFlow(null)} os={selectedOS} />
  }
  if (selectedFlow === "gmail") {
    return <Gmail onBack={() => setSelectedFlow(null)} os={selectedOS} />
  }
  if (selectedFlow === "google-calendar") {
    return <GoogleCalendar onBack={() => setSelectedFlow(null)} os={selectedOS} />
  }
  if (selectedFlow === "google-sheets") {
    return <GoogleSheets onBack={() => setSelectedFlow(null)} os={selectedOS} />
  }
  if (selectedFlow === "google-docs") {
    return <GoogleDocs onBack={() => setSelectedFlow(null)} />
  }
  if (selectedFlow === "google-meet") {
    return <GoogleMeet onBack={() => setSelectedFlow(null)} />
  }
  if (selectedFlow === "google-workspace") {
    return <GoogleWorkspace onBack={() => setSelectedFlow(null)} />
  }
  if (selectedFlow === "google-contacts") {
    return <GoogleContacts onBack={() => setSelectedFlow(null)} />
  }
  if (selectedFlow === "google-analytics") {
    return <GoogleAnalytics onBack={() => setSelectedFlow(null)} />
  }
  if (selectedFlow === "google-analytics-data-import") {
    return <GoogleAnalyticsDataImport onBack={() => setSelectedFlow(null)} />
  }
  if (selectedFlow === "google-analytics-measurement-protocol") {
    return <GoogleAnalyticsMeasurementProtocol onBack={() => setSelectedFlow(null)} />
  }
  if (selectedFlow === "google-analytics-reporting") {
    return <GoogleAnalyticsReporting onBack={() => setSelectedFlow(null)} />
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--google-surface)" }}>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: "var(--google-blue)" }} />
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: "var(--google-red)" }} />
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: "var(--google-yellow)" }} />
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: "var(--google-green)" }} />
              </div>
              <div className="text-xl font-medium text-foreground">Google API Hub</div>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <a
                  href="https://console.cloud.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Console
                </a>
                <a
                  href="https://developers.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Docs
                </a>
                <a
                  href="https://developers.google.com/apis-explorer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Explorer
                </a>
              </nav>
              <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">
                <button
                  className="px-6 py-2 text-white rounded-md text-sm font-medium shadow-sm hover:shadow transition-all"
                  style={{ backgroundColor: "var(--google-blue)" }}
                >
                  Get started
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4 text-balance text-foreground">
            Integrate Google APIs
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
            Comprehensive guides for Google Workspace, Analytics, and Cloud Platform APIs
          </p>

          <div className="inline-flex items-center gap-0 p-1 bg-muted/50 rounded-lg border border-border">
            <button
              onClick={() => setSelectedOS("mac")}
              className={`px-5 py-2 rounded-md transition-all text-sm font-medium ${
                selectedOS === "mac"
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              macOS
            </button>
            <button
              onClick={() => setSelectedOS("windows")}
              className={`px-5 py-2 rounded-md transition-all text-sm font-medium ${
                selectedOS === "windows"
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Windows
            </button>
            <button
              onClick={() => setSelectedOS("linux")}
              className={`px-5 py-2 rounded-md transition-all text-sm font-medium ${
                selectedOS === "linux"
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Linux
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-5 h-5" style={{ color: "var(--google-blue)" }} />
            <h2 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground">
              Google Analytics & Measurement
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card
              className="group relative overflow-hidden bg-white border border-border rounded-2xl hover:shadow-md transition-all duration-200 cursor-pointer p-6"
              onClick={() => setSelectedFlow("google-analytics")}
            >
              <div className="flex flex-col h-full justify-between min-h-[180px]">
                <div>
                  <div
                    className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "var(--google-blue-light)" }}
                  >
                    <BarChart3 className="w-5 h-5" style={{ color: "var(--google-blue)" }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Google Analytics 4</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Set up GA4 tracking, events, and property configuration
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform mt-4" />
              </div>
            </Card>

            <Card
              className="group relative overflow-hidden bg-white border border-border rounded-2xl hover:shadow-md transition-all duration-200 cursor-pointer p-6"
              onClick={() => setSelectedFlow("google-analytics-data-import")}
            >
              <div className="flex flex-col h-full justify-between min-h-[180px]">
                <div>
                  <div
                    className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "oklch(0.88 0.06 145)" }}
                  >
                    <Database className="w-5 h-5" style={{ color: "var(--google-green)" }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Data Import</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Import offline data, cost data, and custom dimensions
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform mt-4" />
              </div>
            </Card>

            <Card
              className="group relative overflow-hidden bg-white border border-border rounded-2xl hover:shadow-md transition-all duration-200 cursor-pointer p-6"
              onClick={() => setSelectedFlow("google-analytics-measurement-protocol")}
            >
              <div className="flex flex-col h-full justify-between min-h-[180px]">
                <div>
                  <div
                    className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "oklch(0.88 0.06 25)" }}
                  >
                    <Activity className="w-5 h-5" style={{ color: "var(--google-red)" }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Measurement Protocol</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Send server-side events and custom tracking data
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform mt-4" />
              </div>
            </Card>

            <Card
              className="group relative overflow-hidden bg-white border border-border rounded-2xl hover:shadow-md transition-all duration-200 cursor-pointer p-6"
              onClick={() => setSelectedFlow("google-analytics-reporting")}
            >
              <div className="flex flex-col h-full justify-between min-h-[180px]">
                <div>
                  <div
                    className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "oklch(0.88 0.06 290)" }}
                  >
                    <Settings className="w-5 h-5" style={{ color: "oklch(0.45 0.15 290)" }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Reporting API</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Extract analytics data and build custom reports
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform mt-4" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-6">
            Google Workspace
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: "google-drive" as IntegrationType,
                title: "Drive API",
                desc: "File storage and management",
                color: "var(--google-blue)",
              },
              {
                id: "gmail" as IntegrationType,
                title: "Gmail API",
                desc: "Email integration and automation",
                color: "var(--google-red)",
              },
              {
                id: "google-calendar" as IntegrationType,
                title: "Calendar API",
                desc: "Event scheduling and management",
                color: "var(--google-blue)",
              },
              {
                id: "google-sheets" as IntegrationType,
                title: "Sheets API",
                desc: "Spreadsheet data operations",
                color: "var(--google-green)",
              },
            ].map((integration) => (
              <Card
                key={integration.id}
                className="group relative overflow-hidden bg-white border border-border rounded-2xl hover:shadow-md transition-all duration-200 cursor-pointer p-6"
                onClick={() => setSelectedFlow(integration.id)}
              >
                <div className="flex flex-col h-full justify-between min-h-[180px]">
                  <div>
                    <div
                      className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `oklch(from ${integration.color} calc(l + 0.33) c h)` }}
                    >
                      <div className="w-5 h-5 rounded" style={{ backgroundColor: integration.color }} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{integration.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{integration.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform mt-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-6">
            Productivity & Admin
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: "google-docs" as IntegrationType,
                title: "Docs API",
                desc: "Document creation and editing",
                color: "var(--google-blue)",
              },
              {
                id: "google-meet" as IntegrationType,
                title: "Meet API",
                desc: "Video conferencing integration",
                color: "var(--google-green)",
              },
              {
                id: "google-workspace" as IntegrationType,
                title: "Admin SDK",
                desc: "User and organization management",
                color: "var(--google-red)",
              },
              {
                id: "google-contacts" as IntegrationType,
                title: "People API",
                desc: "Contact information management",
                color: "oklch(0.58 0.2 55)",
              },
            ].map((flow) => (
              <Card
                key={flow.id}
                className="group relative overflow-hidden bg-white border border-border rounded-2xl hover:shadow-md transition-all duration-200 cursor-pointer p-6"
                onClick={() => setSelectedFlow(flow.id)}
              >
                <div className="flex flex-col h-full justify-between min-h-[180px]">
                  <div>
                    <div
                      className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `oklch(from ${flow.color} calc(l + 0.33) c h)` }}
                    >
                      <div className="w-5 h-5 rounded" style={{ backgroundColor: flow.color }} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{flow.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{flow.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform mt-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-3 text-foreground text-sm">Products</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="https://workspace.google.com/" className="hover:text-foreground transition-colors">
                      Workspace
                    </a>
                  </li>
                  <li>
                    <a href="https://analytics.google.com/" className="hover:text-foreground transition-colors">
                      Analytics
                    </a>
                  </li>
                  <li>
                    <a href="https://cloud.google.com/" className="hover:text-foreground transition-colors">
                      Cloud
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-foreground text-sm">Developers</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="https://developers.google.com/" className="hover:text-foreground transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="https://console.cloud.google.com/" className="hover:text-foreground transition-colors">
                      Console
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://developers.google.com/apis-explorer"
                      className="hover:text-foreground transition-colors"
                    >
                      API Explorer
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-foreground text-sm">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="https://developers.google.com/learn" className="hover:text-foreground transition-colors">
                      Learn
                    </a>
                  </li>
                  <li>
                    <a href="https://cloud.google.com/blog/" className="hover:text-foreground transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="https://issuetracker.google.com/" className="hover:text-foreground transition-colors">
                      Issue Tracker
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-foreground text-sm">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="https://support.google.com/" className="hover:text-foreground transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://stackoverflow.com/questions/tagged/google-api"
                      className="hover:text-foreground transition-colors"
                    >
                      Stack Overflow
                    </a>
                  </li>
                  <li>
                    <a href="https://groups.google.com/" className="hover:text-foreground transition-colors">
                      Community
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
              <div>© 2025 Google API Hub</div>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
