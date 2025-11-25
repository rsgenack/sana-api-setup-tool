"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react"

type OS = "mac" | "windows" | "linux"

export default function SanaToZendesk({ onBack, os }: { onBack: () => void; os: OS }) {
  const [credentials, setCredentials] = useState({
    sanaClientId: "",
    sanaClientSecret: "",
    sanaDomain: "",
    sanaToken: "",
    zendeskDomain: "",
    zendeskEmail: "",
    zendeskApiToken: "",
  })

  const [expandedStep, setExpandedStep] = useState<number | null>(1)
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStates({ ...copiedStates, [key]: true })
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [key]: false })
    }, 2000)
  }

  const completedSteps = Object.values(credentials).filter(Boolean).length
  const totalFields = Object.keys(credentials).length
  const progress = (completedSteps / totalFields) * 100

  const terminalName = os === "windows" ? "Command Prompt or PowerShell" : "Terminal"
  const lineBreak = os === "windows" ? "^" : "\\"

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Sana → Zendesk Setup</h1>
              <p className="text-muted-foreground mt-2">
                Export Sana data to Zendesk support system •{" "}
                {os === "mac" ? "macOS" : os === "windows" ? "Windows" : "Linux"}
              </p>
            </div>
          </div>

          <Card className="p-4 mt-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">Setup Progress</h2>
                <Progress value={progress} className="h-2" />
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {completedSteps} of {totalFields} fields
                </p>
              </div>
            </div>
          </Card>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
        {/* Step 1: Create App in Sana */}
        <Card className="overflow-hidden border-purple-500/20">
          <button
            onClick={() => setExpandedStep(expandedStep === 1 ? null : 1)}
            className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Create App in Sana</h3>
                  <Badge className="mt-1 bg-black hover:bg-purple-600">Sana</Badge>
                </div>
              </div>
              {expandedStep === 1 ? <ChevronDown /> : <ChevronRight />}
            </div>
          </button>

          {expandedStep === 1 && (
            <div className="p-6 pt-0 space-y-4 border-t">
              <p className="text-muted-foreground">
                This step happens entirely in Sana. You're creating an app that gives permission for your script to read
                your Sana data.
              </p>

              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold">What To Do (In Sana)</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Log into Sana with admin rights</li>
                  <li>
                    Go to <strong>Settings</strong>
                  </li>
                  <li>
                    Find and click <strong>API</strong> (or "Manage API" or "API Clients")
                  </li>
                  <li>
                    Click <strong>Create New API Client</strong> or <strong>New Client</strong> button
                  </li>
                  <li>
                    Fill in: Client Name: "Sana to Zendesk Sync", Description: "So I can export user data from Sana to
                    Zendesk"
                  </li>
                  <li>
                    Click <strong>Create</strong>
                  </li>
                </ol>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-500">⚠️ IMPORTANT</p>
                <p className="text-sm mt-1">
                  The Client Secret only shows once. Copy it immediately or you'll have to create a new client.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="sanaDomain">Sana Domain (e.g., "acme" from acme.sana.ai)</Label>
                  <Input
                    id="sanaDomain"
                    type="text"
                    placeholder="acme"
                    value={credentials.sanaDomain}
                    onChange={(e) => setCredentials({ ...credentials, sanaDomain: e.target.value })}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Stored locally in your browser only</p>
                </div>

                <div>
                  <Label htmlFor="sanaClientId">Sana Client ID</Label>
                  <Input
                    id="sanaClientId"
                    type="password"
                    placeholder="sana-client-123456"
                    value={credentials.sanaClientId}
                    onChange={(e) => setCredentials({ ...credentials, sanaClientId: e.target.value })}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Stored locally in your browser only</p>
                </div>

                <div>
                  <Label htmlFor="sanaClientSecret">Sana Client Secret</Label>
                  <Input
                    id="sanaClientSecret"
                    type="password"
                    placeholder="sana-secret-abcdef"
                    value={credentials.sanaClientSecret}
                    onChange={(e) => setCredentials({ ...credentials, sanaClientSecret: e.target.value })}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Stored locally in your browser only</p>
                </div>
              </div>

              <Button onClick={() => setExpandedStep(2)} className="w-full">
                Next: Get Zendesk API Access
              </Button>
            </div>
          )}
        </Card>

        {/* Step 2: Get Zendesk API Access */}
        <Card className="overflow-hidden border-[#03363d]/20">
          <button
            onClick={() => setExpandedStep(expandedStep === 2 ? null : 2)}
            className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#03363d] text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Get Zendesk API Access</h3>
                  <Badge className="mt-1 bg-[#03363d] hover:bg-[#037f52]">Zendesk</Badge>
                </div>
              </div>
              {expandedStep === 2 ? <ChevronDown /> : <ChevronRight />}
            </div>
          </button>

          {expandedStep === 2 && (
            <div className="p-6 pt-0 space-y-4 border-t">
              <p className="text-muted-foreground">
                Now you're going to get your Zendesk API credentials set up to receive data from Sana.
              </p>

              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold">What To Do (In Zendesk)</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>
                    Go to{" "}
                    <a
                      href="https://zendesk.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#03363d] underline"
                    >
                      zendesk.com
                    </a>{" "}
                    and log in with admin rights
                  </li>
                  <li>
                    Click your profile icon (top right) and go to <strong>Admin</strong>
                  </li>
                  <li>
                    In the left sidebar, go to <strong>Apps and integrations → APIs → Connections</strong>
                  </li>
                  <li>
                    Look for an existing API token or click <strong>Create API Token</strong>
                  </li>
                  <li>If creating new, give it a name like "Sana Integration"</li>
                  <li>Copy the token that appears</li>
                </ol>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="zendeskDomain">Zendesk Domain (e.g., "acme" from acme.zendesk.com)</Label>
                  <Input
                    id="zendeskDomain"
                    type="text"
                    placeholder="acme"
                    value={credentials.zendeskDomain}
                    onChange={(e) => setCredentials({ ...credentials, zendeskDomain: e.target.value })}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Stored locally in your browser only</p>
                </div>

                <div>
                  <Label htmlFor="zendeskEmail">Zendesk Admin Email</Label>
                  <Input
                    id="zendeskEmail"
                    type="email"
                    placeholder="admin@company.com"
                    value={credentials.zendeskEmail}
                    onChange={(e) => setCredentials({ ...credentials, zendeskEmail: e.target.value })}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Stored locally in your browser only</p>
                </div>

                <div>
                  <Label htmlFor="zendeskApiToken">Zendesk API Token</Label>
                  <Input
                    id="zendeskApiToken"
                    type="password"
                    placeholder="Your Zendesk API token"
                    value={credentials.zendeskApiToken}
                    onChange={(e) => setCredentials({ ...credentials, zendeskApiToken: e.target.value })}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Stored locally in your browser only</p>
                </div>
              </div>

              <Button onClick={() => setExpandedStep(3)} className="w-full bg-[#03363d] hover:bg-[#037f52]">
                Next: Prepare Tokens
              </Button>
            </div>
          )}
        </Card>

        {/* Additional steps continue following the guide structure... */}
      </main>
    </div>
  )
}
