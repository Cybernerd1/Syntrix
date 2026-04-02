# 📘 Syntrix – Complete Project Documentation

> **Version:** 0.1.0  
> **Generated:** February 21, 2026  
> **Stack:** Next.js · Convex · Google Gemini AI · Sandpack · TailwindCSS

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [File & Folder Structure](#3-file--folder-structure)
4. [Architecture Overview](#4-architecture-overview)
5. [Data Flow](#5-data-flow)
6. [API Reference](#6-api-reference)
7. [Database Schema (Convex)](#7-database-schema-convex)
8. [Components Reference](#8-components-reference)
9. [Context & State Management](#9-context--state-management)
10. [Configuration & Environment Variables](#10-configuration--environment-variables)
11. [Authentication Flow](#11-authentication-flow)
12. [Token System](#12-token-system)
13. [AI Integration](#13-ai-integration)
14. [Sandpack Code Preview](#14-sandpack-code-preview)
15. [Pages & Routing](#15-pages--routing)
16. [Data Constants](#16-data-constants)
17. [Roadmap](#17-roadmap)

---

## 1. Project Overview

**Syntrix** is an AI-powered, full-stack web application code generator. Users describe what they want to build in natural language, and Syntrix:

1. Opens a **chat interface** (powered by Google Gemini AI) where the AI describes and plans the solution.
2. Simultaneously generates **complete React project code** (multiple files, components, Tailwind CSS styling).
3. Renders the generated code live in an **in-browser sandbox** (Sandpack by CodeSandbox).
4. Allows users to **export** the code to CodeSandbox editor or **deploy** it to a live URL instantly.

The application is analogous to tools like Bolt.new or v0.dev — a natural language → working code pipeline.

---

## 2. Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | ^16.1.6 | Full-stack React framework (App Router) |
| **React** | 19.1.0 | UI rendering |
| **TailwindCSS** | ^4 | Utility-first CSS styling |
| **tw-animate-css** | ^1.4.0 | Animation utilities for Tailwind |
| **next-themes** | ^0.4.6 | Dark/Light theme switching |
| **lucide-react** | ^0.544.0 | Icon library |
| **react-markdown** | ^10.1.0 | Render AI markdown responses in chat |
| **sonner** | ^2.0.7 | Toast notification library |

### AI / Generation
| Technology | Version | Purpose |
|---|---|---|
| **@google/generative-ai** | ^0.24.1 | Google Gemini AI SDK |
| **@google/genai** | ^1.22.0 | Newer Google GenAI SDK |
| **dedent** | ^1.7.0 | Clean up indented template strings for prompts |

### Database & Backend
| Technology | Version | Purpose |
|---|---|---|
| **Convex** | ^1.31.7 | Serverless real-time database + backend functions |

### Authentication
| Technology | Version | Purpose |
|---|---|---|
| **@react-oauth/google** | ^0.12.2 | Google OAuth 2.0 authentication |
| **uuid4** | ^2.0.3 | Generate unique user IDs |
| **axios** | ^1.12.2 | HTTP client (Google OAuth userinfo fetch) |

### Code Sandbox / Preview
| Technology | Version | Purpose |
|---|---|---|
| **@codesandbox/sandpack-react** | ^2.20.0 | In-browser code editor + live preview |

### UI Component Library (Radix UI Primitives)
| Technology | Version | Purpose |
|---|---|---|
| **@radix-ui/react-dialog** | ^1.1.15 | Modal/Dialog component |
| **@radix-ui/react-separator** | ^1.1.7 | Separator component |
| **@radix-ui/react-slot** | ^1.2.3 | Polymorphic component slot |
| **@radix-ui/react-tooltip** | ^1.2.8 | Tooltip component |
| **class-variance-authority** | ^0.7.1 | Type-safe component variants |
| **clsx** | ^2.1.1 | Conditional class name utility |
| **tailwind-merge** | ^3.3.1 | Merge conflicting Tailwind classes |

### Dev Dependencies
| Technology | Version | Purpose |
|---|---|---|
| **@tailwindcss/postcss** | ^4 | PostCSS plugin for TailwindCSS v4 |
| **tailwindcss** | ^4 | CSS framework |

---

## 3. File & Folder Structure

```
e:/projects/Syntrix/
│
├── app/                              # Next.js App Router root
│   ├── layout.js                     # Root HTML layout (fonts, providers)
│   ├── page.js                       # Landing page → renders <Hero/>
│   ├── globals.css                   # Global CSS + Tailwind theme tokens
│   ├── not-found.jsx                 # Custom 404 page
│   ├── provider.jsx                  # Client-side global provider (auth, context, layout)
│   ├── ConvexClientProvider.jsx      # Convex React client wrapper
│   │
│   ├── (main)/                       # Route group (no URL segment)
│   │   ├── pricing/
│   │   │   └── page.jsx              # Pricing/Subscription page
│   │   └── workspace/
│   │       └── [id]/
│   │           └── page.jsx          # Dynamic workspace page (chat + code editor)
│   │
│   └── api/                          # Next.js API Routes (server-side)
│       ├── ai-chat/
│       │   └── route.jsx             # POST /api/ai-chat → Gemini chat response
│       └── gen-ai-code/
│           └── route.jsx             # POST /api/gen-ai-code → Gemini code generation
│
├── components/
│   ├── custom/                       # Application-specific components
│   │   ├── Hero.jsx                  # Landing page hero section with input
│   │   ├── Header.jsx                # Top navigation bar
│   │   ├── AppSideBar.jsx            # Left sidebar with chat history
│   │   ├── SideBarFooter.jsx         # Sidebar footer: Settings, Pricing, Logout
│   │   ├── WorkspaceHistory.jsx      # List of user's past workspaces (chats)
│   │   ├── ChatView.jsx              # Chat conversation panel (workspace page)
│   │   ├── CodeView.jsx              # Code editor + preview panel (workspace page)
│   │   ├── SandPackPreviewClient.jsx # Sandpack live preview + deploy/export handler
│   │   ├── SignInDialog.jsx          # Google OAuth sign-in modal dialog
│   │   └── PricingModel.jsx          # Pricing plan cards grid
│   │
│   └── ui/                           # Reusable shadcn/ui primitive components
│       ├── button.jsx                # Button with variants (default, outline, ghost)
│       ├── dialog.jsx                # Modal dialog (Radix UI)
│       ├── input.jsx                 # Input field
│       ├── separator.jsx             # Visual separator
│       ├── sheet.jsx                 # Slide-in panel (Sheet / Drawer)
│       ├── sidebar.jsx               # Full sidebar system (shadcn/ui sidebar)
│       ├── skeleton.jsx              # Loading skeleton placeholder
│       ├── sonner.jsx                # Sonner toast integration
│       └── tooltip.jsx               # Tooltip component (Radix UI)
│
├── context/                          # React Context providers
│   ├── UserDetailContext.jsx         # Current authenticated user state
│   ├── MessageContext.jsx            # Chat messages state
│   └── ActionContext.jsx             # Header action triggers (deploy/export)
│
├── convex/                           # Convex backend (serverless DB + functions)
│   ├── schema.js                     # Database table definitions
│   ├── users.js                      # User mutations and queries
│   ├── workspace.js                  # Workspace mutations and queries
│   └── _generated/                   # Auto-generated Convex types/API
│       ├── api.d.ts
│       ├── api.js
│       ├── dataModel.d.ts
│       └── server.d.ts
│
├── configs/
│   ├── AiModel.js                    # Primary Gemini AI model configuration
│   └── AiModel.jsx                   # Lazy-init Gemini AI (build-safe version)
│
├── data/
│   ├── Colors.jsx                    # App color constants
│   ├── Lookup.jsx                    # Static content: suggestions, pricing, defaults
│   └── Prompt.jsx                    # AI system prompts (chat + code generation)
│
├── hooks/
│   └── use-mobile.js                 # useIsMobile() hook (responsive breakpoint)
│
├── lib/
│   └── utils.js                      # cn() utility (clsx + tailwind-merge)
│
├── public/
│   └── CodeWave2.png                 # App logo image
│
├── .env.local                        # Environment variables (not committed)
├── .gitignore
├── .vercelignore
├── jsconfig.json                     # JS path aliases (@/ → root)
├── next.config.mjs                   # Next.js configuration (image domains)
├── tailwind.config.js                # TailwindCSS configuration
├── postcss.config.mjs                # PostCSS configuration
├── package.json                      # Project dependencies and scripts
├── DEPLOYMENT_GUIDE.md               # Deployment instructions
└── README.md                         # Project readme
```

---

## 4. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER (Client)                        │
│                                                                 │
│  ┌──────────────┐   ┌────────────────┐   ┌──────────────────┐  │
│  │  Hero Page   │   │  Workspace     │   │  Pricing Page    │  │
│  │  (Landing)   │   │  [id] Page     │   │                  │  │
│  └──────┬───────┘   └───────┬────────┘   └──────────────────┘  │
│         │                   │                                   │
│         │          ┌────────┴────────┐                          │
│         │          │                 │                          │
│         │     ┌────▼────┐     ┌─────▼────┐                     │
│         │     │ChatView │     │CodeView  │                     │
│         │     │(AI Chat)│     │(Sandpack)│                     │
│         │     └────┬────┘     └─────┬────┘                     │
│         │          │                │                          │
│         └──────────┴───────┬────────┘                          │
│                             │                                   │
│              ┌──────────────▼───────────────┐                  │
│              │        React Contexts         │                  │
│              │  UserDetail | Messages | Action│                 │
│              └──────────────┬───────────────-┘                  │
└─────────────────────────────┼───────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
    ┌─────────▼──────┐  ┌────▼──────┐  ┌────▼──────────┐
    │  Convex Cloud  │  │ /api/     │  │ Google OAuth  │
    │  (Real-time DB)│  │ ai-chat   │  │  (Auth)       │
    │                │  │ gen-ai-   │  │               │
    │  - users       │  │ code      │  └───────────────┘
    │  - workspace   │  └────┬──────┘
    └────────────────┘       │
                     ┌───────▼───────┐
                     │ Google Gemini │
                     │  AI (Flash)   │
                     └───────────────┘
```

### Key Architectural Decisions

| Decision | Rationale |
|---|---|
| **Next.js App Router** | Server components, API routes, and file-based routing in one framework |
| **Convex** | Real-time database with built-in reactivity; no separate backend server needed |
| **Google OAuth only** | Simplifies auth — no passwords to manage |
| **Token-based usage** | Controls AI usage cost; deducted per AI response |
| **Sandpack in-browser** | No Docker or external VM needed for code preview |

---

## 5. Data Flow

### 5.1 New User Sign-In Flow

```
User clicks "Sign In"
       │
       ▼
SignInDialog opens
       │
       ▼
useGoogleLogin() → Google OAuth popup
       │
       ▼
Google returns access_token
       │
       ▼
axios.get(googleapis.com/oauth2/v3/userinfo)  ← fetch user profile
       │
       ▼
Convex: createUser mutation
  ├── email exists? → patch token if missing
  └── new user? → insert with 50,000 tokens
       │
       ▼
Convex: getUsers query (fetch complete user with _id)
       │
       ▼
localStorage.setItem('user', convexUser)
       │
       ▼
setUserDetail(convexUser)  ← React context updated
       │
       ▼
Dialog closes, Header shows user avatar
```

### 5.2 Create New Workspace (from Hero)

```
User types prompt → clicks ArrowRight
       │
       ▼
onGenerate(input) in Hero.jsx
  ├── Not logged in? → open SignInDialog
  └── Token < 10? → toast warning
       │
       ▼
setMessages({ role: 'user', content: input })  ← MessageContext
       │
       ▼
Convex: CreateWorkspace mutation
  { user: userDetail._id, messages: [msg] }
       │
       ▼
Returns workspaceId
       │
       ▼
router.push('/workspace/' + workspaceId)
```

### 5.3 Workspace AI Chat Flow

```
User lands on /workspace/[id]
       │
       ▼
ChatView: GetWorkspaceData()
  Convex: GetWorkspace({ workspaceId: id })
       │
       ▼
setMessages(result.messages)
       │
       ▼
useEffect detects last message role == 'user'
       │
       ▼
GenAiResponse()
  POST /api/ai-chat
  body: { prompt: JSON.stringify(messages) + CHAT_PROMPT }
       │
       ▼
/api/ai-chat → chatSession.sendMessage(prompt)
  → Gemini 1.5 Flash (text/plain response)
       │
       ▼
aiResp = { role: 'ai', content: responseText }
       │
       ▼
setMessages([...prev, aiResp])
Convex: UpdateMessages({ workspaceId, messages })
       │
       ▼
Token deduction:
  newToken = userDetail.token - countToken(aiResp)
  Convex: UpdateToken({ userId, token: newToken })
  setUserDetail({ ...prev, token: newToken })
```

### 5.4 AI Code Generation Flow

```
Same useEffect in CodeView.jsx detects messages change
last message role == 'user'
       │
       ▼
GenerateAiCode()
  POST /api/gen-ai-code
  body: { prompt: JSON.stringify(messages) + CODE_GEN_PROMPT }
       │
       ▼
/api/gen-ai-code → GenAiCode.sendMessage(prompt)
  → Gemini 1.5 Flash (application/json response)
       │
       ▼
Response JSON:
{
  projectTitle: "...",
  explanation: "...",
  files: {
    "/App.js": { code: "..." },
    "/components/Foo.js": { code: "..." },
    ...
  },
  generatedFiles: [...]
}
       │
       ▼
mergedFiles = { ...DEFAULT_FILE, ...aiResp.files }
setFiles(mergedFiles) → Sandpack re-renders
Convex: UpdateFiles({ workspaceId, files: aiResp.files })
       │
       ▼
Token deducted, setActiveTab('code')
```

### 5.5 Deploy / Export Flow

```
User clicks Deploy or Export in Header
       │
       ▼
Header: onActionBtn('deploy' | 'export')
  setAction({ actionType, timestamps: Date.now() })  ← ActionContext
       │
       ▼
CodeView: useEffect detects action change
  setActiveTab('preview') → Sandpack shows preview
       │
       ▼
SandPackPreviewClient: useEffect triggers GetSandpackClient()
  const client = previewRef.current.getClient()
  const result = await client.getCodeSandboxURL()
       │
       ├── actionType == 'deploy' → window.open(sandboxId + '.csb.app/')
       └── actionType == 'export' → window.open(result.editorUrl)
```

---

## 6. API Reference

### `POST /api/ai-chat`

Sends a message to the Gemini chat model and returns a text response.

**Request Body:**
```json
{
  "prompt": "<stringified_messages_array> + CHAT_PROMPT_suffix"
}
```

**Success Response (200):**
```json
{
  "result": "I'll build a Todo app for you using React with the following structure..."
}
```

**Error Response (500):**
```json
{
  "error": "Error message from Gemini API"
}
```

**Model Used:** `gemini-1.5-flash`  
**Response MIME type:** `text/plain`  
**Temperature:** 1 | **TopP:** 0.95 | **TopK:** 40 | **Max Tokens:** 8192  

---

### `POST /api/gen-ai-code`

Sends a code generation prompt to Gemini and returns structured JSON with project files.

**Request Body:**
```json
{
  "prompt": "<stringified_messages_array> + CODE_GEN_PROMPT_suffix"
}
```

**Success Response (200):**
```json
{
  "projectTitle": "Todo App",
  "explanation": "A React todo application with...",
  "files": {
    "/App.js": { "code": "import React..." },
    "/components/TodoList.js": { "code": "..." }
  },
  "generatedFiles": ["/App.js", "/components/TodoList.js"]
}
```

**Error Response (500):**
```json
{
  "error": "Error message from Gemini API"
}
```

**Model Used:** `gemini-1.5-flash`  
**Response MIME type:** `application/json`  
**Temperature:** 1 | **TopP:** 0.95 | **TopK:** 40 | **Max Tokens:** 8192  

---

## 7. Database Schema (Convex)

### `users` Table

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | `Id<"users">` | Auto | Convex document ID |
| `name` | `string` | ✅ | User's display name from Google |
| `email` | `string` | ✅ | Google account email (unique key) |
| `picture` | `string` | ✅ | Google profile picture URL |
| `uid` | `string` | ✅ | UUID v4 for the user |
| `token` | `number` | Optional | Remaining AI usage tokens (default: 50,000) |
| `_creationTime` | `number` | Auto | Convex creation timestamp |

### `workspace` Table

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | `Id<"workspace">` | Auto | Convex document ID |
| `messages` | `any` (JSON) | ✅ | Array of `{ role: 'user' | 'ai', content: string }` |
| `fileData` | `any` (JSON) | Optional | Generated file map `{ "/App.js": { code: "..." } }` |
| `user` | `Id<"users">` | ✅ | Reference to the owning user |
| `_creationTime` | `number` | Auto | Convex creation timestamp |

---

## 8. Convex Functions

### Users (`convex/users.js`)

#### `createUser` — Mutation
Creates a new user or patches an existing one with a default token if missing.

**Args:** `{ name: string, email: string, picture: string, uid: string }`  
**Behavior:**
- If email **not found**: inserts user with `token: 50000`
- If email **found** but `token` is undefined: patches with `token: 50000`
- If email **found** with token: no-op

---

#### `getUsers` — Query
Fetches a single user by email.

**Args:** `{ email: string }`  
**Returns:** User document or `undefined`

---

#### `getUserByUid` — Query
Fetches a user by their UUID.

**Args:** `{ uid: string }`  
**Returns:** First user document matching uid

---

#### `UpdateToken` — Mutation
Updates the token count for a user.

**Args:** `{ userId: Id<"users">, token: number }`  
**Returns:** Patch result

---

### Workspace (`convex/workspace.js`)

#### `CreateWorkspace` — Mutation
Creates a new workspace record.

**Args:** `{ messages: any, user: Id<"users"> }`  
**Returns:** New `workspaceId`

---

#### `GetWorkspace` — Query
Fetches a single workspace by ID.

**Args:** `{ workspaceId: Id<"workspace"> }`  
**Returns:** Full workspace document (messages + fileData)

---

#### `UpdateMessages` — Mutation
Persists the updated messages array to a workspace.

**Args:** `{ workspaceId: Id<"workspace">, messages: any }`  
**Returns:** Patch result

---

#### `UpdateFiles` — Mutation
Persists generated file data to a workspace.

**Args:** `{ workspaceId: Id<"workspace">, files: any }`  
**Returns:** Patch result

---

#### `GetAllWorkspace` — Query
Lists all workspaces belonging to a user (for sidebar history).

**Args:** `{ userId: Id<"users"> }`  
**Returns:** Array of workspace documents

---

## 9. Components Reference

### Custom Components

#### `Hero` (`components/custom/Hero.jsx`)
The landing page main section.

| Prop | Type | Description |
|---|---|---|
| *(none)* | — | Self-contained, uses contexts |

**Features:**
- Text area for user prompt input
- Suggestion chips (clickable quick-start prompts)
- Creates a new workspace and navigates to it
- Shows `SignInDialog` if user is not authenticated
- Token guard (warns if < 10 tokens)

---

#### `Header` (`components/custom/Header.jsx`)
Top navigation bar, persistent across all pages.

**Features:**
- App logo (links to `/`)
- **Unauthenticated:** Sign In + Get Started buttons
- **Authenticated on workspace:** Export + Deploy buttons + user avatar
- Triggers `ActionContext` with `deploy` or `export` action type
- Avatar click toggles the sidebar

---

#### `ChatView` (`components/custom/ChatView.jsx`)
Left panel of the workspace page — handles the conversation.

**Key Functions:**

| Function | Description |
|---|---|
| `GetWorkspaceData()` | Loads messages from Convex on workspace load |
| `GenAiResponse()` | Calls `/api/ai-chat`, appends AI reply, deducts tokens |
| `onGenerate(input)` | Appends user message to state (triggers GenAiResponse via useEffect) |
| `countToken(text)` | Counts words in a string (used for token deduction estimate) |

**Exported:** `countToken` — also used by `CodeView`

---

#### `CodeView` (`components/custom/CodeView.jsx`)
Right panel of the workspace page — manages the Sandpack editor & code generation.

**Key Functions:**

| Function | Description |
|---|---|
| `GetFiles()` | Loads existing fileData from Convex |
| `GenerateAiCode()` | Calls `/api/gen-ai-code`, merges files, updates Convex, deducts tokens |

**Tabs:** `code` (file explorer + editor) | `preview` (live browser preview)

---

#### `SandPackPreviewClient` (`components/custom/SandPackPreviewClient.jsx`)
Wraps Sandpack's `SandpackPreview` and handles deploy/export via `ActionContext`.

**Features:**
- Listens to `ActionContext.action` changes
- On `deploy`: opens `{sandboxId}.csb.app/`
- On `export`: opens CodeSandbox editor URL

---

#### `AppSideBar` (`components/custom/AppSideBar.jsx`)
Left slideable sidebar.

**Contains:**
- App logo
- "Start new chat" button
- `WorkspaceHistory` — list of past workspaces
- `SideBarFooter` — Settings, Help, Pricing, Sign Out

---

#### `WorkspaceHistory` (`components/custom/WorkspaceHistory.jsx`)
Lists all workspaces for the logged-in user.

- Fetches via `GetAllWorkspace` Convex query
- Each item links to `/workspace/{id}`
- Clicking a workspace link closes the sidebar

---

#### `SideBarFooter` (`components/custom/SideBarFooter.jsx`)
Bottom navigation in the sidebar.

| Option | Action |
|---|---|
| Settings | router.push (no path defined yet) |
| Help Center | router.push (no path defined yet) |
| My Subscription | `/pricing` |
| Sign Out | router.push (no path defined yet) |

---

#### `SignInDialog` (`components/custom/SignInDialog.jsx`)
Google OAuth sign-in modal.

**Flow:**
1. Opens on demand (Hero or Header)
2. `useGoogleLogin` initiates Google OAuth
3. Fetches user profile from Google APIs
4. Creates/updates user in Convex
5. Stores full Convex user object in `localStorage` and context

---

#### `PricingModel` (`components/custom/PricingModel.jsx`)
Displays a grid of pricing plan cards from `Lookup.PRICING_OPTIONS`.

| Plan | Tokens | Price |
|---|---|---|
| Basic | 50K | $4.99 |
| Starter | 120K | $9.99 |
| Pro | 2.5M | $19.99 |
| Unlimited (License) | Unlimited | $49.99 |

> ⚠️ **Note:** Payment integration is not yet implemented. Buttons are placeholders.

---

### UI Components (`components/ui/`)

These are shadcn/ui-style components built on Radix UI primitives.

| Component | Source | Description |
|---|---|---|
| `button.jsx` | CVA + Radix Slot | Button variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` |
| `dialog.jsx` | Radix Dialog | Accessible modal dialog |
| `input.jsx` | HTML input | Styled text input |
| `separator.jsx` | Radix Separator | Visual horizontal/vertical divider |
| `sheet.jsx` | Radix Dialog | Slide-in panel from sides |
| `sidebar.jsx` | shadcn Sidebar | Full sidebar system with mobile support |
| `skeleton.jsx` | Styled div | Loading placeholder |
| `sonner.jsx` | Sonner + next-themes | Themed toast notifications |
| `tooltip.jsx` | Radix Tooltip | Hover tooltip |

---

## 10. Context & State Management

Syntrix uses React Context API (no Redux). All contexts are provided in `app/provider.jsx`.

### `UserDetailContext`

| Key | Type | Description |
|---|---|---|
| `userDetail` | `object \| undefined` | Full Convex user document |
| `setUserDetail` | `function` | Update user state |

**userDetail shape:**
```json
{
  "_id": "j57abc...",
  "name": "John Doe",
  "email": "john@gmail.com",
  "picture": "https://lh3.googleusercontent.com/...",
  "uid": "uuid4-string",
  "token": 48230
}
```

**Persisted in:** `localStorage` key `"user"` (JSON)

---

### `MessageContext`

| Key | Type | Description |
|---|---|---|
| `messages` | `array \| undefined` | Current workspace chat messages |
| `setMessages` | `function` | Update messages |

**Message shape:**
```json
{ "role": "user" | "ai", "content": "string" }
```

---

### `ActionContext`

| Key | Type | Description |
|---|---|---|
| `action` | `object \| undefined` | Current triggered header action |
| `setAction` | `function` | Trigger an action |

**Action shape:**
```json
{ "actionType": "deploy" | "export", "timestamps": 1700000000000 }
```

The `timestamps` field ensures the `useEffect` in `SandPackPreviewClient` fires even if the same action is repeated (since the object reference changes).

---

## 11. Authentication Flow

```
User is NOT authenticated:
  provider.jsx → isAuthenticated() → no localStorage token found
  → router.push('/') (redirect to home)

User IS authenticated:
  provider.jsx → isAuthenticated()
  → reads email from localStorage
  → Convex: getUsers({ email })
  → setUserDetail(result)
  → Full user context available throughout app
```

**Auth Method:** Google OAuth 2.0 (via `@react-oauth/google`)  
**Session Storage:** `localStorage` (JSON user object)  
**No JWT / Server Session:** Auth is entirely client-side; Convex stores user data.

---

## 12. Token System

Syntrix uses a **word-count-based token system** to track and limit AI usage.

### Token Counting

```javascript
export const countToken = (inputText) => {
  return inputText.trim().split(/\s+/).filter(word => word).length;
};
```

> **Note:** This counts words (whitespace-separated), not true LLM tokens. It's an approximation.

### Token Deduction

- After every **AI chat response**: tokens deducted from `userDetail.token`
- After every **AI code generation**: tokens deducted from `userDetail.token`
- Token count is updated **both in-context** (immediate UI update) **and in Convex** (persistence)

### Token Guard

```javascript
if (userDetail?.token < 10) {
  toast('You dont have enough token!');
  return;
}
```

### Default Token Allocation

- New users receive **50,000 tokens** on first sign-in
- After account creation, if `token` field is null/undefined, it's also patched to 50,000

---

## 13. AI Integration

### Models Used

| Use Case | Model | Response Format |
|---|---|---|
| Chat responses | `gemini-1.5-flash` | `text/plain` |
| Code generation | `gemini-1.5-flash` | `application/json` |

> `AiModel.jsx` references `gemini-3-flash-preview` but `AiModel.js` (used by API routes) uses `gemini-1.5-flash`.

### Chat System Prompt (`CHAT_PROMPT`)

```
You are a AI Assistant and experienced in React Development.
GUIDELINES:
- Tell user what you are building
- Response less than 15 lines.
- Skip code examples and commentary
```

### Code Generation System Prompt (`CODE_GEN_PROMPT`)

The code generation prompt instructs Gemini to:
- Generate a complete React + Vite project
- Use **Tailwind CSS** for all styling
- Use only `lucide-react` for icons (specific icon list provided)
- Optionally use `date-fns`, `react-chartjs-2`, `firebase`, `@google/generative-ai`
- Return a **strict JSON schema**:

```json
{
  "projectTitle": "string",
  "explanation": "string",
  "files": {
    "/App.js": { "code": "string" },
    "...": { "code": "string" }
  },
  "generatedFiles": ["string"]
}
```

- Use Unsplash for real stock photos
- Use placeholder: `https://archive.org/download/placeholder-image/placeholder-image.jpg`
- Add emoji icons for good UX
- Make designs "beautiful, not cookie cutter"

### Sandpack Default Dependencies (injected into generated app)

```json
{
  "postcss": "^8",
  "tailwindcss": "^3.4.1",
  "autoprefixer": "^10.0.0",
  "uuid4": "^2.0.3",
  "tailwind-merge": "^2.4.0",
  "tailwindcss-animate": "^1.0.7",
  "lucide-react": "^0.469.0",
  "react-router-dom": "^7.1.1",
  "firebase": "^11.1.0",
  "@google/generative-ai": "^0.21.0",
  "date-fns": "^4.1.0",
  "react-chartjs-2": "^5.3.0",
  "chart.js": "^4.4.7"
}
```

External CDN injected: `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`

---

## 14. Sandpack Code Preview

Syntrix uses **Sandpack by CodeSandbox** to render generated React code live in the browser.

### Setup in `CodeView.jsx`

```jsx
<SandpackProvider
  files={files}           // Generated file map from AI
  template="react"        // React template
  theme="dark"
  customSetup={{ dependencies: Lookup.DEPENDANCY }}
  options={{ externalResources: ['https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'] }}
>
  <SandpackLayout>
    {activeTab == 'code' ? (
      <>
        <SandpackFileExplorer style={{ height: "80vh" }} />
        <SandpackCodeEditor style={{ height: "80vh" }} />
      </>
    ) : (
      <SandPackPreviewClient />  // Live browser preview
    )}
  </SandpackLayout>
</SandpackProvider>
```

### Default Files (Always Present)

| File | Content |
|---|---|
| `/public/index.html` | HTML shell with Tailwind CDN |
| `/App.css` | Tailwind base/components/utilities |
| `/tailwind.config.js` | Tailwind config for src files |
| `/postcss.config.js` | PostCSS setup |

AI-generated files are **merged on top** of these defaults.

---

## 15. Pages & Routing

### Route Map

| URL | File | Description |
|---|---|---|
| `/` | `app/page.js` | Landing page with Hero component |
| `/workspace/[id]` | `app/(main)/workspace/[id]/page.jsx` | Workspace (chat + code editor) |
| `/pricing` | `app/(main)/pricing/page.jsx` | Pricing plans page |
| `*` (any unknown) | `app/not-found.jsx` | Custom 404 page |

### Route Group `(main)`

The `(main)` folder is a Next.js **route group** — it organizes files without affecting the URL structure. Routes inside are still `/workspace/[id]` and `/pricing`, not `/(main)/workspace/[id]`.

### Dynamic Routing

`/workspace/[id]` — The `[id]` is the Convex document ID of the workspace. It's used to:
1. Fetch workspace messages on load (`GetWorkspaceData`)
2. Fetch existing generated files (`GetFiles`)
3. Persist updates (`UpdateMessages`, `UpdateFiles`)

---

## 16. Data Constants

### `data/Colors.jsx`

| Token | Value | Usage |
|---|---|---|
| `LABEL` | `#a3a3a3` | Label text color |
| `SUBHEADING` | `#d1d5db` | Subheading text color |
| `BACKGROUND` | `#151515` | Dark panel backgrounds |
| `BLUE` | `#2ba6ff` | Accent / brand blue |
| `CHAT_BACKGROUND` | `#272727` | Chat message bubble background |

### `data/Lookup.jsx` (key constants)

| Key | Description |
|---|---|
| `SUGGSTIONS` | 5 preset prompt examples on the Hero page |
| `HERO_HEADING` | `"What do you want to build?"` |
| `HERO_DESC` | `"Prompt, run, edit, and deploy full-stack web apps."` |
| `INPUT_PLACEHOLDER` | `"What you want to build?"` |
| `SIGNIN_HEADING` | `"Continue With SyntriX"` |
| `DEFAULT_FILE` | Sandpack template files (HTML, CSS, Tailwind config) |
| `DEPENDANCY` | npm packages available in Sandpack environment |
| `PRICING_DESC` | Pricing page description text |
| `PRICING_OPTIONS` | Array of 4 pricing tiers |

### `data/Prompt.jsx`

| Key | Description |
|---|---|
| `CHAT_PROMPT` | System prompt appended to all chat requests |
| `CODE_GEN_PROMPT` | Full system prompt for code generation (defines output JSON schema) |

---

## 17. Roadmap

### ✅ Completed Features
- [x] Google OAuth sign-in/sign-up
- [x] Landing page with prompt input and suggestions
- [x] Workspace creation with unique URLs
- [x] AI chat panel with Gemini (streaming-like messages)
- [x] AI code generation with Gemini (JSON output)
- [x] Sandpack in-browser code editor + live preview
- [x] File explorer for generated code
- [x] Code/Preview tab switching
- [x] Deploy to CodeSandbox (`.csb.app/`)
- [x] Export to CodeSandbox editor
- [x] Workspace history in sidebar
- [x] Token-based usage system
- [x] Pricing plans page (display)
- [x] Dark mode by default
- [x] Token deduction on AI use
- [x] Toast notifications for errors and warnings
- [x] 404 Not Found page

### 🚧 In Progress / Partial
- [ ] Sign Out functionality (button exists, logic not wired)
- [ ] Settings page (button exists, no route)
- [ ] Help Center page (button exists, no route)
- [ ] `AiModel.jsx` (lazy init version) not fully integrated with API routes

### 📋 Planned Features (Roadmap)

#### Phase 1 – Core Polish
- [ ] **Sign Out:** Clear localStorage and redirect to `/`
- [ ] **Token purchase:** Integrate Stripe or Razorpay with pricing plans
- [ ] **Settings page:** User profile, API key management
- [ ] **Real token counting:** Use Gemini's `countTokens()` API instead of word count
- [ ] **Prompt history in chat:** Render original prompt at top of chat

#### Phase 2 – UX Enhancement
- [ ] **Chat streaming:** Stream AI responses token-by-token for better UX
- [ ] **Code diff view:** Show what changed between generations
- [ ] **Multiple files tab UI:** Better file navigation in workspace
- [ ] **Mobile-responsive workspace:** Currently 4-column grid (doesn't work on mobile)
- [ ] **Workspace rename:** Let users name their workspaces
- [ ] **Workspace delete:** Remove old workspaces from history

#### Phase 3 – Advanced Features
- [ ] **Multi-framework support:** Vue, Svelte, Vanilla JS templates in Sandpack
- [ ] **Image uploads in chat:** Multimodal prompts
- [ ] **Collaborative workspaces:** Share workspace URL with others
- [ ] **GitHub export:** Push generated code directly to a GitHub repo
- [ ] **Custom domain deploy:** Integrate Vercel/Netlify API for one-click deploy
- [ ] **AI code refactoring:** "Refactor this component" follow-up commands
- [ ] **NPM package installer:** Let users add custom packages to Sandpack

#### Phase 4 – Platform
- [ ] **Admin dashboard:** Usage analytics, user management
- [ ] **API access:** Let developers call Syntrix programmatically
- [ ] **Workspace templates:** Start from pre-built app templates
- [ ] **Team plans:** Shared token pools, team workspaces

---

## Environment Variables

Create `.env.local` in the project root:

```env
# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Google OAuth
NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY=your_google_client_id_here

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
```

### Getting API Keys:
| Key | Where to get |
|---|---|
| `NEXT_PUBLIC_GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY` | [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials |
| `NEXT_PUBLIC_CONVEX_URL` | Run `npx convex dev` and copy the deployment URL |

---

## Getting Started (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API keys

# 3. Start Convex (in a separate terminal)
npx convex dev

# 4. Start Next.js dev server
npm run dev

# App runs at http://localhost:3000
```

## Building for Production

```bash
# This command:
# 1. Deploys Convex functions to cloud
# 2. Builds Next.js for production
npm run build
```

## Deployment (Vercel)

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add all environment variables in Vercel settings
4. Deploy

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

*Documentation generated for Syntrix v0.1.0 · February 2026*
