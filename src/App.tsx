import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from './context/AppContext';
import { Program } from './types';
import { Navbar } from './components/public/Navbar';
import { IntroExperience } from './components/public/IntroExperience';
import { Footer } from './components/public/Footer';
import { HomePage } from './components/pages/HomePage';
import { ProgramsPage } from './components/pages/ProgramsPage';
import { RegisterModal } from './components/public/RegisterModal';
import { ProgramDetailModal } from './components/public/ProgramDetailModal';
import { ArticleDetailModal } from './components/public/ArticleDetailModal';
import { DemoSwitcher } from './components/common/DemoSwitcher';
import { ToastContainer } from './components/common/ToastContainer';
import { RouteErrorBoundary } from './components/common/RouteErrorBoundary';
import { LoadingScreen } from './components/common/LoadingScreen';

// Code-split heavier views to optimize initial bundle size & mobile performance
const AboutPage = lazy(() => import('./components/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const GalleryPage = lazy(() => import('./components/pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const ArticlesPage = lazy(() => import('./components/pages/ArticlesPage').then(m => ({ default: m.ArticlesPage })));
const ContactPage = lazy(() => import('./components/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const LoginPage = lazy(() => import('./components/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const StudentDashboard = lazy(() => import('./components/student/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

const PageFallback: React.FC<{ message?: string }> = ({ message = 'Memuat halaman pembelajaran...' }) => (
  <LoadingScreen minHeight="min-h-[50vh]" message={message} />
);
const DashboardFallback: React.FC<{ message?: string }> = ({ message = 'Menyiapkan portal...' }) => (
  <LoadingScreen fullScreen message={message} />
);

export const App: React.FC = () => {
  const { role, currentPage, applyProgram, activeStudentId } = useApp();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedProgramForRegister, setSelectedProgramForRegister] = useState<Program | null>(null);

  const handleOpenRegister = (prog?: Program) => {
    setSelectedProgramForRegister(prog || null);
    setRegisterModalOpen(true);
  };

  const handleSelectProgramFromPublic = (prog: Program) => {
    if (role === 'student') {
      applyProgram(activeStudentId, prog.id);
    } else {
      handleOpenRegister(prog);
    }
  };

  return (
    <div className="relative min-h-screen bg-white font-sans antialiased text-[#192A3D]">
      {role === 'visitor' && currentPage === 'beranda' && <IntroExperience />}
      <ToastContainer />
      <DemoSwitcher />

      {role === 'visitor' && (
        <div className="flex flex-col min-h-screen">
          <Navbar onOpenRegisterModal={() => handleOpenRegister()} />
          
          <main className="flex-1">
            <RouteErrorBoundary routeKey={currentPage}>
            <Suspense fallback={<PageFallback />}>
            <AnimatePresence mode="wait">
              {currentPage === 'beranda' && (
                <motion.div
                  key="beranda"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  <HomePage
                    onOpenRegisterModal={() => handleOpenRegister()}
                    onSelectProgram={handleSelectProgramFromPublic}
                  />
                </motion.div>
              )}

              {currentPage === 'program' && (
                <motion.div
                  key="program"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  <ProgramsPage onSelectProgram={handleSelectProgramFromPublic} />
                </motion.div>
              )}

              {currentPage === 'tentang' && (
                <motion.div
                  key="tentang"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  <AboutPage />
                </motion.div>
              )}

              {currentPage === 'kegiatan' && (
                <motion.div
                  key="kegiatan"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  <GalleryPage />
                </motion.div>
              )}

              {currentPage === 'artikel' && (
                <motion.div
                  key="artikel"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  <ArticlesPage />
                </motion.div>
              )}

              {currentPage === 'kontak' && (
                <motion.div
                  key="kontak"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  <ContactPage />
                </motion.div>
              )}

              {currentPage === 'login' && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.24, ease: 'easeInOut' }}
                >
                  <LoginPage />
                </motion.div>
              )}
            </AnimatePresence>
            </Suspense>
            </RouteErrorBoundary>
          </main>

          <Footer />
        </div>
      )}

      {role === 'student' && (
        <RouteErrorBoundary routeKey="student">
          <Suspense fallback={<DashboardFallback message="Menyiapkan portal santri..." />}>
            <StudentDashboard />
          </Suspense>
        </RouteErrorBoundary>
      )}

      {role === 'admin' && (
        <RouteErrorBoundary routeKey="admin">
          <Suspense fallback={<DashboardFallback message="Menyiapkan portal administrator..." />}>
            <AdminDashboard />
          </Suspense>
        </RouteErrorBoundary>
      )}

      {/* Global Interactive Modals */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        preselectedProgram={selectedProgramForRegister}
      />

      <ProgramDetailModal onSelectProgram={handleSelectProgramFromPublic} />

      <ArticleDetailModal />
    </div>
  );
};
