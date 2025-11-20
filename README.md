# Arcade Custom Dashboards

> **Composable Tool Management** — White-labelable dashboards you can customize and infuse into your enterprise apps.

[![Deploy with Docker](https://img.shields.io/badge/Deploy-Docker-2496ED?logo=docker)](#quick-start)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## What Is This?

As enterprises infuse more tools into their workflows and build tool management for agents, they need dashboards that align with their brand and fit their users.

**Arcade Custom Dashboards** gives you production-ready reference implementations to:
- **Mix-and-match** layouts and components that fit your needs
- **White-label** with your branding, colors, and styling
- **Infuse** tool management into your existing apps
- **Customize** with AI prompts for faster iteration

**Three working examples** (different technologies, layouts, industry flavors):
- **GameForge Studio** — Dark theme, Tailwind CSS, gaming aesthetics
- **FinTech Pro** — Light theme, data tables, professional finance UI
- **HealthCare Hub** — Clean design, circular gauges, medical theme

All directly connected to Arcade APIs. Test, customize, deploy.

---

## Quick Start

### 1. Get Your Arcade API Key
Sign up at [Arcade.dev](https://arcade.dev) and create an API key.

### 2. Configure
```bash
cp env.example .env
nano .env  # Add your ARCADE_API_KEY
```

### 3. Run
```bash
docker-compose up -d --build
```

### 4. Open
Visit http://localhost:3000

That's it!

---

## Features

✅ **3 Reference Implementations** - Different technologies (Tailwind, inline CSS), layouts (grid, table, card), and industry styles  
✅ **Connected to Arcade APIs** - Real tool data via Arcade APIs  
✅ **Interactive UI** - Hover tooltips on graphs, expandable charts, clickable components  
✅ **White-labelable** - Per-dashboard branding (company name, colors, taglines)  
✅ **Prompt Package** - AI customization templates with full context (`/prompts` folder)  
✅ **One-Command Deploy** - Docker with health checks  
✅ **Self-hosted Support** - Configure for Arcade Cloud or your own instance  
✅ **Production-Ready** - Clean code, proper error handling, TypeScript  

---

## Configuration

All settings in `env.example`:

```bash
# Arcade API (Required)
ARCADE_API_KEY=your_key
ARCADE_API_BASE_URL=https://api.arcade.dev  # Or your instance

# Per-Dashboard Branding (Optional)
GAMEFORGE_COMPANY_NAME=GameForge Studio
FINTECH_COMPANY_NAME=FinTech Pro
HEALTHCARE_COMPANY_NAME=HealthCare Hub
```

---

## Project Structure

```
arcade-custom-dashboards/
├── app/
│   ├── page.tsx              # Showcase landing
│   ├── examples/
│   │   ├── gameforge/        # Gaming dashboard
│   │   ├── fintech/          # Finance dashboard
│   │   └── healthcare/       # Healthcare dashboard
│   ├── developer-tools/      # AI customization prompt
│   └── api/                  # Arcade API proxy
├── prompts/                  # AI prompt package
├── config/                   # Configuration files
├── Dockerfile                # Production container
├── docker-compose.yml        # One-command deploy
└── README.md                 # This file
```

---

## Customization with AI

Click **Developer Tools** in the app to get an AI prompt with full context. Copy, paste into Claude/ChatGPT, customize any dashboard.

Or see `prompts/master-prompt.md` for the template.

---

## Support

- **Arcade Documentation**: [docs.arcade.dev](https://docs.arcade.dev)
- **LLM Context**: [docs.arcade.dev/llms.txt](https://docs.arcade.dev/llms.txt)
- **API Reference**: [docs.arcade.dev/en/references/api](https://docs.arcade.dev/en/references/api)
- **Discord**: [discord.gg/arcade](https://discord.gg/arcade)
- **Forward-Deployed Engineers**: Contact your Arcade enterprise rep for deep customization support

---

## License

MIT — Use commercially, modify, distribute freely.

---

**Built by [Arcade AI](https://arcade.dev) • Making AI Take Action**
