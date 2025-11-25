"use client"

import { useState } from "react"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SharepointToSanaProps {
  onBack: () => void
}

export default function SharepointToSana({ onBack }: SharepointToSanaProps) {
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
          <h1 className="text-4xl font-serif mb-4">Connect SharePoint to Sana</h1>
          <p className="text-lg text-muted-foreground">
            Search and access your SharePoint sites and document libraries directly from Sana. This native integration
            connects in just a few steps.
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
                  <p>Log in to Sana with admin permissions</p>
                  <p>Navigate to Settings → Integrations</p>
                  <p>Find SharePoint in the list of available native integrations</p>
                  <p>Click Connect or Set Up next to SharePoint</p>
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
                  <h3 className="text-xl font-semibold">Authorize Sana in Microsoft 365</h3>
                  <Badge className="bg-[#0078D4] text-white">MICROSOFT</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>You'll be redirected to Microsoft's authorization page</p>
                  <p>Sign in with your organizational account</p>
                  <p>Review the permissions Sana is requesting (including access to SharePoint sites)</p>
                  <p>Click Accept to authorize the connection</p>
                  <a
                    href="https://www.office.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#0078D4] hover:underline mt-2"
                  >
                    Go to Microsoft 365 <ExternalLink className="w-4 h-4" />
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
                  <h3 className="text-xl font-semibold">Select SharePoint Sites</h3>
                  <Badge className="bg-[#8B5CF6] text-white">⚫ SANA</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>Return to Sana after authorization</p>
                  <p>You'll see a list of SharePoint sites available in your organization</p>
                  <p>Select which sites you want Sana to access</p>
                  <p>Click Confirm or Save to complete the selection</p>
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
                  <p>Search for documents or content from your selected SharePoint sites</p>
                  <p>You should see files and pages from SharePoint in search results</p>
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
                <span>Search across all documents in your connected SharePoint sites</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B5CF6] mt-1">✓</span>
                <span>Access SharePoint files and pages in search results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B5CF6] mt-1">✓</span>
                <span>Find and reference documents without leaving Sana</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B5CF6] mt-1">✓</span>
                <span>Keep team documents organized and searchable</span>
              </li>
            </ul>
          </Card>

          {/* Troubleshooting */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Troubleshooting</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">SharePoint sites not appearing?</p>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Ensure you selected the correct sites during setup</li>
                  <li>• Verify you have the appropriate permissions in SharePoint</li>
                  <li>• Check that the integration has admin consent in your Microsoft 365 environment</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Can't find SharePoint documents in search?</p>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Make sure the sites you need are included in your connected sites</li>
                  <li>• Verify the documents aren't restricted to specific users</li>
                  <li>• Try refreshing the connection in Settings</li>
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
