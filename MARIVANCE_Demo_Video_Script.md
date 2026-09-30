# 🎬 MARIVANCE: 3-Minute Video Demo Script & Presentation Guide

**Project Name:** MARIVANCE — AI-Powered Maritime Decision Support System  
**Audience:** Ministry of Steel, SAIL, RINL, Hackathon Jury & Stakeholders  
**Tone:** Confident, Authoritative, Professional (Maritime Logistics & AI Engineering)  
**Total Target Duration:** 3:00 Minutes (180 Seconds)

---

## ⏱️ Video Breakdown & Timestamp Cue Sheet

| Timestamp | Section / Tab | Screen Action | Key Highlights |
| :--- | :--- | :--- | :--- |
| **0:00 – 0:30** | **Intro & Landing Page** | Show Landing Page, scroll Hero, click *"Open Dashboard"* | $35M–$60M coal logistics problem, SAIL/RINL context |
| **0:30 – 1:05** | **Tab 1: Live Simulator** | Set Hay Point ➔ Paradip (150,000 MT), show 3D Globe | XGBoost ML ($R^2=92.01\%$), BDI ticker, 4,900 NM route |
| **1:05 – 1:35** | **Tab 2: Waterline Feasibility** | Click *"Waterline Feasibility"*, show Draft vs LOA limits | Draft gatekeeper, Capesize blocked at Paradip/Haldia |
| **1:35 – 2:10** | **Tab 3: Fleet Optimizer** | Click *"Fleet Optimizer"*, show 2x Panamax allocation | PuLP MILP solver, 10% discount, zero deadweight slack |
| **2:10 – 2:35** | **Tab 4: Operational Alerts** | Click *"Operational Alerts"*, show Gangavaram savings | Demurrage liability ($22k/day), $78k diversion arbitrage |
| **2:35 – 3:00** | **Tab 5 & 6: Copilot & Matrix** | Query AI Copilot (*"Haldia to Australia"*), show Port Matrix | Dynamic Copilot NLP, single source of truth, conclusion |

---

## 🎙️ Complete Voiceover Script with Visual Directions

### **Part 1: Introduction & The Problem Statement (0:00 – 0:30)**
* **Visual Action:** Start on the landing page (`http://localhost:3000/`). Smoothly scroll through the Hero Section, display the high-level HUD metric cards ($34.20 XGBoost forecast, PuLP MILP solver badge), and click the primary **"Open Dashboard"** button.
* **Voiceover:**
  > *"Hello everyone. Today, I'm excited to present **MARIVANCE** — an AI-Powered Maritime Decision Support and Prescriptive Fleet Optimization System built for the Ministry of Steel and India's major steel producers like SAIL and RINL.*
  >
  > *India imports over 15 to 20 Million Tonnes of metallurgical coking coal annually from Australia, Russia, and the US. However, extreme freight market volatility, port congestion, and rigid draft constraints cause tens of millions of dollars in demurrage penalties and freight inefficiencies each year.*
  >
  > *MARIVANCE solves this by fusing **XGBoost Machine Learning**, **PuLP Mixed-Integer Linear Programming**, and real-time **Maritime Intelligence**."*

---

### **Part 2: Tab 1 — Live Simulator & 3D Geospatial Command (0:30 – 1:05)**
* **Visual Action:** Inside the main dashboard, stay on the **Live Simulator** tab. Change the Origin to **"Hay Point (Australia)"**, Destination to **"Paradip"**, and drag the Cargo Volume slider to **150,000 MT**. Hover over the 3D globe and live KPI cards.
* **Voiceover:**
  > *"Let's enter our main command dashboard. First, in the **Live Simulator**, logistics officers can simulate any international voyage.*
  >
  > *Here, I'm setting a 150,000 MT coking coal shipment from Hay Point, Australia to Paradip Port. Instantly, our **XGBoost Regressor model (with 92.01% R² accuracy)** predicts the forward freight rate based on live Baltic Dry Index (BDI) and marine bunker fuel prices.*
  >
  > *Notice the 3D globe rendering the great-circle sea lanes and calculating the exact 4,900 Nautical Mile transit."*

---

### **Part 3: Tab 2 — Waterline Feasibility & Physical Gatekeeper (1:05 – 1:35)**
* **Visual Action:** Click on **"Waterline Feasibility"** in the sidebar. Show the Draft and LOA clearance bars and the red blocked badges.
* **Voiceover:**
  > *"Next is the **Waterline Feasibility** engine. In maritime logistics, chartering a vessel that is too large causes catastrophic groundings.*
  >
  > *This tab acts as an automated physical gatekeeper. For Paradip, with its 16.5m draft, a fully laden Capesize vessel requiring 17.5m draft is strictly flagged as **Blocked** to protect Under-Keel Clearance (UKC). At shallow riverine ports like Haldia (8.5m draft), the system automatically restricts chartering to Handysize vessels."*

---

### **Part 4: Tab 3 — Fleet Optimizer (PuLP MILP Prescriptive Solver) (1:35 – 2:10)**
* **Visual Action:** Click on **"Fleet Optimizer"**. Highlight the recommended fleet breakdown card (`2x Panamax`) and the cost optimization metrics.
* **Voiceover:**
  > *"Now, the core mathematics: the **Fleet Optimizer** tab.*
  >
  > *Using **PuLP Mixed-Integer Linear Programming (MILP)** with the CBC solver, MARIVANCE solves for the globally cost-optimal fleet combination within 50 milliseconds.*
  >
  > *For our 150,000 MT cargo to Paradip, instead of risking an infeasible Capesize, the solver prescribes **2x Panamax bulk carriers (75,000 MT each)**. This fulfills 100% of the volume, captures a 10% economy-of-scale discount, and eliminates unutilized deadweight slack."*

---

### **Part 5: Tab 4 — Operational Alerts & Demurrage Risk Radar (2:10 – 2:35)**
* **Visual Action:** Click on **"Operational Alerts"**. Point to the port congestion wait times and the **Gangavaram Diversion Arbitrage** card.
* **Voiceover:**
  > *"Under **Operational Alerts**, we tackle the multi-million dollar issue of **Demurrage**.*
  >
  > *Paradip faces high pre-berthing queues averaging 4.8 days, triggering over $100,000 in laytime penalties. The system computes a **Deepwater Diversion Arbitrage**: by diverting cargo to Gangavaram Port — which has an automated 1.1-day turnaround — SAIL saves **up to $78,000 net per voyage**."*

---

### **Part 6: Tab 5 & 6 — Logistics AI Copilot, Port Matrix & Conclusion (2:35 – 3:00)**
* **Visual Action:** Click **"AI Copilot"**, type *"what are the conditions of the haldia to australia"*, click Send. Show the detailed instant answer. Then quickly click **"Port Matrix"** to showcase the full terminal parameters.
* **Voiceover:**
  > *"Finally, we have the **Logistics AI Copilot**. Decision-makers can ask natural language questions in real-time. For example, asking about Haldia to Australia immediately provides the exact 8.5m tidal river draft constraints, 4,920 NM distance, and lighterage recommendations.*
  >
  > *The **Port Matrix** tab provides a single source of truth for all Indian coal terminals.*
  >
  > *In summary, MARIVANCE transforms complex maritime variables into actionable, mathematical decision intelligence — reducing freight costs and securing India's strategic raw material supply chain. Thank you!"*

---

## 📋 Pro Recording Checklist
1. **Screen Resolution**: 1920x1080 (1080p), Fullscreen (`F11`).
2. **Audio Quality**: Clear microphone input with noise cancellation.
3. **Cursor Pacing**: Smooth, deliberate cursor movements to emphasize KPI numbers.
4. **Browser**: Keep local server running at `http://localhost:3000/`.
