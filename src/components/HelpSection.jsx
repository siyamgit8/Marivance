import React, { useState } from 'react';
import { Compass, ShieldCheck, TrendingUp, Cpu, Anchor, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HelpSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "step1",
      icon: <Compass size={22} color="#00E5FF" />,
      title: "1. Route & Cargo Formulation",
      badge: "Input Stage",
      shortDesc: "Define origin loading terminal, Indian discharge destination, and total coking coal volume.",
      details: [
        "Select international loading ports: Australia (Hay Point, Newcastle), Russia (Taman, Vostochny), USA (Baltimore, Hampton Roads), Mozambique (Nacala), or Indonesia (Kalimantan, Taboneo).",
        "Choose East Coast discharge ports: Paradip, Visakhapatnam (Vizag), Gangavaram, or Haldia Dock Complex.",
        "Adjust cargo requirement slider (from 20,000 MT up to 200,000+ MT) or select one-click executive demo presets."
      ]
    },
    {
      id: "step2",
      icon: <ShieldCheck size={22} color="#10B981" />,
      title: "2. Dual-Terminal Feasibility Check",
      badge: "Safety Gatekeeper",
      shortDesc: "Automated physical validation of vessel draft, LOA, and beam against berth constraints.",
      details: [
        "Enforces strict Under-Keel Clearance (UKC) safety rules at both origin and destination terminals.",
        "Automatically blocks Capesize (17.5m draft) and Panamax (13.5m draft) at shallow estuarine ports like Haldia (8.5m max draft) to prevent grounding risks.",
        "Validates deepwater terminals like Gangavaram (18.2m draft) and Paradip (16.5m draft) for maximum vessel economies of scale."
      ]
    },
    {
      id: "step3",
      icon: <TrendingUp size={22} color="#38BDF8" />,
      title: "3. ML Freight Rate Forecasting",
      badge: "Predictive AI",
      shortDesc: "Multi-variable XGBoost regression predicting forward spot charter rates ($/MT).",
      details: [
        "Trained on 2021–2025 historical fixture datasets with validation R² = 92.01% and RMSE = $1.42/MT.",
        "Dynamically incorporates Baltic Dry Index (BDI), VLSFO bunker fuel prices, voyage nautical distances, and Southwest Monsoon risk indices.",
        "Generates 30-day forward rate projections and uncertainty confidence envelopes."
      ]
    },
    {
      id: "step4",
      icon: <Cpu size={22} color="#A78BFA" />,
      title: "4. Prescriptive MILP Fleet Allocation",
      badge: "Mathematical Optimization",
      shortDesc: "PuLP Mixed-Integer Linear Programming allocating the lowest-cost vessel mix.",
      details: [
        "Evaluates combinations of Capesize (170k MT), Panamax (75k MT), Supramax (55k MT), and Handysize (35k MT).",
        "Applies volume discount scales (15% Capesize, 10% Panamax, 5% Supramax) while minimizing deadweight capacity slack.",
        "Solves to proven global minimum cost in under 50 milliseconds via Coin-OR CBC solver."
      ]
    },
    {
      id: "step5",
      icon: <Anchor size={22} color="#F59E0B" />,
      title: "5. Demurrage Radar & Port Diversion",
      badge: "Risk Minimization",
      shortDesc: "Quantifies pre-berthing anchor wait penalties and computes diversion arbitrage.",
      details: [
        "Monitors average queue times (e.g. 4.8 days at Paradip/Haldia vs. 1.1 days at Gangavaram).",
        "Computes excess laytime demurrage liability ($22k–$25k daily charter rates).",
        "Calculates net financial savings (up to $78,000+ per voyage) by diverting draft-restricted cargoes to private deepwater ports."
      ]
    },
    {
      id: "step6",
      icon: <MessageSquare size={22} color="#EC4899" />,
      title: "6. AI Copilot Strategy Queries",
      badge: "Grounded GenAI",
      shortDesc: "Interactive maritime intelligence copilot for instant strategic recommendations.",
      details: [
        "Ask natural language questions regarding fleet allocation decisions, Russian coal price differentials, or weather risk.",
        "Dual-engine architecture: Live Google Gemini generation with offline grounded maritime knowledge fallback.",
        "Enforces domain guardrails strictly focused on SAIL and RINL bulk logistics operations."
      ]
    }
  ];

  return (
    <section className="section" id="help">
      <div className="container">
        
        <div className="section-header text-center">
          <span className="section-tag">System Operations Guide</span>
          <h2 className="section-title">How MARIVANCE Intelligence Works</h2>
          <p className="section-desc">
            A step-by-step walkthrough of our data-to-decision pipeline designed for SAIL & RINL chartering officers and hackathon evaluators.
          </p>
        </div>

        <div className="help-layout">
          {/* Left Step Nav Cards */}
          <div className="help-steps-nav">
            {steps.map((step, idx) => (
              <div 
                key={step.id} 
                className={`help-step-card ${activeStep === idx ? 'active' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="help-step-icon">
                  {step.icon}
                </div>
                <div className="help-step-info">
                  <div className="help-step-header">
                    <span className="help-step-title">{step.title}</span>
                    <span className="help-step-badge">{step.badge}</span>
                  </div>
                  <p className="help-step-desc">{step.shortDesc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Detailed View Card */}
          <div className="help-detail-card">
            <div className="help-detail-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="help-detail-icon">
                  {steps[activeStep].icon}
                </div>
                <div>
                  <span className="help-step-badge" style={{ marginBottom: '4px', display: 'inline-block' }}>
                    {steps[activeStep].badge}
                  </span>
                  <h3 className="help-detail-title">{steps[activeStep].title}</h3>
                </div>
              </div>
            </div>

            <p className="help-detail-summary">
              {steps[activeStep].shortDesc}
            </p>

            <div className="help-detail-points">
              {steps[activeStep].details.map((point, pIdx) => (
                <div key={pIdx} className="help-point-row">
                  <CheckCircle2 size={18} color="#00E5FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="help-detail-footer">
              <a href="/main_dashboard.html" className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>
                <span>Try in Live Simulator</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
