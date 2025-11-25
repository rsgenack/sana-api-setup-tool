"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

type OS = "mac" | "windows" | "linux"

export default function ZendeskToSana({ onBack, os }: { onBack: () => void; os: OS }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Zendesk → Sana Setup</h1>
              <p className="text-muted-foreground mt-2">
                Coming soon • {os === "mac" ? "macOS" : os === "windows" ? "Windows" : "Linux"} instructions
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <p className="text-muted-foreground">This flow will be available soon.</p>
      </main>
    </div>
  )
}
