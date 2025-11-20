'use client';

import { useEffect, useState } from 'react';
import { arcadeClient, Tool } from '@/lib/arcade-client';
import { Wrench, Search, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTools() {
      try {
        setLoading(true);
        setError(null);
        const response = await arcadeClient.listTools({ per_page: 50 });
        setTools(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load tools');
      } finally {
        setLoading(false);
      }
    }
      loadTools();
  }, []);

  const filteredTools = tools.filter(tool =>
    searchQuery === '' ||
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="h-8 w-8 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 flex items-center justify-center transition-all">
            <ArrowLeft className="h-4 w-4 text-gray-400" />
          </Link>
      <div>
            <h1 className="text-2xl font-bold text-white">All Tools</h1>
            <p className="text-xs text-gray-400 mt-0.5">{filteredTools.length} tools available</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-gray-900/80 border-gray-800 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Tools Grid */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <>
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-800/50 rounded-lg animate-pulse" />
            ))}
          </>
        ) : filteredTools.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400">No tools found</p>
          </div>
        ) : (
          filteredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
              className="group text-left rounded-lg bg-gray-900/80 border border-gray-800 p-3.5 hover:border-purple-500/40 transition-all cursor-pointer"
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
                  {tool.category && (
                    <span className="inline-block mt-2 px-2 py-0.5 text-[10px] rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {tool.category}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Tool Detail Modal */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedTool(null)}>
          <div className="relative w-full max-w-2xl rounded-xl bg-gray-900 border border-gray-800 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center border border-purple-500/20">
                  <Wrench className="h-6 w-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-1">{selectedTool.name}</h2>
                  <p className="text-sm text-gray-400">{selectedTool.description}</p>
                </div>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {selectedTool.category && (
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Category</label>
                    <span className="inline-block px-3 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {selectedTool.category}
                    </span>
                  </div>
                )}

                {selectedTool.requires_auth && (
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Authentication</label>
                    <span className="inline-block px-3 py-1 text-xs rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      Requires Authorization
                    </span>
                  </div>
                )}

                {selectedTool.server_id && (
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Server ID</label>
                    <p className="text-sm text-gray-300 font-mono">{selectedTool.server_id}</p>
                  </div>
                )}

                {selectedTool.input_schema && (
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Input Schema</label>
                    <pre className="text-xs bg-gray-800 rounded-lg p-3 overflow-x-auto text-gray-300 border border-gray-700">
                      {JSON.stringify(selectedTool.input_schema, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-600 text-white rounded-lg hover:from-purple-700 hover:to-orange-700 transition-all text-sm font-medium">
                  Execute Tool
                </button>
                <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all text-sm font-medium">
                  View Docs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
