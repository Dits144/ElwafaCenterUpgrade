import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role, PublicPage, Student, Program, Activity, Announcement, Article, ApplicationStatus, CalendarEvent } from '../types';
import { INITIAL_STUDENTS, INITIAL_PROGRAMS, INITIAL_ACTIVITIES, INITIAL_ANNOUNCEMENTS, INITIAL_ARTICLES, INITIAL_CALENDAR_EVENTS } from '../data/mockData';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentPage: PublicPage;
  setCurrentPage: (page: PublicPage) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  activeStudent: Student;
  students: Student[];
  programs: Program[];
  articles: Article[];
  activities: Activity[];
  announcements: Announcement[];
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  deleteCalendarEvent: (id: string) => void;
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  dismissToast: (id: number) => void;
  
  // Student Actions
  updateBiodata: (studentId: string, biodata: Partial<Student>) => void;
  applyProgram: (studentId: string, programId: string) => void;
  registerStudent: (data: { name: string; email: string; whatsapp: string; selectedProgramId: string }) => string;
  
  // Admin Actions - Mahasiswa / Pendaftar
  adminApproveApplication: (studentId: string, notes?: string) => void;
  adminRequestRevision: (studentId: string, revisionNotes: string) => void;
  adminRejectApplication: (studentId: string, reason: string) => void;
  adminDeleteStudent: (studentId: string) => void;
  
  // Admin Actions - Kelola Berita / Artikel
  adminAddArticle: (article: Omit<Article, 'id'>) => void;
  adminUpdateArticle: (id: string, article: Partial<Article>) => void;
  adminDeleteArticle: (id: string) => void;
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  // Admin Actions - Kelola Program
  adminAddProgram: (prog: Omit<Program, 'id'>) => void;
  adminUpdateProgram: (id: string, prog: Partial<Program>) => void;
  adminDeleteProgram: (id: string) => void;
  addProgram: (prog: Omit<Program, 'id'>) => void;
  updateProgram: (id: string, prog: Partial<Program>) => void;
  deleteProgram: (id: string) => void;

  // Detail Modal Selectors
  selectedProgramForDetail: Program | null;
  setSelectedProgramForDetail: (prog: Program | null) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (art: Article | null) => void;
  
  // Reset
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STUDENTS: 'elwafa_students_demo_v4',
  ROLE: 'elwafa_role_demo_v3',
  ACTIVE_STUDENT: 'elwafa_active_student_v3',
  ARTICLES: 'elwafa_articles_demo_v6',
  PROGRAMS: 'elwafa_programs_demo_v6',
  CALENDAR: 'elwafa_calendar_demo_v4',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '').toLowerCase() : '';
    if (hash === 'mahasiswa' || hash === 'student') return 'student';
    if (hash === 'admin') return 'admin';
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as Role) || 'visitor';
  });

  const [currentPage, setCurrentPageState] = useState<PublicPage>(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '').toLowerCase() : '';
    if (['beranda', 'program', 'tentang', 'kegiatan', 'artikel', 'kontak', 'login'].includes(hash)) {
      return hash as PublicPage;
    }
    return 'beranda';
  });

  const [activeStudentId, setActiveStudentIdState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_STUDENT);
    return saved || 'EWF-2026-001';
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved students', e);
      }
    }
    return INITIAL_STUDENTS;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved articles', e);
      }
    }
    return INITIAL_ARTICLES;
  });

  const [programs, setPrograms] = useState<Program[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved programs', e);
      }
    }
    return INITIAL_PROGRAMS;
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CALENDAR);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved calendar', e);
      }
    }
    return INITIAL_CALENDAR_EVENTS;
  });

  const [selectedProgramForDetail, setSelectedProgramForDetail] = useState<Program | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT, activeStudentId);
  }, [activeStudentId]);

  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setCurrentPage = (page: PublicPage) => {
    setCurrentPageState(page);
    if (role !== 'visitor') {
      setRoleState('visitor');
    }
    if (typeof window !== 'undefined') {
      window.location.hash = page === 'beranda' ? '' : page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const raw = window.location.hash.replace('#', '').toLowerCase();
      if (['beranda', 'program', 'tentang', 'kegiatan', 'artikel', 'kontak', 'login'].includes(raw)) {
        setCurrentPageState(raw as PublicPage);
        setRoleState('visitor');
      } else if (raw === 'mahasiswa' || raw === 'student') {
        setRoleState('student');
      } else if (raw === 'admin') {
        setRoleState('admin');
      } else if (!raw) {
        setCurrentPageState('beranda');
        setRoleState('visitor');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole === 'visitor') {
      if (typeof window !== 'undefined') {
        window.location.hash = currentPage === 'beranda' ? '' : currentPage;
      }
      showToast('Beralih ke tampilan Pengunjung Publik', 'info');
    } else if (newRole === 'student') {
      if (typeof window !== 'undefined') {
        window.location.hash = 'mahasiswa';
      }
      showToast(`Beralih ke Portal Mahasiswa (${activeStudent?.name || 'Santri'})`, 'info');
    } else if (newRole === 'admin') {
      if (typeof window !== 'undefined') {
        window.location.hash = 'admin';
      }
      showToast('Beralih ke Dashboard Admin & Verifikator', 'info');
    }
  };

  const setActiveStudentId = (id: string) => {
    setActiveStudentIdState(id);
    const target = students.find((s) => s.id === id);
    if (target) {
      showToast(`Aktif sebagai calon mahasiswa: ${target.name}`, 'info');
    }
  };

  const activeStudent = students.find((s) => s.id === activeStudentId) || students[0] || INITIAL_STUDENTS[0];

  // Action: Update Student Biodata
  const updateBiodata = (studentId: string, biodata: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            ...biodata,
            biodataCompleted: true,
            status: s.status === 'DRAFT' || s.status === 'REVISION_REQUIRED' ? 'PENDING' : s.status,
          };
        }
        return s;
      })
    );
    showToast('Biodata berhasil disimpan & diperbarui', 'success');
  };

  // Action: Apply Program
  const applyProgram = (studentId: string, programId: string) => {
    const prog = programs.find((p) => p.id === programId);
    if (!prog) return;
    if (!['DRAFT', 'REVISION_REQUIRED'].includes(students.find((s) => s.id === studentId)?.status || '')) {
      showToast('Program hanya dapat diubah saat pendaftaran masih draft atau diminta revisi.', 'warning');
      return;
    }

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            selectedProgramId: prog.id,
            selectedProgramName: prog.title,
            status: s.biodataCompleted ? 'PENDING' : 'DRAFT',
          };
        }
        return s;
      })
    );
    showToast(`Program "${prog.title}" dipilih. ${students.find((s) => s.id === studentId)?.biodataCompleted ? 'Perubahan diajukan untuk verifikasi.' : 'Lengkapi biodata untuk mengajukan verifikasi.'}`, 'info');
  };

  // Action: Register New Student
  const registerStudent = (data: { name: string; email: string; whatsapp: string; selectedProgramId: string }): string => {
    const nextNum = Math.max(0, ...students.map((s) => Number(s.id.match(/EWF-2026-(\d+)/)?.[1] || 0))) + 1;
    const newId = `EWF-2026-${String(nextNum).padStart(3, '0')}`;
    const prog = programs.find((p) => p.id === data.selectedProgramId) || programs[0];

    const newStudent: Student = {
      id: newId,
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      gender: 'L',
      birthPlace: '',
      birthDate: '',
      originCity: '',
      address: '',
      schoolOrigin: '',
      schoolType: 'MA',
      graduationYear: '',
      parentName: '',
      parentPhone: '',
      parentOccupation: '',
      selectedProgramId: prog.id,
      selectedProgramName: prog.title,
      status: 'DRAFT',
      registrationDate: new Date().toISOString().split('T')[0],
      documents: [],
      biodataCompleted: false,
    };

    setStudents((prev) => [newStudent, ...prev]);
    setActiveStudentIdState(newId);
    setRoleState('student');
    showToast(`Pendaftaran akun baru ${data.name} berhasil dibuat! Nomor ID: ${newId}`, 'success');
    return newId;
  };

  // Action: Admin Approve Application
  const adminApproveApplication = (studentId: string, notes?: string) => {
    if (students.find((s) => s.id === studentId)?.status !== 'PENDING') {
      showToast('Hanya pendaftaran yang sudah diajukan dapat disetujui.', 'warning');
      return;
    }
    const now = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId && s.status === 'PENDING') {
          return {
            ...s,
            status: 'APPROVED' as ApplicationStatus,
            reviewedAt: now,
            reviewedBy: 'Admin Demo',
            revisionNotes: notes || 'Pendaftaran disetujui dalam simulasi lokal. Ini bukan keputusan resmi Elwafa Center.',
            documents: s.documents.map((d) => ({ ...d, status: 'verified' as const })),
          };
        }
        return s;
      })
    );
    showToast(`Pendaftaran mahasiswa ID ${studentId} telah DISETUJUI (ACC)!`, 'success');
  };

  // Action: Admin Request Revision
  const adminRequestRevision = (studentId: string, revisionNotes: string) => {
    if (students.find((s) => s.id === studentId)?.status !== 'PENDING') {
      showToast('Hanya pendaftaran yang sedang diverifikasi dapat diminta revisi.', 'warning');
      return;
    }
    const now = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            status: 'REVISION_REQUIRED' as ApplicationStatus,
            reviewedAt: now,
            reviewedBy: 'Admin Demo',
            revisionNotes: revisionNotes || 'Terdapat dokumen atau data yang perlu diperjelas.',
          };
        }
        return s;
      })
    );
    showToast(`Permintaan perbaikan berkas telah dikirimkan ke calon mahasiswa ID ${studentId}`, 'warning');
  };

  // Action: Admin Reject Application
  const adminRejectApplication = (studentId: string, reason: string) => {
    if (students.find((s) => s.id === studentId)?.status !== 'PENDING') {
      showToast('Hanya pendaftaran yang sedang diverifikasi dapat ditolak.', 'warning');
      return;
    }
    const now = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            status: 'REJECTED' as ApplicationStatus,
            reviewedAt: now,
            reviewedBy: 'Admin Demo',
            revisionNotes: reason || 'Kualifikasi belum memenuhi persyaratan tahun ajaran ini.',
          };
        }
        return s;
      })
    );
    showToast(`Pendaftaran mahasiswa ID ${studentId} telah DITOLAK.`, 'error');
  };

  // Action: Admin Delete Student
  const adminDeleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    showToast(`Data mahasiswa ${studentId} berhasil dihapus.`, 'info');
  };

  // Action: Admin Add Article
  const adminAddArticle = (articleData: Omit<Article, 'id'>) => {
    const newId = `art-${Date.now()}`;
    const newArticle: Article = { ...articleData, id: newId };
    setArticles((prev) => [newArticle, ...prev]);
    showToast('Artikel baru berhasil diterbitkan!', 'success');
  };

  // Action: Admin Update Article
  const adminUpdateArticle = (id: string, updatedData: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, ...updatedData } : art))
    );
    showToast('Artikel berhasil diperbarui!', 'success');
  };

  // Action: Admin Delete Article
  const adminDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((art) => art.id !== id));
    showToast('Artikel berhasil dihapus.', 'info');
  };

  // Action: Admin Add Program
  const adminAddProgram = (progData: Omit<Program, 'id'>) => {
    const newId = `prog-${Date.now()}`;
    const newProg: Program = { ...progData, id: newId };
    setPrograms((prev) => [...prev, newProg]);
    showToast('Program studi baru berhasil ditambahkan!', 'success');
  };

  // Action: Admin Update Program
  const adminUpdateProgram = (id: string, updatedData: Partial<Program>) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
    showToast('Program berhasil diperbarui!', 'success');
  };

  // Action: Admin Delete Program
  const adminDeleteProgram = (id: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    showToast('Program berhasil dihapus.', 'info');
  };

  // Action: Calendar Events
  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEv: CalendarEvent = {
      ...event,
      id: `cal-${Date.now()}`
    };
    setCalendarEvents((prev) => [newEv, ...prev]);
    showToast('Jadwal agenda baru berhasil ditambahkan!', 'success');
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Jadwal agenda berhasil dihapus.', 'info');
  };

  // Action: Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_STUDENT);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.PROGRAMS);
    localStorage.removeItem(STORAGE_KEYS.CALENDAR);
    setStudents(INITIAL_STUDENTS);
    setArticles(INITIAL_ARTICLES);
    setPrograms(INITIAL_PROGRAMS);
    setCalendarEvents(INITIAL_CALENDAR_EVENTS);
    setActiveStudentIdState('EWF-2026-001');
    setRoleState('visitor');
    showToast('Data demo berhasil di-reset ke kondisi awal.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentPage,
        setCurrentPage,
        activeStudentId,
        setActiveStudentId,
        activeStudent,
        students,
        programs,
        articles,
        activities: INITIAL_ACTIVITIES,
        announcements: INITIAL_ANNOUNCEMENTS,
        calendarEvents,
        addCalendarEvent,
        deleteCalendarEvent,
        toasts,
        showToast,
        dismissToast,
        updateBiodata,
        applyProgram,
        registerStudent,
        adminApproveApplication,
        adminRequestRevision,
        adminRejectApplication,
        adminDeleteStudent,
        adminAddArticle,
        adminUpdateArticle,
        adminDeleteArticle,
        addArticle: adminAddArticle,
        updateArticle: adminUpdateArticle,
        deleteArticle: adminDeleteArticle,
        adminAddProgram,
        adminUpdateProgram,
        adminDeleteProgram,
        addProgram: adminAddProgram,
        updateProgram: adminUpdateProgram,
        deleteProgram: adminDeleteProgram,
        selectedProgramForDetail,
        setSelectedProgramForDetail,
        selectedArticle,
        setSelectedArticle,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
