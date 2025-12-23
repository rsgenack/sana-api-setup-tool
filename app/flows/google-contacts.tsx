"use client"

import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface GoogleContactsProps {
  onBack: () => void
}

export default function GoogleContacts({ onBack }: GoogleContactsProps) {
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
          <Badge className="bg-[#FBBC04] text-black mb-4">People API</Badge>
          <h1 className="text-4xl font-bold mb-4">Google Contacts API Setup</h1>
          <p className="text-lg text-muted-foreground">
            Access and manage contact information. Coming soon - detailed setup instructions.
          </p>
        </div>
      </main>
    </div>
  )
}
