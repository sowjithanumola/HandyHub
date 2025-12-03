export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum WorkerStatus {
  Available = 'Available',
  Busy = 'Busy',
  Absent = 'Absent',
}

export type UserRole = 'client' | 'worker';

export interface Worker {
  id: string;
  name: string;
  category: string;
  gender: Gender;
  hourlyRate: number;
  dailyRate: number;
  distanceKm: number; // Simulated distance
  status: WorkerStatus;
  avatarUrl: string;
  rating: number;
  attendance: boolean[]; // Simple array for last 7 days (true=present)
  phoneNumber: string;
  bio?: string;
}

export interface CallScript {
  language: string;
  script: string;
}

export const LABOR_CATEGORIES = [
  { id: 'construction', name: 'Construction', icon: 'hammer' },
  { id: 'cleaning', name: 'Cleaning', icon: 'sparkles' },
  { id: 'gardening', name: 'Gardening', icon: 'sprout' },
  { id: 'moving', name: 'Helpers / Moving', icon: 'truck' },
  { id: 'plumbing', name: 'Plumbing', icon: 'wrench' },
  { id: 'electrician', name: 'Electrician', icon: 'zap' },
];