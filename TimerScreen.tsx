import React, { useState, useCallback } from 'react';
import { BarChart3, Settings } from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { SessionTabs } from '../components/Timer/SessionTabs';
import { TimerDisplay } from '../components/Timer/TimerDisplay';
import { TimerControls } from '../components/Timer/TimerControls';
import { TimerStats } from '../components/Timer/TimerStats';
import { Card } from '../components/UI/Card';
import { useTimer } from '../hooks/useTimer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SessionType, Settings as SettingsType } from '../types';

export function TimerScreen() {
  const [selectedSession, setSelectedSession] = useState<SessionType>('focus');
  const [stats, setStats] = useLocalStorage('timer-stats', {
    focusSessions: 0,
    tasksCompleted: 0,
    dayStreak: 0,
  });

  const [settings] = useLocalStorage<SettingsType>('app-settings', {
    darkMode: true,
    notifications: true,
    soundEffects: true,
    strictMode: false,
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsUntilLongBreak: 4,
    blockedApps: [],
  });

  const handleTimerComplete = useCallback(() => {
    // Play notification sound
    if (settings.notifications && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('Timer Complete!', {
        body: 'Time for your next session',
        icon: '/timer-icon.svg',
      });
    }

    // Update stats
    if (selectedSession === 'focus') {
      setStats(prev => ({
        ...prev,
        focusSessions: prev.focusSessions + 1,
      }));
    }
  }, [selectedSession, setStats, settings.notifications]);

  const {
    timeLeft,
    isRunning,
    sessionType,
    currentSession,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    skipTimer,
    formatTime,
    getProgress,
  } = useTimer({ 
    settings,
    onComplete: handleTimerComplete 
  });

  const handleStart = () => {
    if (timeLeft === 0) {
      startTimer(selectedSession);
    } else {
      resumeTimer();
    }
  };

  const handleSessionChange = (session: SessionType) => {
    if (!isRunning) {
      setSelectedSession(session);
      resetTimer();
    }
  };

  const rightActions = (
    <div className="flex gap-2">
      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
        <BarChart3 size={20} className="text-white" />
      </button>
      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
        <Settings size={20} className="text-white" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen dark-gradient pb-20">
      <Header 
        title="Focus Flow" 
        rightAction={rightActions}
      />

      <div className="px-4 py-6 max-w-md mx-auto">
        <Card className="mb-6">
          <SessionTabs
            activeSession={selectedSession}
            onSessionChange={handleSessionChange}
            disabled={isRunning}
            settings={settings}
          />

          <TimerDisplay
            timeLeft={timeLeft}
            sessionType={sessionType || selectedSession}
            currentSession={currentSession}
            totalSessions={settings.sessionsUntilLongBreak}
            progress={getProgress()}
            formatTime={formatTime}
          />

          <TimerControls
            isRunning={isRunning}
            onStart={handleStart}
            onPause={pauseTimer}
            onReset={resetTimer}
            onSkip={skipTimer}
          />
        </Card>

        <TimerStats
          focusSessions={stats.focusSessions}
          tasksCompleted={stats.tasksCompleted}
          dayStreak={stats.dayStreak}
        />

        <Card className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">Today's Tasks</h3>
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center">
                📝
              </div>
              <p>No tasks added yet</p>
              <p className="text-sm">Add tasks to track your progress</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}