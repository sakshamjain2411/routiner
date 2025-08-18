export interface User {
  userId: string;
  name: string;
  email: string;
  photoUrl: string; // Optional, can be an array of habits
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
  createdOn: string; // Optional, timestamp of when the track was created
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  icon: string
  frequency: string;
  updatedOn: string;
  createdOn: string;
  dueIn: number;
}

export interface RoutineTrack {
  id: string;
  routineId: string;
  date: string;
  createdOn: string;
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
  initialized: boolean;
  user: User;
  selectedDate: string; // Date string
  habits: Habit[]; // List of habits
  tracks: Track[]; // List of habit tracking records
  routines: Routine[];
  routineTracks: RoutineTrack[]
}