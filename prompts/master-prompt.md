# Arcade Custom Dashboard - AI Customization Prompt

**Add these for full context first:**
1. **Arcade Platform Context**: https://docs.arcade.dev/llms.txt
2. **Arcade API Reference**: https://docs.arcade.dev/en/references/api

---

## About This Project

This is **Arcade Custom Dashboards** - a showcase of 3 white-labelable dashboard variations:

- **GameForge Studio**: Dark theme with purple/orange gradients, gaming style (Tailwind CSS)
- **FinTech Pro**: Light theme with data tables, professional finance style (Inline CSS)
- **HealthCare Hub**: Clean design with circular gauges, medical theme (Inline CSS)

**All dashboards use 100% real Arcade API data.** The only differences are layout, visual styling, and tone.

---

## What I Want to Customize

**Dashboard**: [GameForge / FinTech / HealthCare / All of them]

**Widget/Component/File**: 
[Examples:
  - "FinTech stats cards in app/examples/fintech/page.tsx"
  - "GameForge analytics chart with hover tooltips"
  - "HealthCare circular gauges"
  - "Full GameForge dashboard page"
  - "Just the tools grid from any dashboard"
]

**What to Change**:
[Describe what you want - colors, branding, layout, add features, etc.]

---

## My Details

- **Company Name**: [YOUR COMPANY NAME]
- **Primary Color**: [HEX CODE e.g., #667eea]
- **Secondary Color**: [HEX CODE e.g., #f97316]
- **Industry/Use Case**: [e.g., SaaS, Internal Tools, Customer Portal]
- **Goal**: [What you want to achieve with this dashboard]

---

## Instructions for AI

Please check out this GitHub repository and make the changes described above. Maintain all Arcade API integrations and keep the code production-ready.

---

## Need Dashboard-Specific Help?

For detailed widget locations and component breakdown:
- **GameForge**: See `prompts/gameforge-prompt.md`
- **FinTech**: See `prompts/fintech-prompt.md`
- **HealthCare**: See `prompts/healthcare-prompt.md`

---

## Quick Reference

**API Endpoint**: https://api.arcade.dev/v1/tools
**Config Files**: 
- `config/branding.config.ts` (company name, colors, fonts)
- `config/api.config.ts` (Arcade API settings)
- `config/features.config.ts` (feature flags)

**Docker Deploy**: `docker-compose up -d`

---

**Copy this entire prompt, paste into Claude/ChatGPT/Cursor, fill in the [BRACKETS], and let AI customize it for you!**

