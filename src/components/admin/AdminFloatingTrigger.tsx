import React, { useState } from 'react';
import { Lock, ShieldCheck, Settings } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

interface AdminFloatingTriggerProps {
  onOpenLogin: () => void;
  onNavigateToAdmin: () => void;
}

/**
 * Temporary Testing Feature:
 * A discreet floating trigger button at bottom-right that enables 1-click access
 * to the Admin Login Dialog / Admin Console for sandbox evaluation.
 */
export const AdminFloatingTrigger: React.FC<AdminFloatingTriggerProps> = ({
  onOpenLogin,
  onNavigateToAdmin,
}) => {
  const { isAuthenticated, adminUser } = useAdmin();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isAuthenticated) {
      onNavigateToAdmin();
    } else {
      onOpenLogin();
    }
  };

  return (
    <div 
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 group print:hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="bg-[#0F1B2D] text-white text-xs px-2.5 py-1.5 rounded shadow-lg border border-slate-700 whitespace-nowrap animate-in fade-in duration-150 flex items-center gap-1.5">
          {isAuthenticated ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admin: {adminUser?.name || 'Logged In'} (Click to open)</span>
            </>
          ) : (
            <>
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>Admin Console (Testing Access)</span>
            </>
          )}
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleClick}
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer border ${
          isAuthenticated
            ? 'bg-[#004B87] hover:bg-[#003865] text-cyan-200 border-cyan-400/60 shadow-cyan-900/40 ring-2 ring-cyan-500/20'
            : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700/80 shadow-slate-950/60'
        }`}
        aria-label="Open Admin Console"
        title="Admin Console"
      >
        {isAuthenticated ? (
          <ShieldCheck className="w-5 h-5 text-cyan-300" />
        ) : (
          <Settings className="w-4 h-4 text-slate-300 group-hover:rotate-45 transition-transform duration-300" />
        )}

        {/* Status dot */}
        {isAuthenticated && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
        )}
      </button>
    </div>
  );
};
