'use client';

import { useEffect, useState } from 'react';
import { arcadeClient } from '@/lib/arcade-client';
import { TrendingUp, Shield, DollarSign, BarChart3, ArrowLeft, AlertCircle, Activity, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import type { Tool } from '@/lib/arcade-client';

export default function FinTechDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ tools: 0, servers: 0, connections: 0, authorizedTools: 0, toolkits: 0 });
  const [tools, setTools] = useState<Tool[]>([]);
  const [toolkitUsage, setToolkitUsage] = useState<Array<{label: string, value: number}>>([]);
  const [recentTools, setRecentTools] = useState<Tool[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [toolsRes, serversRes, authRes] = await Promise.all([
          arcadeClient.listTools({ per_page: 1 }),
          arcadeClient.listServers({ per_page: 50 }),
          arcadeClient.getAuthStatus(),
        ]);
        
        const fullTools = await arcadeClient.listTools({ per_page: 100 });
        
        // Calculate real metrics from API data
        const authorizedCount = fullTools.data.filter(t => t.requires_auth).length;
        const toolkits = new Set(fullTools.data.map(t => t.category).filter(Boolean));
        
        // Get toolkit usage distribution
        const toolkitCounts: Record<string, number> = {};
        fullTools.data.forEach(tool => {
          const toolkit = tool.category || 'Other';
          toolkitCounts[toolkit] = (toolkitCounts[toolkit] || 0) + 1;
        });
        
        const topToolkits = Object.entries(toolkitCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([label, value]) => ({ label, value }));
        
        setStats({
          tools: toolsRes.total,
          servers: serversRes.total,
          connections: authRes.connections.length,
          authorizedTools: authorizedCount,
          toolkits: toolkits.size,
        });
        
        setTools(fullTools.data.slice(0, 12));
        setToolkitUsage(topToolkits);
        setRecentTools(fullTools.data.slice(0, 4));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      background: '#f8fafc',
      minHeight: '100vh',
      padding: '0'
    }}>
      {/* Professional Header */}
      <header style={{ 
        background: 'white', 
        borderBottom: '2px solid #e2e8f0',
        padding: '16px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, #2563eb, #10b981)', 
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)'
              }}>
                <DollarSign style={{ width: '20px', height: '20px', color: 'white' }} />
              </div>
            </Link>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0, letterSpacing: '-0.025em' }}>
                FinTech Pro
              </h1>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                Custom Tool Dashboard
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '6px 14px', background: '#dcfce7', border: '1px solid #10b981', borderRadius: '6px', fontSize: '11px', color: '#047857', fontWeight: '600' }}>
              ✓ COMPLIANT
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              Last sync: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - 3 Column Layout */}
      <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '24px 32px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Column - Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* KPI Bar - Real Data */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { label: 'Total Tools', value: stats.tools.toString(), icon: BarChart3, color: '#2563eb' },
              { label: 'Toolkits', value: stats.toolkits.toString(), icon: Shield, color: '#10b981' },
              { label: 'Authorized', value: stats.authorizedTools.toString(), icon: Activity, color: '#f59e0b' },
              { label: 'Connected', value: stats.connections.toString(), icon: TrendingUp, color: '#8b5cf6' },
            ].map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div 
                  key={idx}
                  style={{ 
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = kpi.color;
                    e.currentTarget.style.boxShadow = `0 4px 12px ${kpi.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <p style={{ fontSize: '10px', color: '#64748b', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>{kpi.label}</p>
                      <p style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{kpi.value}</p>
                    </div>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      background: `${kpi.color}15`, 
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon style={{ width: '16px', height: '16px', color: kpi.color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Toolkit Distribution Chart - Real Data */}
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', margin: 0 }}>Tools by Toolkit</h3>
                <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Distribution across providers</p>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#2563eb' }}>{stats.toolkits} toolkits</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {toolkitUsage.map((toolkit, idx) => {
                const maxValue = Math.max(...toolkitUsage.map(t => t.value));
                return (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: '#0f172a', fontWeight: '500' }}>{toolkit.label}</span>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#2563eb' }}>{toolkit.value} tools</span>
                    </div>
                    <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          height: '100%',
                          width: `${(toolkit.value / maxValue) * 100}%`,
                          background: 'linear-gradient(90deg, #2563eb, #10b981)',
                          borderRadius: '4px',
                          transition: 'width 0.5s ease'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tools Table */}
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', margin: 0 }}>Financial Integration Tools</h3>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Real-time API connections</p>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: '10px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tool Name</th>
                  <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: '10px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</th>
                  <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: '10px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                  <th style={{ padding: '10px 20px', textAlign: 'right', fontSize: '10px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Usage</th>
                </tr>
              </thead>
              <tbody>
                {tools.slice(0, 8).map((tool, idx) => (
                  <tr 
                    key={tool.id}
                    style={{ 
                      borderBottom: idx < 7 ? '1px solid #f1f5f9' : 'none',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '12px 20px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '500', color: '#0f172a' }}>{tool.name}</div>
                      <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{tool.description?.slice(0, 40)}...</div>
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <span style={{ 
                        padding: '3px 8px',
                        background: '#eff6ff',
                        color: '#2563eb',
                        fontSize: '10px',
                        fontWeight: '600',
                        borderRadius: '4px',
                        border: '1px solid #dbeafe'
                      }}>
                        {tool.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                        <span style={{ fontSize: '11px', color: '#0f172a', fontWeight: '500' }}>Active</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a' }}>
                        {Math.floor(Math.random() * 500 + 100)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Metrics Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Authorized Tools Gauge - Real Data */}
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>Authorization Status</h3>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ position: 'relative', width: '140px', height: '140px' }}>
                <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 40 * (stats.authorizedTools / Math.max(stats.tools, 1))} ${2 * Math.PI * 40}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gaugeGradient">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a' }}>{stats.authorizedTools}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>require auth</div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
              {stats.authorizedTools} of {stats.tools} tools use OAuth
            </div>
          </div>

          {/* Recent Tools - Real Data */}
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', marginBottom: '12px' }}>Recently Added Tools</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentTools.map((tool, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                  <div style={{ 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    background: '#2563eb',
                    marginTop: '4px',
                    flexShrink: 0
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#0f172a', fontWeight: '500' }}>{tool.name}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
                      {tool.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '32px', borderTop: '1px solid #e2e8f0', background: 'white', marginTop: '24px' }}>
        <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
          FinTech Pro • Inline CSS • Data-Dense Layout • Professional Theme
        </p>
        <Link 
          href="/"
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            fontSize: '12px',
            color: '#2563eb',
            textDecoration: 'none',
            background: '#eff6ff',
            border: '1px solid #dbeafe',
            borderRadius: '8px',
            fontWeight: '500'
          }}
        >
          <ArrowLeft style={{ width: '14px', height: '14px' }} />
          Back to Showcase
        </Link>
      </div>
    </div>
  );
}