<div align="center">

# ⚡️ Syntrix

<img src="https://github.com/Cybernerd1/syntrix/assets/banner.gif" alt="Syntrix Banner" width="100%" />

### 🚀 AI-Powered Full-Stack Code Generation Platform  

**Generate, edit, and deploy complete React applications — all inside your browser.**

</div>

---

## 🧠 What is Syntrix?

**Syntrix** is an AI-driven development environment designed to supercharge how developers build full-stack web apps.  
With the power of **Google Gemini**, Syntrix transforms simple natural language prompts into **production-ready React components**, pages, or even entire projects — all editable and deployable in real time.

> Think of it as your AI coding partner — not just suggesting snippets, but building full systems on demand.

---

## ✨ Core Features

| 🚀 Feature | 💡 Description |
|:--|:--|
| **⚙️ AI-Powered Code Generation** | Type what you want, and Syntrix instantly scaffolds the code using Google Gemini (`gemini-2.0-flash-exp`). |
| **🧩 Live Code Editor** | Integrated with **Sandpack** (CodeSandbox) for a rich in-browser coding experience. |
| **🎨 Real-Time Preview** | See your app render live as you type or tweak code. |
| **🔐 Google Authentication** | Secure login and workspace management powered by **Google OAuth**. |
| **🗂️ Workspace System** | Automatically saves projects, chat history, and files per session using **Convex**. |
| **💾 Full-Stack Backend** | Real-time data and function handling with **Convex** — no extra servers needed. |
| **🌈 Modern UI** | Built with **Tailwind CSS** for clean, responsive, and minimal design. |

---

<div align="center">
  <img src="https://github.com/Cybernerd1/syntrix/assets/demo.gif" alt="Syntrix Demo" width="90%" />
  <br/>
  <em>From prompt to live preview — in seconds.</em>
</div>

---

## 🧩 Tech Stack

| Layer | Tech |
|:--|:--|
| **Frontend** | [Next.js](https://nextjs.org/) (App Router) + [React](https://reactjs.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Backend / DB** | [Convex](https://www.convex.dev/) (Real-time serverless backend) |
| **AI Engine** | [Google Gemini](https://deepmind.google/) (`gemini-2.0-flash-exp`) |
| **Auth** | Google OAuth |
| **Code Editor** | [@codesandbox/sandpack-react](https://sandpack.codesandbox.io/) |

---

## ⚡️ Getting Started

### 🧰 Prerequisites

Ensure you have:
- **Node.js ≥ 18**
- **npm / yarn / pnpm / bun**
- A valid **Convex** and **Google OAuth** setup.

---

### 1️⃣ Clone & Install
- **To setup this project locally**
```bash
git clone https://github.com/Cybernerd1/syntrix.git
cd syntrix
npm install
# or yarn / pnpm / bun install
