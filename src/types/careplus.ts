export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  category: string;
  rating: number;
  reviewCount: number;
  isOnline: boolean;
  imageUrl: string;
  fallbackColor: string;
  fee: number;
  hospital: string;
  experienceYears: number;
  about: string;
  patientsTreated: string;
  availableDays: string[];
  slots: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  doctorImage: string;
  fallbackColor: string;
  hospital: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., '10:00 AM'
  type: 'video' | 'in_person';
  status: 'upcoming' | 'completed' | 'cancelled';
  patientName: string;
  patientPhone: string;
  notes?: string;
  fee: number;
  createdAt: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  iconName: 'stethoscope' | 'tooth' | 'smile' | 'baby' | 'heart' | 'brain' | 'bone';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'appointment' | 'health' | 'promo';
}

export interface HealthVital {
  heartRate: number; // bpm
  bloodPressure: string; // e.g. "120/80"
  waterIntake: number; // ml
  weight: number; // kg
  steps: number;
}
