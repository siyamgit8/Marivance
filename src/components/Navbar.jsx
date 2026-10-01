import React, { useState, useEffect } from 'react';
import { Ship, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('overview');

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    setActiveTab(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -90; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'help', 'faqs'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <a href="#" onClick={(e) => scrollToSection(e, 'overview')} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
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
          gap: '6px', 
          alignItems: 'center',
          background: 'rgba(2, 6, 15, 0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
          padding: '5px 8px',
          borderRadius: '9999px'
        }}>
          <button 
            onClick={(e) => scrollToSection(e, 'overview')} 
            style={{ 
              background: activeTab === 'overview' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
              color: activeTab === 'overview' ? '#FFFFFF' : '#94A3B8',
              border: activeTab === 'overview' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
              fontSize: '0.85rem', 
              fontWeight: activeTab === 'overview' ? 600 : 500, 
              padding: '6px 18px',
              borderRadius: '9999px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Overview
          </button>
          
          <button 
            onClick={(e) => scrollToSection(e, 'help')} 
            style={{ 
              background: activeTab === 'help' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
              color: activeTab === 'help' ? '#FFFFFF' : '#94A3B8',
              border: activeTab === 'help' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
              fontSize: '0.85rem', 
              fontWeight: activeTab === 'help' ? 600 : 500, 
              padding: '6px 18px',
              borderRadius: '9999px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Help
          </button>

          <button 
            onClick={(e) => scrollToSection(e, 'faqs')} 
            style={{ 
              background: activeTab === 'faqs' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
              color: activeTab === 'faqs' ? '#FFFFFF' : '#94A3B8',
              border: activeTab === 'faqs' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
              fontSize: '0.85rem', 
              fontWeight: activeTab === 'faqs' ? 600 : 500, 
              padding: '6px 18px',
              borderRadius: '9999px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            FAQs
          </button>
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
