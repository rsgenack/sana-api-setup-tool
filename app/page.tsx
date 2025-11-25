"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ArrowRight, Monitor, Apple } from "lucide-react"
import HubspotToSana from "./flows/hubspot-to-sana"
import SanaToHubspot from "./flows/sana-to-hubspot"
import ZendeskToSana from "./flows/zendesk-to-sana"
import SanaToZendesk from "./flows/sana-to-zendesk"
import NotionToSana from "./flows/notion-to-sana"
import SharepointToSana from "./flows/sharepoint-to-sana"
import OutlookToSana from "./flows/outlook-to-sana"
import AirtableToSana from "./flows/airtable-to-sana"

type OS = "mac" | "windows" | "linux"
type IntegrationType =
  | "hubspot-to-sana"
  | "sana-to-hubspot"
  | "zendesk-to-sana"
  | "sana-to-zendesk"
  | "notion-to-sana"
  | "sharepoint-to-sana"
  | "outlook-to-sana"
  | "airtable-to-sana"

export default function Home() {
  const [selectedFlow, setSelectedFlow] = useState<IntegrationType | null>(null)
  const [selectedOS, setSelectedOS] = useState<OS>("mac")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [selectedFlow])

  const customApiFlows = [
    {
      id: "hubspot-to-sana" as IntegrationType,
      title: "HubSpot → Sana",
      description: "Sync contacts, companies, and deals from HubSpot to Sana",
      bgColor: "bg-white",
      textColor: "text-black",
      accentColor: "bg-[#8B5CF6]",
      buttonTextColor: "text-white",
      borderColor: "border-border",
    },
    {
      id: "sana-to-hubspot" as IntegrationType,
      title: "Sana → HubSpot",
      description: "Push learning data and user progress from Sana to HubSpot",
      bgColor: "bg-white",
      textColor: "text-black",
      accentColor: "bg-[#F57722]",
      buttonTextColor: "text-white",
      borderColor: "border-border",
    },
    {
      id: "zendesk-to-sana" as IntegrationType,
      title: "Zendesk → Sana",
      description: "Import support tickets and agent data from Zendesk to Sana",
      bgColor: "bg-white",
      textColor: "text-black",
      accentColor: "bg-[#8B5CF6]",
      buttonTextColor: "text-white",
      borderColor: "border-border",
    },
    {
      id: "sana-to-zendesk" as IntegrationType,
      title: "Sana → Zendesk",
      description: "Export training completion and user knowledge to Zendesk",
      bgColor: "bg-white",
      textColor: "text-black",
      accentColor: "bg-[#03363d]",
      buttonTextColor: "text-white",
      borderColor: "border-border",
    },
  ]

  const nativeIntegrations = [
    {
      id: "notion-to-sana" as IntegrationType,
      title: "Notion",
      description: "Search and access your Notion workspace content from Sana",
      bgColor: "bg-white",
      textColor: "text-black",
      accentColor: "bg-black",
      buttonTextColor: "text-white",
      borderColor: "border-border",
    },
    {
      id: "sharepoint-to-sana" as IntegrationType,
      title: "SharePoint",
      description: "Connect SharePoint document libraries and sites to Sana",
      bgColor: "bg-white",
      textColor: "text-black",
      accentColor: "bg-[#0078D4]",
      buttonTextColor: "text-white",
      borderColor: "border-border",
    },
    {
      id: "outlook-to-sana" as IntegrationType,
      title: "Outlook Calendar",
      description: "View and reference calendar events directly in Sana",
      bgColor: "bg-white",
      textColor: "text-black",
      accentColor: "bg-[#0072C6]",
      buttonTextColor: "text-white",
      borderColor: "border-border",
    },
    {
      id: "airtable-to-sana" as IntegrationType,
      title: "Airtable",
      description: "Access Airtable bases and records within Sana search",
      bgColor: "bg-white",
      textColor: "text-black",
      accentColor: "bg-[#FCB400]",
      buttonTextColor: "text-black",
      borderColor: "border-border",
    },
  ]

  if (selectedFlow === "hubspot-to-sana") {
    return <HubspotToSana onBack={() => setSelectedFlow(null)} os={selectedOS} />
  }
  if (selectedFlow === "sana-to-hubspot") {
    return <SanaToHubspot onBack={() => setSelectedFlow(null)} os={selectedOS} />
  }
  if (selectedFlow === "zendesk-to-sana") {
    return <ZendeskToSana onBack={() => setSelectedFlow(null)} os={selectedOS} />
  }
  if (selectedFlow === "sana-to-zendesk") {
    return <SanaToZendesk onBack={() => setSelectedFlow(null)} os={selectedOS} />
  }
  if (selectedFlow === "notion-to-sana") {
    return <NotionToSana onBack={() => setSelectedFlow(null)} />
  }
  if (selectedFlow === "sharepoint-to-sana") {
    return <SharepointToSana onBack={() => setSelectedFlow(null)} />
  }
  if (selectedFlow === "outlook-to-sana") {
    return <OutlookToSana onBack={() => setSelectedFlow(null)} />
  }
  if (selectedFlow === "airtable-to-sana") {
    return <AirtableToSana onBack={() => setSelectedFlow(null)} />
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="text-2xl font-serif">Sana</div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a
                  href="https://sana.ai/products/agents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground/70 transition-colors"
                >
                  Sana Agents
                </a>
                <a
                  href="https://sana.ai/products/learning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground/70 transition-colors"
                >
                  Sana Learn
                </a>
                <a
                  href="https://sana.ai/integrations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground/70 transition-colors"
                >
                  Integrations
                </a>
              </nav>
              <a href="https://app.sana.ai/login" target="_blank" rel="noopener noreferrer">
                <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-black/90 transition-colors">
                  Sign in
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-serif tracking-tight mb-6 text-balance">API integration setup</h1>
          <p className="text-xl text-muted-foreground mb-12 text-pretty">
            Connect your platforms to Sana with our step-by-step integration guides
          </p>

          <div className="inline-flex items-center gap-1 p-1 bg-muted rounded-2xl">
            <button
              onClick={() => setSelectedOS("mac")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
                selectedOS === "mac" ? "bg-white shadow-sm" : "hover:bg-white/50"
              }`}
            >
              <Apple className="w-4 h-4" />
              <span className="font-medium text-sm">Mac</span>
            </button>
            <button
              onClick={() => setSelectedOS("windows")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
                selectedOS === "windows" ? "bg-white shadow-sm" : "hover:bg-white/50"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="font-medium text-sm">Windows</span>
            </button>
            <button
              onClick={() => setSelectedOS("linux")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
                selectedOS === "linux" ? "bg-white shadow-sm" : "hover:bg-white/50"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="font-medium text-sm">Linux</span>
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-8">Native integrations</h2>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {nativeIntegrations.map((integration) => (
              <Card
                key={integration.id}
                className={`group relative overflow-hidden ${integration.bgColor} ${integration.textColor} ${integration.borderColor} border rounded-3xl hover:scale-[1.02] transition-all duration-300 cursor-pointer p-8 min-h-[340px] flex flex-col justify-between`}
                onClick={() => setSelectedFlow(integration.id)}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">{integration.title}</h3>
                    <p className="text-sm opacity-70">{integration.description}</p>
                  </div>

                  <div className="flex items-center gap-4 mt-8">
                    <button
                      className={`px-4 py-2 ${integration.accentColor} ${integration.buttonTextColor} rounded-full text-sm font-medium hover:opacity-90 transition-opacity`}
                    >
                      Connect
                    </button>
                  </div>
                </div>

                <ArrowRight className="absolute top-8 right-8 w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-8">Custom API integrations</h2>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {customApiFlows.map((flow) => (
              <Card
                key={flow.id}
                className={`group relative overflow-hidden ${flow.bgColor} ${flow.textColor} ${flow.borderColor || "border-0"} border rounded-3xl hover:scale-[1.02] transition-all duration-300 cursor-pointer p-8 min-h-[340px] flex flex-col justify-between`}
                onClick={() => setSelectedFlow(flow.id)}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">{flow.title}</h3>
                    <p className={`text-sm ${flow.bgColor === "bg-white" ? "opacity-70" : "opacity-80"}`}>
                      {flow.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-8">
                    <button
                      className={`px-4 py-2 ${flow.accentColor} ${flow.buttonTextColor || "text-black"} rounded-full text-sm font-medium hover:opacity-90 transition-opacity`}
                    >
                      Get started
                    </button>
                  </div>
                </div>

                <ArrowRight className="absolute top-8 right-8 w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
            <div className="text-2xl font-serif">Sana</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Sana Agents</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="https://sana.ai/products/agents"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Overview
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://sana.ai/solutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Solutions
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://sana.ai/integrations"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Integrations
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Sana Learn</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="https://sana.ai/products/learning"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Overview
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://sana.ai/solutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Solutions
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://sana.ai/pricing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="https://sana.ai/about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Mission
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://sana.ai/careers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://sana.ai/news"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Press
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="https://sana.ai/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://sana.ai/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://sana.ai/cookies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Cookie settings
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
            Sana Labs © 2025
          </div>
        </div>
      </footer>
    </div>
  )
}
