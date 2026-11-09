export type Role = 'visitor' | 'student' | 'admin';

export type PublicPage = 'beranda' | 'program' | 'tentang' | 'kegiatan' | 'artikel' | 'kontak' | 'login';

export type ApplicationStatus = 'DRAFT' | 'PENDING' | 'REVISION_REQUIRED' | 'APPROVED' | 'REJECTED';

export interface StudentDocument {
  id: string;
  name: string;
  type: string;
  status: 'uploaded' | 'verified' | 'revision';
  fileName: string;
  uploadDate: string;
}

export interface Student {
  id: string; // e.g. EWF-2026-001
  name: string;
  email: string;
  whatsapp: string;
  gender: 'L' | 'P';
  birthPlace: string;
  birthDate: string;
  originCity: string;
  address: string;
  schoolOrigin: string;
  schoolType: 'MA' | 'SMA' | 'Pondok Pesantren' | 'Lainnya';
  graduationYear: string;
  parentName: string;
  parentPhone: string;
  parentOccupation: string;
  selectedProgramId: string;
  selectedProgramName: string;
  status: ApplicationStatus;
  registrationDate: string;
  revisionNotes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  documents: StudentDocument[];
  biodataCompleted: boolean;
  avatar?: string;
  quranHafalanJuz?: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  duration: string;
  schedule: string;
  quota: number;
  enrolledCount: number;
  requirements: string[];
  image: string;
  featured: boolean;
  priceNote: string;
  curriculum?: string[];
  facilitiesIndonesia?: string[];
  facilitiesMesir?: string[];
  targetDegrees?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'TERKINI' | 'SEPUTAR AL-AZHAR' | 'REKOMENDASI' | 'KEGIATAN' | 'PENDIDIKAN' | 'Akademik' | 'Kegiatan' | 'Prestasi' | 'Kerjasama' | 'Pengumuman';
  summary: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  image: string;
  status: 'PUBLISHED' | 'DRAFT';
  readTime: string;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
  category: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  category: 'Akademik' | 'Administrasi' | 'Keberangkatan' | 'Umum';
  important: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  category: 'SELEKSI' | 'DAUROH' | 'ADMINISTRASI' | 'KEBERANGKATAN' | 'TRYOUT';
  description: string;
  quotaTarget?: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
}

export interface CurrentUser {
  role: Role;
  id: string;
  name: string;
  email: string;
}
