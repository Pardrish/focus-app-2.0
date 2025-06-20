import React from 'react';
import { SessionType, Settings } from '../../types';

interface SessionTabsProps {
  activeSession: SessionType;
  onSessionChange: (session: SessionType) => void;
  disabled?: boolean;
  settings: Settings;
}

export function SessionTabs({ activeSession, onSessionChange, disabled, settings }: SessionTabsProps) {
  const sessions = [
    { id: 'focus' as const, label: 'Focus', duration: `${settings.focusDuration}m` },
    { id: 'shortBreak' as const, label: 'Break', duration: `${settings.shortBreakDuration}m` },
    { id: 'longBreak' as const, label: 'Long Break', duration: `${settings.longBreakDuration}m` },
  ];

  return (
    <div className="flex bg-white/5 rounded-xl p-1 mb-8">
      {sessions.map((session) => (
        <button
          key={session.id}
          onClick={() => onSessionChange(session.id)}
          disabled={disabled}
          className={`flex-1 py-3 px-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeSession === session.id
              ? 'coral-gradient text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="text-center">
            <div className="font-semibold text-xs sm:text-sm">{session.label}</div>
            <div className="text-xs opacity-75">{session.duration}</div>
          </div>
        </button>
      ))}
    </div>
  );
}