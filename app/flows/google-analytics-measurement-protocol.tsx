"use client"

import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Copy, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function GoogleAnalyticsMeasurementProtocol({ onBack }: { onBack: () => void }) {
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
            <div className="text-xl font-medium text-foreground">Measurement Protocol</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-12">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: "oklch(0.88 0.06 25)", color: "var(--google-red)" }}
          >
            Server-Side Tracking
          </div>
          <h1 className="text-4xl font-semibold mb-4 text-foreground">Measurement Protocol</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Send events directly from your server to Google Analytics 4
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "oklch(0.88 0.06 25)", color: "var(--google-red)" }}
              >
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Get API Secret</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Generate an API secret for Measurement Protocol
                </p>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>
                      Go to <strong>Admin → Data Streams</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>Select your data stream</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>
                      Click <strong>Measurement Protocol API secrets</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>
                      Click <strong>Create</strong> and copy the secret value
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "oklch(0.88 0.06 25)", color: "var(--google-red)" }}
              >
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Send Events via HTTP</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  POST events to the Measurement Protocol endpoint
                </p>
                <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm relative group">
                  <button
                    onClick={() =>
                      copyCode(
                        `const fetch = require('node-fetch');

const MEASUREMENT_ID = 'G-XXXXXXXXXX';
const API_SECRET = 'your_api_secret';

async function sendEvent() {
  const response = await fetch(
    \`https://www.google-analytics.com/mp/collect?measurement_id=\${MEASUREMENT_ID}&api_secret=\${API_SECRET}\`,
    {
      method: 'POST',
      body: JSON.stringify({
        client_id: 'unique_client_id',
        events: [{
          name: 'purchase',
          params: {
            currency: 'USD',
            value: 99.99,
            transaction_id: 'T12345',
            items: [{
              item_id: 'SKU_123',
              item_name: 'Premium Plan',
              price: 99.99,
              quantity: 1
            }]
          }
        }]
      })
    }
  );
  
  console.log('Event sent:', response.status);
}`,
                        "send",
                      )
                    }
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                  >
                    {copiedStep === "send" ? (
                      <CheckCircle2 className="w-4 h-4" style={{ color: "var(--google-green)" }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="overflow-x-auto">
                    <code>{`const fetch = require('node-fetch');

const MEASUREMENT_ID = 'G-XXXXXXXXXX';
const API_SECRET = 'your_api_secret';

async function sendEvent() {
  const response = await fetch(
    \`https://www.google-analytics.com/mp/collect?measurement_id=\${MEASUREMENT_ID}&api_secret=\${API_SECRET}\`,
    {
      method: 'POST',
      body: JSON.stringify({
        client_id: 'unique_client_id',
        events: [{
          name: 'purchase',
          params: {
            currency: 'USD',
            value: 99.99,
            transaction_id: 'T12345',
            items: [{
              item_id: 'SKU_123',
              item_name: 'Premium Plan',
              price: 99.99,
              quantity: 1
            }]
          }
        }]
      })
    }
  );
  
  console.log('Event sent:', response.status);
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "oklch(0.88 0.06 25)", color: "var(--google-red)" }}
              >
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Validate Events</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Use the validation endpoint to test your events
                </p>
                <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm relative group">
                  <button
                    onClick={() =>
                      copyCode(
                        `// Use /debug/mp/collect endpoint for validation
const response = await fetch(
  \`https://www.google-analytics.com/debug/mp/collect?measurement_id=\${MEASUREMENT_ID}&api_secret=\${API_SECRET}\`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'test_client',
      events: [{
        name: 'test_event',
        params: { test_param: 'test_value' }
      }]
    })
  }
);

const validation = await response.json();
console.log('Validation result:', validation);`,
                        "validate",
                      )
                    }
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                  >
                    {copiedStep === "validate" ? (
                      <CheckCircle2 className="w-4 h-4" style={{ color: "var(--google-green)" }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="overflow-x-auto">
                    <code>{`// Use /debug/mp/collect endpoint for validation
const response = await fetch(
  \`https://www.google-analytics.com/debug/mp/collect?measurement_id=\${MEASUREMENT_ID}&api_secret=\${API_SECRET}\`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'test_client',
      events: [{
        name: 'test_event',
        params: { test_param: 'test_value' }
      }]
    })
  }
);

const validation = await response.json();
console.log('Validation result:', validation);`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-border rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Additional Resources</h3>
            <div className="space-y-3">
              <a
                href="https://developers.google.com/analytics/devguides/collection/protocol/ga4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--google-blue)" }}
              >
                <ExternalLink className="w-4 h-4" />
                Measurement Protocol Documentation
              </a>
              <a
                href="https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--google-blue)" }}
              >
                <ExternalLink className="w-4 h-4" />
                API Reference
              </a>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
