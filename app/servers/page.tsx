'use client';

import { useEffect, useState } from 'react';
import { arcadeClient, MCPServer } from '@/lib/arcade-client';
import { Server, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ServersPage() {
  const [servers, setServers] = useState<MCPServer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState<MCPServer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServers() {
      try {
        setLoading(true);
        setError(null);
        const response = await arcadeClient.listServers({ per_page: 50 });
        setServers(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load servers');
      } finally {
        setLoading(false);
      }
    }
    loadServers();
  }, []);

  const activeServers = servers.filter(s => s.status === 'active').length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="h-8 w-8 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 flex items-center justify-center transition-all">
            <ArrowLeft className="h-4 w-4 text-gray-400" />
          </Link>
      <div>
            <h1 className="text-2xl font-bold text-white">MCP Servers</h1>
            <p className="text-xs text-gray-400 mt-0.5">{activeServers} active • {servers.length} total</p>
      </div>
        </div>
      </div>

      {/* Servers Grid */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <>
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-800/50 rounded-lg animate-pulse" />
            ))}
          </>
        ) : servers.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400">No servers found</p>
          </div>
        ) : (
          servers.map((server) => (
            <button
              key={server.id}
              onClick={() => setSelectedServer(server)}
              className="text-left rounded-lg bg-gray-900/80 border border-gray-800 p-3.5 hover:border-emerald-500/40 transition-all cursor-pointer"
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
            </button>
          ))
        )}
      </div>

      {/* Server Detail Modal */}
      {selectedServer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedServer(null)}>
          <div className="relative w-full max-w-2xl rounded-xl bg-gray-900 border border-gray-800 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20">
                  <Server className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-white">{selectedServer.name}</h2>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      selectedServer.status === 'active' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-gray-600/20 text-gray-400 border border-gray-600/30'
                    }`}>
                      {selectedServer.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{selectedServer.description}</p>
                </div>
                <button
                  onClick={() => setSelectedServer(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {selectedServer.tools_count !== undefined && (
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Available Tools</label>
                    <p className="text-2xl font-bold text-white">{selectedServer.tools_count}</p>
                  </div>
                )}

                {selectedServer.id && (
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Server ID</label>
                    <p className="text-sm text-gray-300 font-mono">{selectedServer.id}</p>
                  </div>
                )}

                {selectedServer.created_at && (
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Created</label>
                    <p className="text-sm text-gray-300">
                      {new Date(selectedServer.created_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all text-sm font-medium">
                  View Server Tools
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
