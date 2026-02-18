
import React, { useState } from 'react';
import { AIAssistant } from './AIAssistant';

const transactionData = [
  { day: 'Mon', invoices: 3, payments: 5, pending: 1 },
  { day: 'Tue', invoices: 4, payments: 3, pending: 2 },
  { day: 'Wed', invoices: 5, payments: 4, pending: 1 },
  { day: 'Thu', invoices: 5, payments: 4, pending: 1 },
  { day: 'Fri', invoices: 3, payments: 6, pending: 2 },
  { day: 'Sat', invoices: 2, payments: 2, pending: 0 },
  { day: 'Sun', invoices: 4, payments: 3, pending: 1 },
];

const maxTotal = Math.max(...transactionData.map(d => d.invoices + d.payments + d.pending));

const StackedBarChart: React.FC = () => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: typeof transactionData[0] } | null>(null);

  return (
    <div className="relative h-full">
      <div className="flex items-end justify-between w-full gap-3 px-2 h-full">
        {transactionData.map((d) => {
          const total = d.invoices + d.payments + d.pending;
          const barH = (total / maxTotal) * 100;
          return (
            <div
              key={d.day}
              className="flex-1 flex flex-col items-center justify-end group/bar cursor-pointer"
              style={{ height: '100%' }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.closest('.relative')!.getBoundingClientRect();
                setTooltip({ x: e.clientX - rect.left + 16, y: e.clientY - rect.top - 8, data: d });
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              <div className="w-full flex flex-col items-center gap-[3px]" style={{ height: `${barH}%` }}>
                {d.pending > 0 && (
                  <div className="w-[65%] rounded-xl bg-slate-200 group-hover/bar:bg-sky-200 transition-colors duration-300" style={{ flex: d.pending }} />
                )}
                {d.payments > 0 && (
                  <div className="w-[65%] rounded-xl bg-slate-200 group-hover/bar:bg-amber-400 transition-colors duration-300" style={{ flex: d.payments }} />
                )}
                {d.invoices > 0 && (
                  <div className="w-[65%] rounded-xl bg-slate-200 group-hover/bar:bg-indigo-200 transition-colors duration-300" style={{ flex: d.invoices }} />
                )}
              </div>
              <span className="text-[11px] text-slate-400 font-medium mt-2">{d.day}</span>
            </div>
          );
        })}
      </div>

      {/* Cursor-following tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-20"
          style={{ left: tooltip.x, top: tooltip.y, transform: 'translateY(-100%)' }}
        >
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-3 w-[190px]">
            <p className="text-[11px] text-slate-400 mb-2">Nov 25, 2025</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-indigo-200" />
                  <span className="text-[11px] text-slate-600">Invoices Issued</span>
                </div>
                <span className="text-[11px] font-bold text-[#1E1B4B]">{tooltip.data.invoices}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
                  <span className="text-[11px] text-slate-600">Payments Received</span>
                </div>
                <span className="text-[11px] font-bold text-[#1E1B4B]">{tooltip.data.payments}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-sky-200" />
                  <span className="text-[11px] text-slate-600">Pending Invoices</span>
                </div>
                <span className="text-[11px] font-bold text-[#1E1B4B]">{tooltip.data.pending}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
);

/* Tiny vertical bar visualization for bottom cards */
const MiniBarViz: React.FC<{ color: string; count: number; filled: number }> = ({ color, count, filled }) => (
  <div className="flex items-end gap-[2px] h-8 w-full">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="flex-1 rounded-sm"
        style={{
          height: `${Math.random() * 60 + 40}%`,
          backgroundColor: i < filled ? color : '#e2e8f0',
          opacity: i < filled ? 0.7 : 0.4,
        }}
      />
    ))}
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="px-6 pb-4 space-y-3 h-[calc(100vh-80px)] overflow-hidden flex flex-col">
      {/* Hero Section - full width */}
      <section className="relative mt-2" style={{ minHeight: 200 }}>
        {/* Accordion-style stacked glassmorphic cards — center-right */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 flex items-start justify-center" style={{ width: 380, height: 200 }}>
          {/* Card 3 — most tilted, most blurred, peeking furthest right */}
          <div className="absolute w-[320px] h-[170px] rounded-2xl border border-white/25" style={{
            transform: 'rotate(6deg) translateX(60px) translateY(-4px)',
            transformOrigin: 'center center',
            background: `linear-gradient(135deg, rgba(199,210,254,0.2) 0%, rgba(196,181,253,0.12) 50%, rgba(165,180,252,0.15) 100%)`,
            backdropFilter: 'blur(20px)',
            filter: 'blur(3px)',
          }} />
          {/* Card 2 — medium tilt, medium blur, peeking right */}
          <div className="absolute w-[320px] h-[170px] rounded-2xl border border-white/35" style={{
            transform: 'rotate(3deg) translateX(30px) translateY(0px)',
            transformOrigin: 'center center',
            background: `linear-gradient(145deg, rgba(224,231,255,0.35) 0%, rgba(221,214,254,0.2) 40%, rgba(196,181,253,0.18) 100%)`,
            backdropFilter: 'blur(16px)',
            filter: 'blur(1.5px)',
          }} />
          {/* Card 1 — front, no tilt, crisp */}
          <div className="absolute w-[320px] h-[170px] rounded-2xl border border-white/60 p-5 flex flex-col" style={{
            transform: 'rotate(0deg) translateX(0px) translateY(6px)',
            background: `
              radial-gradient(ellipse 60% 70% at 80% 20%, rgba(167,243,208,0.15) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 70% 70%, rgba(196,181,253,0.2) 0%, transparent 60%),
              radial-gradient(ellipse 40% 50% at 30% 50%, rgba(199,210,254,0.15) 0%, transparent 60%),
              linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(245,243,255,0.6) 40%, rgba(237,233,254,0.4) 70%, rgba(224,231,255,0.5) 100%)
            `,
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(99,102,241,0.08)',
          }}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-[14px] font-semibold text-[#1E1B4B]">Client Efficiency</p>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E1B4B]" style={{
                background: 'rgba(167,243,208,0.3)',
                border: '1px solid rgba(167,243,208,0.4)',
              }}>
                <ArrowUpRight />
              </div>
            </div>
            <p className="text-[14px] text-slate-500 leading-relaxed">
              <span className="font-bold text-[#1E1B4B]">This quarter,</span> optimized workflows reduced manual checks <span className="font-bold text-[#1E1B4B]">by 27%</span>
            </p>
            <div className="flex gap-1.5 mt-auto">
              <div className="w-5 h-1.5 rounded-full bg-slate-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            </div>
          </div>
        </div>

        {/* Bottom row: heading left, date pickers right */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between">
          {/* Left: Heading */}
          <div>
            <p className="text-[13px] font-normal text-slate-400 mb-1">Unified Client Metrics</p>
            <h1 className="text-[42px] font-extrabold text-[#1E1B4B] tracking-tight leading-none">All Client Data</h1>
          </div>

          {/* Right: Date pickers & filters */}
          <div className="flex items-center gap-2.5 pb-1">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <span className="text-[13px] font-medium text-[#1E1B4B] bg-white border border-slate-200 px-4 py-2 rounded-xl">22.11.2025</span>
            <span className="text-[13px] font-medium text-[#1E1B4B] bg-white border border-slate-200 px-4 py-2 rounded-xl">29.11.2025</span>
            <span className="text-[13px] font-medium text-[#1E1B4B] bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-1.5">
              All Accounts
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </div>
        </div>
      </section>

      {/* Content row: blocks + AI assistant side by side */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch flex-1 min-h-0">
        {/* Left: functional blocks */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">

        {/* Transaction Activity */}
        <section className="bg-white rounded-2xl border border-slate-100 p-5 relative flex-1 flex flex-col">
          {/* +31% badge */}
          <div className="absolute top-5 right-5 z-10">
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+31%</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
            {/* Left: Title + Legend with glassmorphic gradient */}
            <div className="w-full lg:w-[250px] flex-shrink-0 rounded-2xl p-4 flex flex-col justify-between" style={{
              background: `
                radial-gradient(ellipse 70% 60% at 85% 20%, rgba(196,181,253,0.2) 0%, transparent 60%),
                radial-gradient(ellipse 50% 50% at 20% 80%, rgba(165,180,252,0.15) 0%, transparent 60%),
                radial-gradient(ellipse 40% 40% at 60% 50%, rgba(186,230,253,0.12) 0%, transparent 50%),
                linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(245,243,255,0.5) 40%, rgba(237,233,254,0.3) 70%, rgba(224,231,255,0.4) 100%)
              `
            }}>
              <div>
                <h3 className="text-sm font-bold text-[#1E1B4B] mb-1">Transaction Activity</h3>
                <p className="text-[11px] text-slate-400 leading-snug">Average daily financial activity<br />past 7 days: 67%</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-sm bg-indigo-200" />
                    <span className="text-xs text-slate-600">Invoices Issued</span>
                  </div>
                  <span className="text-xs font-bold text-[#1E1B4B]">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-sm bg-amber-400" />
                    <span className="text-xs text-slate-600">Payments Received</span>
                  </div>
                  <span className="text-xs font-bold text-[#1E1B4B]">38</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-sm bg-sky-200" />
                    <span className="text-xs text-slate-600">Pending Invoices</span>
                  </div>
                  <span className="text-xs font-bold text-[#1E1B4B]">12</span>
                </div>
              </div>
            </div>

            {/* Right: Custom stacked bar chart */}
            <div className="flex-1 min-h-0 pb-2">
              <StackedBarChart />
            </div>
          </div>
        </section>

        {/* Bottom 3 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Billing Status */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="flex items-start justify-between mb-1">
              <p className="text-sm font-semibold text-[#1E1B4B]">Billing Status</p>
              <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><ArrowUpRight /></div>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">Last payment: Nov 7</p>
            <div className="flex items-baseline gap-1.5 mb-5">
              <span className="text-3xl font-extrabold text-[#1E1B4B]">68.34%</span>
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0v11.25m0-11.25H8.25" />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
              <span>Auto-cleared</span>
              <span>Under Review</span>
            </div>
            <MiniBarViz color="#10b981" count={60} filled={50} />
            <div className="flex justify-between text-[10px] font-semibold text-slate-500 mt-1.5">
              <span>14.2K</span>
              <span>22</span>
            </div>
          </div>

          {/* Data Mismatches */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="flex items-start justify-between mb-1">
              <p className="text-sm font-semibold text-[#1E1B4B]">Data Mismatches</p>
              <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><ArrowUpRight /></div>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">Last check: Nov 7</p>
            <div className="flex items-baseline gap-1.5 mb-5">
              <span className="text-3xl font-extrabold text-[#1E1B4B]">18.92%</span>
              <svg className="w-4 h-4 text-rose-500 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0H8.25m11.25 0V8.25" />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
              <span>Detected</span>
              <span>Resolved</span>
            </div>
            <MiniBarViz color="#f97316" count={60} filled={16} />
            <div className="flex justify-between text-[10px] font-semibold text-slate-500 mt-1.5">
              <span>3.4K</span>
              <span>12.1K</span>
            </div>
          </div>

          {/* Reconciliation */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="flex items-start justify-between mb-1">
              <p className="text-sm font-semibold text-[#1E1B4B]">Reconciliation</p>
              <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><ArrowUpRight /></div>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">Last update: Nov 7</p>
            <div className="flex items-baseline gap-1.5 mb-5">
              <span className="text-3xl font-extrabold text-[#1E1B4B]">57.76%</span>
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0v11.25m0-11.25H8.25" />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
              <span>Matched</span>
              <span>To Review</span>
            </div>
            <MiniBarViz color="#10b981" count={60} filled={36} />
            <div className="flex justify-between text-[10px] font-semibold text-slate-500 mt-1.5">
              <span>162</span>
              <span>28</span>
            </div>
          </div>
        </div>
        </div>

        {/* Right: AI Assistant */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <AIAssistant />
        </div>
      </div>
    </div>
  );
};
