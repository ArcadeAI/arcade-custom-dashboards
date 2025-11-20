'use client';

import { useState } from 'react';
import { TrendingUp, BarChart3, PieChart } from 'lucide-react';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

export function BarChartSimple({ data, title }: { data: DataPoint[]; title: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-900/80 border border-gray-800 p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-4 w-4 text-purple-400" />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-2.5">
        {data.map((item, idx) => (
          <div 
            key={idx}
            className="group"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs transition-colors ${
                hoveredIndex === idx ? 'text-white font-semibold' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
              <span className={`text-xs font-semibold transition-all ${
                hoveredIndex === idx ? 'text-white text-sm' : 'text-white'
              }`}>
                {item.value} uses
              </span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden cursor-pointer">
              <div 
                className={`h-full rounded-full transition-all ${item.color || 'bg-gradient-to-r from-purple-500 to-orange-500'} ${
                  hoveredIndex === idx ? 'h-2' : ''
                }`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LineChartSimple({ data, title }: { data: number[]; title: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxValue = Math.max(...data);
  const points = data.map((value, idx) => {
    const x = (idx / (data.length - 1)) * 100;
    const y = 100 - (value / maxValue) * 80;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-900/80 border border-gray-800 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
        <span className="text-xs text-emerald-400 font-medium">↑ 12.5%</span>
      </div>
      
      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-full h-24" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line 
            key={y}
            x1="0" 
            y1={y} 
            x2="100" 
            y2={y} 
            stroke="rgba(107, 114, 128, 0.2)" 
            strokeWidth="0.5"
          />
        ))}
        
        {/* Gradient fill */}
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon 
          points={`0,100 ${points} 100,100`}
          fill="url(#chartGradient)"
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="rgb(16, 185, 129)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Points with hover areas */}
        {data.map((value, idx) => {
          const x = (idx / (data.length - 1)) * 100;
          const y = 100 - (value / maxValue) * 80;
          return (
            <g key={idx}>
              {/* Invisible larger hitbox for easier hovering */}
              <circle
                cx={x}
                cy={y}
                r="8"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {/* Visible point */}
              <circle
                cx={x}
                cy={y}
                r={hoveredIndex === idx ? "3" : "2"}
                fill="rgb(16, 185, 129)"
                className="drop-shadow-lg transition-all pointer-events-none"
              />
            </g>
          );
        })}
      </svg>
      
      {/* Tooltip */}
      {hoveredIndex !== null && (
        <div 
          className="absolute top-16 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10"
        >
          <p className="text-xs text-gray-400">{days[hoveredIndex]}</p>
          <p className="text-lg font-bold text-white">{data[hoveredIndex]} executions</p>
        </div>
      )}
      
      <div className="flex justify-between mt-2 text-[10px] text-gray-600">
        {days.map((day, idx) => (
          <span 
            key={day}
            className={hoveredIndex === idx ? 'text-emerald-400 font-semibold' : ''}
          >
            {day}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
}

export function DonutChart({ data, title }: { data: DataPoint[]; title: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;
  
  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-900/80 border border-gray-800 p-5">
      <div className="flex items-center gap-2 mb-3">
        <PieChart className="h-4 w-4 text-blue-400" />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      
      <div className="flex items-center justify-center gap-4">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(31, 41, 55, 0.5)"
              strokeWidth="20"
            />
            {data.map((item, idx) => {
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const prevAngle = currentAngle;
              currentAngle += angle;
              
              const startX = 50 + 40 * Math.cos((prevAngle * Math.PI) / 180);
              const startY = 50 + 40 * Math.sin((prevAngle * Math.PI) / 180);
              const endX = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
              const endY = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              return (
                <path
                  key={idx}
                  d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                  fill={item.color || `hsl(${idx * 60}, 70%, 60%)`}
                  opacity="0.9"
                />
              );
            })}
            <circle cx="50" cy="50" r="25" fill="rgb(17, 24, 39)" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl font-bold text-white">{total}</span>
            <span className="text-[10px] text-gray-500">Total</span>
          </div>
        </div>
        
        <div className="space-y-1.5">
          {data.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className={`h-2 w-2 rounded-full transition-all ${
                  hoveredIndex === idx ? 'h-3 w-3' : ''
                }`}
                style={{ backgroundColor: item.color || `hsl(${idx * 60}, 70%, 60%)` }}
              />
              <span className={`text-xs transition-colors ${
                hoveredIndex === idx ? 'text-white font-semibold' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
              <span className={`text-xs font-semibold ml-auto transition-all ${
                hoveredIndex === idx ? 'text-white text-sm' : 'text-white'
              }`}>
                {item.value} ({((item.value / data.reduce((s, i) => s + i.value, 0)) * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

