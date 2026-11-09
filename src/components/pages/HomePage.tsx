import React from 'react';
import { Hero } from '../public/Hero';
import { TickerMarquee } from '../public/TickerMarquee';
import { DirectorWelcome } from '../public/DirectorWelcome';
import { ProcessStepsSection } from '../public/ProcessStepsSection';
import { TrackEstimatorWidget } from '../public/TrackEstimatorWidget';
import { CostCalculatorWidget } from '../public/CostCalculatorWidget';
import { ProgramsSection } from '../public/ProgramsSection';
import { BoardingSystemSection } from '../public/BoardingSystemSection';
import { WhyChooseUs } from '../public/WhyChooseUs';
import { ActivitiesSection } from '../public/ActivitiesSection';
import { TestimonialsSection } from '../public/TestimonialsSection';
import { ArticlesSection } from '../public/ArticlesSection';
import { FAQSection } from '../public/FAQSection';
import { ContactBanner } from '../public/ContactBanner';
import { Program } from '../../types';
import { SectionReveal } from '../common/SectionReveal';

// Only editorial sections reveal on scroll; forms and interactive tools remain immediately usable.

interface HomePageProps {
  onOpenRegisterModal: () => void;
  onSelectProgram: (prog: Program) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenRegisterModal, onSelectProgram }) => {
  return (
    <div className="space-y-0">
      <Hero onOpenRegisterModal={onOpenRegisterModal} />
      <TickerMarquee />
      <SectionReveal><DirectorWelcome /></SectionReveal>
      <SectionReveal><ProcessStepsSection /></SectionReveal>
      <TrackEstimatorWidget onSelectProgram={onSelectProgram} />
      <CostCalculatorWidget onRegisterClick={() => onOpenRegisterModal()} />
      <SectionReveal><ProgramsSection onSelectProgram={onSelectProgram} /></SectionReveal>
      <SectionReveal><BoardingSystemSection /></SectionReveal>
      <SectionReveal><WhyChooseUs /></SectionReveal>
      <SectionReveal><ActivitiesSection /></SectionReveal>
      <SectionReveal><TestimonialsSection /></SectionReveal>
      <SectionReveal><ArticlesSection /></SectionReveal>
      <FAQSection />
      <ContactBanner />
    </div>
  );
};
