import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-elwafa-ocean text-white';
        let icon = <Info className="w-5 h-5 text-elwafa-teal-light shrink-0" />;

        if (toast.type === 'success') {
          bg = 'bg-[#003B46] text-white border-l-4 border-emerald-400';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        } else if (toast.type === 'warning') {
          bg = 'bg-[#003B46] text-white border-l-4 border-elwafa-gold';
          icon = <AlertTriangle className="w-5 h-5 text-elwafa-gold shrink-0" />;
        } else if (toast.type === 'error') {
          bg = 'bg-red-950 text-white border-l-4 border-red-500';
          icon = <XCircle className="w-5 h-5 text-red-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto shadow-elevated rounded-xl p-4 flex items-start gap-3 transition-all duration-300 transform translate-y-0 ${bg}`}
          >
            {icon}
            <div className="flex-1 text-sm font-medium leading-snug">{toast.message}</div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-white/60 hover:text-white p-0.5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
