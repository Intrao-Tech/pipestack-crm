
import React from 'react';
import logoImg from '../assets/logo.png';
import signInElementImg from '../assets/sign-in-element.png';
import floatingButtonImg from '../assets/floating-button.png';
import googleImg from '../assets/google.png';
import appleImg from '../assets/apple.png';

interface SignupProps {
  onSignup: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup();
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Left Side: Form Section */}
      <div className="w-full lg:w-[520px] shrink-0 p-10 lg:px-16 lg:py-12 flex flex-col justify-between relative" style={{ boxShadow: '1px 0 0 0 #E8E6EF, 4px 0 24px -4px rgba(30,27,75,0.04)' }}>
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <img src={logoImg} alt="Pipestack" className="w-20 h-20" />
            <span className="text-3xl font-bold text-[#1E1B4B] tracking-tight">Pipestack</span>
          </div>

          {/* Headline */}
          <div className="mb-8">
            <h1 className="text-[2.25rem] font-extrabold text-[#1E1B4B] tracking-tight leading-[1.15]">Growth starts with clarity.</h1>
            <p className="text-[#94919B] text-sm font-normal leading-relaxed mt-2.5">Join 2,000+ studios using AI to manage their pipeline with surgical precision.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-[#A8A4B4] uppercase tracking-[0.12em] ml-0.5">Full name</label>
              <input
                type="text"
                placeholder="e.g. Alex Rivera"
                className="w-full bg-[#F8F7FA] border border-[#EEEDF2] rounded-xl py-3.5 px-4.5 text-sm text-[#1E1B4B] placeholder-[#C8C5D0] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-[#A8A4B4] uppercase tracking-[0.12em] ml-0.5">Work email</label>
              <input
                type="email"
                placeholder="alex@studio.com"
                className="w-full bg-[#F8F7FA] border border-[#EEEDF2] rounded-xl py-3.5 px-4.5 text-sm text-[#1E1B4B] placeholder-[#C8C5D0] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-[#A8A4B4] uppercase tracking-[0.12em] ml-0.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#F8F7FA] border border-[#EEEDF2] rounded-xl py-3.5 px-4.5 text-sm text-[#1E1B4B] placeholder-[#C8C5D0] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E1B4B] hover:bg-[#2D2A5E] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-[#1E1B4B]/10 transition-all hover:-translate-y-px active:scale-[0.99] mt-2"
            >
              Create Account
            </button>
          </form>

          {/* Social Sign In Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#EEEDF2]"></div>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-[0.14em]">
              <span className="bg-white px-4 text-[#C8C5D0] font-medium">Social Sign In</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center gap-4">
            <button className="w-12 h-12 bg-white hover:bg-[#F8F7FA] rounded-xl flex items-center justify-center transition-all border border-[#EEEDF2] hover:border-[#D8D6DE] active:scale-95">
              <img src={googleImg} alt="Google" className="w-4 h-4 opacity-50" />
            </button>
            <button className="w-12 h-12 bg-white hover:bg-[#F8F7FA] rounded-xl flex items-center justify-center transition-all border border-[#EEEDF2] hover:border-[#D8D6DE] active:scale-95">
              <img src={appleImg} alt="Apple" className="w-4 h-4 opacity-50" />
            </button>
            <button className="w-12 h-12 bg-white hover:bg-[#F8F7FA] rounded-xl flex items-center justify-center transition-all border border-[#EEEDF2] hover:border-[#D8D6DE] active:scale-95">
              <svg className="w-4 h-4 text-[#9995A8]" viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" /></svg>
            </button>
          </div>
        </div>

        {/* Bottom Link */}
        <p className="text-center text-xs text-[#A8A4B4] mt-8">
          Already have an account? <span className="text-[#4F46E5] font-medium cursor-pointer hover:underline">Sign in</span>
        </p>
      </div>

      {/* Right Side: Visual Section */}
      <div className="hidden lg:flex flex-1 relative bg-[#F8F7FA] overflow-hidden items-center justify-center">
        {/* Gradient Blob */}
        <img
          src={signInElementImg}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-[65%] -translate-y-[20%] w-[1400px] h-auto opacity-90 pointer-events-none select-none"
        />

        {/* Content Area */}
        <div className="relative flex flex-col items-center gap-10">
          {/* Floating Badge */}
          <div className="relative">
            <img
              src={floatingButtonImg}
              alt="Proposal analyzed!"
              className="w-80 h-auto drop-shadow-[0_12px_32px_rgba(30,27,75,0.18)]"
            />
          </div>

          {/* Text */}
          <div className="text-center max-w-xs">
            <h3 className="text-xl font-bold text-[#1E1B4B] tracking-tight">Predictive Sales Forecasting</h3>
            <p className="text-sm text-[#94919B] mt-2 leading-relaxed font-normal">Let AI calculate your win probability while you focus on the creative work.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
