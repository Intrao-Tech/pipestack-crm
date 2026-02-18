
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] p-6">
      <div className="w-full max-w-[1200px] mx-auto flex overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 shadow-xl relative">
        
        {/* Left Side: Content Section */}
        <div className="flex-1 p-16 flex flex-col justify-between">
          <div>
            {/* Header / Stepper */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">P</div>
                <span className="font-bold text-slate-900 tracking-tight">Pipestack</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{step} / {totalSteps}</span>
                <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
              {step === 1 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Let's set up your workspace</h2>
                    <p className="text-slate-500 text-sm">Tell us a bit about your organization to personalize your experience.</p>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Workspace Name</label>
                      <input type="text" placeholder="e.g. Acme Design Studio" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Your Role</label>
                        <select className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer">
                          <option>Founder / CEO</option>
                          <option>Sales Manager</option>
                          <option>Freelancer</option>
                          <option>Operations</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Team Size</label>
                        <select className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer">
                          <option>Just me</option>
                          <option>2 - 5 people</option>
                          <option>6 - 20 people</option>
                          <option>20+ people</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Choose your pipeline</h2>
                    <p className="text-slate-500 text-sm">Select a template that best matches your workflow.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <TemplateCard 
                      title="Freelancer" 
                      description="Simple 4-stage pipeline for single-person studios."
                      icon="👤"
                      active={true}
                    />
                    <TemplateCard 
                      title="Agency" 
                      description="Comprehensive flow including vetting and contract stages."
                      icon="🏢"
                    />
                    <TemplateCard 
                      title="Sales Team" 
                      description="High-volume pipeline with automated lead scoring."
                      icon="⚡"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Invite your team</h2>
                    <p className="text-slate-500 text-sm">Pipestack is better together. Add colleagues to start collaborating.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Team Emails</label>
                      <textarea 
                        rows={3}
                        placeholder="john@example.com, sara@example.com..." 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                      />
                    </div>
                    <button className="w-full bg-[#1E293B] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98]">
                      Send Invites
                    </button>
                    <div className="flex justify-center">
                      <button onClick={onComplete} className="text-sm font-semibold text-slate-400 hover:text-indigo-600 transition-colors">
                        Skip for now
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
            {step > 1 && (
              <button 
                onClick={prevStep}
                className="px-8 py-3.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
              >
                Back
              </button>
            )}
            <button 
              onClick={nextStep}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
            >
              {step === totalSteps ? 'Complete Setup' : 'Next Step'}
            </button>
          </div>
        </div>

        {/* Right Side: Visual Graphic */}
        <div className="hidden lg:flex w-[450px] bg-[#0F172A] relative overflow-hidden flex-col items-center justify-center p-12 text-center">
           {/* Decorative mesh */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full"></div>

           <div className="relative space-y-8 z-10">
              <div className="w-64 h-64 rounded-[3rem] bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 flex items-center justify-center relative group">
                 <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]"></div>
                 
                 {/* Abstract visual depending on step */}
                 <div className="space-y-4 w-full">
                    <div className={`h-4 bg-indigo-500/30 rounded-full transition-all duration-700 ${step >= 1 ? 'w-full' : 'w-0'}`}></div>
                    <div className={`h-4 bg-purple-500/30 rounded-full transition-all duration-700 delay-100 ${step >= 2 ? 'w-3/4' : 'w-0'}`}></div>
                    <div className={`h-4 bg-pink-500/30 rounded-full transition-all duration-700 delay-200 ${step >= 3 ? 'w-1/2' : 'w-0'}`}></div>
                 </div>

                 {/* Floating Badge */}
                 <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-2xl flex items-center justify-center animate-bounce">
                    <span className="text-2xl">✨</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-white font-bold text-lg">Smart Pipeline Analytics</h4>
                 <p className="text-slate-400 text-sm leading-relaxed px-4">
                    Our AI automatically categorizes leads and suggests the best follow-up actions based on historical data.
                 </p>
              </div>

              <div className="flex justify-center gap-1">
                 {[1,2,3].map(i => (
                   <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === step ? 'w-4 bg-indigo-500' : 'bg-slate-700'}`}></div>
                 ))}
              </div>
           </div>
           
           <div className="absolute bottom-8 text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
              Powered by Pipestack Engine
           </div>
        </div>
      </div>
    </div>
  );
};

const TemplateCard: React.FC<{ title: string; description: string; icon: string; active?: boolean }> = ({ 
  title, description, icon, active 
}) => (
  <button className={`w-full p-5 rounded-2xl border text-left transition-all group ${
    active 
      ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
      : 'bg-white border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
  }`}>
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${
        active ? 'bg-white' : 'bg-slate-50 group-hover:bg-white'
      }`}>
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <h5 className={`font-bold text-sm ${active ? 'text-indigo-900' : 'text-slate-900'}`}>{title}</h5>
        <p className={`text-xs leading-relaxed ${active ? 'text-indigo-600/70' : 'text-slate-500'}`}>{description}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
        active ? 'border-indigo-600 bg-indigo-600' : 'border-slate-200'
      }`}>
        {active && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
      </div>
    </div>
  </button>
);
