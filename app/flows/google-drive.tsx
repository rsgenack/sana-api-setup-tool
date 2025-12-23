"use client"

import { useState } from "react"
import { ArrowLeft, ExternalLink, Copy, Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GoogleDriveProps {
  onBack: () => void
  os: "mac" | "windows" | "linux"
}

export default function GoogleDrive({ onBack, os }: GoogleDriveProps) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStates({ ...copiedStates, [id]: true })
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [id]: false })
    }, 2000)
  }

  const installCommand =
    os === "windows"
      ? "pip install google-api-python-client google-auth"
      : "pip3 install google-api-python-client google-auth"

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
            <Badge className="bg-[#4285F4] text-white">Core API</Badge>
            <span className="text-sm text-muted-foreground">OAuth 2.0 required</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Google Drive API Setup</h1>
          <p className="text-lg text-muted-foreground">
            Access and manage files in Google Drive. This guide will walk you through setting up OAuth 2.0
            authentication and making your first API request.
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-semibold">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">Create a Google Cloud Project</h3>
                  <Badge className="bg-[#4285F4] text-white">GOOGLE CLOUD</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>Go to the Google Cloud Console</p>
                  <p>Click Select a project → New Project</p>
                  <p>Enter a project name and click Create</p>
                  <p>Wait for the project to be created and select it</p>
                  <a
                    href="https://console.cloud.google.com/projectcreate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#4285F4] hover:underline mt-2"
                  >
                    Create New Project <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-semibold">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">Enable the Google Drive API</h3>
                  <Badge className="bg-[#4285F4] text-white">GOOGLE CLOUD</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>In the Cloud Console, navigate to APIs & Services → Library</p>
                  <p>Search for "Google Drive API"</p>
                  <p>Click on Google Drive API in the results</p>
                  <p>Click the Enable button</p>
                  <a
                    href="https://console.cloud.google.com/apis/library/drive.googleapis.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#4285F4] hover:underline mt-2"
                  >
                    Enable Drive API <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-semibold">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">Configure OAuth Consent Screen</h3>
                  <Badge className="bg-[#4285F4] text-white">GOOGLE CLOUD</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>Go to APIs & Services → OAuth consent screen</p>
                  <p>Select "External" user type and click Create</p>
                  <p>Fill in the required fields (App name, User support email, Developer contact)</p>
                  <p>Click Save and Continue through the remaining steps</p>
                  <a
                    href="https://console.cloud.google.com/apis/credentials/consent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#4285F4] hover:underline mt-2"
                  >
                    Configure Consent Screen <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 4 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-semibold">
                4
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">Create OAuth 2.0 Credentials</h3>
                  <Badge className="bg-[#4285F4] text-white">GOOGLE CLOUD</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>Navigate to APIs & Services → Credentials</p>
                  <p>Click Create Credentials → OAuth client ID</p>
                  <p>Select "Desktop app" as the application type</p>
                  <p>Name your OAuth client and click Create</p>
                  <p>Download the credentials JSON file and save it as credentials.json</p>
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#4285F4] hover:underline mt-2"
                  >
                    Create Credentials <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 5 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                5
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">Install Required Libraries</h3>
                  <Badge className="bg-black text-white">LOCAL</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>Open your terminal</p>
                  <p>Install the Google API client library for Python:</p>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm mt-2 flex items-center justify-between">
                    <code className="text-foreground">{installCommand}</code>
                    <button
                      onClick={() => copyToClipboard(installCommand, "install")}
                      className="ml-4 p-2 hover:bg-background rounded transition-colors"
                    >
                      {copiedStates["install"] ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 6 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                6
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">Write Your First Script</h3>
                  <Badge className="bg-black text-white">LOCAL</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>Create a Python file (e.g., list_files.py) with the following code:</p>
                  <div className="bg-muted p-4 rounded-lg font-mono text-xs mt-2 overflow-x-auto">
                    <pre className="text-foreground">{`from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import os.path
import pickle

SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

creds = None
if os.path.exists('token.pickle'):
    with open('token.pickle', 'rb') as token:
        creds = pickle.load(token)

if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            'credentials.json', SCOPES)
        creds = flow.run_local_server(port=0)
    with open('token.pickle', 'wb') as token:
        pickle.dump(creds, token)

service = build('drive', 'v3', credentials=creds)
results = service.files().list(pageSize=10).execute()
items = results.get('files', [])

if not items:
    print('No files found.')
else:
    print('Files:')
    for item in items:
        print(f"{item['name']} ({item['id']})")`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 7 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                7
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">Run and Test</h3>
                  <Badge className="bg-black text-white">LOCAL</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>Run your script:</p>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm mt-2">
                    <code className="text-foreground">python3 list_files.py</code>
                  </div>
                  <p>Your browser will open for authentication</p>
                  <p>Sign in with your Google account and authorize the application</p>
                  <p>The script will list the first 10 files in your Drive</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Common Operations */}
          <Card className="p-6 bg-gradient-to-br from-[#4285F4]/5 to-[#4285F4]/10 border-[#4285F4]/20">
            <h3 className="text-xl font-semibold mb-4">Common Operations</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#4285F4] mt-1">✓</span>
                <span>List files: service.files().list()</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4285F4] mt-1">✓</span>
                <span>Get file metadata: service.files().get(fileId=file_id)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4285F4] mt-1">✓</span>
                <span>Download file: service.files().get_media(fileId=file_id)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4285F4] mt-1">✓</span>
                <span>Upload file: service.files().create(body=metadata, media_body=media)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4285F4] mt-1">✓</span>
                <span>Search files: service.files().list(q="name contains 'report'")</span>
              </li>
            </ul>
          </Card>

          {/* Troubleshooting */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Troubleshooting</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">Authentication Error?</p>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Ensure credentials.json is in the same directory as your script</li>
                  <li>• Delete token.pickle and re-authenticate</li>
                  <li>• Verify the OAuth consent screen is properly configured</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">API Not Enabled?</p>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Go back to the API Library and ensure Drive API is enabled</li>
                  <li>• Wait a few minutes for changes to propagate</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Quota Exceeded?</p>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Check your quota usage in the Cloud Console</li>
                  <li>• Request a quota increase if needed</li>
                  <li>• Implement exponential backoff for rate limiting</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Need Help */}
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Need additional assistance?</p>
            <a
              href="https://developers.google.com/drive/api/guides/about-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4285F4] hover:underline font-medium"
            >
              View Official Documentation
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
