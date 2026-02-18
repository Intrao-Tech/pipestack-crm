import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Signup } from './components/Signup';
import { Onboarding } from './components/Onboarding';
import { PipelineBoard } from './components/PipelineBoard';
import { Settings } from './components/Settings';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);

  if (!isAuthenticated) {
    return <Signup onSignup={() => setIsAuthenticated(true)} />;
  }

  if (isOnboarding) {
    return <Onboarding onComplete={() => setIsOnboarding(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Pipeline':
        return <PipelineBoard />;
      case 'Settings':
        return <Settings />;
      case 'Contacts':
        return (
          <div className="flex items-center justify-center h-[calc(100vh-80px)] text-slate-400">
            Contacts directory coming soon...
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-[calc(100vh-80px)] text-slate-400">
            Section under development
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;