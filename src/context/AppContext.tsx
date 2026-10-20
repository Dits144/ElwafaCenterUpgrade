import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role, Student, Program, Activity, Announcement, Article, ApplicationStatus } from '../types';
import { INITIAL_STUDENTS, INITIAL_PROGRAMS, INITIAL_ACTIVITIES, INITIAL_ANNOUNCEMENTS, INITIAL_ARTICLES } from '../data/mockData';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  activeStudent: Student;
  students: Student[];
  programs: Program[];
  articles: Article[];
  activities: Activity[];
  announcements: Announcement[];
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
  STUDENTS: 'elwafa_students_demo_v2',
  ROLE: 'elwafa_role_demo_v2',
  ACTIVE_STUDENT: 'elwafa_active_student_v2',
  ARTICLES: 'elwafa_articles_demo_v2',
  PROGRAMS: 'elwafa_programs_demo_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as Role) || 'visitor';
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

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole === 'visitor') {
      showToast('Beralih ke tampilan Pengunjung Publik', 'info');
    } else if (newRole === 'student') {
      showToast(`Beralih ke Portal Mahasiswa (${activeStudent?.name || 'Santri'})`, 'info');
    } else if (newRole === 'admin') {
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
            status: s.status === 'REVISION_REQUIRED' ? 'PENDING' : s.status,
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

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            selectedProgramId: prog.id,
            selectedProgramName: prog.title,
            status: 'PENDING',
          };
        }
        return s;
      })
    );
    showToast(`Pendaftaran program "${prog.title}" berhasil diajukan! Menunggu verifikasi admin.`, 'success');
  };

  // Action: Register New Student
  const registerStudent = (data: { name: string; email: string; whatsapp: string; selectedProgramId: string }): string => {
    const nextNum = students.length + 1;
    const newId = `EWF-2026-${String(nextNum).padStart(3, '0')}`;
    const prog = programs.find((p) => p.id === data.selectedProgramId) || programs[0];

    const newStudent: Student = {
      id: newId,
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      gender: 'L',
      birthPlace: 'Jakarta',
      birthDate: '2007-01-01',
      originCity: 'Jakarta Selatan, DKI Jakarta',
      address: 'Jl. Merdeka No. 10',
      schoolOrigin: 'MAN 4 Jakarta',
      schoolType: 'MA',
      graduationYear: '2025',
      parentName: 'H. Orang Tua Santri',
      parentPhone: '081234567890',
      parentOccupation: 'Pegawai Swasta',
      selectedProgramId: prog.id,
      selectedProgramName: prog.title,
      status: 'PENDING',
      registrationDate: new Date().toISOString().split('T')[0],
      documents: [
        { id: 'doc-auto-1', name: 'Scan Ijazah Terlegalisir', type: 'PDF', status: 'uploaded', fileName: `Ijazah_${data.name.replace(/\s+/g, '')}.pdf`, uploadDate: new Date().toISOString().split('T')[0] },
        { id: 'doc-auto-2', name: 'Pas Foto 4x6', type: 'PNG', status: 'uploaded', fileName: 'PasFoto_Formal.png', uploadDate: new Date().toISOString().split('T')[0] }
      ],
      biodataCompleted: true,
    };

    setStudents((prev) => [newStudent, ...prev]);
    setActiveStudentIdState(newId);
    setRoleState('student');
    showToast(`Pendaftaran akun baru ${data.name} berhasil dibuat! Nomor ID: ${newId}`, 'success');
    return newId;
  };

  // Action: Admin Approve Application
  const adminApproveApplication = (studentId: string, notes?: string) => {
    const now = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            status: 'APPROVED' as ApplicationStatus,
            reviewedAt: now,
            reviewedBy: 'Ustadz Ridwan (Admin Verifikator)',
            revisionNotes: notes || 'Berkas pendaftaran telah diverifikasi lengkap dan memenuhi kriteria akademik.',
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
    const now = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            status: 'REVISION_REQUIRED' as ApplicationStatus,
            reviewedAt: now,
            reviewedBy: 'Ustadz Ridwan (Admin Verifikator)',
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
    const now = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            status: 'REJECTED' as ApplicationStatus,
            reviewedAt: now,
            reviewedBy: 'Ustadz Ridwan (Admin Verifikator)',
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

  // Action: Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_STUDENT);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.PROGRAMS);
    setStudents(INITIAL_STUDENTS);
    setArticles(INITIAL_ARTICLES);
    setPrograms(INITIAL_PROGRAMS);
    setActiveStudentIdState('EWF-2026-001');
    setRoleState('visitor');
    showToast('Data demo berhasil di-reset ke kondisi awal.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeStudentId,
        setActiveStudentId,
        activeStudent,
        students,
        programs,
        articles,
        activities: INITIAL_ACTIVITIES,
        announcements: INITIAL_ANNOUNCEMENTS,
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
