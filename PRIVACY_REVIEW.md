# Privacy and User Data Review

## Overview
The Sana API setup tool is a client-side Next.js app that guides users through configuring integrations (HubSpot, Sana, Zendesk). The app currently runs entirely in the browser and does not implement API requests or data persistence.

## Data Collection & Handling
- **Credential inputs:** Integration steps prompt users to enter client IDs, secrets, tokens, and domains. These values are stored only in React component state to personalize sample cURL commands and are not sent to a backend or stored persistently. 【F:app/flows/hubspot-to-sana.tsx†L15-L24】【F:app/flows/hubspot-to-sana.tsx†L252-L260】
- **Clipboard actions:** Users can copy generated commands that embed entered credentials, increasing the chance of secrets being exposed via clipboard history or other applications. 【F:app/flows/hubspot-to-sana.tsx†L186-L190】【F:app/flows/hubspot-to-sana.tsx†L210-L238】
- **No external transmission:** There are no network calls that transmit user-provided data; commands are only rendered for display/copy. 【F:app/flows/hubspot-to-sana.tsx†L206-L248】

## Privacy Risks
1. **Secret exposure via clipboard:** Copying commands with secrets can leak credentials through OS-level clipboard logs or other apps.
2. **Shared devices:** Because secrets remain on the page state, leaving the page open on shared machines could expose credentials to other users with physical access.
3. **Lack of disclosure:** The UI does not warn users that typed secrets remain local and will be embedded in copyable commands.

## Recommendations
- Add inline notices near credential fields clarifying that values stay in-browser and are inserted into generated commands.
- Provide a “Clear data” control to wipe all credential state when leaving a flow.
- Mask sensitive inputs by default and avoid showing secrets in plain text within rendered commands unless explicitly revealed.
- Consider redacting secrets from copyable examples (e.g., placeholders) or offering a toggle to include real values.
- If future features send data to a backend, publish a privacy policy and limit logging of secret values.

## Current Status
Given the current implementation, user data remains client-side, but clipboard-based exposure and lack of explicit disclosure are notable concerns. No data is transmitted or persisted by the app itself.
