"use client"

import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Copy, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function GoogleAnalyticsReporting({ onBack }: { onBack: () => void }) {
  const [copiedStep, setCopiedStep] = useState<string | null>(null)

  const copyCode = (code: string, step: string) => {
    navigator.clipboard.writeText(code)
    setCopiedStep(step)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--google-surface)" }}>
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4 max-w-5xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="text-xl font-medium text-foreground">Google Analytics Reporting API</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-12">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: "oklch(0.88 0.06 290)", color: "oklch(0.45 0.15 290)" }}
          >
            Data Extraction
          </div>
          <h1 className="text-4xl font-semibold mb-4 text-foreground">Reporting API</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Extract analytics data and build custom reports with the GA4 Data API
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "oklch(0.88 0.06 290)", color: "oklch(0.45 0.15 290)" }}
              >
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Enable the API</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Enable Google Analytics Data API in your Cloud project
                </p>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>
                      Go to{" "}
                      <a
                        href="https://console.cloud.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                        style={{ color: "var(--google-blue)" }}
                      >
                        Google Cloud Console
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>
                      Enable <strong>Google Analytics Data API</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>Create a service account and download credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>Add service account email to GA4 property with Viewer role</span>
                  </li>
                </ol>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "oklch(0.88 0.06 290)", color: "oklch(0.45 0.15 290)" }}
              >
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Install Client Library</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Install the Google Analytics Data API client
                </p>
                <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm relative group">
                  <button
                    onClick={() => copyCode(`npm install @google-analytics/data`, "install")}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                  >
                    {copiedStep === "install" ? (
                      <CheckCircle2 className="w-4 h-4" style={{ color: "var(--google-green)" }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="overflow-x-auto">
                    <code>npm install @google-analytics/data</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "oklch(0.88 0.06 290)", color: "oklch(0.45 0.15 290)" }}
              >
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Run a Report</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">Query analytics data using the Data API</p>
                <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm relative group">
                  <button
                    onClick={() =>
                      copyCode(
                        `const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: 'credentials.json'
});

async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    property: 'properties/YOUR_PROPERTY_ID',
    dateRanges: [
      {
        startDate: '30daysAgo',
        endDate: 'today',
      },
    ],
    dimensions: [
      { name: 'country' },
      { name: 'city' },
    ],
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
    ],
  });

  console.log('Report result:');
  response.rows.forEach((row) => {
    console.log(row.dimensionValues[0].value, row.metricValues[0].value);
  });
}

runReport();`,
                        "report",
                      )
                    }
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                  >
                    {copiedStep === "report" ? (
                      <CheckCircle2 className="w-4 h-4" style={{ color: "var(--google-green)" }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="overflow-x-auto">
                    <code>{`const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: 'credentials.json'
});

async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    property: 'properties/YOUR_PROPERTY_ID',
    dateRanges: [
      {
        startDate: '30daysAgo',
        endDate: 'today',
      },
    ],
    dimensions: [
      { name: 'country' },
      { name: 'city' },
    ],
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
    ],
  });

  console.log('Report result:');
  response.rows.forEach((row) => {
    console.log(row.dimensionValues[0].value, row.metricValues[0].value);
  });
}

runReport();`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-border rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Additional Resources</h3>
            <div className="space-y-3">
              <a
                href="https://developers.google.com/analytics/devguides/reporting/data/v1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--google-blue)" }}
              >
                <ExternalLink className="w-4 h-4" />
                Data API Documentation
              </a>
              <a
                href="https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--google-blue)" }}
              >
                <ExternalLink className="w-4 h-4" />
                Dimensions & Metrics Reference
              </a>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
