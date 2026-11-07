import React from 'react';
import { ProofProvider, useProof } from './context/ProofContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SubmissionModal } from './components/common/SubmissionModal';
import { LandingPage } from './components/landing/LandingPage';
import { TalentPortal } from './components/talent/TalentPortal';
import { CompanyPortal } from './components/company/CompanyPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { SkillPassport } from './components/talent/SkillPassport';
import { CheckCircle2 } from 'lucide-react';

function AppContent() {
  const { activeView, toastMessage } = useProof();

  return (
    <div className="min-h-screen flex flex-col bg-[#101827] text-slate-100 selection:bg-[#B7F36B] selection:text-[#101827]">
      {/* Top Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'landing' && <LandingPage />}
        {activeView === 'talent' && <TalentPortal />}
        {activeView === 'company' && <CompanyPortal />}
        {activeView === 'admin' && <AdminPortal />}
        {activeView === 'passport' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <SkillPassport />
          </div>
        )}
      </main>

      {/* Interactive Evidence Submission Modal */}
      <SubmissionModal />

      {/* Global Interactive Notification Toast */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-[#B7F36B]/60 flex items-center gap-3 animate-fade-in"
          role="status"
        >
          <CheckCircle2 className="w-5 h-5 text-[#B7F36B] shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Professional Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ProofProvider>
      <AppContent />
    </ProofProvider>
  );
}
