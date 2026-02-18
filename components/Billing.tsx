
import React from 'react';

const PLANS = [
  {
    name: 'Starter',
    price: '£0',
    description: 'Perfect for individual freelancers.',
    features: [
      'Up to 10 active deals',
      'Basic CRM features',
      'Single user seat',
      'Community support',
      'Standard analytics',
    ],
    cta: 'Upgrade Plan',
    current: false,
    popular: false,
  },
  {
    name: 'Growth',
    price: '£29',
    description: 'Our most popular plan for growing studios.',
    features: [
      'Unlimited active deals',
      'Advanced AI Assistant',
      'Up to 5 team members',
      'Priority email support',
      'Detailed velocity reports',
      'Client portal access',
    ],
    cta: 'Current Plan',
    current: true,
    popular: true,
  },
  {
    name: 'Scale',
    price: '£79',
    description: 'Built for high-volume agencies.',
    features: [
      'Everything in Growth',
      'Unlimited team members',
      'Custom API integrations',
      'Dedicated success manager',
      'Enterprise-grade security',
      'Whitelabel reporting',
    ],
    cta: 'Upgrade to Scale',
    current: false,
    popular: false,
  },
];

const BILLING_HISTORY = [
  { date: 'Feb 1, 2025', amount: '£29.00', status: 'Paid', method: 'Visa ending in 4242' },
  { date: 'Jan 1, 2025', amount: '£29.00', status: 'Paid', method: 'Visa ending in 4242' },
  { date: 'Dec 1, 2024', amount: '£29.00', status: 'Paid', method: 'Visa ending in 4242' },
  { date: 'Nov 1, 2024', amount: '£29.00', status: 'Paid', method: 'Visa ending in 4242' },
];

interface BillingProps {
  isNested?: boolean;
}

export const Billing: React.FC<BillingProps> = ({ isNested = false }) => {
  return (
    <div className={`animate-in fade-in duration-500 ${isNested ? 'p-10 overflow-y-auto h-full max-h-[calc(100vh-250px)] custom-scrollbar' : 'px-8 pb-12 slide-in-from-bottom-2'}`}>
      {!isNested && (
        <div className="mt-4 mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-[#1E1B4B] tracking-tight mb-2">Billing & Plans</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Scale your studio with flexible pricing. No hidden fees, just pure productivity.
          </p>
        </div>
      )}

      {isNested && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-[#1E1B4B]">Subscription & Billing</h3>
          <p className="text-sm text-slate-400 mt-1">Review your plan details and billing history below.</p>
        </div>
      )}

      {/* Pricing Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 items-start ${isNested ? 'max-w-none' : 'max-w-6xl mx-auto'}`}>
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
              plan.popular
                ? 'border-2 border-indigo-200 shadow-xl shadow-indigo-100/40 -mt-2 mb-[-8px] pb-9 overflow-hidden'
                : 'bg-white border border-slate-150 shadow-sm hover:shadow-md hover:border-slate-200'
            }`}
          >
            {/* Z-path gradient background for popular card */}
            {plan.popular && (
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `
                  radial-gradient(ellipse 60% 50% at 0% 0%, rgba(99,102,241,0.12) 0%, transparent 70%),
                  radial-gradient(ellipse 50% 40% at 100% 45%, rgba(139,92,246,0.10) 0%, transparent 70%),
                  radial-gradient(ellipse 60% 50% at 0% 100%, rgba(99,102,241,0.08) 0%, transparent 70%),
                  linear-gradient(135deg, rgba(238,242,255,0.9) 0%, rgba(255,255,255,0.6) 30%, rgba(245,243,255,0.5) 50%, rgba(255,255,255,0.6) 70%, rgba(238,242,255,0.7) 100%)
                `
              }} />
            )}

            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute top-6 right-6 z-10">
                <span className="bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  Popular
                </span>
              </div>
            )}

            {/* Plan Name & Description */}
            <div className="mb-5 relative z-10">
              <h3 className={`text-lg font-bold ${plan.popular ? 'text-[#1E1B4B]' : 'text-[#1E1B4B]'}`}>{plan.name}</h3>
              <p className="text-sm text-slate-400 mt-1">{plan.description}</p>
            </div>

            {/* Price */}
            <div className="mb-6 relative z-10">
              <div className="flex items-baseline gap-1">
                <span className={`font-extrabold text-[#1E1B4B] ${plan.popular ? 'text-5xl' : 'text-4xl'}`}>{plan.price}</span>
                <span className="text-slate-400 text-sm font-medium">/month</span>
              </div>
            </div>

            {/* Features */}
            <div className="flex-1 space-y-3.5 mb-7 relative z-10">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-indigo-500' : 'text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-600">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className={`relative z-10 w-full py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
              plan.current
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700'
                : plan.name === 'Scale'
                  ? 'bg-[#1E1B4B] text-white hover:bg-[#2D2A5E] shadow-lg shadow-slate-200'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Billing History Section */}
      <div className={`${isNested ? 'max-w-none' : 'max-w-6xl mx-auto'} space-y-4`}>
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-[#1E1B4B] uppercase tracking-wider">Billing History</h3>
          <button className="text-xs font-semibold text-indigo-600 hover:underline">Manage Payment Method</button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-3.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {BILLING_HISTORY.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600">{row.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#1E1B4B]">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 inline">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
