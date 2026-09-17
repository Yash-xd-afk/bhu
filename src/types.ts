export type ScreenType = 'live-qr' | 'scan' | 'timetable' | 'analytics';

export type UserRole = 'admin' | 'cr' | 'student';

export interface UserProfile {
  name: string;
  email: string;
  roll: string;
  enrollment: string;
  role: UserRole;
  device: string;
}

export interface CheckInRecord {
  id: string;
  roll: string;
  name: string;
  verified: boolean;
  mac: string;
  timeAgo: string;
  isOverride?: boolean;
}

export interface TimetableEntry {
  code: string;
  subject: string;
  faculty: string;
  time: string;
  room: string;
  type: 'core' | 'vac';
  status: string;
  badge: string;
  accent: 'primary' | 'secondary' | 'tertiary';
}

export interface SubjectAttendance {
  code: string;
  room: string;
  title: string;
  instructor: string;
  percentage: number;
  attended: number;
  total: number;
  statusText: string;
  marginText: string;
  statusLevel: 'safe' | 'borderline' | 'critical' | 'normal';
  accent: 'primary' | 'secondary' | 'tertiary' | 'error';
}
