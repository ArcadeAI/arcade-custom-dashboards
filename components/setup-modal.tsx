'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

export function SetupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if API key is configured on server
    async function checkConfig() {
      try {
        const response = await fetch('/api/config/status');
        const data = await response.json();
        
        // Only show modal if API key is NOT configured
        if (!data.configured) {
          setIsOpen(true);
        }
      } catch (error) {
        // If check fails, show modal to be safe
        setIsOpen(true);
      } finally {
        setIsChecking(false);
      }
    }
    
    checkConfig();
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('arcade-api-key', apiKey.trim());
      setIsOpen(false);
      // Reload to use new key
      window.location.reload();
    } else {
      alert('Please enter a valid API key');
    }
  };

  if (isChecking || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden">
        {/* Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-orange-500 to-purple-700 p-8 text-white">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Sparkles className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome to Arcade</h2>
              <p className="text-purple-100 text-sm">Custom Dashboards</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start gap-3 mb-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <AlertCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">API Key Not Found</h3>
              <p className="text-xs text-gray-400">
                Arcade API key is not configured in your environment. To see real tool data, please configure your API key.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">Option 1: Configure Here</h3>
          <p className="text-sm text-gray-400 mb-4">
            Enter your API key below to get started immediately.
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Arcade API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="arc_proj..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <a
              href="https://arcade.dev/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
            >
              Get API key at arcade.dev/dashboard
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <button
            onClick={handleSave}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-orange-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-orange-700 transition-all shadow-lg"
          >
            Save & Continue
          </button>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-sm font-semibold text-white mb-2">Option 2: Configure in .env File</h3>
            <p className="text-xs text-gray-400 mb-3">
              Add <code className="text-purple-400 bg-gray-800 px-1 py-0.5 rounded">ARCADE_API_KEY</code> to your <code className="text-purple-400 bg-gray-800 px-1 py-0.5 rounded">.env</code> file and restart Docker.
            </p>
            <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
              <code className="text-xs text-gray-300">
                cp env.example .env<br/>
                # Add your key to .env<br/>
                docker-compose restart
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

