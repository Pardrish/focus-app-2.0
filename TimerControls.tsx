import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { Button } from '../UI/Button';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  disabled?: boolean;
}

export function TimerControls({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
  disabled = false,
}: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <Button
        variant="ghost"
        size="large"
        icon={RotateCcw}
        onClick={onReset}
        disabled={disabled}
        className="!p-4 mobile-button"
      />

      <Button
        variant="primary"
        size="large"
        icon={isRunning ? Pause : Play}
        onClick={isRunning ? onPause : onStart}
        disabled={disabled}
        className="!p-6 scale-125 mobile-button shadow-lg shadow-coral-500/25"
      />

      <Button
        variant="ghost"
        size="large"
        icon={SkipForward}
        onClick={onSkip}
        disabled={disabled}
        className="!p-4 mobile-button"
      />
    </div>
  );
}