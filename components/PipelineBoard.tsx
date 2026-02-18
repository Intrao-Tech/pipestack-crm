
import React, { useState } from 'react';
import { Deal } from '../types';
import { DealDrawer } from './DealDrawer';

const MOCK_DEALS: Deal[] = [
  { id: '1', contactName: 'James Henderson', companyName: 'Aura Creative', value: '£4,500', status: 'Won', priority: 'high', avatar: 'https://i.pravatar.cc/150?u=james' },
  { id: '2', contactName: 'Sarah Jenkins', companyName: 'North Star Media', value: '£1,200', status: 'Lead', priority: 'low', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: '3', contactName: 'Oliver Smith', companyName: 'The Coffee Co.', value: '£850', status: 'Contacted', priority: 'medium', avatar: 'https://i.pravatar.cc/150?u=oliver' },
  { id: '4', contactName: 'Emma Watson', companyName: 'Nexus Systems', value: '£12,000', status: 'Proposal Sent', priority: 'high', avatar: 'https://i.pravatar.cc/150?u=emma' },
  { id: '5', contactName: 'George Brown', companyName: 'Lunar Apps', value: '£3,200', status: 'Proposal Sent', priority: 'medium', avatar: 'https://i.pravatar.cc/150?u=george' },
  { id: '6', contactName: 'Lily Evans', companyName: 'Green Grocer Ltd', value: '£600', status: 'Lead', priority: 'low', avatar: 'https://i.pravatar.cc/150?u=lily' },
  { id: '20', contactName: 'Max Fielding', companyName: 'Orbit Agency', value: '£2,200', status: 'Lead', priority: 'medium', avatar: 'https://i.pravatar.cc/150?u=max' },
  { id: '21', contactName: 'Isla Murray', companyName: 'Craft & Co', value: '£1,750', status: 'Lead', priority: 'high', avatar: 'https://i.pravatar.cc/150?u=isla' },
  { id: '7', contactName: 'Harry Potter', companyName: 'Urban Architects', value: '£7,800', status: 'Won', priority: 'high', avatar: 'https://i.pravatar.cc/150?u=harry' },
  { id: '8', contactName: 'Sophie Turner', companyName: 'Bright Ideas', value: '£2,100', status: 'Contacted', priority: 'medium', avatar: 'https://i.pravatar.cc/150?u=sophie' },
  { id: '16', contactName: 'Anna Blake', companyName: 'Pixel Perfect', value: '£1,400', status: 'Contacted', priority: 'low', avatar: 'https://i.pravatar.cc/150?u=anna' },
  { id: '17', contactName: 'Ryan Foster', companyName: 'Summit Digital', value: '£3,600', status: 'Contacted', priority: 'high', avatar: 'https://i.pravatar.cc/150?u=ryan' },
  { id: '18', contactName: 'Claire Dunphy', companyName: 'Mosaic Studio', value: '£2,800', status: 'Contacted', priority: 'medium', avatar: 'https://i.pravatar.cc/150?u=claire' },
  { id: '19', contactName: 'Ben Harper', companyName: 'Ironclad Labs', value: '£950', status: 'Contacted', priority: 'low', avatar: 'https://i.pravatar.cc/150?u=ben' },
  { id: '9', contactName: 'David Tennant', companyName: 'Blue Box Tech', value: '£5,500', status: 'Proposal Sent', priority: 'high', avatar: 'https://i.pravatar.cc/150?u=david' },
  { id: '10', contactName: 'Rachel Green', companyName: 'Evergreen Studios', value: '£3,800', status: 'Proposal Sent', priority: 'medium', avatar: 'https://i.pravatar.cc/150?u=rachel' },
  { id: '11', contactName: 'Marcus Chen', companyName: 'Velocity Labs', value: '£9,200', status: 'Proposal Sent', priority: 'high', avatar: 'https://i.pravatar.cc/150?u=marcus' },
  { id: '12', contactName: 'Nina Patel', companyName: 'Cloudform Inc', value: '£6,400', status: 'Proposal Sent', priority: 'low', avatar: 'https://i.pravatar.cc/150?u=nina' },
  { id: '13', contactName: 'Tom Bradley', companyName: 'Apex Digital', value: '£2,750', status: 'Proposal Sent', priority: 'medium', avatar: 'https://i.pravatar.cc/150?u=tom' },
  { id: '14', contactName: 'Lena Kovac', companyName: 'Prism Agency', value: '£8,100', status: 'Proposal Sent', priority: 'high', avatar: 'https://i.pravatar.cc/150?u=lena' },
  { id: '15', contactName: 'Jake Morrison', companyName: 'Redline Media', value: '£1,950', status: 'Proposal Sent', priority: 'low', avatar: 'https://i.pravatar.cc/150?u=jake' },
];

const COLUMN_THEME: Record<string, { accent: string; accentBg: string; accentLight: string; dot: string; gradient: string }> = {
  'Lead': { accent: 'text-sky-600', accentBg: 'bg-sky-500', accentLight: 'bg-sky-50', dot: 'bg-sky-400', gradient: 'linear-gradient(180deg, rgba(186,230,253,0.15) 0%, rgba(241,245,249,0.3) 100%)' },
  'Contacted': { accent: 'text-amber-600', accentBg: 'bg-amber-400', accentLight: 'bg-amber-50', dot: 'bg-amber-400', gradient: 'linear-gradient(180deg, rgba(254,243,199,0.15) 0%, rgba(241,245,249,0.3) 100%)' },
  'Proposal Sent': { accent: 'text-violet-600', accentBg: 'bg-violet-500', accentLight: 'bg-violet-50', dot: 'bg-violet-400', gradient: 'linear-gradient(180deg, rgba(221,214,254,0.15) 0%, rgba(241,245,249,0.3) 100%)' },
  'Won': { accent: 'text-emerald-600', accentBg: 'bg-emerald-500', accentLight: 'bg-emerald-50', dot: 'bg-emerald-400', gradient: 'linear-gradient(180deg, rgba(167,243,208,0.15) 0%, rgba(241,245,249,0.3) 100%)' },
};

const PriorityBadge: React.FC<{ priority: Deal['priority'] }> = ({ priority }) => {
  const styles = {
    low: 'bg-emerald-50 text-emerald-600',
    medium: 'bg-amber-50 text-amber-600',
    high: 'bg-rose-50 text-rose-600'
  };
  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${styles[priority]}`}>
      {priority}
    </span>
  );
};

const DealCard: React.FC<{ deal: Deal; onClick: () => void; accentBg: string }> = ({ deal, onClick, accentBg }) => (
  <div
    onClick={onClick}
    className="bg-white p-4 rounded-2xl border border-slate-100/80 hover:border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden shrink-0"
  >
    {/* Top accent bar */}
    <div className={`absolute top-0 left-4 right-4 h-[2px] ${accentBg} rounded-full opacity-40 group-hover:opacity-100 transition-opacity`} />

    <div className="flex items-start justify-between mb-3 mt-1">
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.08em]">{deal.companyName}</span>
      <PriorityBadge priority={deal.priority} />
    </div>

    <h5 className="font-semibold text-[#1E1B4B] text-[13px] mb-3 group-hover:text-indigo-700 transition-colors leading-snug">{deal.contactName}</h5>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img src={deal.avatar} alt={deal.contactName} className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-100" />
        <span className="text-sm font-bold text-[#1E1B4B] tabular-nums">{deal.value}</span>
      </div>
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-6 h-6 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const PipelineColumn: React.FC<{
  title: string;
  deals: Deal[];
  totalValue: string;
  onDealClick: (deal: Deal) => void;
  theme: { accent: string; accentBg: string; accentLight: string; dot: string; gradient: string };
}> = ({ title, deals, totalValue, onDealClick, theme }) => (
  <div className="flex-1 min-w-[280px] lg:min-w-[300px] flex flex-col rounded-2xl p-2.5 pt-3 border border-slate-100/50" style={{ background: theme.gradient }}>
    {/* Column Header */}
    <div className="px-1 mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full ${theme.dot}`} />
          <h3 className="font-bold text-[#1E1B4B] text-[13px] tracking-tight uppercase">{title}</h3>
          <span className={`${theme.accentLight} ${theme.accent} text-[10px] font-bold px-2 py-0.5 rounded-md tabular-nums`}>{deals.length}</span>
        </div>
        <button className="w-6 h-6 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-slate-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
        </button>
      </div>
      <span className="text-xs font-semibold text-slate-300 tabular-nums ml-[18px]">{totalValue}</span>
    </div>

    {/* Cards Container */}
    <div className="flex flex-col gap-2.5 overflow-y-auto scrollbar-none" style={{ height: 'calc(100vh - 240px)', scrollbarWidth: 'none' }}>
      {deals.length > 0 ? (
        <>
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} onClick={() => onDealClick(deal)} accentBg={theme.accentBg} />
          ))}
          <button className="w-full py-3 border border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-white transition-all text-[11px] font-semibold flex items-center justify-center gap-1.5 mt-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Deal
          </button>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center opacity-30">
           <div className="w-12 h-12 mb-3 text-slate-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="6" />
                <path d="M8 12h8m-4-4v8" opacity="0.5" />
              </svg>
           </div>
           <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">No deals yet</p>
        </div>
      )}
    </div>
  </div>
);

const EmptyPipeline: React.FC = () => (
  <div className="flex-1 flex flex-col items-center justify-center bg-white/50 border-2 border-dashed border-slate-100 rounded-2xl p-12 lg:p-24 text-center space-y-6">
    <div className="relative">
      <div className="absolute -inset-10 bg-indigo-50/50 blur-3xl rounded-full" />
      <svg className="relative w-32 h-32 text-indigo-100 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
        <circle cx="9" cy="9" r="0.5" fill="currentColor" />
        <circle cx="15" cy="9" r="0.5" fill="currentColor" />
      </svg>
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-[#1E1B4B] tracking-tight">Your Pipeline is Clear</h3>
      <p className="text-sm text-slate-400 max-w-sm mx-auto">No deals for this period. Reach out to some leads and start something big today.</p>
    </div>
    <button className="flex items-center gap-2 bg-[#1E1B4B] hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98]">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add First Deal
    </button>
  </div>
);

export const PipelineBoard: React.FC = () => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [filter, setFilter] = useState<'All' | 'This week' | 'This month'>('All');

  const filteredDeals = filter === 'This week' ? [] : MOCK_DEALS;
  const isEmpty = filteredDeals.length === 0;

  const getDealsByStatus = (status: Deal['status']) => filteredDeals.filter(d => d.status === status);

  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      <div className="px-8 flex flex-col gap-6 flex-1 overflow-hidden">
        {/* Board Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mt-6 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-[#1E1B4B] tracking-tight mb-1">Sales Pipeline</h2>
            <div className="flex items-center gap-5 text-xs text-slate-400">
              <span>Active Deals: <span className="font-semibold text-[#1E1B4B]">{isEmpty ? '0' : '32'}</span></span>
              <span className="w-1 h-1 rounded-full bg-slate-200" />
              <span>Projected Value: <span className="font-semibold text-emerald-600">{isEmpty ? '£0.00' : '£24,598.00'}</span></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-white rounded-xl p-1 border border-slate-100">
              {(['All', 'This week', 'This month'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 font-medium text-xs rounded-lg transition-all ${filter === f ? 'bg-[#1E1B4B] text-white shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                >{f}</button>
              ))}
            </div>

            <button className="flex items-center gap-2 bg-[#1E1B4B] hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all hover:-translate-y-px active:scale-[0.98]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Deal
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        {isEmpty ? (
          <EmptyPipeline />
        ) : (
          <div className="flex gap-4 overflow-x-auto flex-1 min-h-0 pb-2">
            {(['Lead', 'Contacted', 'Proposal Sent', 'Won'] as const).map(status => {
              const deals = getDealsByStatus(status);
              const values: Record<string, string> = { 'Lead': '£1,800.00', 'Contacted': '£2,950.00', 'Proposal Sent': '£20,700.00', 'Won': '£12,300.00' };
              return (
                <div key={status} className="min-w-[290px] w-[290px] flex-shrink-0 lg:flex-shrink lg:w-auto lg:flex-1">
                  <PipelineColumn
                    title={status}
                    deals={deals}
                    totalValue={values[status]}
                    onDealClick={setSelectedDeal}
                    theme={COLUMN_THEME[status]}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedDeal && (
        <DealDrawer deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      )}
    </div>
  );
};
