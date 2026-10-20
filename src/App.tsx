import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Program } from './types';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { DirectorWelcome } from './components/public/DirectorWelcome';
import { ProgramsSection } from './components/public/ProgramsSection';
import { BoardingSystemSection } from './components/public/BoardingSystemSection';
import { AchievementsSection } from './components/public/AchievementsSection';
import { WhyChooseUs } from './components/public/WhyChooseUs';
import { JourneyTimeline } from './components/public/JourneyTimeline';
import { ActivitiesSection } from './components/public/ActivitiesSection';
import { ArticlesSection } from './components/public/ArticlesSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { FAQSection } from './components/public/FAQSection';
import { ContactBanner } from './components/public/ContactBanner';
import { Footer } from './components/public/Footer';
import { RegisterModal } from './components/public/RegisterModal';
import { ProgramDetailModal } from './components/public/ProgramDetailModal';
import { ArticleDetailModal } from './components/public/ArticleDetailModal';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DemoSwitcher } from './components/common/DemoSwitcher';
import { ToastContainer } from './components/common/ToastContainer';

export const App: React.FC = () => {
  const { role, setRole, applyProgram, activeStudentId } = useApp();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedProgramForRegister, setSelectedProgramForRegister] = useState<Program | null>(null);

  const handleOpenRegister = (prog?: Program) => {
    setSelectedProgramForRegister(prog || null);
    setRegisterModalOpen(true);
  };

  const handleSelectProgramFromPublic = (prog: Program) => {
    // If student is logged in, apply it directly; otherwise open registration modal
    if (role === 'student') {
      applyProgram(activeStudentId, prog.id);
    } else {
      handleOpenRegister(prog);
    }
  };

  return (
    <div className="relative min-h-screen bg-white font-sans antialiased text-[#192A3D]">
      <ToastContainer />
      <DemoSwitcher />

      {role === 'visitor' && (
        <div className="flex flex-col min-h-screen">
          <Navbar onOpenRegisterModal={() => handleOpenRegister()} />
          <main className="flex-1">
            <Hero onOpenRegisterModal={() => handleOpenRegister()} />
            <DirectorWelcome />
            <ProgramsSection onSelectProgram={handleSelectProgramFromPublic} />
            <BoardingSystemSection />
            <AchievementsSection />
            <WhyChooseUs />
            <JourneyTimeline />
            <ActivitiesSection />
            <ArticlesSection />
            <TestimonialsSection />
            <FAQSection />
            <ContactBanner />
          </main>
          <Footer />
        </div>
      )}

      {role === 'student' && <StudentDashboard />}

      {role === 'admin' && <AdminDashboard />}

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
