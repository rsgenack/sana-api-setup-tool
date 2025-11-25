"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Copy, ChevronDown, ExternalLink, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

type StepStatus = "incomplete" | "in-progress" | "complete"

interface ApiCredentials {
  hubspotClientId: string
  hubspotClientSecret: string
  hubspotToken: string
  sanaDomain: string
  sanaClientId: string
  sanaClientSecret: string
  sanaToken: string
}

interface StepCardProps {
  step: {
    number: number
    title: string
    platform: "hubspot" | "sana" | "terminal"
    description: string
  }
  status: StepStatus
  isExpanded: boolean
  onToggle: () => void
  onComplete: () => void
  children: React.ReactNode
}

function StepCard({ step, status, isExpanded, onToggle, onComplete, children }: StepCardProps) {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "hubspot":
        return "bg-[#FF7A59] text-white"
      case "sana":
        return "bg-[#7C3AED] text-white"
      case "terminal":
        return "bg-foreground text-background"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card
      className={cn(
        "mb-4 overflow-hidden transition-all duration-300 border-l-4",
        status === "complete" && "border-l-green-500 bg-green-50/50 dark:bg-green-950/20",
        status === "in-progress" && "border-l-primary",
        status === "incomplete" && "border-l-muted opacity-60",
      )}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold",
              status === "complete" && "bg-green-500 text-white",
              status === "in-progress" && "bg-primary text-primary-foreground",
              status === "incomplete" && "bg-muted text-muted-foreground",
            )}
          >
            {status === "complete" ? <Check className="w-5 h-5" /> : step.number}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <Badge className={cn("text-xs", getPlatformColor(step.platform))}>
                {step.platform === "terminal" ? "Terminal" : step.platform === "hubspot" ? "HubSpot" : "Sana"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        </div>
        <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", isExpanded && "rotate-180")} />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2">
          <div className="border-t border-border pt-4">{children}</div>
          {status !== "complete" && (
            <Button onClick={onComplete} className="mt-6 w-full">
              <Check className="w-4 h-4 mr-2" />
              Mark as Complete
            </Button>
          )}
        </div>
      )}
    </Card>
  )
}

interface CodeBlockProps {
  title: string
  code: string
  onCopy: () => void
  isCopied: boolean
  language?: string
}

function CodeBlock({ title, code, onCopy, isCopied, language = "bash" }: CodeBlockProps) {
  return (
    <div className="bg-muted/50 border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/80 border-b border-border">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        <Button size="sm" variant="ghost" onClick={onCopy} className="h-7 text-xs">
          {isCopied ? (
            <>
              <Check className="w-3 h-3 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}

type OS = "mac" | "windows" | "linux"

interface HubSpotToSanaProps {
  onBack: () => void
  os: OS
}

export default function HubSpotToSana({ onBack, os }: HubSpotToSanaProps) {
  const [credentials, setCredentials] = useState<ApiCredentials>({
    hubspotClientId: "",
    hubspotClientSecret: "",
    hubspotToken: "",
    sanaDomain: "",
    sanaClientId: "",
    sanaClientSecret: "",
    sanaToken: "",
  })

  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([1]))
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const toggleStep = (step: number) => {
    const newExpanded = new Set(expandedSteps)
    if (newExpanded.has(step)) {
      newExpanded.delete(step)
    } else {
      newExpanded.add(step)
    }
    setExpandedSteps(newExpanded)
  }

  const markStepComplete = (step: number) => {
    const newCompleted = new Set(completedSteps)
    newCompleted.add(step)
    setCompletedSteps(newCompleted)

    const nextStep = step + 1
    // Adjusted logic to handle the new total number of steps (11)
    if (nextStep <= 11) {
      const newExpanded = new Set(expandedSteps)
      newExpanded.delete(step)
      newExpanded.add(nextStep)
      setExpandedSteps(newExpanded)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getStepStatus = (step: number): StepStatus => {
    if (completedSteps.has(step)) return "complete"
    if (expandedSteps.has(step)) return "in-progress"
    return "incomplete"
  }

  const formatCommand = (command: string) => {
    if (os === "windows") {
      // Replace backslash line continuations with caret for Windows
      return command.replace(/\\\n/g, "^\n")
    }
    return command
  }

  const getHubSpotAuthUrl = () => {
    return `https://app.hubspot.com/oauth/authorize?client_id=${credentials.hubspotClientId || "YOUR_HUBSPOT_CLIENT_ID"}&scope=crm.objects.contacts.read,crm.objects.companies.read,crm.objects.deals.read&redirect_uri=https://${credentials.sanaDomain || "your-sana-domain"}.sana.ai/integrations/callback`
  }

  const getHubSpotTokenCommand = () => {
    const command = `curl "https://api.hubapi.com/oauth/v1/token" \\
  -X POST \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=client_credentials&client_id=${credentials.hubspotClientId || "YOUR_HUBSPOT_CLIENT_ID"}&client_secret=${credentials.hubspotClientSecret || "YOUR_HUBSPOT_CLIENT_SECRET"}&scope=crm.objects.contacts.read"`
    return formatCommand(command)
  }

  const getSanaTokenCommand = () => {
    const command = `curl "https://${credentials.sanaDomain || "your-sana-domain"}.sana.ai/api/token" \\
  -X POST \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=client_credentials&client_id=${credentials.sanaClientId || "YOUR_SANA_CLIENT_ID"}&client_secret=${credentials.sanaClientSecret || "YOUR_SANA_CLIENT_SECRET"}&scope=read,write"`
    return formatCommand(command)
  }

  const getHubSpotContactsCommand = () => {
    const command = `curl "https://api.hubapi.com/crm/v3/objects/contacts?limit=50" \\
  -H "Authorization: Bearer ${credentials.hubspotToken || "YOUR_HUBSPOT_TOKEN"}" \\
  -H "Content-Type: application/json"`
    return formatCommand(command)
  }

  const getSanaUploadCommand = () => {
    const command = `curl "https://${credentials.sanaDomain || "your-sana-domain"}.sana.ai/api/v1/users/batch" \\
  -X POST \\
  -H "Authorization: Bearer ${credentials.sanaToken || "YOUR_SANA_TOKEN"}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "users": [
      {
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe"
      }
    ]
  }'`
    return formatCommand(command)
  }

  const steps = [
    {
      number: 1,
      title: "Create App in HubSpot",
      platform: "hubspot" as const,
      description: "Get API credentials from HubSpot",
    },
    {
      number: 2,
      title: "Set Redirect URL in HubSpot",
      platform: "hubspot" as const,
      description: "Configure OAuth callback URL",
    },
    { number: 3, title: "Create App in Sana", platform: "sana" as const, description: "Setup Sana API client" },
    {
      number: 4,
      title: "Get Permission from HubSpot",
      platform: "hubspot" as const,
      description: "Grant data access permissions",
    },
    {
      number: 5,
      title: "Get Access Tokens",
      platform: "terminal" as const,
      description: "Generate HubSpot and Sana tokens",
    },
    {
      number: 6,
      title: "Get Customer Data from HubSpot",
      platform: "terminal" as const,
      description: "Retrieve contact information",
    },
    {
      number: 7,
      title: "Send Customer Data to Sana",
      platform: "terminal" as const,
      description: "Upload contacts to Sana",
    },
    {
      number: 8,
      title: "Add More Fields (Optional)",
      platform: "terminal" as const,
      description: "Sync additional contact fields",
    },
    {
      number: 9,
      title: "Automate with Python Script",
      platform: "terminal" as const,
      description: "Create automated sync script",
    },
    {
      number: 10,
      title: "Check Python Installation",
      platform: "terminal" as const,
      description: "Verify Python is installed",
    },
    {
      number: 11,
      title: "Set Up Automatic Syncing",
      platform: "terminal" as const,
      description: "Schedule regular syncs",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">HubSpot → Sana Setup</h1>
                <p className="text-muted-foreground mt-2">
                  Connect HubSpot (where your customer info lives) to Sana (where you want that info to appear) •{" "}
                  {os === "mac" ? "macOS" : os === "windows" ? "Windows" : "Linux"}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              {completedSteps.size} / {steps.length} Complete
            </Badge>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-6">
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">Setup Progress</h2>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {Math.round((completedSteps.size / steps.length) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
          </Card>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Step 1: Create App in HubSpot */}
        <StepCard
          step={steps[0]}
          status={getStepStatus(1)}
          isExpanded={expandedSteps.has(1)}
          onToggle={() => toggleStep(1)}
          onComplete={() => markStepComplete(1)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This step happens entirely in HubSpot. You're creating an "app" that gives permission for Sana to read
              your customer data.
            </p>

            <div className="bg-[#FF7A59]/10 border border-[#FF7A59]/30 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-[#FF7A59]">
                <ExternalLink className="w-4 h-4" />
                What To Do (In HubSpot)
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Go to{" "}
                  <a
                    href="https://developers.hubspot.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF7A59] hover:underline font-medium"
                  >
                    developers.hubspot.com
                  </a>
                </li>
                <li>Log in (create a free developer account if you don't have one)</li>
                <li>
                  Click <strong>Create an app</strong> (big blue button)
                </li>
                <li>Fill in app name: "Sana Integration" (or whatever you want to call it)</li>
                <li>Description: "Connect my HubSpot customers to my Sana account"</li>
                <li>
                  Click <strong>Create</strong>
                </li>
              </ol>
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="font-semibold">Save Your HubSpot Codes</h4>
              <p className="text-sm text-muted-foreground">
                After you create the app in HubSpot, you'll see a page showing you two important codes. Copy these and
                paste them below. Don't share these with anyone.
              </p>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="hubspot-client-id">HubSpot Client ID</Label>
                  <Input
                    id="hubspot-client-id"
                    type="text"
                    placeholder="a1b2c3d4e5f6g7h8"
                    value={credentials.hubspotClientId}
                    onChange={(e) => setCredentials({ ...credentials, hubspotClientId: e.target.value })}
                    className="font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="hubspot-client-secret">HubSpot Client Secret</Label>
                  <Input
                    id="hubspot-client-secret"
                    type="password"
                    placeholder="xyzabc123def456ghi789"
                    value={credentials.hubspotClientSecret}
                    onChange={(e) => setCredentials({ ...credentials, hubspotClientSecret: e.target.value })}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">🔒 Stored locally and never sent anywhere</p>
                </div>
              </div>
            </div>
          </div>
        </StepCard>

        {/* Step 2: Set Redirect URL */}
        <StepCard
          step={steps[1]}
          status={getStepStatus(2)}
          isExpanded={expandedSteps.has(2)}
          onToggle={() => toggleStep(2)}
          onComplete={() => markStepComplete(2)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This is a simple setting that tells HubSpot where to send responses.
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="sana-domain-step2">Your Sana Domain</Label>
                <Input
                  id="sana-domain-step2"
                  type="text"
                  placeholder="acme"
                  value={credentials.sanaDomain}
                  onChange={(e) => setCredentials({ ...credentials, sanaDomain: e.target.value })}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Just the domain name (e.g., "acme" from acme.sana.ai)
                </p>
              </div>

              <div className="bg-[#FF7A59]/10 border border-[#FF7A59]/30 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-[#FF7A59]">Instructions</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>
                    Still in HubSpot, look for <strong>Auth</strong> or <strong>Settings</strong>
                  </li>
                  <li>
                    Find <strong>Redirect URLs</strong>
                  </li>
                  <li>Copy and paste the URL below</li>
                  <li>
                    Click <strong>Save</strong>
                  </li>
                </ol>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-xs text-muted-foreground">Redirect URL to paste in HubSpot</Label>
                    <code className="block mt-2 text-sm break-all">
                      https://{credentials.sanaDomain || "your-sana-domain"}.sana.ai/integrations/callback
                    </code>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `https://${credentials.sanaDomain || "your-sana-domain"}.sana.ai/integrations/callback`,
                        "redirect-url",
                      )
                    }
                  >
                    {copiedCode === "redirect-url" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </StepCard>

        {/* Step 3: Create App in Sana */}
        <StepCard
          step={steps[2]}
          status={getStepStatus(3)}
          isExpanded={expandedSteps.has(3)}
          onToggle={() => toggleStep(3)}
          onComplete={() => markStepComplete(3)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You're done with HubSpot for now. Now you're going to do the same thing in Sana—create an app and get two
              codes.
            </p>

            <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/30 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-[#7C3AED]">What To Do (In Sana)</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Log into{" "}
                  <a
                    href="https://sana.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7C3AED] hover:underline font-medium"
                  >
                    Sana
                  </a>{" "}
                  with admin rights
                </li>
                <li>
                  Once logged in, go to <strong>Settings</strong> (or{" "}
                  <a
                    href="https://help.sana.ai/en/articles/96582-customizing-your-sana-domain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7C3AED] hover:underline"
                  >
                    Manage → Settings
                  </a>
                  )
                </li>
                <li>
                  Find and click <strong>API</strong> (or "Manage API" or "API Clients")
                </li>
                <li>
                  Click <strong>Create New API Client</strong> or <strong>New Client</strong> button
                </li>
                <li>Fill in Client Name: "HubSpot Sync"</li>
                <li>Description: "So I can import customer data from HubSpot"</li>
                <li>
                  Click <strong>Create</strong>
                </li>
              </ol>
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="font-semibold">Save Your Sana Codes</h4>
              <p className="text-sm text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                ⚠️ <strong>IMPORTANT:</strong> The Client Secret only shows once. If you close this window without
                copying it, you'll have to delete this client and create a new one.
              </p>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="sana-client-id">Sana Client ID</Label>
                  <Input
                    id="sana-client-id"
                    type="text"
                    placeholder="sana-client-123456"
                    value={credentials.sanaClientId}
                    onChange={(e) => setCredentials({ ...credentials, sanaClientId: e.target.value })}
                    className="font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="sana-client-secret">Sana Client Secret</Label>
                  <Input
                    id="sana-client-secret"
                    type="password"
                    placeholder="sana-secret-abcdef"
                    value={credentials.sanaClientSecret}
                    onChange={(e) => setCredentials({ ...credentials, sanaClientSecret: e.target.value })}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">🔒 Stored locally and never sent anywhere</p>
                </div>
              </div>
            </div>
          </div>
        </StepCard>

        {/* Step 4: Get Permission from HubSpot */}
        <StepCard
          step={steps[3]}
          status={getStepStatus(4)}
          isExpanded={expandedSteps.has(4)}
          onToggle={() => toggleStep(4)}
          onComplete={() => markStepComplete(4)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Right now, you have the codes, but HubSpot needs to know what data Sana is allowed to read. You're going
              to ask HubSpot for permission.
            </p>

            <div className="bg-[#FF7A59]/10 border border-[#FF7A59]/30 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-[#FF7A59]">What To Do</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Copy the OAuth Authorization URL below</li>
                <li>Paste it into your web browser's address bar</li>
                <li>Hit Enter</li>
                <li>
                  HubSpot will ask: "Do you want to let this app see your contacts?" Click <strong>Allow</strong>
                </li>
                <li>You'll see a screen with a code or confirmation</li>
              </ol>
            </div>

            <CodeBlock
              title="OAuth Authorization URL"
              code={getHubSpotAuthUrl()}
              onCopy={() => copyToClipboard(getHubSpotAuthUrl(), "oauth-url")}
              isCopied={copiedCode === "oauth-url"}
            />
            <Button asChild variant="outline" className="w-full bg-transparent">
              <a href={getHubSpotAuthUrl()} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Authorization URL in Browser
              </a>
            </Button>
          </div>
        </StepCard>

        {/* Step 5: Get Access Tokens */}
        <StepCard
          step={steps[4]}
          status={getStepStatus(5)}
          isExpanded={expandedSteps.has(5)}
          onToggle={() => toggleStep(5)}
          onComplete={() => markStepComplete(5)}
        >
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Both HubSpot and Sana use "tokens"—think of them like temporary passwords that let the systems talk to
              each other. You're going to get two tokens.
            </p>

            <div>
              <h4 className="font-semibold mb-3">Getting a HubSpot Token</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Open your computer's {os === "mac" || os === "linux" ? "Terminal" : "Command Prompt"} and copy-paste
                this exactly:
              </p>
              <CodeBlock
                title={`Run in ${os === "windows" ? "Command Prompt or PowerShell" : "Terminal"}`}
                code={getHubSpotTokenCommand()}
                onCopy={() => copyToClipboard(getHubSpotTokenCommand(), "hubspot-token-cmd")}
                isCopied={copiedCode === "hubspot-token-cmd"}
              />
              <div className="mt-4">
                <Label htmlFor="hubspot-token">Paste Your HubSpot Access Token</Label>
                <Input
                  id="hubspot-token"
                  type="password"
                  placeholder="pat-na1-1a2b3c4d5e6f7g8h9i0j"
                  value={credentials.hubspotToken}
                  onChange={(e) => setCredentials({ ...credentials, hubspotToken: e.target.value })}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Copy the long code next to "access_token" (the part that looks like pat-na1-...) — it works for 1
                  hour.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Getting a Sana Token</h4>
              <p className="text-sm text-muted-foreground mb-3">Still on your computer, copy-paste this:</p>
              <CodeBlock
                title={`Run in ${os === "windows" ? "Command Prompt or PowerShell" : "Terminal"}`}
                code={getSanaTokenCommand()}
                onCopy={() => copyToClipboard(getSanaTokenCommand(), "sana-token-cmd")}
                isCopied={copiedCode === "sana-token-cmd"}
              />
              <div className="mt-4">
                <Label htmlFor="sana-token">Paste Your Sana Access Token</Label>
                <Input
                  id="sana-token"
                  type="password"
                  placeholder="eyJhbGc..."
                  value={credentials.sanaToken}
                  onChange={(e) => setCredentials({ ...credentials, sanaToken: e.target.value })}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">Copy the access token from the response</p>
              </div>
            </div>
          </div>
        </StepCard>

        {/* Step 6: Get Customer Data from HubSpot */}
        <StepCard
          step={steps[5]}
          status={getStepStatus(6)}
          isExpanded={expandedSteps.has(6)}
          onToggle={() => toggleStep(6)}
          onComplete={() => markStepComplete(6)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">You're asking HubSpot to show you all your customers.</p>
            <CodeBlock
              title={`Fetch contacts from HubSpot (${os === "windows" ? "Command Prompt" : "Terminal"})`}
              code={getHubSpotContactsCommand()}
              onCopy={() => copyToClipboard(getHubSpotContactsCommand(), "fetch-contacts")}
              isCopied={copiedCode === "fetch-contacts"}
            />
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Expected Response</h4>
              <p className="text-sm text-muted-foreground mb-3">
                You'll get back a list of your contacts that looks like:
              </p>
              <pre className="text-xs overflow-x-auto">
                {`{
  "results": [
    {
      "id": "123456789",
      "properties": {
        "email": "john@example.com",
        "firstname": "John",
        "lastname": "Doe"
      }
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </StepCard>

        {/* Step 7: Send Customer Data to Sana */}
        <StepCard
          step={steps[6]}
          status={getStepStatus(7)}
          isExpanded={expandedSteps.has(7)}
          onToggle={() => toggleStep(7)}
          onComplete={() => markStepComplete(7)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">Now you're going to take that customer data and send it into Sana.</p>
            <CodeBlock
              title={`Upload to Sana (${os === "windows" ? "Command Prompt" : "Terminal"})`}
              code={getSanaUploadCommand()}
              onCopy={() => copyToClipboard(getSanaUploadCommand(), "upload-sana")}
              isCopied={copiedCode === "upload-sana"}
            />
            <p className="text-sm text-muted-foreground">
              If this works, you'll see a response saying the users were created. 🎉
            </p>
          </div>
        </StepCard>

        {/* Step 8: Add More Fields (Optional) */}
        <StepCard
          step={steps[7]}
          status={getStepStatus(8)}
          isExpanded={expandedSteps.has(8)}
          onToggle={() => toggleStep(8)}
          onComplete={() => markStepComplete(8)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Want to send more than just email, first name, and last name? You can send any HubSpot data you want.
            </p>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Common Fields You Might Want to Send</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <code className="text-xs bg-muted px-2 py-1 rounded">phone</code> - Phone number
                </div>
                <div>
                  <code className="text-xs bg-muted px-2 py-1 rounded">company</code> - Company name
                </div>
                <div>
                  <code className="text-xs bg-muted px-2 py-1 rounded">jobtitle</code> - Job title
                </div>
                <div>
                  <code className="text-xs bg-muted px-2 py-1 rounded">lifecyclestage</code> - Lead stage
                </div>
                <div>
                  <code className="text-xs bg-muted px-2 py-1 rounded">country</code> - Country
                </div>
                <div>
                  <code className="text-xs bg-muted px-2 py-1 rounded">city</code> - City
                </div>
                <div>
                  <code className="text-xs bg-muted px-2 py-1 rounded">state</code> - State
                </div>
                <div>
                  <code className="text-xs bg-muted px-2 py-1 rounded">website</code> - Website
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Modified Command to Get More Fields</h4>
              <p className="text-sm text-muted-foreground">
                Add <code className="text-xs bg-muted px-2 py-1 rounded">&properties=field1,field2,field3</code> to the
                URL:
              </p>
              <CodeBlock
                title="Get contacts with additional fields"
                code={formatCommand(`curl "https://api.hubapi.com/crm/v3/objects/contacts?limit=50&properties=firstname,lastname,email,phone,company,jobtitle" \\
  -H "Authorization: Bearer ${credentials.hubspotToken || "YOUR_HUBSPOT_TOKEN"}" \\
  -H "Content-Type: application/json"`)}
                onCopy={() =>
                  copyToClipboard(
                    formatCommand(`curl "https://api.hubapi.com/crm/v3/objects/contacts?limit=50&properties=firstname,lastname,email,phone,company,jobtitle" \\
  -H "Authorization: Bearer ${credentials.hubspotToken || "YOUR_HUBSPOT_TOKEN"}" \\
  -H "Content-Type: application/json"`),
                    "more-fields",
                  )
                }
                isCopied={copiedCode === "more-fields"}
              />
            </div>
          </div>
        </StepCard>

        {/* Step 9: Automate with Python Script */}
        <StepCard
          step={steps[8]}
          status={getStepStatus(9)}
          isExpanded={expandedSteps.has(9)}
          onToggle={() => toggleStep(9)}
          onComplete={() => markStepComplete(9)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Right now, you've done this all manually. To make it happen automatically, you can use a simple script.
            </p>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Simple Python Script</h4>
              <p className="text-sm text-muted-foreground mb-3">
                If you have Python installed on your computer, save this as a file called{" "}
                <code className="text-xs bg-muted px-2 py-1 rounded">sync.py</code>:
              </p>
            </div>

            <CodeBlock
              title="sync.py - Python automation script"
              code={`import requests

# Your codes - REPLACE THESE WITH YOUR ACTUAL CODES
HUBSPOT_CLIENT_ID = "${credentials.hubspotClientId || "YOUR_HUBSPOT_CLIENT_ID"}"
HUBSPOT_CLIENT_SECRET = "${credentials.hubspotClientSecret || "YOUR_HUBSPOT_CLIENT_SECRET"}"
SANA_DOMAIN = "${credentials.sanaDomain || "your-sana-domain"}"
SANA_CLIENT_ID = "${credentials.sanaClientId || "YOUR_SANA_CLIENT_ID"}"
SANA_CLIENT_SECRET = "${credentials.sanaClientSecret || "YOUR_SANA_CLIENT_SECRET"}"

# Step 1: Get HubSpot token
print("Getting HubSpot token...")
hubspot_token_response = requests.post(
    "https://api.hubapi.com/oauth/v1/token",
    data={
        "grant_type": "client_credentials",
        "client_id": HUBSPOT_CLIENT_ID,
        "client_secret": HUBSPOT_CLIENT_SECRET,
        "scope": "crm.objects.contacts.read"
    }
)
hubspot_token = hubspot_token_response.json()["access_token"]
print("✓ Got HubSpot token")

# Step 2: Get Sana token
print("Getting Sana token...")
sana_token_response = requests.post(
    f"https://{SANA_DOMAIN}.sana.ai/api/token",
    data={
        "grant_type": "client_credentials",
        "client_id": SANA_CLIENT_ID,
        "client_secret": SANA_CLIENT_SECRET,
        "scope": "read,write"
    }
)
sana_token = sana_token_response.json()["access_token"]
print("✓ Got Sana token")

# Step 3: Get contacts from HubSpot
print("Getting contacts from HubSpot...")
contacts_response = requests.get(
    "https://api.hubapi.com/crm/v3/objects/contacts?limit=100",
    headers={"Authorization": f"Bearer {hubspot_token}"}
)
contacts = contacts_response.json()["results"]
print(f"✓ Got {len(contacts)} contacts from HubSpot")

# Step 4: Convert to Sana format
sana_users = []
for contact in contacts:
    props = contact["properties"]
    sana_users.append({
        "email": props.get("email", ""),
        "firstName": props.get("firstname", ""),
        "lastName": props.get("lastname", "")
    })

# Step 5: Send to Sana
print("Sending to Sana...")
sana_response = requests.post(
    f"https://{SANA_DOMAIN}.sana.ai/api/v1/users/batch",
    headers={"Authorization": f"Bearer {sana_token}"},
    json={"users": sana_users}
)
print("✓ Done! Users sent to Sana")
print(sana_response.json())`}
              onCopy={() =>
                copyToClipboard(
                  `import requests

# Your codes - REPLACE THESE WITH YOUR ACTUAL CODES
HUBSPOT_CLIENT_ID = "${credentials.hubspotClientId || "YOUR_HUBSPOT_CLIENT_ID"}"
HUBSPOT_CLIENT_SECRET = "${credentials.hubspotClientSecret || "YOUR_HUBSPOT_CLIENT_SECRET"}"
SANA_DOMAIN = "${credentials.sanaDomain || "your-sana-domain"}"
SANA_CLIENT_ID = "${credentials.sanaClientId || "YOUR_SANA_CLIENT_ID"}"
SANA_CLIENT_SECRET = "${credentials.sanaClientSecret || "YOUR_SANA_CLIENT_SECRET"}"

# Step 1: Get HubSpot token
print("Getting HubSpot token...")
hubspot_token_response = requests.post(
    "https://api.hubapi.com/oauth/v1/token",
    data={
        "grant_type": "client_credentials",
        "client_id": HUBSPOT_CLIENT_ID,
        "client_secret": HUBSPOT_CLIENT_SECRET,
        "scope": "crm.objects.contacts.read"
    }
)
hubspot_token = hubspot_token_response.json()["access_token"]
print("✓ Got HubSpot token")

# Step 2: Get Sana token
print("Getting Sana token...")
sana_token_response = requests.post(
    f"https://{SANA_DOMAIN}.sana.ai/api/token",
    data={
        "grant_type": "client_credentials",
        "client_id": SANA_CLIENT_ID,
        "client_secret": SANA_CLIENT_SECRET,
        "scope": "read,write"
    }
)
sana_token = sana_token_response.json()["access_token"]
print("✓ Got Sana token")

# Step 3: Get contacts from HubSpot
print("Getting contacts from HubSpot...")
contacts_response = requests.get(
    "https://api.hubapi.com/crm/v3/objects/contacts?limit=100",
    headers={"Authorization": f"Bearer {hubspot_token}"}
)
contacts = contacts_response.json()["results"]
print(f"✓ Got {len(contacts)} contacts from HubSpot")

# Step 4: Convert to Sana format
sana_users = []
for contact in contacts:
    props = contact["properties"]
    sana_users.append({
        "email": props.get("email", ""),
        "firstName": props.get("firstname", ""),
        "lastName": props.get("lastname", "")
    })

# Step 5: Send to Sana
print("Sending to Sana...")
sana_response = requests.post(
    f"https://{SANA_DOMAIN}.sana.ai/api/v1/users/batch",
    headers={"Authorization": f"Bearer {sana_token}"},
    json={"users": sana_users}
)
print("✓ Done! Users sent to Sana")
print(sana_response.json())`,
                  "python-script",
                )
              }
              isCopied={copiedCode === "python-script"}
              language="python"
            />

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3">How to Use It</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Copy the Python script above</li>
                <li>
                  Save the file as <code className="text-xs bg-muted px-2 py-1 rounded">sync.py</code>
                </li>
                <li>
                  Open command line and type:{" "}
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {os === "windows" ? "python sync.py" : "python3 sync.py"}
                  </code>
                </li>
                <li>You should see checkmarks showing each step completed</li>
              </ol>
            </div>
          </div>
        </StepCard>

        {/* Step 10: Check Python Installation */}
        <StepCard
          step={steps[9]}
          status={getStepStatus(10)}
          isExpanded={expandedSteps.has(10)}
          onToggle={() => toggleStep(10)}
          onComplete={() => markStepComplete(10)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Before you can run the script, you need Python. Let's check if you have it.
            </p>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3">
                Check on {os === "mac" ? "Mac" : os === "windows" ? "Windows" : "Linux"}
              </h4>
              <p className="text-sm mb-3">
                {os === "mac" && "Open Terminal and type:"}
                {os === "windows" && "Open Command Prompt (search for 'cmd') and type:"}
                {os === "linux" && "Open Terminal and type:"}
              </p>
              <CodeBlock
                title={`Check Python version (${os === "windows" ? "Command Prompt" : "Terminal"})`}
                code={os === "windows" ? "python --version" : "python3 --version"}
                onCopy={() =>
                  copyToClipboard(os === "windows" ? "python --version" : "python3 --version", "check-python")
                }
                isCopied={copiedCode === "check-python"}
              />
              <p className="text-sm text-muted-foreground mt-3">
                You'll see something like: <code className="text-xs bg-muted px-2 py-1 rounded">Python 3.9.7</code>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                If you see that, you have Python! If not, continue below.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">Install Python</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Go to{" "}
                  <a
                    href="https://www.python.org/downloads/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    python.org/downloads
                  </a>
                </li>
                <li>
                  Click the big <strong>Download Python</strong> button
                </li>
                {os === "windows" && (
                  <li className="text-yellow-700 dark:text-yellow-500">
                    <strong>IMPORTANT:</strong> When the installer opens, check the box that says "Add Python to PATH"
                  </li>
                )}
                <li>
                  Click <strong>Install Now</strong>
                </li>
                <li>
                  When done, verify with:{" "}
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {os === "windows" ? "python --version" : "python3 --version"}
                  </code>
                </li>
              </ol>
            </div>
          </div>
        </StepCard>

        {/* Step 11: Set Up Automatic Syncing */}
        <StepCard
          step={steps[10]}
          status={getStepStatus(11)}
          isExpanded={expandedSteps.has(11)}
          onToggle={() => toggleStep(11)}
          onComplete={() => markStepComplete(11)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">Now you'll set up your computer to run the sync automatically.</p>

            {os === "windows" && (
              <div className="space-y-4">
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Windows Task Scheduler</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>
                      Search for <strong>Task Scheduler</strong> in Windows search
                    </li>
                    <li>Click to open it</li>
                    <li>
                      On the right side, click <strong>Create Basic Task</strong>
                    </li>
                    <li>Name: "HubSpot to Sana Sync"</li>
                    <li>
                      Choose <strong>Daily</strong> and set the time (example: 2:00 AM)
                    </li>
                    <li>
                      Choose <strong>Start a program</strong>
                    </li>
                    <li>
                      Program/script: <code className="text-xs bg-muted px-2 py-1 rounded">python</code>
                    </li>
                    <li>
                      Add arguments:{" "}
                      <code className="text-xs bg-muted px-2 py-1 rounded">C:\Users\YourName\Documents\sync.py</code>{" "}
                      (your actual path)
                    </li>
                    <li>
                      Click <strong>Finish</strong>
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {os === "mac" && (
              <div className="space-y-4">
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Mac Crontab</h4>
                  <p className="text-sm mb-3">Open Terminal and type:</p>
                  <CodeBlock
                    title="Open crontab editor"
                    code="crontab -e"
                    onCopy={() => copyToClipboard("crontab -e", "crontab-open")}
                    isCopied={copiedCode === "crontab-open"}
                  />
                  <p className="text-sm mt-3 mb-2">Add this line at the bottom:</p>
                  <CodeBlock
                    title="Schedule sync at 2 AM daily"
                    code="0 2 * * * /usr/bin/python3 /Users/YourName/Documents/sync.py"
                    onCopy={() =>
                      copyToClipboard("0 2 * * * /usr/bin/python3 /Users/YourName/Documents/sync.py", "crontab-line")
                    }
                    isCopied={copiedCode === "crontab-line"}
                  />
                  <p className="text-sm text-muted-foreground mt-3">
                    Replace the path with your actual sync.py location. Press Control + X, then Y, then Enter to save.
                  </p>
                </div>
              </div>
            )}

            {os === "linux" && (
              <div className="space-y-4">
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Linux Systemd Timer</h4>
                  <p className="text-sm mb-3">Create a service file:</p>
                  <CodeBlock
                    title="Create service file"
                    code="sudo nano /etc/systemd/system/hubspot-sana-sync.service"
                    onCopy={() =>
                      copyToClipboard("sudo nano /etc/systemd/system/hubspot-sana-sync.service", "systemd-service")
                    }
                    isCopied={copiedCode === "systemd-service"}
                  />
                  <p className="text-sm mt-3 mb-2">Then enable the timer:</p>
                  <CodeBlock
                    title="Enable and start the timer"
                    code={`sudo systemctl daemon-reload
sudo systemctl enable hubspot-sana-sync.timer
sudo systemctl start hubspot-sana-sync.timer`}
                    onCopy={() =>
                      copyToClipboard(
                        `sudo systemctl daemon-reload
sudo systemctl enable hubspot-sana-sync.timer
sudo systemctl start hubspot-sana-sync.timer`,
                        "systemd-enable",
                      )
                    }
                    isCopied={copiedCode === "systemd-enable"}
                  />
                </div>
              </div>
            )}

            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">🎉 You're All Set!</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your system will now sync automatically. You can manually test it by running:{" "}
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {os === "windows" ? "python sync.py" : "python3 sync.py"}
                </code>
              </p>
            </div>
          </div>
        </StepCard>
      </main>
    </div>
  )
}
