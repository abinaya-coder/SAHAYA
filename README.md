# NHAA Victim Support & Vulnerability Assessment Platform (SAHAYA)
> **AI-assisted support prioritization for victim-centred grievance response**
> Designed for the **National Helpline Against Atrocities (NHAA - 14566)**

---

## 📌 Non-Clinical & Human-in-the-Loop Mandate

> [!IMPORTANT]
> **Strict Non-Clinical & Decision-Support System**:
> - The platform **NEVER** presents AI findings as a medical or psychiatric diagnosis.
> - It acts exclusively as an AI-assisted assessment and prioritization system that supports authorized NHAA officers, counsellors, legal aid teams, and relevant authorities.
> - All AI recommendations **MUST** be subject to human review and officer verification before any intervention is approved or executed.

---

## 🌟 Key Features

- **Professional Public-Service Interface**: Deep Navy (`#0B192C`) & Soft Teal palette optimized for trust, safety, privacy, and accessibility. Supports Light Mode ☀, Dark Mode 🌙, and System Default ⚙ themes.
- **Official Authentication & Profile Setup**: Split-screen official login with secure confidential access disclaimers and multi-role profile setup (*NHAA Officer, Counsellor, Legal Support, Case Manager, Administrator*).
- **Executive Priority Dashboard**: Real-time summary stat cards (*1,284 Total Cases, 18 Critical, 94 High, 321 Moderate, 851 Low*) and priority case tracking.
- **Explainable Stress Vulnerability Index (SVI)**: Circular 0–100 SVI score gauge, risk bands, and an explainable breakdown (*"Why was this case prioritized?"*) identifying detected threat, fear, repeated intimidation, and distress indicators.
- **Recommended Support Pathways**: Actionable recommendations for Counselling, Legal Aid, Safety/Police Assessment, and Emergency Support with 5 officer action triggers.
- **NHAA AI Support Assistant**: Dedicated AI chatbot with independent victim language selection, voice/text intake, non-clinical disclaimers, and automated `[ Request Human Assistance ]` triggers upon detecting physical danger or severe distress.
- **Centralized Global 6-Language i18n System**: Seamlessly translates all UI navigation, buttons, cards, forms, settings, and tables across **English, Tamil (தமிழ்), Hindi (हिंदी), Telugu (తెలుగు), Kannada (கன்னட), and Malayalam (മലയാളം)** while preserving case IDs and numeric metrics cleanly.
- **Comprehensive Settings & Accessibility**: Controls for profile management, appearance, notification alerts, session security, high contrast, font sizing, and reduced motion.

---

## 🏗️ System Architecture & Tech Stack

### **Frontend**
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (Navy/Teal Public-Service Theme)
- **Icons & Data Viz**: Lucide React + Recharts
- **State & i18n**: Centralized React Context Providers (`LanguageContext`, `ThemeContext`, `AuthContext`, `CaseContext`)

### **Backend**
- **Framework**: Python 3.10+ FastAPI + Uvicorn
- **Engine**: Rule-assisted NLP analysis engine, SVI scoring algorithms, speech analysis pipeline
- **API Server**: Mounts frontend production bundle and serves single-port API & static assets on port `8000`

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+) & `npm`
- Python 3.10+ & `pip`

### 1. Clone Repository
```bash
git clone https://github.com/abinaya-coder/SAHAYA.git
cd SAHAYA
```

### 2. Run Single-Port Unified Application
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

### 3. Access Application
- **Main Platform Dashboard**: [http://localhost:8000/](http://localhost:8000/)
- **Interactive Backend API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛠️ Development & Building

If modifying the frontend React code:

```bash
cd frontend
npm install
npm run dev        # Standalone Vite Dev Server (http://localhost:5173)
npm run build      # Builds production bundle to frontend/dist
```

---

## 📜 Confidentiality & Compliance Notice

*Authorized personnel only. All case information handled within this platform is strictly confidential under National Helpline Against Atrocities (NHAA) data governance protocols.*
