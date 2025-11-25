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
  sanaClientId: string
  sanaClientSecret: string
  sanaToken: string
  sanaDomain: string
  hubspotClientId: string
  hubspotClientSecret: string
  hubspotToken: string
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

interface SanaToHubSpotProps {
  onBack: () => void
  os: OS
}

export default function SanaToHubSpot({ onBack, os }: SanaToHubSpotProps) {
  const [credentials, setCredentials] = useState<ApiCredentials>({
    sanaClientId: "",
    sanaClientSecret: "",
    sanaToken: "",
    sanaDomain: "",
    hubspotClientId: "",
    hubspotClientSecret: "",
    hubspotToken: "",
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
    if (nextStep <= 8) {
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
      return command.replace(/\\\n/g, "^\n")
    }
    return command
  }

  const getHubSpotAuthUrl = () => {
    return `https://app.hubspot.com/oauth/authorize?client_id=${credentials.hubspotClientId || "YOUR_HUBSPOT_CLIENT_ID"}&scope=crm.objects.contacts.write,crm.objects.companies.write&redirect_uri=https://${credentials.sanaDomain || "your-sana-domain"}.sana.ai/integrations/callback`
  }

  const getSanaTokenCommand = () => {
    const command = `curl "https://${credentials.sanaDomain || "your-sana-domain"}.sana.ai/api/token" \\
  -X POST \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=client_credentials&client_id=${credentials.sanaClientId || "YOUR_SANA_CLIENT_ID"}&client_secret=${credentials.sanaClientSecret || "YOUR_SANA_CLIENT_SECRET"}&scope=read"`
    return formatCommand(command)
  }

  const getHubSpotTokenCommand = () => {
    const command = `curl "https://api.hubapi.com/oauth/v1/token" \\
  -X POST \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=client_credentials&client_id=${credentials.hubspotClientId || "YOUR_HUBSPOT_CLIENT_ID"}&client_secret=${credentials.hubspotClientSecret || "YOUR_HUBSPOT_CLIENT_SECRET"}&scope=crm.objects.contacts.write"`
    return formatCommand(command)
  }

  const getSanaUsersCommand = () => {
    const command = `curl "https://${credentials.sanaDomain || "your-sana-domain"}.sana.ai/api/v1/users?limit=50" \\
  -H "Authorization: Bearer ${credentials.sanaToken || "YOUR_SANA_TOKEN"}" \\
  -H "Content-Type: application/json"`
    return formatCommand(command)
  }

  const getHubSpotUploadCommand = () => {
    const command = `curl "https://api.hubapi.com/crm/v3/objects/contacts" \\
  -X POST \\
  -H "Authorization: Bearer ${credentials.hubspotToken || "YOUR_HUBSPOT_TOKEN"}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "properties": {
      "email": "john@example.com",
      "firstname": "John",
      "lastname": "Doe"
    }
  }'`
    return formatCommand(command)
  }

  const steps = [
    {
      number: 1,
      title: "Create App in Sana",
      platform: "sana" as const,
      description: "Get API credentials from Sana",
    },
    {
      number: 2,
      title: "Create App in HubSpot",
      platform: "hubspot" as const,
      description: "Setup HubSpot API client",
    },
    {
      number: 3,
      title: "Set Redirect URL in HubSpot",
      platform: "hubspot" as const,
      description: "Configure OAuth callback URL",
    },
    {
      number: 4,
      title: "Get Permission from HubSpot",
      platform: "hubspot" as const,
      description: "Grant data write permissions",
    },
    {
      number: 5,
      title: "Get Access Tokens",
      platform: "terminal" as const,
      description: "Generate Sana and HubSpot tokens",
    },
    {
      number: 6,
      title: "Get User Data from Sana",
      platform: "terminal" as const,
      description: "Retrieve user information",
    },
    {
      number: 7,
      title: "Send User Data to HubSpot",
      platform: "terminal" as const,
      description: "Upload users as contacts to HubSpot",
    },
    {
      number: 8,
      title: "Automate with Python Script",
      platform: "terminal" as const,
      description: "Create automated sync script",
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
                <h1 className="text-3xl font-bold tracking-tight">Sana → HubSpot Setup</h1>
                <p className="text-muted-foreground mt-2">
                  Connect Sana (where your learning data lives) to HubSpot (where you want that info to appear) •{" "}
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
        {/* Step 1: Create App in Sana */}
        <StepCard
          step={steps[0]}
          status={getStepStatus(1)}
          isExpanded={expandedSteps.has(1)}
          onToggle={() => toggleStep(1)}
          onComplete={() => markStepComplete(1)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This step happens entirely in Sana. You're creating an "app" that gives permission to read your user data
              and send it to HubSpot.
            </p>

            <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/30 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-[#7C3AED]">
                <ExternalLink className="w-4 h-4" />
                What To Do (In Sana)
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Log into Sana with admin rights</li>
                <li>Go to Settings</li>
                <li>Find and click API (or "Manage API" or "API Clients")</li>
                <li>Click Create New API Client or New Client button</li>
                <li>Fill in Client Name: "HubSpot Export" (or whatever you want to call it)</li>
                <li>Description: "Export user data to HubSpot"</li>
                <li>Click Create</li>
              </ol>
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="font-semibold">Save Your Sana Codes</h4>
              <p className="text-sm text-muted-foreground">
                After creating the app, you'll see two important codes. The Client Secret only shows once, so copy it
                immediately!
              </p>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="sana-domain">Sana Domain</Label>
                  <Input
                    id="sana-domain"
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

        {/* Step 2: Create App in HubSpot */}
        <StepCard
          step={steps[1]}
          status={getStepStatus(2)}
          isExpanded={expandedSteps.has(2)}
          onToggle={() => toggleStep(2)}
          onComplete={() => markStepComplete(2)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Now switch to HubSpot. You're creating an app that can write contact data into HubSpot.
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
                <li>Log in (create a free developer account if needed)</li>
                <li>Click Create an app</li>
                <li>App name: "Sana Data Import"</li>
                <li>Description: "Import user data from Sana"</li>
                <li>Click Create</li>
              </ol>
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="font-semibold">Save Your HubSpot Codes</h4>
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

        {/* Step 3: Set Redirect URL */}
        <StepCard
          step={steps[2]}
          status={getStepStatus(3)}
          isExpanded={expandedSteps.has(3)}
          onToggle={() => toggleStep(3)}
          onComplete={() => markStepComplete(3)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">Configure where HubSpot should send OAuth responses.</p>

            <div className="bg-[#FF7A59]/10 border border-[#FF7A59]/30 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-[#FF7A59]">Instructions</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Still in HubSpot, look for Auth or Settings</li>
                <li>Find Redirect URLs</li>
                <li>Copy and paste the URL below</li>
                <li>Click Save</li>
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
              HubSpot needs to know what data your app is allowed to write. You'll grant permission by visiting a
              special URL.
            </p>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="space-y-3">
                <Label className="text-xs text-muted-foreground">Copy this URL and paste it into your browser:</Label>
                <code className="block text-xs break-all p-3 bg-background rounded border">{getHubSpotAuthUrl()}</code>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(getHubSpotAuthUrl(), "auth-url")}
                    className="flex-1"
                  >
                    {copiedCode === "auth-url" ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy URL
                      </>
                    )}
                  </Button>
                  <Button size="sm" variant="default" asChild>
                    <a href={getHubSpotAuthUrl()} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Browser
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-[#FF7A59]/10 border border-[#FF7A59]/30 rounded-lg p-4">
              <p className="text-sm">HubSpot will ask: "Do you want to let this app write contacts?" Click Allow</p>
            </div>
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
              Both systems use "tokens"—temporary passwords that let them talk to each other. Open your{" "}
              {os === "windows" ? "Command Prompt or PowerShell" : "Terminal"} to get these tokens.
            </p>

            <div>
              <h4 className="font-semibold mb-3">Getting a Sana Token</h4>
              <CodeBlock
                title={`Run in ${os === "windows" ? "Command Prompt" : "Terminal"}`}
                code={getSanaTokenCommand()}
                onCopy={() => copyToClipboard(getSanaTokenCommand(), "sana-token-cmd")}
                isCopied={copiedCode === "sana-token-cmd"}
              />
              <div className="mt-4">
                <Label htmlFor="sana-token">Sana Access Token (from response)</Label>
                <Input
                  id="sana-token"
                  type="password"
                  placeholder="eyJhbGc..."
                  value={credentials.sanaToken}
                  onChange={(e) => setCredentials({ ...credentials, sanaToken: e.target.value })}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">Copy the "access_token" value from the response</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Getting a HubSpot Token</h4>
              <CodeBlock
                title={`Run in ${os === "windows" ? "Command Prompt" : "Terminal"}`}
                code={getHubSpotTokenCommand()}
                onCopy={() => copyToClipboard(getHubSpotTokenCommand(), "hubspot-token-cmd")}
                isCopied={copiedCode === "hubspot-token-cmd"}
              />
              <div className="mt-4">
                <Label htmlFor="hubspot-token">HubSpot Access Token (from response)</Label>
                <Input
                  id="hubspot-token"
                  type="password"
                  placeholder="pat-na1-..."
                  value={credentials.hubspotToken}
                  onChange={(e) => setCredentials({ ...credentials, hubspotToken: e.target.value })}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">Copy the "access_token" value from the response</p>
              </div>
            </div>
          </div>
        </StepCard>

        {/* Step 6: Get User Data from Sana */}
        <StepCard
          step={steps[5]}
          status={getStepStatus(6)}
          isExpanded={expandedSteps.has(6)}
          onToggle={() => toggleStep(6)}
          onComplete={() => markStepComplete(6)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">Retrieve your user list from Sana to see what data you have.</p>

            <CodeBlock
              title={`Run in ${os === "windows" ? "Command Prompt" : "Terminal"}`}
              code={getSanaUsersCommand()}
              onCopy={() => copyToClipboard(getSanaUsersCommand(), "sana-users-cmd")}
              isCopied={copiedCode === "sana-users-cmd"}
            />

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-sm">Expected Response:</h4>
              <pre className="text-xs overflow-x-auto">
                {`{
  "users": [
    {
      "id": "user123",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </StepCard>

        {/* Step 7: Send User Data to HubSpot */}
        <StepCard
          step={steps[6]}
          status={getStepStatus(7)}
          isExpanded={expandedSteps.has(7)}
          onToggle={() => toggleStep(7)}
          onComplete={() => markStepComplete(7)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Now send your user data to HubSpot as contacts. This example shows how to create one contact.
            </p>

            <CodeBlock
              title={`Run in ${os === "windows" ? "Command Prompt" : "Terminal"}`}
              code={getHubSpotUploadCommand()}
              onCopy={() => copyToClipboard(getHubSpotUploadCommand(), "hubspot-upload-cmd")}
              isCopied={copiedCode === "hubspot-upload-cmd"}
            />

            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
              <p className="text-sm text-green-900 dark:text-green-100">
                ✓ If successful, you'll see a response with the created contact details. Check your HubSpot account to
                verify the contact was added!
              </p>
            </div>
          </div>
        </StepCard>

        {/* Step 8: Automate with Python */}
        <StepCard
          step={steps[7]}
          status={getStepStatus(8)}
          isExpanded={expandedSteps.has(8)}
          onToggle={() => toggleStep(8)}
          onComplete={() => markStepComplete(8)}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Create a Python script to automate the sync process. This will fetch all users from Sana and create them
              as contacts in HubSpot.
            </p>

            <CodeBlock
              title="sync-sana-to-hubspot.py"
              code={`import requests

# Your codes - REPLACE THESE
SANA_CLIENT_ID = "${credentials.sanaClientId || "YOUR_SANA_CLIENT_ID"}"
SANA_CLIENT_SECRET = "${credentials.sanaClientSecret || "YOUR_SANA_CLIENT_SECRET"}"
SANA_DOMAIN = "${credentials.sanaDomain || "your-sana-domain"}"
HUBSPOT_CLIENT_ID = "${credentials.hubspotClientId || "YOUR_HUBSPOT_CLIENT_ID"}"
HUBSPOT_CLIENT_SECRET = "${credentials.hubspotClientSecret || "YOUR_HUBSPOT_CLIENT_SECRET"}"

# Step 1: Get Sana token
print("Getting Sana token...")
sana_token_response = requests.post(
    f"https://{SANA_DOMAIN}.sana.ai/api/token",
    data={
        "grant_type": "client_credentials",
        "client_id": SANA_CLIENT_ID,
        "client_secret": SANA_CLIENT_SECRET,
        "scope": "read"
    }
)
sana_token = sana_token_response.json()["access_token"]
print("✓ Got Sana token")

# Step 2: Get HubSpot token
print("Getting HubSpot token...")
hubspot_token_response = requests.post(
    "https://api.hubapi.com/oauth/v1/token",
    data={
        "grant_type": "client_credentials",
        "client_id": HUBSPOT_CLIENT_ID,
        "client_secret": HUBSPOT_CLIENT_SECRET,
        "scope": "crm.objects.contacts.write"
    }
)
hubspot_token = hubspot_token_response.json()["access_token"]
print("✓ Got HubSpot token")

# Step 3: Get users from Sana
print("Getting users from Sana...")
users_response = requests.get(
    f"https://{SANA_DOMAIN}.sana.ai/api/v1/users?limit=100",
    headers={"Authorization": f"Bearer {sana_token}"}
)
users = users_response.json()["users"]
print(f"✓ Got {len(users)} users from Sana")

# Step 4: Send to HubSpot
print("Sending to HubSpot...")
for user in users:
    hubspot_response = requests.post(
        "https://api.hubapi.com/crm/v3/objects/contacts",
        headers={"Authorization": f"Bearer {hubspot_token}"},
        json={
            "properties": {
                "email": user.get("email", ""),
                "firstname": user.get("firstName", ""),
                "lastname": user.get("lastName", "")
            }
        }
    )
    if hubspot_response.status_code == 201:
        print(f"✓ Created contact: {user.get('email')}")
    else:
        print(f"✗ Failed to create: {user.get('email')}")

print("✓ Done! Users sent to HubSpot")`}
              onCopy={() =>
                copyToClipboard(
                  `import requests

# Your codes - REPLACE THESE
SANA_CLIENT_ID = "${credentials.sanaClientId || "YOUR_SANA_CLIENT_ID"}"
SANA_CLIENT_SECRET = "${credentials.sanaClientSecret || "YOUR_SANA_CLIENT_SECRET"}"
SANA_DOMAIN = "${credentials.sanaDomain || "your-sana-domain"}"
HUBSPOT_CLIENT_ID = "${credentials.hubspotClientId || "YOUR_HUBSPOT_CLIENT_ID"}"
HUBSPOT_CLIENT_SECRET = "${credentials.hubspotClientSecret || "YOUR_HUBSPOT_CLIENT_SECRET"}"

# ... rest of the script`,
                  "python-script",
                )
              }
              isCopied={copiedCode === "python-script"}
              language="python"
            />

            <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/30 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-[#7C3AED]">How to Use</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Copy the script above</li>
                <li>Save it as sync-sana-to-hubspot.py</li>
                <li>Replace the codes at the top with your actual credentials</li>
                <li>
                  Run: <code className="bg-muted px-2 py-1 rounded">python sync-sana-to-hubspot.py</code>
                </li>
              </ol>
            </div>
          </div>
        </StepCard>
      </main>
    </div>
  )
}
