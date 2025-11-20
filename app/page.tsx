'use client';

import { ArrowRight, Sparkles, TrendingUp, Heart, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

const examples = [
  {
    id: 'gameforge',
    name: 'GameForge Studio',
    description: 'Tool dashboard with vibrant gradients, interactive analytics, and modern dark theme',
    industry: 'Gaming/Entertainment',
    tech: 'Next.js + Tailwind CSS',
    colors: 'Purple & Orange',
    gradient: 'from-purple-600 via-orange-500 to-purple-700',
    icon: Gamepad2,
    features: ['Interactive Analytics', 'Real-time Tools', 'Dark Theme', 'AI Chat'],
    href: '/examples/gameforge',
  },
  {
    id: 'fintech',
    name: 'FinTech Pro',
    description: 'Tool dashboard with data tables, area charts, compliance gauges, and activity feeds',
    industry: 'Financial Services',
    tech: 'Next.js + CSS Modules',
    colors: 'Blue & Green',
    gradient: 'from-blue-600 via-emerald-500 to-blue-700',
    icon: TrendingUp,
    features: ['Compliance Ready', 'Data Dense', 'Professional UI', 'Real-time Metrics'],
    href: '/examples/fintech',
  },
  {
    id: 'healthcare',
    name: 'HealthCare Hub',
    description: 'Tool dashboard with circular vitals gauges, horizontal bars, and accessible medical design',
    industry: 'Healthcare & Medical',
    tech: 'Next.js + Styled Components',
    colors: 'Teal & Blue',
    gradient: 'from-teal-600 via-blue-500 to-teal-700',
    icon: Heart,
    features: ['HIPAA Compliant', 'Accessible UI', 'Patient Focused', 'Secure'],
    href: '/examples/healthcare',
  },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 py-20 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm text-white font-medium">Arcade Custom Dashboards</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Build It <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">Your Way</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Present your tools beautifully to customers and agents. White-label for any industry.
            </p>
            
            <p className="text-lg text-purple-300 font-medium">
              Powered by Arcade APIs
            </p>
        </div>

          {/* Example Cards */}
          <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
            {examples.map((example) => {
              const Icon = example.icon;
              return (
                <Link
                  key={example.id}
                  href={example.href}
                  className="group relative overflow-hidden rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105"
                >
                  {/* Gradient Header */}
                  <div className={`h-32 bg-gradient-to-br ${example.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{example.name}</h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 text-xs rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {example.industry}
                      </span>
      </div>
                    
                    <p className="text-sm text-gray-400 mb-4">
                      {example.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Tech Stack:</span>
                        <span className="text-xs text-gray-300">{example.tech}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Colors:</span>
                        <span className="text-xs text-gray-300">{example.colors}</span>
                      </div>
      </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {example.features.map((feature) => (
                        <span key={feature} className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-purple-400 group-hover:text-purple-300 font-medium">
                      View Dashboard
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-4">
              All dashboards use real Arcade API data • Fully customizable • Production ready
            </p>
            <a 
              href="https://docs.arcade.dev" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
            >
              Read Documentation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Composable Tool Management Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Composable Tool Management</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6 italic">
            "Building Blocks for Tool Dashboards"
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-3">
            Mix-and-match, customize - reference implementations you can actually use.
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Infuse tool management into your enterprise apps easily. Three approaches, one Arcade API, endless possibilities.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-gray-900/80 border border-gray-800 p-6 hover:border-purple-500/30 transition-all">
            <div className="text-2xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold text-white mb-2">Make Agents Useful</h3>
            <p className="text-sm text-gray-400">
              Turn conversations into actions. Real-time tool execution, analytics, and management - all backed by Arcade API.
            </p>
          </div>
          <div className="rounded-xl bg-gray-900/80 border border-gray-800 p-6 hover:border-orange-500/30 transition-all">
            <div className="text-2xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-white mb-2">Your Brand, Your Way</h3>
            <p className="text-sm text-gray-400">
              White-label for customers or teams. Three examples show how the same tool engine adapts to different needs.
            </p>
          </div>
          <div className="rounded-xl bg-gray-900/80 border border-gray-800 p-6 hover:border-emerald-500/30 transition-all">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Production Code, Not Demos</h3>
            <p className="text-sm text-gray-400">
              Real Arcade API integration, Docker deployment, interactive UI. Copy, customize, ship.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
