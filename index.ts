export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export type TaskCategory = 'work' | 'personal' | 'health' | 'learning' | 'other';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface TimerSession {
  id: string;
  type: SessionType;
  duration: number;
  completedAt: Date;
  interrupted: boolean;
}

export type SessionType = 'focus' | 'shortBreak' | 'longBreak';

export interface Settings {
  darkMode: boolean;
  notifications: boolean;
  soundEffects: boolean;
  strictMode: boolean;
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  blockedApps: string[];
}

export interface Stats {
  totalFocusTime: number;
  sessionsCompleted: number;
  tasksCompleted: number;
  currentStreak: number;
  longestStreak: number;
  averageSessionLength: number;
}

export interface WellnessVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  category: WellnessCategory;
  url: string;
}

export type WellnessCategory = 
  | 'meditation' 
  | 'yoga' 
  | 'fitness' 
  | 'nutrition' 
  | 'sleep' 
  | 'uploadVideo';

export type AppTab = 'timer' | 'tasks' | 'wellness' | 'stats' | 'settings';