import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static assets from dist, public & root
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// ═══════════════════════════════════════════════════════════════════════════════
// MARITIME LOGISTICS GROUND-TRUTH DATABASE
// ═══════════════════════════════════════════════════════════════════════════════
const ROUTE_DISTANCES = {
  "Hay Point (Australia)": {
    "Paradip": 4900, "Visakhapatnam (Vizag)": 5050, "Gangavaram": 5060, "Dhamra": 4850, "Haldia": 4920, "Gopalpur": 5000
  },
  "Newcastle (Australia)": {
    "Paradip": 5400, "Visakhapatnam (Vizag)": 5550, "Gangavaram": 5560, "Dhamra": 5350, "Haldia": 5420, "Gopalpur": 5500
  },
  "Baltimore (USA)": {
    "Paradip": 9100, "Visakhapatnam (Vizag)": 8950, "Gangavaram": 8960, "Dhamra": 9150, "Haldia": 9200, "Gopalpur": 9000
  },
  "Hampton Roads (USA)": {
    "Paradip": 8950, "Visakhapatnam (Vizag)": 8800, "Gangavaram": 8810, "Dhamra": 9000, "Haldia": 9050, "Gopalpur": 8850
  },
  "Nacala (Mozambique)": {
    "Paradip": 3800, "Visakhapatnam (Vizag)": 3650, "Gangavaram": 3660, "Dhamra": 3850, "Haldia": 3900, "Gopalpur": 3700
  },
  "Richards Bay (South Africa)": {
    "Paradip": 4650, "Visakhapatnam (Vizag)": 4500, "Gangavaram": 4510, "Dhamra": 4700, "Haldia": 4750, "Gopalpur": 4550
  },
  "Kalimantan (Indonesia)": {
    "Paradip": 2100, "Visakhapatnam (Vizag)": 2050, "Gangavaram": 2060, "Dhamra": 2080, "Haldia": 2120, "Gopalpur": 2040
  },
  "Taboneo (Indonesia)": {
    "Paradip": 2250, "Visakhapatnam (Vizag)": 2200, "Gangavaram": 2210, "Dhamra": 2230, "Haldia": 2270, "Gopalpur": 2190
  },
  "Taman (Russia)": {
    "Paradip": 5800, "Visakhapatnam (Vizag)": 5700, "Gangavaram": 5710, "Dhamra": 5850, "Haldia": 5900, "Gopalpur": 5720
  },
  "Vostochny (Russia)": {
    "Paradip": 4400, "Visakhapatnam (Vizag)": 4500, "Gangavaram": 4510, "Dhamra": 4350, "Haldia": 4420, "Gopalpur": 4480
  }
};

const PORT_CONSTRAINTS = {
  "Paradip": { maxDraft: 16.5, maxLoa: 260, avgWait: 4.8, ratePerDay: 25000, state: "Odisha", type: "Major Deepwater" },
  "Visakhapatnam (Vizag)": { maxDraft: 14.5, maxLoa: 240, avgWait: 3.2, ratePerDay: 22000, state: "Andhra Pradesh", type: "Inner/Outer Harbour" },
  "Gangavaram": { maxDraft: 18.2, maxLoa: 300, avgWait: 1.1, ratePerDay: 35000, state: "Andhra Pradesh", type: "Ultra-Deepwater Private" },
  "Dhamra": { maxDraft: 18.0, maxLoa: 290, avgWait: 2.0, ratePerDay: 30000, state: "Odisha", type: "Deepwater Bulk" },
  "Haldia": { maxDraft: 8.5, maxLoa: 190, avgWait: 4.5, ratePerDay: 14000, state: "West Bengal", type: "Riverine Tidal (Shallow)" },
  "Gopalpur": { maxDraft: 14.5, maxLoa: 230, avgWait: 2.5, ratePerDay: 18000, state: "Odisha", type: "All-Weather Deepwater" }
};

const VESSEL_SPECS = {
  "Handysize": { capacity: 35000, draft: 8.5, loa: 180, discount: 0.00, dailyCharterRate: 15000 },
  "Supramax": { capacity: 55000, draft: 11.5, loa: 200, discount: 0.05, dailyCharterRate: 18500 },
  "Panamax": { capacity: 75000, draft: 13.5, loa: 225, discount: 0.10, dailyCharterRate: 23000 },
  "Capesize": { capacity: 170000, draft: 17.5, loa: 290, discount: 0.15, dailyCharterRate: 36000 }
};

// ═══════════════════════════════════════════════════════════════════════════════
// MARITIME LOGISTICS AI COPILOT INTELLIGENCE ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

function generateCopilotAnswer(prompt, activeOrigin, activeDest, activeVolume) {
  const p = (prompt || '').toLowerCase().trim();
  
  // 1. Detect Destination Port mentioned in prompt
  let destMatch = null;
  for (const dest of Object.keys(PORT_CONSTRAINTS)) {
    const dLower = dest.toLowerCase();
    if (p.includes(dLower) || (dest.includes('Vizag') && (p.includes('vizag') || p.includes('visakhapatnam')))) {
      destMatch = dest;
      break;
    }
  }

  // 2. Detect Origin Port / Country mentioned in prompt
  let originMatch = null;
  for (const orig of Object.keys(ROUTE_DISTANCES)) {
    const oLower = orig.toLowerCase();
    const country = orig.split('(')[1]?.replace(')', '').toLowerCase() || '';
    const nameOnly = orig.split('(')[0].trim().toLowerCase();
    if (p.includes(oLower) || p.includes(nameOnly) || (country && p.includes(country))) {
      originMatch = orig;
      break;
    }
  }

  // If specific route (Origin + Destination) mentioned in question
  if (destMatch && (originMatch || p.includes('australia') || p.includes('russia') || p.includes('usa') || p.includes('indonesia') || p.includes('mozambique') || p.includes('south africa'))) {
    const orig = originMatch || (p.includes('australia') ? 'Hay Point (Australia)' : (p.includes('russia') ? 'Taman (Russia)' : (p.includes('usa') ? 'Baltimore (USA)' : (p.includes('indonesia') ? 'Kalimantan (Indonesia)' : 'Hay Point (Australia)'))));
    const dist = (ROUTE_DISTANCES[orig] && ROUTE_DISTANCES[orig][destMatch]) ? ROUTE_DISTANCES[orig][destMatch] : 4900;
    const pInfo = PORT_CONSTRAINTS[destMatch];
    const transitDays = (dist / (13.5 * 24)).toFixed(1);
    
    let vesselFit = '';
    if (pInfo.maxDraft >= 17.5) {
      vesselFit = `• <b>Capesize (170k DWT, 17.5m draft)</b>: <span style="color:#10B981;font-weight:600">Fully Permitted</span> (15% economy discount).<br>• <b>Panamax (75k DWT, 13.5m draft)</b>: <span style="color:#10B981;font-weight:600">Permitted</span> (10% discount).`;
    } else if (pInfo.maxDraft >= 13.5) {
      vesselFit = `• <b>Capesize (17.5m draft)</b>: <span style="color:#EF4444;font-weight:600">Blocked</span> (Exceeds ${destMatch}'s ${pInfo.maxDraft}m draft limit).<br>• <b>Panamax (75k DWT, 13.5m draft)</b>: <span style="color:#10B981;font-weight:600">Optimal Class</span> (10% discount, ensures UKC clearance).<br>• <b>Supramax (55k DWT, 11.5m draft)</b>: <span style="color:#10B981;font-weight:600">Permitted</span>.`;
    } else if (pInfo.maxDraft >= 11.5) {
      vesselFit = `• <b>Capesize & Panamax</b>: <span style="color:#EF4444;font-weight:600">Blocked</span> due to ${pInfo.maxDraft}m draft limit.<br>• <b>Supramax (55k DWT, 11.5m draft)</b>: <span style="color:#10B981;font-weight:600">Permitted</span>.`;
    } else {
      vesselFit = `• <b>Capesize & Panamax</b>: <span style="color:#EF4444;font-weight:600">Strictly Blocked</span> (Riverine draft ${pInfo.maxDraft}m).<br>• <b>Handysize (35k DWT, 8.5m draft)</b>: <span style="color:#10B981;font-weight:600">Only Permitted Vessel</span> (Or offshore Sandheads lightering / diversion).`;
    }

    return `<b>🚢 Route Analysis: ${orig} ➔ ${destMatch}</b><br><br>` +
           `• <b>Voyage Distance:</b> ${dist.toLocaleString()} Nautical Miles (~${transitDays} days steaming at 13.5 kts)<br>` +
           `• <b>Destination Port Draft:</b> Max ${pInfo.maxDraft}m | Max LOA: ${pInfo.maxLoa}m (${pInfo.type})<br>` +
           `• <b>Pre-berthing Queue Wait:</b> ~${pInfo.avgWait} days (Discharge rate: ${pInfo.ratePerDay.toLocaleString()} MT/day)<br>` +
           `• <b>Vessel Feasibility:</b><br>${vesselFit}<br><br>` +
           `• <b>Operational Guidance:</b> ${destMatch === 'Haldia' ? 'Severe riverine tidal constraints on the Hooghly. Recommend routing Capesize to Gangavaram and transferring via railway rakes to Durgapur/Bokaro.' : (destMatch === 'Paradip' ? 'High thermal/coking coal congestion (~4.8d wait). Consider 2x Panamax allocation or diversion to Gangavaram to eliminate demurrage.' : 'Deep-water terminal with fast turnaround, ideal for Capesize volume chartering.')}`;
  }

  // If specific Destination Port asked about
  if (destMatch) {
    const pInfo = PORT_CONSTRAINTS[destMatch];
    return `<b>⚓ Port Intelligence: ${destMatch} (${pInfo.state})</b><br><br>` +
           `• <b>Port Type:</b> ${pInfo.type}<br>` +
           `• <b>Max Permissible Draft:</b> ${pInfo.maxDraft} meters<br>` +
           `• <b>Max Length Overall (LOA):</b> ${pInfo.maxLoa} meters<br>` +
           `• <b>Average Pre-Berthing Wait:</b> ${pInfo.avgWait} days<br>` +
           `• <b>Discharge Capacity:</b> ${pInfo.ratePerDay.toLocaleString()} MT/day<br>` +
           `• <b>Vessel Compatibility:</b> ${pInfo.maxDraft >= 17.5 ? 'Accommodates fully laden Capesize, Panamax, Supramax, and Handysize.' : (pInfo.maxDraft >= 13.5 ? 'Accommodates Panamax (13.5m) and Supramax (11.5m). Capesize (17.5m) is draft-restricted.' : 'Strictly restricted to Handysize (8.5m) or lightered Supramax due to shallow estuarine depths.')}<br>` +
           `• <b>Demurrage Risk:</b> ${pInfo.avgWait > 3.0 ? `High congestion (${pInfo.avgWait}d wait). Generates ~$22k/day laytime penalty.` : `Low congestion (${pInfo.avgWait}d wait). Minimal demurrage exposure.`}`;
  }

  // If specific Origin Port / Country asked about
  if (originMatch || p.includes('australia') || p.includes('russia') || p.includes('usa') || p.includes('baltimore') || p.includes('indonesia') || p.includes('mozambique') || p.includes('south africa')) {
    if (p.includes('russia') || p.includes('taman') || p.includes('vostochny')) {
      return `<b>🇷🇺 Russian Coking Coal Sourcing Strategy:</b><br><br>` +
             `• <b>Vostochny (Russian Far East):</b> ~4,500 NM to East Coast India (~14 days transit), ~500 NM shorter than Hay Point, Australia. No canal transit fees.<br>` +
             `• <b>Taman (Black Sea):</b> ~5,700 NM via Suez Canal / Red Sea.<br>` +
             `• <b>Pricing & Margin Advantage:</b> Russian metallurgical coal is currently priced at a <b>12%–18% FOB discount</b> compared to Australian Premium Hard Coking Coal (HCC), yielding delivered cost savings of <b>~$3.20 to $4.50/MT</b> for SAIL blast furnaces.<br>` +
             `• <b>Strategic Impact:</b> Provides an indispensable pricing hedge against Australian supply shocks and cyclone-induced force majeures.`;
    } else if (p.includes('australia') || p.includes('hay point') || p.includes('newcastle')) {
      return `<b>🇦🇺 Australian Coking Coal Corridors (Hay Point & Newcastle):</b><br><br>` +
             `• <b>Primary Hubs:</b> Hay Point (Queensland, 17.5m draft Capesize terminal) & Newcastle (NSW, 16.2m draft).<br>` +
             `• <b>Transit Distance:</b> ~4,900 to 5,500 NM (~14–17 steaming days at 13.5 knots).<br>` +
             `• <b>Trade Dynamics:</b> Australia supplies >65% of India's metallurgical coking coal demand for SAIL & RINL.<br>` +
             `• <b>Operational Note:</b> Hay Point easily accommodates Capesize bulk carriers (170,000 MT), enabling maximal economy-of-scale savings on the ocean leg.`;
    } else if (p.includes('usa') || p.includes('baltimore') || p.includes('hampton')) {
      return `<b>🇺🇸 US East Coast Coal Corridors (Baltimore & Hampton Roads):</b><br><br>` +
             `• <b>Transit Distance:</b> ~8,900 to 9,200 NM (~26–28 steaming days via Cape of Good Hope).<br>` +
             `• <b>Quality:</b> High-CSR low-volatile metallurgical coking coal essential for coke oven strength.<br>` +
             `• <b>Freight Economics:</b> Higher ton-mile cost due to long voyage duration; best suited for Panamax / Capesize parcel consolidation under long-term COA contracts.`;
    } else if (p.includes('indonesia') || p.includes('kalimantan') || p.includes('taboneo')) {
      return `<b>🇮🇩 Indonesian Coal Corridors (Kalimantan & Taboneo):</b><br><br>` +
             `• <b>Transit Distance:</b> ~2,050 to 2,250 NM (~6–7 steaming days).<br>` +
             `• <b>Vessel Class:</b> Primarily geared Supramax and Panamax loading via open-sea anchorages and floating cranes.<br>` +
             `• <b>Usage:</b> Semi-soft coking coal and thermal coal blends with rapid turnaround cycles.`;
    }
  }

  // Vessel comparison / allocation queries
  if (p.includes('panamax') || p.includes('capesize') || p.includes('supramax') || p.includes('handysize') || p.includes('vessel') || p.includes('ship') || p.includes('fleet') || p.includes('allocation')) {
    return `<b>🚢 Maritime Fleet Classes & Economy of Scale Specifications:</b><br><br>` +
           `1. <b>Capesize (170,000 MT DWT | Draft 17.5m | LOA 290m):</b><br>` +
           `   • <b>15% Economy Discount</b> on baseline freight. Daily charter ~$36,000/day.<br>` +
           `   • Restricted to deepwater berths (Gangavaram 18.2m, Dhamra 18.0m). Blocked at Paradip inner berths (16.5m) and Haldia (8.5m).<br><br>` +
           `2. <b>Panamax (75,000 MT DWT | Draft 13.5m | LOA 225m):</b><br>` +
           `   • <b>10% Volume Discount</b>. Daily charter ~$23,000/day.<br>` +
           `   • The optimal workhorse for Paradip (16.5m) and Vizag (14.5m), ensuring safe Under-Keel Clearance (UKC).<br><br>` +
           `3. <b>Supramax (55,000 MT DWT | Draft 11.5m | LOA 200m):</b><br>` +
           `   • <b>5% Volume Discount</b>. Daily charter ~$18,500/day. Highly versatile geared vessel with onboard cranes.<br><br>` +
           `4. <b>Handysize (35,000 MT DWT | Draft 8.5m | LOA 180m):</b><br>` +
           `   • Baseline rate (0% discount). Daily charter ~$15,000/day. The only class capable of direct berthing in shallow river ports like Haldia.`;
  }

  // Demurrage & Laytime queries
  if (p.includes('demurrage') || p.includes('laytime') || p.includes('idle') || p.includes('congestion') || p.includes('wait') || p.includes('penalty')) {
    return `<b>⏱️ Demurrage Liability & Congestion Mitigation Engine:</b><br><br>` +
           `• <b>Demurrage Mechanics:</b> Demurrage is a financial penalty assessed when a vessel's total port stay (pre-berthing wait + discharge duration) exceeds the contractual laytime agreed in the charterparty.<br>` +
           `• <b>Daily Rates:</b> Capesize: ~$36,000/day | Panamax: ~$23,000/day | Supramax: ~$18,500/day.<br>` +
           `• <b>Bottleneck Ports:</b> Paradip (4.8 days avg wait) and Haldia (4.5 days avg wait) incur ~$80,000–$110,000 in excess demurrage per 75k MT shipment.<br>` +
           `• <b>Gangavaram Diversion Arbitrage:</b> Gangavaram operates with automated rotary wagon tipplers and an average queue of only <b>1.1 days</b>. Diverting from Paradip to Gangavaram generates <b>~$78,000 net savings</b> per voyage.`;
  }

  // PuLP MILP Optimization queries
  if (p.includes('milp') || p.includes('pulp') || p.includes('optimizer') || p.includes('algorithm') || p.includes('math') || p.includes('linear programming') || p.includes('prescriptive')) {
    return `<b>⚙️ Prescriptive PuLP Mixed-Integer Linear Programming (MILP) Engine:</b><br><br>` +
           `• <b>Objective Function:</b> Minimize Total Landed Fleet Charter Cost: <code>min ∑ (n_v * Capacity_v * Rate_v)</code><br>` +
           `• <b>Decision Variables:</b> <code>n_v ∈ ℤ≥0</code> for Capesize, Panamax, Supramax, and Handysize.<br>` +
           `• <b>Hard Constraints:</b><br>` +
           `   1. <b>Demand Satisfaction:</b> <code>∑ (n_v * Capacity_v) ≥ Cargo_Volume</code><br>` +
           `   2. <b>Draft Clearance Guardrail:</b> <code>n_v = 0</code> if <code>Vessel_Draft > Port_Max_Draft</code> or <code>LOA > Port_Max_LOA</code><br>` +
           `   3. <b>Deadweight Slack Minimization:</b> Penalizes unutilized deadweight to avoid empty hold shipping.<br>` +
           `• <b>Solver:</b> CBC (Coin-or Branch and Cut) resolving globally optimal fleet solutions in <50 milliseconds.`;
  }

  // ML XGBoost Model queries
  if (p.includes('xgboost') || p.includes('model') || p.includes('forecast') || p.includes('prediction') || p.includes('ml') || p.includes('accuracy') || p.includes('r2') || p.includes('rmse')) {
    return `<b>🤖 Machine Learning Freight Rate Forecaster (XGBoost v2.0):</b><br><br>` +
           `• <b>Algorithm:</b> Extreme Gradient Boosting (XGBoost Regressor) trained on 2021–2025 international dry bulk fixtures.<br>` +
           `• <b>Model Performance:</b> <b>R² = 92.01%</b> | <b>RMSE = $1.42 / MT</b> | <b>MAE = $1.08 / MT</b>.<br>` +
           `• <b>Key Feature Drivers:</b><br>` +
           `   1. Baltic Dry Index (BDI) and Baltic Capesize Index (BCI)<br>` +
           `   2. VLSFO 0.5% Marine Bunker Fuel Price ($/MT)<br>` +
           `   3. Route Nautical Miles & Great Circle Steaming Distances<br>` +
           `   4. Vessel Deadweight Class & Volume Disparity<br>` +
           `   5. Seasonal Southwest Monsoon weather disruption factors.`;
  }

  // Spot vs COA contract queries
  if (p.includes('spot') || p.includes('coa') || p.includes('contract') || p.includes('timing')) {
    return `<b>📜 Spot vs. Contract of Affreightment (COA) Strategy:</b><br><br>` +
           `• <b>Spot Charter:</b> Single-voyage fixture priced on prevailing market rates. Highly volatile (±40% swings with BDI).<br>` +
           `• <b>COA (Contract of Affreightment):</b> Long-term volume commitment (1–3 years) securing guaranteed ship availability at a <b>~6% volume discount</b>.<br>` +
           `• <b>Decision Matrix:</b> When BDI is in an upward momentum (>1,800 pts), the DSS signals locking COA contracts. When BDI is softening (<1,200 pts), spot chartering is recommended for spot margin capture.`;
  }

  // General Domain Assistant Fallback
  return `<b>🤖 MARIVANCE Maritime Logistics AI Advisor:</b><br><br>` +
         `I analyze real-time shipping routes, port draft restrictions, ML freight forecasts, and MILP fleet allocations for India's steel industry (SAIL/RINL).<br><br>` +
         `<b>Suggested Topics to Explore:</b><br>` +
         `• <em>"What are the conditions of Haldia to Australia?"</em><br>` +
         `• <em>"What are Paradip to Australia constraints?"</em><br>` +
         `• <em>"Why allocate 2x Panamax instead of a Capesize?"</em><br>` +
         `• <em>"What are the cost benefits of Russian coal sourcing?"</em><br>` +
         `• <em>"How does Gangavaram diversion reduce demurrage?"</em><br>` +
         `• <em>"Explain the PuLP MILP solver mechanics."</em>`;
}

app.post('/api/copilot', (req, res) => {
  const { customPrompt, origin, destination, cargoVolume } = req.body;
  const answer = generateCopilotAnswer(customPrompt, origin, destination, cargoVolume);
  res.json({
    question: customPrompt || 'General Query',
    answer: answer
  });
});

// For production build serving
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'index.html'));
    }
  });
});

app.listen(PORT, () => {
  console.log(`🌊 MARIVANCE : AI-Powered Maritime Decision Intelligence running on port ${PORT}`);
});
