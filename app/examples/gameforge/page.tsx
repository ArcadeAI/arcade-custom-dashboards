'use client';

import { useEffect, useState } from 'react';
import { arcadeClient } from '@/lib/arcade-client';
import { Wrench, Server, Shield, Activity, Sparkles, Zap, ArrowLeft } from 'lucide-react';
import type { Tool, MCPServer } from '@/lib/arcade-client';
import { BarChartSimple, LineChartSimple, DonutChart } from '@/components/analytics-chart';
import { GraphModal } from '@/components/graph-modal';
import Link from 'next/link';

export default function GameForgeDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ tools: 0, servers: 0, connections: 0 });
  const [tools, setTools] = useState<Tool[]>([]);
  const [servers, setServers] = useState<MCPServer[]>([]);
  const [expandedGraph, setExpandedGraph] = useState<{type: 'line' | 'bar' | 'donut', title: string, data: any} | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const [toolsRes, serversRes, authRes] = await Promise.all([
          arcadeClient.listTools({ per_page: 1 }),
          arcadeClient.listServers({ per_page: 50 }),
          arcadeClient.getAuthStatus(),
        ]);

        setStats({
          tools: toolsRes.total,
          servers: serversRes.total,
          connections: authRes.connections.length,
        });

        const fullToolsList = await arcadeClient.listTools({ per_page: 50 });
        setTools(fullToolsList.data);
        setServers(serversRes.data);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Link href="/" className="h-10 w-10 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 flex items-center justify-center transition-all">
          <ArrowLeft className="h-4 w-4 text-gray-400" />
        </Link>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/90 via-orange-500/90 to-purple-700/90 px-8 py-6 text-white shadow-xl backdrop-blur flex-1">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">GameForge Studio</h1>
                <p className="text-sm text-purple-100 opacity-90">
                  Custom Tool Dashboard
                </p>
              </div>
            </div>
            
            <a 
              href="/chat" 
              className="px-4 py-2 bg-white/20 backdrop-blur border border-white/30 rounded-lg text-sm font-medium hover:bg-white/30 transition-all flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Open Chat
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {loading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-800/50 rounded-xl animate-pulse" />
            ))}
          </>
        ) : (
          <>
            <div className="rounded-xl bg-gray-900/80 border border-gray-800 p-4 hover:border-purple-500/30 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Total Tools</p>
                  <p className="text-3xl font-bold text-white">{stats.tools}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                  <Wrench className="h-5 w-5 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gray-900/80 border border-gray-800 p-4 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">MCP Servers</p>
                  <p className="text-3xl font-bold text-white">{stats.servers}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center">
                  <Server className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gray-900/80 border border-gray-800 p-4 hover:border-orange-500/30 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Connections</p>
                  <p className="text-3xl font-bold text-white">{stats.connections}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-orange-400" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gray-900/80 border border-gray-800 p-4 hover:border-purple-500/30 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  <p className="text-3xl font-bold text-emerald-400">98.7%</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-purple-400" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Analytics */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div 
          className="lg:col-span-2 cursor-pointer" 
          onClick={() => setExpandedGraph({
            type: 'line',
            title: 'Tool Execution Activity - Weekly Trend',
            data: [45, 52, 48, 65, 72, 68, 85]
          })}
        >
          <LineChartSimple 
            data={[45, 52, 48, 65, 72, 68, 85]}
            title="Tool Execution Activity"
          />
        </div>
        <div 
          className="cursor-pointer"
          onClick={() => setExpandedGraph({
            type: 'donut',
            title: 'Tools by Category - Distribution',
            data: [
              { label: 'Communication', value: 8, color: '#8b5cf6' },
              { label: 'Analytics', value: 6, color: '#f97316' },
              { label: 'Integration', value: 5, color: '#10b981' },
              { label: 'Storage', value: 3, color: '#3b82f6' },
            ]
          })}
        >
          <DonutChart
            data={[
              { label: 'Communication', value: 8, color: '#8b5cf6' },
              { label: 'Analytics', value: 6, color: '#f97316' },
              { label: 'Integration', value: 5, color: '#10b981' },
              { label: 'Storage', value: 3, color: '#3b82f6' },
            ]}
            title="Tools by Category"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div 
          className="cursor-pointer"
          onClick={() => setExpandedGraph({
            type: 'bar',
            title: 'Top Tools by Usage',
            data: [
              { label: 'Discord', value: 245, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
              { label: 'GitHub', value: 189, color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
              { label: 'Slack', value: 167, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
              { label: 'Google Drive', value: 123, color: 'bg-gradient-to-r from-emerald-500 to-emerald-600' },
            ]
          })}
        >
          <BarChartSimple
            data={[
              { label: 'Discord', value: 245, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
              { label: 'GitHub', value: 189, color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
              { label: 'Slack', value: 167, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
              { label: 'Google Drive', value: 123, color: 'bg-gradient-to-r from-emerald-500 to-emerald-600' },
            ]}
            title="Top Tools by Usage"
          />
        </div>
        
        <div className="relative overflow-hidden rounded-xl bg-gray-900/80 border border-gray-800 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Server Health</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-400">API Latency</span>
                <span className="text-xs font-semibold text-emerald-400">145ms</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-400">Success Rate</span>
                <span className="text-xs font-semibold text-emerald-400">98.7%</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-[98.7%] bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-400">Uptime</span>
                <span className="text-xs font-semibold text-emerald-400">99.9%</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-[99.9%] bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Available Tools</h2>
            <p className="text-xs text-gray-500 mt-0.5">{tools.length} tools ready to use</p>
          </div>
          <a href="/tools" className="text-xs text-purple-400 hover:text-purple-300 font-medium">View all →</a>
        </div>
        
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-800/50 rounded-lg animate-pulse" />
              ))}
            </>
          ) : (
            tools.slice(0, 12).map((tool) => (
              <Link
                key={tool.id}
                href={`/tools`}
                className="group rounded-lg bg-gray-900/80 border border-gray-800 p-3.5 hover:border-purple-500/40 transition-all cursor-pointer block"
              >
                <div className="flex items-start gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
                    <Wrench className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors truncate">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Servers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">MCP Servers</h2>
            <p className="text-xs text-gray-500 mt-0.5">{servers.length} active</p>
          </div>
          <a href="/servers" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">View all →</a>
        </div>
        
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <>
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-800/50 rounded-lg animate-pulse" />
              ))}
            </>
          ) : (
            servers.slice(0, 9).map((server) => (
              <Link
                key={server.id}
                href={`/servers`}
                className="block rounded-lg bg-gray-900/80 border border-gray-800 p-3.5 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-emerald-400" />
                    <h3 className="text-sm font-medium text-white truncate">{server.name}</h3>
                  </div>
                  <span className={`h-2 w-2 rounded-full ${
                    server.status === 'active' ? 'bg-emerald-400' : 'bg-gray-600'
                  }`} />
                </div>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {server.description}
                </p>
                {server.tools_count !== undefined && (
                  <p className="text-xs text-gray-600 mt-1.5">
                    {server.tools_count} tools
                  </p>
                )}
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Graph Modal */}
      {expandedGraph && (
        <GraphModal
          isOpen={true}
          onClose={() => setExpandedGraph(null)}
          type={expandedGraph.type}
          title={expandedGraph.title}
          data={expandedGraph.data}
        />
      )}
    </div>
  );
}

