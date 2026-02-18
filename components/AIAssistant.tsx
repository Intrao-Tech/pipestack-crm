
import React, { useState } from 'react';
import { ChatMessage } from '../types';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Please upload a file so I can analyze it and help you move forward!',
      timestamp: '10:57'
    },
    {
      id: '2',
      role: 'user',
      content: 'Uploading now — what\'s next?',
      timestamp: '10:58',
      files: [{ name: 'financials.pdf', type: 'application/pdf' }]
    },
    {
      id: '3',
      role: 'assistant',
      content: 'Thank you! I\'ve received the file and I\'m processing it right now.',
      timestamp: '10:58'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="h-full bg-white rounded-2xl border border-slate-100 p-4 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h4 className="flex items-center gap-2 font-bold text-[#1E293B]">
          <span className="text-purple-500">✨</span>
          AI Assistant
        </h4>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 px-1">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className="flex gap-3 max-w-[85%]">
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L14.4 8.4H20.8L15.6 12.3L18 18.7L12 14.8L6 18.7L8.4 12.3L3.2 8.4H9.6L12 2Z" />
                  </svg>
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#1E293B] text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-700 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>

                {msg.files && msg.files.map((file, i) => (
                   <div key={i} className="flex items-center gap-2 p-2 bg-indigo-50 border border-indigo-100 rounded-xl">
                      <div className="bg-white p-1.5 rounded-lg shadow-sm">
                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M7 2a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V8l-6-6H7zm6 2l5 5h-5V4zM8 12h8v2H8v-2zm0 4h8v2H8v-2z" />
                        </svg>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-[10px] font-bold text-slate-800 truncate">{file.name}</p>
                        <p className="text-[8px] text-slate-400">PDF Document • 2.4 MB</p>
                      </div>
                   </div>
                ))}

                <span className="text-[10px] text-slate-400 mt-1">{msg.timestamp}</span>
              </div>

              {msg.role === 'user' && (
                <img src="https://picsum.photos/seed/alex/32/32" className="w-8 h-8 rounded-lg flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex gap-2">
           <button className="px-3 py-1.5 bg-[#1E293B] text-white text-[10px] font-bold rounded-lg shadow-sm">GPT-5</button>
           <button className="px-3 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100">Docs AI</button>
           <button className="px-3 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100">Finance AI</button>
        </div>

        <div className="relative">
          <button className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a request..."
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-10 pr-12 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-800"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#1E293B] text-white rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
