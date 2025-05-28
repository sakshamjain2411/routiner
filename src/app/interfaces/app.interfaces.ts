export interface User {
  id: string;
  name: string;
  email: string;
  habits: Habit[]; // Optional, can be an array of habits
  // Add other user properties as needed
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: string; // e.g., 'daily', 'weekly'
  startDate: Date;
  endDate?: Date;
  target: number; // e.g., target number of times per week
  progress: number; // e.g., current progress towards the target
  unit: string; // e.g., 'times', 'minutes'
  icon: string; // URL or path to an icon image
}

export interface Track {
  id: string;
  habitId: string;
  date: string; // ISO date string
  amount: number; // e.g., number of times completed
}

export interface DateNavigator {
  date: number;
  day: string;
  dateString: string;
}

export interface QuickAction {
  times: string[];
  minutes: string[];
  hours: string[];
  kilograms: string[];
  liters: string[];
  steps: string[];
}

export interface AppState {
  user: User;
  habits: Habit[]; // List of habits
  tracks: Track[]; // List of habit tracking records
}