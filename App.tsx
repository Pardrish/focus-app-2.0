import React, { useState, useEffect } from 'react';
import { BottomNavigation } from './components/Layout/BottomNavigation';
import { TimerScreen } from './screens/TimerScreen';
import { TasksScreen } from './screens/TasksScreen';
import { WellnessScreen } from './screens/WellnessScreen';
import { StatsScreen } from './screens/StatsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AppTab } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('timer');

  // Request notification permission on app load
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'timer':
        return <TimerScreen />;
      case 'tasks':
        return <TasksScreen />;
      case 'wellness':
        return <WellnessScreen />;
      case 'stats':
        return <StatsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <TimerScreen />;
    }
  };

  return (
    <div className="min-h-screen dark-gradient">
      <div className="fade-in">
        {renderActiveScreen()}
      </div>
      
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}

export default App;
