"use client"

import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Copy, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function GoogleAnalytics({ onBack }: { onBack: () => void }) {
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
            <div className="text-xl font-medium text-foreground">Google Analytics 4 Setup</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-12">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: "var(--google-blue-light)", color: "var(--google-blue)" }}
          >
            Analytics & Measurement
          </div>
          <h1 className="text-4xl font-semibold mb-4 text-foreground">Google Analytics 4</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Set up GA4 tracking, configure events, and integrate analytics into your application
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "var(--google-blue-light)", color: "var(--google-blue)" }}
              >
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Create a GA4 Property</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Start by creating a new Google Analytics 4 property in your Analytics account
                </p>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>
                      Go to{" "}
                      <a
                        href="https://analytics.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                        style={{ color: "var(--google-blue)" }}
                      >
                        Google Analytics
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>
                      Click <strong>Admin</strong> in the bottom left
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>
                      Click <strong>Create Property</strong> and follow the setup wizard
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--google-green)" }} />
                    <span>
                      Create a <strong>Web</strong> data stream and copy your <strong>Measurement ID</strong>
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "var(--google-blue-light)", color: "var(--google-blue)" }}
              >
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Install gtag.js Script</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Add the GA4 tracking code to your website's HTML
                </p>
                <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm relative group">
                  <button
                    onClick={() =>
                      copyCode(
                        `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`,
                        "step2",
                      )
                    }
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                  >
                    {copiedStep === "step2" ? (
                      <CheckCircle2 className="w-4 h-4" style={{ color: "var(--google-green)" }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="overflow-x-auto">
                    <code>{`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`}</code>
                  </pre>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Replace <code className="px-2 py-0.5 bg-muted rounded text-xs">G-XXXXXXXXXX</code> with your
                  Measurement ID
                </p>
              </div>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "var(--google-blue-light)", color: "var(--google-blue)" }}
              >
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Track Custom Events</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Send custom events to track user interactions
                </p>
                <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm relative group">
                  <button
                    onClick={() =>
                      copyCode(
                        `// Track button click
gtag('event', 'button_click', {
  'event_category': 'engagement',
  'event_label': 'Sign Up Button',
  'value': 1
});

// Track form submission
gtag('event', 'form_submit', {
  'event_category': 'conversion',
  'event_label': 'Contact Form'
});`,
                        "step3",
                      )
                    }
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                  >
                    {copiedStep === "step3" ? (
                      <CheckCircle2 className="w-4 h-4" style={{ color: "var(--google-green)" }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="overflow-x-auto">
                    <code>{`// Track button click
gtag('event', 'button_click', {
  'event_category': 'engagement',
  'event_label': 'Sign Up Button',
  'value': 1
});

// Track form submission
gtag('event', 'form_submit', {
  'event_category': 'conversion',
  'event_label': 'Contact Form'
});`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 4 */}
          <Card className="p-8 bg-white border border-border rounded-2xl">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ backgroundColor: "var(--google-blue-light)", color: "var(--google-blue)" }}
              >
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Set User Properties</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Define custom user properties for segmentation
                </p>
                <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm relative group">
                  <button
                    onClick={() =>
                      copyCode(
                        `// Set user properties
gtag('set', 'user_properties', {
  'user_type': 'premium',
  'signup_date': '2025-01-15',
  'preferred_category': 'technology'
});`,
                        "step4",
                      )
                    }
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                  >
                    {copiedStep === "step4" ? (
                      <CheckCircle2 className="w-4 h-4" style={{ color: "var(--google-green)" }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="overflow-x-auto">
                    <code>{`// Set user properties
gtag('set', 'user_properties', {
  'user_type': 'premium',
  'signup_date': '2025-01-15',
  'preferred_category': 'technology'
});`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>

          {/* Resources */}
          <Card className="p-8 bg-white border border-border rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Additional Resources</h3>
            <div className="space-y-3">
              <a
                href="https://developers.google.com/analytics/devguides/collection/ga4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--google-blue)" }}
              >
                <ExternalLink className="w-4 h-4" />
                GA4 Developer Documentation
              </a>
              <a
                href="https://support.google.com/analytics/answer/9304153"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--google-blue)" }}
              >
                <ExternalLink className="w-4 h-4" />
                Set up Analytics for a website
              </a>
              <a
                href="https://developers.google.com/analytics/devguides/collection/ga4/event-parameters"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--google-blue)" }}
              >
                <ExternalLink className="w-4 h-4" />
                Event Parameters Reference
              </a>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
