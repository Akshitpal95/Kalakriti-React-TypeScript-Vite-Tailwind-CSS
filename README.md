# 🏺 LoomDesk
### Powered by **Desk AI** — The Voice-First Artisan Intelligence Platform

An accessible, voice-first digital marketplace and cataloging platform engineered for underserved artisans, handloom weavers, folk painters, sculptors, and craftsmen with limited digital literacy.

---

## 🌟 Core Principle & Philosophy

A traditional master craftsman should be able to build a full professional digital marketplace presence, establish fair pricing, and sell worldwide **just by speaking**, as if they had a personal digital marketing manager in their pocket.

---

## 🚀 Key Modules & Architecture

### 1. Desk AI Assistant
The voice-first interface layer that turns spoken words and craft photographs into finished, sellable listings:
1. **Listen**: Multilingual speech recognition supporting Hindi (`hi-IN`), Indian regional languages, and English (`en-IN`).
2. **Understand**: Structures intent into profile biographical details vs. product cataloging attributes.
3. **See**: Analyzes product photos for color palettes, weave/material composition, craft technique, and hours.
4. **Generate**: Produces structured **strict JSON** (title, description, materials, craft hours, dimensions, care guide, price range).
5. **Confirm**: Reads drafts back to the artisan aloud using Text-to-Speech (**"सुनिए" / Listen**), critical for low-literacy users.
6. **Publish**: Pushes directly to the LoomDesk marketplace with 1-click export to Etsy & ONDC.

### 2. User-Friendly Onboarding (The Profile)
- **Voice-to-Text Profile Creation**: User speaks their name, craft background, district, and experience; Desk AI compiles a polished, poetic, and professional biography in both English and Hindi.
- **Workshop & Skill Demo Gallery**: Simple photo upload for workspace, looms, kilns, and tools.
- **Verified Artisan & ODOP Tagging**: Geographical Indication (GI) and One District One Product (e.g. *Varanasi Silk*, *Khurja Pottery*, *Madhubani Art*) verification badges.

### 3. AI-Powered Product Cataloging & Pricing
- **Smart Photo Analysis**: Upload or capture a photo (or test instantly with built-in artisan presets).
- **Strict JSON Output**: The vision/pricing model outputs strictly formatted JSON that directly populates the form without free-text parsing failures.
- **Transparent Fair Pricing Engine**:
  - Raw Material Cost estimate
  - Master Artisan Labor Hours & Fair Hourly Wage (`₹50` - `₹95`/hr)
  - Fair artisan profit share (~85%+) with zero middleman deductions
  - International **Etsy Benchmark Price** comparison in USD and INR ($50 - $280+)

### 4. Full Control & Customization
- **Tap-to-Edit**: Every single AI-generated field (title, description, price, dimensions, care guide) is immediately clickable and editable.
- **Dual Input**: Voice dictation buttons right on individual inputs, with standard typing always available as a fallback.
- **Field-Level Audio**: Each field has an audio listen button so low-literacy users can verify the text by ear.

### 5. Verified Marketplace & 5-Star Ratings
- High-resolution authentic craft photography with provenance district and state.
- Interactive 5-star rating and customer review system with immediate average recalculation.
- Filters by Craft Category, Origin State/Region, and Verified GI status.
- Direct artisan contact via **WhatsApp** and simulated instant **UPI / Razorpay** checkout.

### 6. Multi-Marketplace Cross-Publishing & CSR Grants
- **Etsy International Payload**: Generates SEO tags, USD price conversion, and export-ready JSON.
- **ONDC (Open Network for Digital Commerce)**: Standardized v1.2.0 retail catalog JSON for Government of India's digital commerce network.
- **Sponsorship Hub & CSR Feed**: Grants from Ministry of Textiles, Tata Trusts, and SEWA Bharat, plus a public REST API feed (`/api/v1/verified-artisans/sponsorship-feed`) for corporate CSR discovery.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti |
| **Backend & Microservice** | Node.js, Express 5, REST API routes |
| **Speech Engines** | Bhashini ULCA API, OpenAI Whisper API, Browser Web Speech API (hi-IN / en-IN) |
| **Vision & Pricing** | Vision AI Analysis Pipeline, Craft Heuristics Engine, Etsy Benchmark Signal |
| **Audio Playback** | SpeechSynthesis (Hindi & Indian English TTS) |
| **Persistence** | LocalStorage state engine with authentic Indian heritage craft seed data |

---

## 📦 How to Run

### Development Mode (Frontend HMR):
```bash
npm run dev
```

### Production Build & Server:
```bash
npm run build
npm run server
```
Access the application at: `http://localhost:5000`

---

## 🌐 API Endpoints

- `GET /api/health` — Service status & AI pipeline capabilities
- `POST /api/ai/bio-generator` — Spoken voice transcript to structured bio
- `POST /api/ai/vision-catalog` — Image + voice notes to strict catalog JSON
- `GET /api/v1/verified-artisans/sponsorship-feed` — Public feed for NGO / CSR discovery
