import React from 'react';
import { Ship, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="navbar" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      paddingTop: '20px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 4vw'
      }}>
        {/* Left Corner: Brand Symbol */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(99, 102, 241, 0.3))',
            border: '1px solid rgba(0, 229, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00E5FF'
          }}>
            <Ship size={22} />
          </div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '0.04em',
            color: '#FFFFFF'
          }}>
            MARIVANCE
          </span>
        </a>

        {/* Center: Glass Pill Menu */}
        <nav style={{ 
          display: 'flex', 
          gap: '32px', 
          alignItems: 'center',
          background: 'rgba(2, 6, 15, 0.45)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          padding: '10px 32px',
          borderRadius: '9999px'
        }}>
          <a href="#overview" style={{ color: '#E2E8F0', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, transition: 'color 0.2s' }}>Overview</a>
          <a href="#help" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, transition: 'color 0.2s' }}>Help</a>
          <a href="#faqs" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, transition: 'color 0.2s' }}>FAQs</a>
        </nav>

        {/* Right Corner: Direct Launch Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/main_dashboard.html" className="btn btn-primary" style={{ 
            borderRadius: '9999px', 
            padding: '10px 24px', 
            fontSize: '0.88rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#fff',
            background: 'linear-gradient(135deg, #00E5FF, #0072FF)',
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)',
            fontWeight: 600,
            transition: 'all 0.2s ease'
          }}>
            <span>Open Dashboard</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
