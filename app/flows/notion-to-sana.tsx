"use client"

import { useState } from "react"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NotionToSanaProps {
  onBack: () => void
}

export default function NotionToSana({ onBack }: NotionToSanaProps) {
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
            <div className="text-xl font-serif">Sana</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-black text-white">Native Integration</Badge>
            <span className="text-sm text-muted-foreground">No coding required</span>
          </div>
          <h1 className="text-4xl font-serif mb-4">Connect Notion to Sana</h1>
          <p className="text-lg text-muted-foreground">
            Enable seamless access to your Notion workspace content directly within Sana. This native integration
            requires just a few clicks to set up.
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">Access Integration Settings</h3>
                  <Badge className="bg-[#8B5CF6] text-white">⚫ SANA</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>Log in to your Sana account with admin permissions</p>
                  <p>Navigate to Settings → Integrations</p>
                  <p>Find Notion in the list of available native integrations</p>
                  <p>Click Connect or Set Up next to Notion</p>
                  <a
                    href="https://app.sana.ai/settings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#8B5CF6] hover:underline mt-2"
                  >
                    Open Sana Settings <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">Authorize Sana in Notion</h3>
                  <Badge className="bg-black text-white">NOTION</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>You'll be redirected to Notion's authorization page</p>
                  <p>Select the Notion workspace you want to connect</p>
                  <p>Review the permissions Sana is requesting</p>
                  <p>Click Allow access to authorize the connection</p>
                  <a
                    href="https://www.notion.so/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-black hover:underline mt-2"
                  >
                    Go to Notion <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">Configure Your Integration</h3>
                  <Badge className="bg-black text-white">NOTION</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>Return to Sana after authorization - your Notion workspace is now connected</p>
                  <p>Grant Sana access to specific pages and databases by sharing them with the Sana integration</p>
                  <p>In Notion, click Share on any page or database and add the Sana integration user</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 4 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                4
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">Verify the Connection</h3>
                  <Badge className="bg-[#8B5CF6] text-white">⚫ SANA</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>Go to the search bar in Sana</p>
                  <p>Search for content from your Notion workspace</p>
                  <p>You should see Notion databases and pages appearing in search results</p>
                </div>
              </div>
            </div>
          </Card>

          {/* What You Can Do Now */}
          <Card className="p-6 bg-gradient-to-br from-[#8B5CF6]/5 to-[#8B5CF6]/10 border-[#8B5CF6]/20">
            <h3 className="text-xl font-semibold mb-4">What You Can Do Now</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#8B5CF6] mt-1">✓</span>
                <span>Search across all shared Notion content from Sana</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B5CF6] mt-1">✓</span>
                <span>Access Notion pages and database entries in search results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B5CF6] mt-1">✓</span>
                <span>Reference Notion information in your Sana workflows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B5CF6] mt-1">✓</span>
                <span>Keep your knowledge base accessible without switching applications</span>
              </li>
            </ul>
          </Card>

          {/* Troubleshooting */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Troubleshooting</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">Connection not appearing in Sana?</p>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Ensure you've completed all authorization steps in Notion</li>
                  <li>• Verify you have admin permissions in your Notion workspace</li>
                  <li>• Try disconnecting and reconnecting the integration</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Can't find Notion content in search?</p>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Make sure the Sana integration has been shared with your Notion pages and databases</li>
                  <li>• Check that shared items are set to allow the integration access</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Need Help */}
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Need additional assistance?</p>
            <a
              href="https://help.sana.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B5CF6] hover:underline font-medium"
            >
              Contact Sana Support
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
