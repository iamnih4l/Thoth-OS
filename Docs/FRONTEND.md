# Thoth OS Capability Center (Frontend)

## 🌐 Overview

**Live Dashboard:** [https://thoth-os.vercel.app/](https://thoth-os.vercel.app/)

The **Capability Center** is the visual, interactive frontend for Thoth OS. Because Thoth OS is an "invisible" operating system—built entirely out of declarative Markdown schemas, rules, and cognitive modules—the Capability Center exists to **make the invisible visible**. 

It provides developers, administrators, and users with a real-time, cinematic dashboard to explore the exact capabilities, agents, and architecture currently loaded into the system's kernel.

## 🎯 Purpose

While the AI interacts with the raw markdown files during execution, human operators need a structured way to understand what the AI is capable of. The Capability Center serves three main purposes:

1. **System Telemetry & Auditing**: See exactly how many skills, core modules, and agents are currently registered in the workspace.
2. **Skill Discovery**: Browse the entire library of capabilities (e.g., Architecture, Debugging, API Integration) via an interactive grid, complete with filtering and search.
3. **Execution Transparency**: Understand how Thoth OS processes intents. The frontend visualizes the execution pipeline and allows users to inspect the exact input/output schemas of individual skills, simulating how an agent would use them.

## 🏗️ Architecture & Data Layer

The frontend is a static React application that relies on a custom build-time scraper to read the Thoth OS repository.

- **Framework**: Vite + React + TailwindCSS v4 + Framer Motion.
- **Aesthetic**: "Cinematic Cybernetic" — utilizing deep 3D space (`preserve-3d`), dynamic hover tilts, holographic gradients, and isometric topology graphs.
- **Data Pipeline (`scripts/generate-data.js`)**: 
  Instead of hardcoding data, the frontend includes a Node.js script that recursively scans the `Skills/`, `Core/`, `Agents/`, and `MCP/` directories. It parses the Markdown files and YAML frontmatter to dynamically generate a `data.json` file. This guarantees that **the frontend is always a 100% accurate representation of the underlying markdown OS.**

## 🚀 Running Locally

To explore the Capability Center on your local machine:

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies (Using Yarn is recommended to bypass npm lockfile bugs)
yarn install

# 3. Generate the latest capability data from the OS markdown files
node scripts/generate-data.js

# 4. Start the development server
yarn dev
```

Visit `http://localhost:5173` in your browser.

## 🗺️ Key Views

* **Dashboard (`/`)**: Displays live telemetry, module counts, and the Neural Execution Pipeline (from user intent to final output).
* **Skill Explorer (`/skills`)**: An interactive, 3D grid of all available skills categorized by their domain.
* **Skill Inspector (`/skills/:id`)**: Deep-dive into a specific skill. Toggle "Developer Mode" to view raw JSON schemas, or watch the "Live Simulation" to see how the Task Orchestrator executes the skill.
* **Architecture Graph (`/architecture`)**: An isometric, 3D interactive mapping of the Thoth OS topology (Integrations → Capability Registry → Agent Subsystems → Core Kernel).

## 🚀 Deployment

The Capability Center is configured for zero-config deployment to platforms like **Vercel** or **Netlify**. 
Because it relies on `yarn.lock` and standard Vite build scripts, pushing to the `main` branch will automatically build and deploy the interactive frontend.
