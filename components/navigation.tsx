'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, MessageSquare, Sparkles, Code } from 'lucide-react';
import { branding, features } from '@/config';

export function Navigation() {
  const pathname = usePathname();

  // Navigation without Chat (chat is per-dashboard)
  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/developer-tools', label: 'Developer Tools', icon: Code },
  ];

  return (
    <nav className="border-b border-gray-800/50 bg-black/40 backdrop-blur-xl relative z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src="/images/arcade-icon.png" 
              alt="Arcade" 
              className="h-8 w-8 rounded-lg"
            />
            <div>
              <h1 className="text-sm font-semibold text-white">Arcade</h1>
              <p className="text-xs text-gray-400">Custom Tool Dashboards</p>
            </div>
          </div>
          
          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-orange-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

