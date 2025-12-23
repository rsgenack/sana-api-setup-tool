"use client"

import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Copy, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function GoogleAnalyticsDataImport({ onBack }: { onBack: () => void }) {
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
            <div className="text-xl font-medium text-foreground">Google Analytics Data Import</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-12">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: "oklch(0.88 0.06 145)", color: "var(--google-green)" }}
          >
            Data Integration
          </div>
          <h1 className="text-4xl font-semibold mb-4 text-foreground">Data Import</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Import offline data, cost data, and custom dimensions into Google Analytics
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "oklch(0.88 0.06 145)", color: "var(--google-green)" }}
              >
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Create Data Import Configuration</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Set up a data import configuration in your GA4 property
                </p>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>
                      Navigate to <strong>Admin → Data Import</strong> in GA4
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>
                      Click <strong>Create data source</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>Choose your import type (Cost data, User data, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>Configure the schema and key mappings</span>
                  </li>
                </ol>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "oklch(0.88 0.06 145)", color: "var(--google-green)" }}
              >
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Prepare CSV File</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Format your data according to GA4 import requirements
                </p>
                <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm relative group">
                  <button
                    onClick={() =>
                      copyCode(
                        `user_id,user_type,signup_date,ltv
user_001,premium,2025-01-15,299.99
user_002,free,2025-01-16,0
user_003,premium,2025-01-16,499.99`,
                        "csv",
                      )
                    }
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                  >
                    {copiedStep === "csv" ? (
                      <CheckCircle2 className="w-4 h-4" style={{ color: "var(--google-green)" }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="overflow-x-auto">
                    <code>{`user_id,user_type,signup_date,ltv
user_001,premium,2025-01-15,299.99
user_002,free,2025-01-16,0
user_003,premium,2025-01-16,499.99`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "oklch(0.88 0.06 145)", color: "var(--google-green)" }}
              >
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Upload via API</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Use the Management API to automate data imports
                </p>
                <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm relative group">
                  <button
                    onClick={() =>
                      copyCode(
                        `const { google } = require('googleapis');

const analytics = google.analyticsadmin('v1alpha');

async function uploadData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/analytics.edit'],
  });

  const response = await analytics.properties.dataStreams.uploadData({
    parent: 'properties/YOUR_PROPERTY_ID/dataStreams/YOUR_STREAM_ID',
    requestBody: {
      csvData: fs.readFileSync('import.csv', 'utf8')
    },
    auth: auth
  });
  
  console.log('Upload complete:', response.data);
}`,
                        "api",
                      )
                    }
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                  >
                    {copiedStep === "api" ? (
                      <CheckCircle2 className="w-4 h-4" style={{ color: "var(--google-green)" }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="overflow-x-auto">
                    <code>{`const { google } = require('googleapis');

const analytics = google.analyticsadmin('v1alpha');

async function uploadData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/analytics.edit'],
  });

  const response = await analytics.properties.dataStreams.uploadData({
    parent: 'properties/YOUR_PROPERTY_ID/dataStreams/YOUR_STREAM_ID',
    requestBody: {
      csvData: fs.readFileSync('import.csv', 'utf8')
    },
    auth: auth
  });
  
  console.log('Upload complete:', response.data);
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-border rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Additional Resources</h3>
            <div className="space-y-3">
              <a
                href="https://support.google.com/analytics/answer/10071301"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--google-blue)" }}
              >
                <ExternalLink className="w-4 h-4" />
                About data import
              </a>
              <a
                href="https://developers.google.com/analytics/devguides/config/admin/v1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--google-blue)" }}
              >
                <ExternalLink className="w-4 h-4" />
                Admin API Documentation
              </a>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
