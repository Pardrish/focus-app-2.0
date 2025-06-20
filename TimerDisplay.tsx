import React from 'react';
import { SessionType } from '../../types';

interface TimerDisplayProps {
  timeLeft: number;
  sessionType: SessionType;
  currentSession: number;
  totalSessions: number;
  progress: number;
  formatTime: (seconds: number) => string;
}

export function TimerDisplay({
  timeLeft,
  sessionType,
  currentSession,
  totalSessions,
  progress,
  formatTime,
}: TimerDisplayProps) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getSessionLabel = (type: SessionType) => {
    switch (type) {
      case 'focus':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  const getSessionEmoji = (type: SessionType) => {
    switch (type) {
      case 'focus':
        return '🎯';
      case 'shortBreak':
        return '☕';
      case 'longBreak':
        return '🌟';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      {/* Progress Ring */}
      <div className="relative w-56 h-56 mb-8">
        <svg
          className="w-full h-full timer-ring"
          viewBox="0 0 200 200"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="6"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="progress-ring"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#FF8E8E" />
            </linearGradient>
          </defs>
        </svg>

        {/* Timer content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl mb-2">
            {getSessionEmoji(sessionType)}
          </div>
          <div className="text-4xl font-bold text-white mb-2 font-mono timer-display">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-400">
            Session {currentSession} of {totalSessions}
          </div>
        </div>
      </div>

      {/* Session type indicator */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-white mb-2">
          {getSessionLabel(sessionType)}
        </h2>
        <p className="text-gray-400 text-base px-4">
          {sessionType === 'focus' 
            ? 'Stay focused and be productive' 
            : 'Take a well-deserved break'
          }
        </p>
      </div>
    </div>
  );
}