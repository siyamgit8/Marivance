import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How does MARIVANCE solve the riverine draft bottleneck at Haldia Port?",
      a: "Haldia Dock Complex (HDC) is constrained by a maximum estuarine river draft of 8.5 meters. Our Dual-Terminal Physical Gatekeeper automatically restricts Haldia discharge to Handysize vessels (~35,000 MT) or partially lightened Supramax. For larger 75,000 MT or 150,000 MT shipments, the DSS suggests offshore Ship-to-Ship (STS) lighterage at Sandheads or complete discharge at deepwater ports like Gangavaram (18.2m draft) and Paradip (16.5m draft)."
    },
    {
      q: "What machine learning architecture is used for freight forecasting, and how accurate is it?",
      a: "We utilize an XGBoost Regressor trained on multi-year coking coal fixtures across 10 global trade lanes. The model achieves an R² score of 92.01% with a Root Mean Squared Error (RMSE) of $1.42/MT. It dynamically factors in the Baltic Dry Index (BDI), VLSFO bunker fuel prices, voyage nautical distances, and Southwest Monsoon risk indicators."
    },
    {
      q: "How does the PuLP Mixed-Integer Linear Programming (MILP) fleet optimizer work?",
      a: "Instead of relying on manual trial-and-error, our mathematical optimizer models vessel chartering as a Mixed-Integer Linear Program. It minimizes the total objective cost function: Cost = Sum(n_v * Capacity_v * FreightRate * (1 - Discount_v)), subject to satisfying the total cargo requirement and ensuring all selected vessels comply with both origin and discharge draft limits in under 50 milliseconds."
    },
    {
      q: "How does the Demurrage Risk Radar calculate cost savings?",
      a: "Public ports like Paradip and Haldia experience average pre-berthing anchor queues of 4.5 to 4.8 days, which costs approximately $22,000/day in contractual laytime penalties. The Demurrage Radar compares the total delivered cost against faster private deepwater ports like Gangavaram (average wait of 1.1 days), quantifying net financial savings of up to $78,000–$87,000 per voyage."
    },
    {
      q: "How does the system recommend Spot vs. Contract of Affreightment (COA) timing?",
      a: "MARIVANCE computes a 30-day forward freight trajectory with upper and lower confidence envelopes. When forward rates are projected to rise due to winter demand or bunker surges, the DSS signals an early 'Lock Medium-Term COA' recommendation to hedge costs. When markets are in a downward cyclical trend, it advises procuring through the spot market."
    },
    {
      q: "Is the AI Copilot reliable if external internet or API keys are unavailable?",
      a: "Yes. MARIVANCE features a robust Dual-Engine Copilot architecture. If an active Google Gemini API key is present, it provides live multimodal generative responses. If offline or without an API key, it seamlessly switches to an evergreen grounded local semantic engine with zero runtime dependencies, ensuring 100% availability during hackathon demonstrations and internal network deployments."
    }
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section" id="faqs">
      <div className="container">
        
        <div className="section-header text-center">
          <span className="section-tag">Knowledge Base & FAQs</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Common questions regarding SAIL coking coal logistics, mathematical optimization, and the MARIVANCE decision engine.
          </p>
        </div>

        <div className="faqs-container">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HelpCircle size={18} color="#00E5FF" style={{ flexShrink: 0 }} />
                    <span className="faq-question-text">{faq.q}</span>
                  </div>
                  <div className={`faq-chevron ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={18} color="#38BDF8" />
                  </div>
                </div>
                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
