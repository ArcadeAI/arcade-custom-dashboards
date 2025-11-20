'use client';

import { useEffect, useState } from 'react';
import { arcadeClient } from '@/lib/arcade-client';
import { Heart, Activity, Shield, Clock, ArrowLeft, Users, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { Tool } from '@/lib/arcade-client';

export default function HealthCareDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ tools: 0, servers: 0, connections: 0, authorizedTools: 0, toolkits: 0 });
  const [tools, setTools] = useState<Tool[]>([]);
  const [toolsByCategory, setToolsByCategory] = useState<Array<{name: string, value: number, max: number}>>([]);
  const [hoveredGauge, setHoveredGauge] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [toolsRes, serversRes, authRes] = await Promise.all([
          arcadeClient.listTools({ per_page: 1 }),
          arcadeClient.listServers({ per_page: 50 }),
          arcadeClient.getAuthStatus(),
        ]);
        
        const fullTools = await arcadeClient.listTools({ per_page: 100 });
        
        // Calculate real metrics
        const authorizedCount = fullTools.data.filter(t => t.requires_auth).length;
        const toolkits = new Set(fullTools.data.map(t => t.category).filter(Boolean));
        
        // Category distribution
        const categoryCounts: Record<string, number> = {};
        fullTools.data.forEach(tool => {
          const category = tool.category || 'Other';
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        
        const topCategories = Object.entries(categoryCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([name, value]) => ({ name, value, max: Math.max(...Object.values(categoryCounts)) }));
        
        setStats({
          tools: toolsRes.total,
          servers: serversRes.total,
          connections: authRes.connections.length,
          authorizedTools: authorizedCount,
          toolkits: toolkits.size,
        });
        
        setTools(fullTools.data.slice(0, 10));
        setToolsByCategory(topCategories);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Real data vitals from API
  const vitals = [
    { label: 'Total Tools', value: stats.tools, max: stats.tools, color: '#14b8a6', icon: Activity },
    { label: 'With Auth', value: stats.authorizedTools, max: stats.tools, color: '#0ea5e9', icon: Shield },
    { label: 'Toolkits', value: stats.toolkits, max: 100, color: '#10b981', icon: CheckCircle2 },
    { label: 'Servers', value: stats.servers, max: stats.servers, color: '#06b6d4', icon: Clock },
  ];

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(180deg, #f0fdfa 0%, #ffffff 50%, #f0fdfa 100%)',
      minHeight: '100vh',
      padding: '0'
    }}>
      {/* Medical Header */}
      <header style={{ 
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: '3px solid #14b8a6',
        padding: '20px 0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(20, 184, 166, 0.25)'
              }}>
                <Heart style={{ width: '28px', height: '28px', color: 'white' }} />
              </div>
            </Link>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, letterSpacing: '-0.025em' }}>
                HealthCare Hub
              </h1>
              <p style={{ fontSize: '13px', color: '#14b8a6', margin: '2px 0 0 0', fontWeight: '500' }}>
                Custom Tool Dashboard
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '8px 16px', background: '#f0fdfa', border: '2px solid #14b8a6', borderRadius: '24px', fontSize: '12px', color: '#14b8a6', fontWeight: '700' }}>
              ● SECURE & COMPLIANT
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 32px' }}>
        {/* Vitals Dashboard - Circular Gauges */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '24px', letterSpacing: '-0.025em' }}>
            System Vitals
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {vitals.map((vital) => {
              const Icon = vital.icon;
              const percentage = vital.max > 0 ? (vital.value / vital.max) * 100 : 0;
              const circumference = 2 * Math.PI * 45;
              const strokeDashoffset = circumference - (percentage / 100) * circumference;
              
              return (
                <div 
                  key={vital.label}
                  style={{ 
                    background: 'white',
                    borderRadius: '20px',
                    padding: '28px',
                    border: '2px solid #f0fdfa',
                    boxShadow: hoveredGauge === vital.label ? '0 8px 24px rgba(20, 184, 166, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    transform: hoveredGauge === vital.label ? 'translateY(-4px)' : 'translateY(0)'
                  }}
                  onMouseEnter={() => setHoveredGauge(vital.label)}
                  onMouseLeave={() => setHoveredGauge(null)}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#f0fdfa"
                          strokeWidth="10"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={vital.color}
                          strokeWidth="10"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 1s ease' }}
                        />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '24px', height: '24px', color: vital.color, marginBottom: '4px' }} />
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>
                          {vital.value}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                      {vital.label}
                    </p>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0 0' }}>
                      {percentage.toFixed(0)}% of total
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tool Category Distribution - Real Data */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '28px', border: '2px solid #f0fdfa', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '20px' }}>
              Tools by Category
            </h3>
            
            {/* Horizontal Bar Chart - Real Data */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {toolsByCategory.map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#0f172a' }}>{item.name}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{item.value} tools</span>
                  </div>
                  <div style={{ height: '10px', background: '#f0fdfa', borderRadius: '5px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%',
                        width: `${(item.value / item.max) * 100}%`,
                        background: `hsl(${idx * 40 + 180}, 70%, 50%)`,
                        borderRadius: '5px',
                        transition: 'width 0.5s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats - Real Data */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)', borderRadius: '16px', padding: '24px', color: 'white' }}>
              <Users style={{ width: '24px', height: '24px', marginBottom: '12px', opacity: 0.9 }} />
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px' }}>{stats.tools}</div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>Available Tools</div>
            </div>
            
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '2px solid #f0fdfa' }}>
              <Shield style={{ width: '24px', height: '24px', color: '#14b8a6', marginBottom: '12px' }} />
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{stats.authorizedTools}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Secured with OAuth</div>
            </div>
          </div>
        </div>

        {/* Healthcare Tools - Card Grid */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>
              Patient Care Integrations
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              HIPAA-compliant tools for healthcare providers
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {loading ? (
              <>
                {[...Array(10)].map((_, i) => (
                  <div key={i} style={{ height: '140px', background: '#f0fdfa', borderRadius: '16px' }} />
                ))}
              </>
            ) : (
              tools.map((tool) => (
                <div 
                  key={tool.id}
                  style={{ 
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '2px solid #f0fdfa',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#14b8a6';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(20, 184, 166, 0.12)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#f0fdfa';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.02)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ 
                      width: '44px',
                      height: '44px',
                      background: 'linear-gradient(135deg, #f0fdfa, #e0f2fe)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Activity style={{ width: '22px', height: '22px', color: '#14b8a6' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', margin: '0 0 4px 0', lineHeight: '1.3' }}>
                        {tool.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.4' }}>
                        {tool.description?.slice(0, 80)}...
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #f0fdfa' }}>
                    <div style={{ 
                      padding: '4px 10px',
                      background: '#f0fdfa',
                      color: '#14b8a6',
                      fontSize: '10px',
                      fontWeight: '700',
                      borderRadius: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      ✓ ACTIVE
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      {tool.category}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* HIPAA Compliance Notice */}
        <div style={{ 
          marginTop: '40px',
          background: 'linear-gradient(135deg, #f0fdfa, #e0f2fe)',
          borderRadius: '20px',
          padding: '28px',
          border: '2px solid #14b8a6',
          textAlign: 'center'
        }}>
          <Shield style={{ width: '32px', height: '32px', color: '#14b8a6', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>
            HIPAA Compliant Infrastructure
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            All patient data is encrypted end-to-end. Our tools meet healthcare compliance standards for PHI protection.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px', background: 'white', borderTop: '1px solid #e2e8f0', marginTop: '40px' }}>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>
          HealthCare Hub • Circular Gauges • Clean Medical Design • Accessibility First
        </p>
        <Link 
          href="/"
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 24px',
            fontSize: '13px',
            color: 'white',
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)',
            borderRadius: '12px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)'
          }}
        >
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          Back to Showcase
        </Link>
      </footer>
    </div>
  );
}
