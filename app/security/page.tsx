"use client"

import { useState } from "react"
import { ChevronDown, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SecurityFAQ() {
  const router = useRouter()
  const [openCategory, setOpenCategory] = useState<string | null>("data-protection")

  const categories = [
    {
      id: "data-protection",
      title: "Data Protection & Privacy",
      questions: [
        {
          q: "Is my data secure when using Sana?",
          a: "Yes. Sana uses AES-256 encryption for data at rest and TLS 1.2 or higher for data in transit. This means your data is protected from unauthorized access both when stored on Sana's servers and when transmitted over networks. Sana isolates all customer data using a single tenant architecture, meaning no databases are shared between customers. Additionally, Sana ensures personal data cannot be read, copied, altered, or deleted by unauthorized persons during transmission, transport, or storage.",
        },
        {
          q: "How does Sana protect personal data?",
          a: "Sana protects personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. Sana operates as a data processor on your behalf and complies with all applicable data protection laws including GDPR and CCPA. Sana employs multiple data processing systems with different security measures for different purposes to ensure comprehensive protection.",
        },
        {
          q: "Is my data used to train AI models?",
          a: "No. Customer content data is not used outside of the isolated tenant unless specifically agreed upon. Sana's default model options are not trained on content data. Your data remains strictly within your environment and is never used to improve third-party language models without your explicit permission.",
        },
        {
          q: "Does Sana use my data for any other purposes?",
          a: "Sana uses user interaction data minimally and only to improve service quality and ranking. Sana uses a dedicated training set of internal data to train ranking algorithms and query rewrite to find the most relevant matches. This means Sana improves its search capabilities using Sana's own internal data, not your customer data. Your data is never used for training purposes without your knowledge and consent.",
        },
        {
          q: "How are Sana employees restricted from accessing my data?",
          a: "Sana employees do not have access to your workspace by default and can only access it if you explicitly grant them access. Additionally, Sana requires all personnel to enter into confidentiality agreements and acknowledge compliance with confidentiality and privacy policies. This creates multiple layers of protection against unauthorized employee access to your data.",
        },
      ],
    },
    {
      id: "compliance",
      title: "Compliance & Certifications",
      questions: [
        {
          q: "What compliance standards does Sana meet?",
          a: "Sana Agents is single tenant, SOC2 and ISO 27001 certified, and GDPR compliant. Additionally, Sana complies with HITRUST and other industry standards. These certifications demonstrate Sana's commitment to information security, regulatory compliance, and data protection. Sana uses an Information Security Management System (ISMS) certified under ISO/IEC 27001 as the basis for all information security measures.",
        },
        {
          q: "What does ISO 27001 certification mean?",
          a: "ISO/IEC 27001 provides guidelines for planning, implementing, maintaining, and improving information security in an organization. This means Sana has undergone rigorous third-party audits to demonstrate that it has comprehensive security controls, documented policies, and proven procedures for protecting information. ISO 27001 certification is valid for 3 years and is reviewed annually through ongoing assessments.",
        },
        {
          q: "What does SOC 2 certification mean?",
          a: "SOC 2 (Systems and Organization Controls 2) is a security and compliance standard created by the American Institute of Certified Public Accountants that attests to the operating effectiveness of Sana's security protocols. A SOC 2 attestation helps establish trust by demonstrating that Sana maintains effective controls for security, availability, processing integrity, confidentiality, and privacy of user data.",
        },
        {
          q: "Is Sana GDPR compliant?",
          a: "Yes. Sana follows data privacy regulations and guidelines to protect each individual user. Sana has a comprehensive Data Processing Agreement that outlines how personal data is handled in compliance with GDPR requirements, including data subject rights, data protection impact assessments, and sub-processor management.",
        },
        {
          q: "Does Sana comply with CCPA?",
          a: "Yes. Sana complies with the California Consumer Privacy Act (CCPA) and related data protection regulations. As a service provider under CCPA, Sana does not sell or share customer personal data and is restricted from using customer data for any purposes other than providing the services specified in your agreement.",
        },
        {
          q: "Does Sana meet HIPAA requirements?",
          a: "Sana complies with HITRUST standards and maintains security controls appropriate for regulated industries. Organizations with specific HIPAA requirements should contact Sana directly to discuss HIPAA Business Associate Agreements (BAAs) and other compliance arrangements.",
        },
      ],
    },
    {
      id: "infrastructure",
      title: "Infrastructure & Security Architecture",
      questions: [
        {
          q: "Where is my data stored?",
          a: "Sana is designed and engineered in Stockholm, Sweden, with cloud infrastructure in compliance with European data protection standards. Data added through integrations and uploads is indexed and stored on Sana's cloud instance. Enterprise customers can inquire about specific data residency requirements.",
        },
        {
          q: "What physical security measures does Sana have?",
          a: "Sana partners with industry-leading data center and cloud infrastructure providers that employ 24/7/365 surveillance and biometric access control systems. All providers are ISO27001, ISO27017, ISO27018, SOC2 Type II, PCI DSS, and CSA STAR certified.",
        },
        {
          q: "Can I get a dedicated single-tenant deployment?",
          a: "Yes. Enterprise organizations can get their own single-tenant deployment. This provides complete data isolation and allows you to maintain full control over your data environment. Single-tenant deployments can also be deployed on your own cloud infrastructure if required.",
        },
        {
          q: "Is Sana a SaaS solution or can it be deployed on-premise?",
          a: "Sana is a SaaS solution with managed hosting by default and can be deployed on your cloud infrastructure. This flexibility allows enterprises to choose the deployment model that best fits their security and compliance requirements.",
        },
        {
          q: "What about data backups and disaster recovery?",
          a: "Data backup is one of the pillars of Sana's IT continuity plan, ensuring your data is protected and recoverable in case of unexpected events. Sana maintains redundant backup systems to protect against data loss and ensure business continuity.",
        },
      ],
    },
    {
      id: "data-isolation",
      title: "Data Isolation & Multi-Tenancy",
      questions: [
        {
          q: "How does Sana isolate customer data?",
          a: "Sana isolates all customer data using a single tenant architecture, meaning no databases are shared between customers. Additionally, Sana performs logical data isolation to keep customer data isolated. This dual approach ensures complete separation between customer environments.",
        },
        {
          q: "Can my data leak to other organizations?",
          a: "No. Because Sana uses single-tenant architecture with logical data isolation and separate databases for each customer, your data is completely isolated from other organizations. There is no shared infrastructure that could lead to data leakage between customers.",
        },
        {
          q: "What are the three ways to add documents to Sana Agents?",
          a: "Documents can be added to Sana Agents through direct upload, private integration, or shared integration. With private integrations, only you can access the data. With shared integrations, administrators can control which documents are available to all users with access to a collection or workspace.",
        },
        {
          q: "How do I control access to shared integrations?",
          a: "Administrators can control which documents from shared integrations are available to all users with access to a collection and/or the entire workspace. You maintain full granular control over document accessibility.",
        },
      ],
    },
    {
      id: "integration-security",
      title: "Integration Security",
      questions: [
        {
          q: "Is it safe to connect my integrations to Sana?",
          a: "Yes. When you connect integrations like Notion, SharePoint, Outlook Calendar, or Airtable to Sana, the connection uses OAuth authorization standards. You maintain complete control over which data Sana can access, and you can revoke access at any time through your integration settings. You can also see exactly which data is shared with Sana.",
        },
        {
          q: "How are my integration credentials protected?",
          a: "OAuth authorization ensures that Sana never receives your passwords or sensitive credentials. Instead, you authorize Sana through the integration provider's secure authentication system, and Sana receives only limited access tokens that can be revoked at any time. Credentials are never stored in Sana's systems.",
        },
        {
          q: "What happens when I disconnect an integration?",
          a: "When you disconnect an integration, Sana immediately stops accessing new data from that source. Data that has already been indexed in Sana may remain unless you explicitly request deletion. Contact Sana support if you need specific indexed data removed from your workspace.",
        },
        {
          q: "Does Sana access all my data from connected integrations?",
          a: "No. A user can see the same results from Google Drive that they could see if searching directly from their authenticated Google Drive. This means Sana respects the same access controls and permissions you have in your integration provider. If you don't have access to a file in Google Drive, Sana won't have access to it either.",
        },
        {
          q: "Can I control which integrations are available in my organization?",
          a: "Yes. Administrators can control which integrations are available to the organization and which ones feed into the natural language response from Sana Agents. This gives you complete control over which external data sources are connected to Sana.",
        },
      ],
    },
    {
      id: "ai-ml-security",
      title: "AI & Machine Learning Security",
      questions: [
        {
          q: "How does Sana use AI securely?",
          a: "Sana upholds strict security policies for the use of AI in all its products. Risk management is integral to all security, privacy, and compliance work at Sana. This means security is built into every stage of AI development, deployment, and operations, not added as an afterthought.",
        },
        {
          q: "Can Sana use my data to improve its AI models?",
          a: "No. Sana's default model options are not trained on content data. Your business data is never used to train or improve language models. If you choose to use third-party LLM options, Sana maintains enterprise security arrangements to ensure your data is protected.",
        },
        {
          q: "What is Zero-Day Retention (ZDR)?",
          a: "Sana utilizes enterprise security arrangements and, whenever possible, a Zero-Day Retention (ZDR) policy with third parties. ZDR is an arrangement where third-party language model providers delete your data immediately after processing, ensuring no data retention for training, logging, or any other purpose. Your data is processed and then permanently deleted within seconds.",
        },
        {
          q: "Can I choose which language model Sana uses?",
          a: "Yes. Sana Agents is built agnostic to the underlying large language models, and enterprise users can select between a range of LLM models and providers. This allows you to choose a model and provider that aligns with your security and compliance requirements.",
        },
        {
          q: "What does 'language model agnostic' mean?",
          a: "Language model agnostic means Sana's architecture is not dependent on any single language model provider. You can swap between different providers or models without needing to retrain Sana's ranking algorithms or other core functionality. This gives you flexibility and reduces vendor lock-in.",
        },
        {
          q: "How does Sana prevent prompt injection attacks?",
          a: "Sana has implemented safeguards against malicious code and security vulnerabilities inherent in AI systems. The platform is regularly tested and updated to address emerging security risks in AI systems.",
        },
      ],
    },
    {
      id: "authentication",
      title: "User Authentication & Access Control",
      questions: [
        {
          q: "How can users be authenticated in Sana?",
          a: "Enterprise users can be authenticated with Single-Sign-On (SSO). SSO integrates with your existing identity provider, enabling secure, centralized authentication management for your organization. Multi-factor authentication (MFA) can also be enforced for additional security.",
        },
        {
          q: "Can I control user access to integrations and data?",
          a: "Yes. As a Sana administrator, you can control which users have access to connected integrations and their associated data. You can set granular permissions determining which users can view, search, or interact with data from each integration. Integration access can be modified or revoked through your Settings at any time.",
        },
        {
          q: "What happens if an employee leaves my organization?",
          a: "You should immediately revoke that employee's access to Sana through your user management interface. Once access is revoked, the employee can no longer view any data, search results, or interact with any integrations. Sana's audit logs will record the access removal.",
        },
        {
          q: "Can I audit who has accessed my data in Sana?",
          a: "Yes. Sana maintains audit logs of user actions and data access. Enterprise customers can request audit reports showing who accessed what data and when. Contact Sana support to set up audit logging and reporting for your organization.",
        },
      ],
    },
    {
      id: "general",
      title: "General Questions",
      questions: [
        {
          q: "Is Sana right for my organization's security requirements?",
          a: "Sana's comprehensive security posture—including SOC2 certification, ISO 27001 certification, GDPR compliance, HITRUST compliance, enterprise encryption standards, single-tenant architecture, and enterprise deployment options—makes it suitable for organizations with high security and compliance requirements. Organizations in regulated industries such as financial services, healthcare, and legal services can confidently deploy Sana. If you have specific security requirements, contact Sana's team to discuss your needs and explore customized security arrangements.",
        },
        {
          q: "How often are Sana's security practices updated?",
          a: "Sana continuously monitors and updates its security practices to address emerging threats and maintain compliance with evolving regulations. The Security Whitepaper is regularly updated to reflect current security measures. Sana's security team stays current with industry best practices and emerging threats.",
        },
        {
          q: "What happens if there's a data breach?",
          a: "In the unlikely event of a data breach, Sana has incident response procedures in place and will notify affected customers as required by applicable data protection laws. Sana maintains cyber insurance and has established relationships with security firms to assist with breach investigation and remediation.",
        },
        {
          q: "How do I report a security concern or vulnerability?",
          a: "If you discover a security vulnerability or have concerns about data protection, contact Sana immediately at legal@sanalabs.com with details about the vulnerability. Sana takes all security concerns seriously, investigates them promptly, and works with reporters through responsible disclosure processes.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border sticky top-0 bg-white z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 text-sm hover:text-foreground/70 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="text-2xl font-serif">Sana</div>
            </div>
            <a href="https://app.sana.ai/login" target="_blank" rel="noopener noreferrer">
              <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-black/90 transition-colors">
                Sign in
              </button>
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4">Security FAQ</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive answers to security, compliance, and data protection questions about Sana
            </p>
          </div>

          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.id} className="border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h2 className="text-xl font-semibold text-left">{category.title}</h2>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${openCategory === category.id ? "rotate-180" : ""}`}
                  />
                </button>

                {openCategory === category.id && (
                  <div className="px-6 py-6 space-y-6">
                    {category.questions.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-semibold text-lg">{item.q}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted/30 rounded-2xl">
            <h3 className="font-semibold text-lg mb-2">Need more information?</h3>
            <p className="text-muted-foreground mb-4">
              For detailed security documentation, visit{" "}
              <a
                href="https://sanalabs.com/legal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B5CF6] hover:underline"
              >
                sanalabs.com/legal
              </a>{" "}
              or contact{" "}
              <a href="mailto:legal@sanalabs.com" className="text-[#8B5CF6] hover:underline">
                legal@sanalabs.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-12 mt-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">Sana Labs © 2025</div>
        </div>
      </footer>
    </div>
  )
}
