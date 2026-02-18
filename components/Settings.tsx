import React, { useState } from 'react';
import { Billing } from './Billing';

type SettingsTab = 'Profile' | 'Team' | 'Notifications' | 'Integrations' | 'Billing';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('Profile');

  const navItems: { id: SettingsTab; label: string; icon: string }[] = [
    { id: 'Profile', label: 'My Profile', icon: '👤' },
    { id: 'Team', label: 'Team Management', icon: '👥' },
    { id: 'Notifications', label: 'Notifications', icon: '🔔' },
    { id: 'Billing', label: 'Billing & Plans', icon: '💳' },
    { id: 'Integrations', label: 'Integrations', icon: '🔌' },
  ];

  return (
    <div className="px-8 pb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mt-4 mb-8">
        <h2 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">Settings</h2>
        <p className="text-sm font-medium text-slate-400">Manage your workspace preferences and personal profile.</p>
      </div>

      <div className="flex gap-8 items-start">
        {/* Settings Sidebar */}
        <div className="w-64 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-100'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Settings Content */}
        <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[600px] overflow-hidden">
          {activeTab === 'Profile' && <ProfileView />}
          {activeTab === 'Notifications' && <NotificationsView />}
          {activeTab === 'Billing' && <Billing isNested={true} />}
          {(activeTab === 'Team' || activeTab === 'Integrations') && (
            <div className="p-12 flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-3xl opacity-50">
                {navItems.find(i => i.id === activeTab)?.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800">{activeTab} coming soon</h3>
              <p className="text-slate-400 text-sm max-w-xs">We're working hard to bring advanced {activeTab.toLowerCase()} management to Pipestack.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileView = () => (
  <div className="p-12 space-y-10 animate-in fade-in duration-300">
    <section className="space-y-6">
      <h3 className="text-lg font-bold text-slate-800">Public Profile</h3>
      <div className="flex items-center gap-8">
        <div className="relative group">
          <img 
            src="https://picsum.photos/seed/alex/120/120" 
            className="w-24 h-24 rounded-[2rem] object-cover ring-4 ring-slate-50 shadow-lg"
          />
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          </button>
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-slate-800">Profile Picture</h4>
          <p className="text-xs text-slate-400 font-medium">PNG, JPG or GIF. Max size 2MB.</p>
          <div className="flex gap-2 pt-2">
            <button className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-all">Replace</button>
            <button className="px-4 py-2 text-rose-500 text-xs font-bold rounded-lg hover:bg-rose-50 transition-all">Delete</button>
          </div>
        </div>
      </div>
    </section>

    <div className="grid grid-cols-2 gap-8">
      <InputGroup label="Full Name" value="Alex Rivera" />
      <InputGroup label="Email Address" value="alex@riveradesign.studio" type="email" />
      <InputGroup label="Professional Role" value="Creative Director & Agency Owner" />
      <InputGroup label="Location" value="London, UK" />
    </div>

    <section className="pt-6 border-t border-slate-50 space-y-4">
      <h3 className="text-lg font-bold text-slate-800">Bio</h3>
      <textarea 
        className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-sm text-slate-600 leading-relaxed outline-none min-h-[120px] resize-none focus:ring-2 focus:ring-indigo-500 transition-all"
        defaultValue="Building high-conversion brand identities and digital experiences for high-growth startups."
      />
    </section>

    <div className="flex justify-end pt-4">
      <button className="bg-[#1E293B] text-white px-10 py-3.5 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all">
        Save Changes
      </button>
    </div>
  </div>
);

const NotificationsView = () => (
  <div className="p-12 space-y-8 animate-in fade-in duration-300">
    <section>
      <h3 className="text-lg font-bold text-slate-800">Notification Preferences</h3>
      <p className="text-xs text-slate-400 font-medium mt-1">Control how and when you receive alerts from Pipestack.</p>
    </section>

    <div className="space-y-2">
      <ToggleItem 
        title="Email Notifications" 
        description="Receive direct emails about important account activity."
        defaultChecked={true}
      />
      <ToggleItem 
        title="Deal Updates" 
        description="Get notified when a deal moves stages or is commented on."
        defaultChecked={true}
      />
      <ToggleItem 
        title="Weekly Pipeline Summary" 
        description="A curated overview of your agency performance every Monday."
        defaultChecked={false}
      />
      <ToggleItem 
        title="Team Mentions" 
        description="Real-time alerts when colleagues mention you in notes."
        defaultChecked={true}
      />
    </div>

    <section className="pt-8 border-t border-slate-50 space-y-6">
       <div className="bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-bold text-indigo-900 text-sm">Do Not Disturb Mode</h4>
            <p className="text-xs text-indigo-600/70 font-medium leading-tight">Silence all notifications outside of work hours.</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-bold rounded-xl shadow-lg shadow-indigo-100">Configure Schedule</button>
       </div>
    </section>
  </div>
);

const InputGroup: React.FC<{ label: string; value: string; type?: string }> = ({ label, value, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} 
      defaultValue={value}
      readOnly
      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-not-allowed"
    />
  </div>
);

const ToggleItem: React.FC<{ title: string; description: string; defaultChecked: boolean }> = ({ title, description, defaultChecked }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 transition-colors group">
      <div className="space-y-1">
        <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{title}</h4>
        <p className="text-[11px] text-slate-400 font-medium leading-tight max-w-sm">{description}</p>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`w-12 h-6 rounded-full transition-all relative flex items-center px-1 shadow-inner ${
          checked ? 'bg-indigo-600' : 'bg-slate-200'
        }`}
      >
        <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-all ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`} />
      </button>
    </div>
  );
};