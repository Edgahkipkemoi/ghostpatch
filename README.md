# 🧟 GhostPatch – The Frankenstein Hybrid Code Generator

> *"It's alive! IT'S ALIVE!"* – Bringing dead code back to life, one stitch at a time.

## 🎃 Kiroween Hackathon Submission

**Category:** Frankenstein  
**Bonus Category:** Most Creative

---

## 👻 What is GhostPatch?

GhostPatch is a Frankenstein-themed AI system that takes code snippets written in different programming languages and "stitches" them together into one interoperable hybrid program. Like Dr. Frankenstein assembling his creation from disparate parts, GhostPatch analyzes code structure, identifies join points, resolves incompatibilities, and outputs a functioning stitched micro-service or combined module.

**The Problem**: Legacy code migration is expensive, risky, and time-consuming. Different teams use different languages. Combining the best of each language is nearly impossible.

**The Solution**: GhostPatch automatically generates bridge code, handles type conversions, and creates production-ready hybrid applications in minutes instead of weeks.

### Supported Languages (35+ Total):
- **Popular**: JavaScript, Python, TypeScript, Java
- **Systems**: C++, C, Rust, Go
- **Enterprise**: C#, F#, VB.NET, Scala
- **Mobile**: Swift, Kotlin, Dart, Objective-C
- **Web**: PHP, Ruby, Perl
- **Functional**: Haskell, Elixir, Erlang, Clojure
- **Scripting**: Lua, R, Julia, Bash, PowerShell
- **Data**: SQL, GraphQL
- **Markup**: HTML, CSS, JSON, YAML, XML

**🔍 Searchable Language Selector** - Find any language instantly!

### Bridge Types (10 Different):
- FFI (Foreign Function Interface)
- WASM (WebAssembly)
- IPC (Inter-Process Communication)
- REST APIs
- Shared Libraries
- Native Extensions

## ⚡ Features

- **Multi-Language Code Upload** – Paste or upload code blocks in different languages
- **Intelligent Analysis Engine** – AST parsing, function extraction, IO detection
- **Frankenstein Stitching** – Automated bridging between incompatible languages
- **Execution Sandbox** – Test your hybrid creations safely
- **Spooky UI** – Green neon glow, stitched borders, lightning animations
- **Export System** – Download complete stitched projects as zip files

## 🧪 How Kiro Was Used

### Specs (Spec-Driven Development)
We used Kiro specs to define the core logic systems:
- `stitching.spec.yaml` – Rules for merging different languages
- `analysis.spec.yaml` – AST extraction and function detection
- `ui.spec.yaml` – Spooky UI theme system
- `mcp-tools.spec.yaml` – Custom MCP tool definitions

### Agent Hooks
Automated workflows with hooks:
- `on_new_code_uploaded` → Triggers analysis and stitching
- `on_analysis_success` → Generates compatibility map
- `on_stitch_complete` → Generates README + enables export
- `on_ui_build` → Applies Frankenstein theme

### Steering Docs
Enforced consistency across:
- Code transformation formats
- Spooky error messages
- Output structure (AST → compatibility map → stitched code)

### MCP Tools
Custom tools for code manipulation:
- `/detect_language` – Language detection
- `/analyze_ast` – AST breakdown
- `/stitch_code` – Multi-source hybrid transformation
- `/run_sandbox` – Safe code execution
- `/generate_zip` – Artifact generation

### Vibe Coding
Used conversational development with Kiro to rapidly iterate on UI components, refine stitching algorithms, and debug cross-language bridges.

## 🏗️ Tech Stack

- **Frontend:** Next.js 14 + TypeScript + TailwindCSS + Shadcn UI
- **Backend:** Node.js + Express
- **Code Analysis:** Tree-sitter, Babel, Rust parser
- **Sandboxing:** Docker containers
- **Language Bridges:** FFI, WASM, child_process

## 🔧 How It Works - Real Example

### What You Have:

**Old Java Code (2010):**
```java
// UserService.java
public class UserService {
    public String getUser(int id) {
        return "User" + id;
    }
}
```

**New JavaScript Code (2024):**
```javascript
// app.js
function displayUser(userName) {
    console.log(`Welcome, ${userName}!`);
}
```

### What GhostPatch Creates:

**1. Bridge Code (NEW):**
```javascript
// bridges/java_bridge.js
import { exec } from 'child_process';

export async function ghost_getUser(id) {
    return new Promise((resolve) => {
        // Call Java code
        exec(`java UserService ${id}`, (error, stdout) => {
            resolve(stdout.trim());
        });
    });
}
```

**2. Main File (NEW):**
```javascript
// index.js
import { ghost_getUser } from './bridges/java_bridge.js';
import { displayUser } from './app.js';

async function main() {
    // Get user from Java
    const userName = await ghost_getUser(123);
    
    // Display using JavaScript
    displayUser(userName);
}

main();
```

**3. Project Structure (NEW):**
```
/your-project/
├── index.js              ← NEW: Main entry point
├── /src/
│   ├── /java/
│   │   └── UserService.java    ← YOUR original Java
│   ├── /javascript/
│   │   └── app.js              ← YOUR original JavaScript
│   └── /bridges/
│       └── java_bridge.js      ← NEW: Bridge code
├── package.json          ← NEW: Dependencies
└── README.md             ← NEW: Instructions
```

### 🎮 How to Run It

**Step 1: You Have**
- ✅ Old Java code
- ✅ New JavaScript code

**Step 2: GhostPatch Gives You**
- ✅ Bridge code
- ✅ Main file
- ✅ Configuration files
- ✅ Instructions

**Step 3: You Run**
```bash
# Install dependencies
npm install

# Run the stitched project
node index.js
```

**Step 4: It Works!**
```
Welcome, User123!
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker (for sandbox execution)
- Python 3.9+ (for Python bridges)
- Rust (for Rust bridges)

### Installation

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### Run Development

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit `http://localhost:3000` to see GhostPatch in action.

## 📁 Project Structure

```
/kiro-project-root
├── /.kiro/              # Kiro configuration
│   ├── specs/           # Spec definitions
│   ├── hooks/           # Agent hooks
│   ├── steering/        # Steering docs
│   └── settings/        # MCP configuration
├── /frontend/           # Next.js UI
├── /backend/            # Node.js API
├── /sandbox/            # Code execution environment
└── README.md
```

## 🎬 Demo Video

[Link to 3-minute demo video]

## 📜 License

MIT License - See LICENSE file for details

## 🧛 Built with Kiro

This project was built entirely using Kiro's AI-powered development environment. Every feature, from the spooky UI to the complex code stitching engine, was developed through a combination of specs, hooks, steering, and vibe coding.

---

*May your code be forever stitched together* ⚡
