
// Fix: Import React to resolve 'Cannot find namespace React' error for React.ReactNode
import React from 'react';

// Fix: Expanded Tab union to include all routes used in the navigation and app logic
export type Tab = 'Dashboard' | 'Pipeline' | 'Contacts' | 'Settings' | 'Billing' | 'Insights' | 'Accounts' | 'Files' | 'Estimator';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  chartData?: any[];
  chartColor?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  files?: Array<{ name: string; type: string }>;
}

export interface Deal {
  id: string;
  contactName: string;
  companyName: string;
  value: string;
  status: 'Lead' | 'Contacted' | 'Proposal Sent' | 'Won';
  priority: 'low' | 'medium' | 'high';
  avatar: string;
}
