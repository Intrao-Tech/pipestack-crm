
import React, { useState, useEffect, useCallback } from 'react';
import { Deal } from '../types';

interface DealDrawerProps {
  deal: Deal;
  onClose: () => void;
}

export const DealDrawer: React.FC<DealDrawerProps> = ({ deal, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation on next frame
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] transition-all duration-300 ease-out"
        style={{
          backgroundColor: isVisible ? 'rgba(15,23,42,0.08)' : 'rgba(15,23,42,0)',
          backdropFilter: isVisible ? 'blur(2px)' : 'blur(0px)',
        }}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-4 right-4 bottom-4 w-[600px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] z-[70] border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ease-out"
        style={{
          transform: isVisible ? 'translateX(0)' : 'translateX(calc(100% + 16px))',
          opacity: isVisible ? 1 : 0,
        }}
      >

        {/* Top Header Controls */}
        <div className="flex items-center justify-between p-6 pb-0">
          <button onClick={handleClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 custom-scrollbar">

          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
                PIP-{deal.id}03
              </div>
              <div className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 ${
                deal.priority === 'high' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-500'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${deal.priority === 'high' ? 'bg-rose-500 animate-pulse' : 'bg-slate-400'}`} />
                {deal.priority === 'high' ? 'Urgent' : 'Normal'}
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">{deal.contactName} - {deal.companyName}</h2>
          </div>

          {/* Quick Details Grid */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-12">
            <div className="space-y-1.5">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</span>
               <div className="flex items-center gap-2 p-2 px-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-700 text-sm font-bold w-fit">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  {deal.status}
               </div>
            </div>
            <div className="space-y-1.5">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Deal Value</span>
               <div className="text-lg font-extrabold text-[#1E293B]">{deal.value}</div>
            </div>
            <div className="space-y-1.5">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Due date</span>
               <div className="text-sm font-bold text-slate-700">27 November, 2025</div>
            </div>
            <div className="space-y-1.5">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assignee</span>
               <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img src={deal.avatar} className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                    <img src="https://i.pravatar.cc/150?u=2" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                  </div>
                  <button className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">+ Add</button>
               </div>
            </div>
          </div>

          {/* Rich Text Area Mockup */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-1 overflow-hidden">
             <div className="flex items-center justify-between p-2 border-b border-slate-100">
                <div className="flex items-center gap-1">
                   <ToolbarButton icon="B" />
                   <ToolbarButton icon="I" className="italic" />
                   <ToolbarButton icon="U" className="underline" />
                   <div className="w-px h-4 bg-slate-200 mx-1" />
                   <ToolbarButton icon="≡" />
                   <ToolbarButton icon="🖼️" />
                </div>
                <button className="bg-gradient-to-tr from-indigo-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg shadow-indigo-100">
                   <span className="text-xs">✨</span> Ask AI
                </button>
             </div>
             <textarea
               className="w-full bg-transparent p-6 text-sm text-slate-600 leading-relaxed outline-none min-h-[150px] resize-none"
               placeholder="Write internal notes about this deal..."
               defaultValue="Initial discovery call completed. Client is looking for a fresh brand identity and website overhaul. High interest in the AI optimization features of our premium tier. Need to send a tailored proposal by end of week."
             />
             <div className="p-3 pt-0 flex justify-end">
                <button className="bg-[#1E293B] text-white text-[10px] font-extrabold px-4 py-2 rounded-xl">Save</button>
             </div>
          </div>

          {/* Attachments Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
               <h4 className="font-bold text-sm text-[#1E293B]">Attachments</h4>
               <button className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 hover:text-indigo-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download all
               </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <AttachmentCard name="Proposal_v1.pdf" size="2.4 MB" icon="📄" />
              <AttachmentCard name="Logo_Assets.zip" size="45.1 MB" icon="📁" />
            </div>
          </div>

          {/* Activity Section */}
          <div className="space-y-4 pb-10">
            <h4 className="font-bold text-sm text-[#1E293B]">Activity</h4>
            <div className="space-y-6">
               <ActivityItem
                 user="Alex Rivera"
                 action="moved this deal from"
                 target="Lead"
                 to="Contacted"
                 time="2 hours ago"
               />
               <ActivityItem
                 user="System"
                 action="automatically prioritized as"
                 target="Urgent"
                 time="Yesterday at 4:12 PM"
                 isSystem
               />
               <ActivityItem
                 user="Alex Rivera"
                 action="created this deal"
                 time="3 days ago"
               />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

const ToolbarButton: React.FC<{ icon: string; className?: string }> = ({ icon, className }) => (
  <button className={`w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-400 hover:bg-slate-100 rounded-lg transition-colors ${className}`}>
    {icon}
  </button>
);

const AttachmentCard: React.FC<{ name: string; size: string; icon: string }> = ({ name, size, icon }) => (
  <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-200 transition-all cursor-pointer group">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-lg shadow-inner group-hover:bg-indigo-50 transition-colors">
      {icon}
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-[11px] font-bold text-slate-800 truncate">{name}</p>
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{size}</p>
    </div>
    <button className="text-slate-300 hover:text-indigo-600 transition-colors">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    </button>
  </div>
);

const ActivityItem: React.FC<{ user: string; action: string; target?: string; to?: string; time: string; isSystem?: boolean }> = ({ user, action, target, to, time, isSystem }) => (
  <div className="flex gap-4 group">
    <div className="relative flex flex-col items-center">
       <div className={`w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${isSystem ? 'bg-indigo-50 text-indigo-500' : 'bg-slate-200 text-slate-600'}`}>
          {isSystem ? '✨' : user.charAt(0)}
       </div>
       <div className="w-px h-full bg-slate-100 group-last:hidden mt-2" />
    </div>
    <div className="flex flex-col gap-1 pt-0.5">
       <p className="text-[11px] text-slate-600 leading-tight">
          <span className="font-bold text-[#1E293B]">{user}</span> {action}
          {target && <span className="font-bold text-indigo-600 ml-1.5">{target}</span>}
          {to && <span className="text-slate-400 mx-1.5 font-medium">→</span>}
          {to && <span className="font-bold text-amber-600">{to}</span>}
       </p>
       <span className="text-[10px] font-bold text-slate-400">{time}</span>
    </div>
  </div>
);
