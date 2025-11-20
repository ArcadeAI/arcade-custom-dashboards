'use client';

import { X } from 'lucide-react';
import { LineChartSimple, BarChartSimple, DonutChart } from './analytics-chart';

interface GraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'line' | 'bar' | 'donut';
  title: string;
  data: any;
}

export function GraphModal({ isOpen, onClose, type, title, data }: GraphModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 flex items-center justify-center transition-all text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>

        <div className="h-96">
          {type === 'line' && (
            <div className="h-full">
              <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
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
                  <linearGradient id="chartGradientLarge" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {(() => {
                  const maxValue = Math.max(...data);
                  const points = data.map((value: number, idx: number) => {
                    const x = (idx / (data.length - 1)) * 100;
                    const y = 100 - (value / maxValue) * 80;
                    return `${x},${y}`;
                  }).join(' ');
                  
                  return (
                    <>
                      <polygon 
                        points={`0,100 ${points} 100,100`}
                        fill="url(#chartGradientLarge)"
                      />
                      <polyline
                        points={points}
                        fill="none"
                        stroke="rgb(16, 185, 129)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {data.map((value: number, idx: number) => {
                        const x = (idx / (data.length - 1)) * 100;
                        const y = 100 - (value / maxValue) * 80;
                        return (
                          <circle
                            key={idx}
                            cx={x}
                            cy={y}
                            r="3"
                            fill="rgb(16, 185, 129)"
                            className="drop-shadow-lg"
                          />
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
          )}

          {type === 'bar' && (
            <div className="space-y-4 h-full flex flex-col justify-around">
              {data.map((item: any, idx: number) => {
                const maxValue = Math.max(...data.map((d: any) => d.value));
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base text-gray-300">{item.label}</span>
                      <span className="text-base font-semibold text-white">{item.value}</span>
                    </div>
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.color || 'bg-gradient-to-r from-purple-500 to-orange-500'}`}
                        style={{ width: `${(item.value / maxValue) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {type === 'donut' && (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-12">
                <div className="relative w-64 h-64">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgba(31, 41, 55, 0.5)"
                      strokeWidth="20"
                    />
                    {(() => {
                      const total = data.reduce((sum: number, item: any) => sum + item.value, 0);
                      let currentAngle = -90;
                      
                      return data.map((item: any, idx: number) => {
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
                      });
                    })()}
                    <circle cx="50" cy="50" r="25" fill="rgb(17, 24, 39)" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold text-white">
                      {data.reduce((sum: number, item: any) => sum + item.value, 0)}
                    </span>
                    <span className="text-sm text-gray-400">Total</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {data.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div 
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: item.color || `hsl(${idx * 60}, 70%, 60%)` }}
                      />
                      <span className="text-base text-gray-300">{item.label}</span>
                      <span className="text-base font-semibold text-white ml-auto">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

