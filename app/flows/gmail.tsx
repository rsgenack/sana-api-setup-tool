"use client"

import { useState } from "react"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GmailProps {
  onBack: () => void
  os: "mac" | "windows" | "linux"
}

export default function Gmail({ onBack, os }: GmailProps) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStates({ ...copiedStates, [id]: true })
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [id]: false })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to integrations
            </button>
            <div className="text-xl font-bold">Google API Setup</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-[#EA4335] text-white">Gmail API</Badge>
            <span className="text-sm text-muted-foreground">OAuth 2.0 required</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Gmail API Setup</h1>
          <p className="text-lg text-muted-foreground">
            Read, send, and manage Gmail messages programmatically. Follow this guide to set up OAuth 2.0 and start
            integrating Gmail into your application.
          </p>
        </div>

        <div className="space-y-6">
          {/* Setup steps similar to Drive but Gmail-specific */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EA4335] text-white flex items-center justify-center font-semibold">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">Enable Gmail API</h3>
                  <Badge className="bg-[#EA4335] text-white">GOOGLE CLOUD</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>Follow the same project creation steps as Google Drive</p>
                  <p>In the API Library, search for "Gmail API"</p>
                  <p>Click Enable on the Gmail API</p>
                  <a
                    href="https://console.cloud.google.com/apis/library/gmail.googleapis.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#EA4335] hover:underline mt-2"
                  >
                    Enable Gmail API <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#EA4335]/5 to-[#EA4335]/10 border-[#EA4335]/20">
            <h3 className="text-xl font-semibold mb-4">Common Operations</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#EA4335] mt-1">✓</span>
                <span>List messages: service.users().messages().list(userId='me')</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EA4335] mt-1">✓</span>
                <span>Get message: service.users().messages().get(userId='me', id=msg_id)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EA4335] mt-1">✓</span>
                <span>Send message: service.users().messages().send(userId='me', body=message)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EA4335] mt-1">✓</span>
                <span>Search: service.users().messages().list(userId='me', q='from:example@gmail.com')</span>
              </li>
            </ul>
          </Card>

          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Need additional assistance?</p>
            <a
              href="https://developers.google.com/gmail/api/guides"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EA4335] hover:underline font-medium"
            >
              View Official Documentation
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
