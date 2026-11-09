import React, { useState, useEffect, useRef } from 'react';
import { Lock, User, Eye, EyeOff, X, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useLanguage } from '../../context/LanguageContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRedirect?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessRedirect,
}) => {
  const { login } = useAdmin();
  const { adminIsBn: isBn, adminT: t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [unlockedInput, setUnlockedInput] = useState(false);

  const usernameInputRef = useRef<HTMLInputElement>(null);

  // Reset states and auto-focus when opened
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setIsLoading(false);
      setUnlockedInput(false);
      const timer = setTimeout(() => {
        usernameInputRef.current?.focus();
        setUnlockedInput(true);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedUser = username.trim();
    if (!trimmedUser) {
      setError(isBn ? 'ইউজারনেম অথবা ইমেইল লিখুন।' : 'Username or email is required.');
      return;
    }
    if (!password) {
      setError(isBn ? 'পাসওয়ার্ড লিখুন।' : 'Password is required.');
      return;
    }

    setIsLoading(true);

    // Asynchronous authentication verification
    (async () => {
      try {
        const res = await login(trimmedUser, password);
        setIsLoading(false);

        if (res.success) {
          setUsername('');
          setPassword('');
          onClose();
          if (onSuccessRedirect) {
            onSuccessRedirect();
          }
        } else {
          setError(res.error || (isBn ? t.admin.loginModal.errorMessage : 'Invalid credentials. Access denied.'));
        }
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message || 'Login failed.');
      }
    })();
  };

  return (
    <div
      id="admin-modal-portal"
      className="admin-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <style>{`
        .admin-modal-overlay {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background-color: rgba(6, 11, 23, 0.78);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          animation: adminModalFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .admin-modal-card {
          position: relative;
          width: 100%;
          max-width: 380px;
          background-color: #0E1726;
          border: 1px solid rgba(59, 130, 246, 0.28);
          border-radius: 12px;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(59, 130, 246, 0.12);
          overflow: hidden;
          font-family: inherit;
          color: #F8FAFC;
          animation: adminModalScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .admin-modal-accent-bar {
          height: 3px;
          width: 100%;
          background: linear-gradient(90deg, #2563EB 0%, #38BDF8 50%, #F59E0B 100%);
        }

        .admin-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 22px 14px 22px;
        }

        .admin-modal-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-modal-icon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background-color: rgba(30, 58, 138, 0.45);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38BDF8;
        }

        .admin-modal-title {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .admin-modal-close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          padding: 0;
          margin: 0;
          background: transparent;
          border: none;
          border-radius: 6px;
          color: #94A3B8;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .admin-modal-close-btn:hover {
          background-color: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
        }

        .admin-modal-form {
          padding: 0 22px 22px 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .admin-modal-error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 12px;
          border-radius: 6px;
          background-color: rgba(159, 18, 57, 0.3);
          border: 1px solid rgba(244, 63, 94, 0.4);
          color: #FECDD3;
          font-size: 12px;
          line-height: 1.35;
        }

        .admin-modal-error-icon {
          flex-shrink: 0;
          color: #FB7185;
        }

        .admin-modal-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .admin-modal-label {
          font-size: 12px;
          font-weight: 600;
          color: #CBD5E1;
          letter-spacing: 0.01em;
          user-select: none;
        }

        .admin-modal-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .admin-modal-input-icon {
          position: absolute;
          left: 11px;
          pointer-events: none;
          color: #64748B;
        }

        .admin-modal-input {
          width: 100%;
          padding: 9px 12px 9px 34px;
          background-color: #070D18;
          border: 1px solid #1E293B;
          border-radius: 6px;
          font-size: 13.5px;
          color: #FFFFFF;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
        }

        .admin-modal-input:focus {
          border-color: #38BDF8;
          box-shadow: 0 0 0 1px #38BDF8;
          background-color: #0A1220;
        }

        .admin-modal-input::placeholder {
          color: #475569;
        }

        .admin-modal-toggle-btn {
          position: absolute;
          right: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          background: transparent;
          border: none;
          color: #64748B;
          cursor: pointer;
          border-radius: 4px;
          transition: color 0.15s ease;
        }

        .admin-modal-toggle-btn:hover {
          color: #CBD5E1;
        }

        .admin-modal-submit-btn {
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 10px 16px;
          background: linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%);
          border: 1px solid rgba(59, 130, 246, 0.4);
          border-radius: 6px;
          color: #FFFFFF;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(29, 78, 216, 0.35);
          transition: all 0.15s ease;
        }

        .admin-modal-submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%);
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.45);
        }

        .admin-modal-submit-btn:active:not(:disabled) {
          transform: translateY(1px);
        }

        .admin-modal-submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .admin-modal-spinner {
          animation: adminModalSpin 0.75s linear infinite;
        }

        @keyframes adminModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes adminModalScaleIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(6px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes adminModalSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="admin-modal-card">
        {/* Accent Bar */}
        <div className="admin-modal-accent-bar" />

        {/* Header */}
        <div className="admin-modal-header">
          <div className="admin-modal-header-left">
            <div className="admin-modal-icon-badge">
              <Lock className="w-4 h-4" />
            </div>
            <h2 id="admin-modal-title" className="admin-modal-title">
              {isBn ? t.admin.loginModal.title : 'Admin Login'}
            </h2>
          </div>
          <button
            type="button"
            className="admin-modal-close-btn"
            onClick={onClose}
            aria-label="Close admin login"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Minimal Form */}
        <form
          id="admin-modal-form"
          className="admin-modal-form"
          onSubmit={handleSubmit}
          autoComplete="off"
          data-lpignore="true"
          data-form-type="other"
          noValidate
        >
          {/* Anti-Autofill Decoys (absorbs browser password-manager heuristics) */}
          <div
            className="admin-modal-decoys"
            style={{
              position: 'absolute',
              opacity: 0,
              pointerEvents: 'none',
              height: 0,
              width: 0,
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
            }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="fake_username_guard"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
            <input
              type="password"
              name="fake_password_guard"
              tabIndex={-1}
              autoComplete="new-password"
              defaultValue=""
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="admin-modal-error-box" role="alert">
              <AlertCircle className="w-3.5 h-3.5 admin-modal-error-icon" />
              <span>{error}</span>
            </div>
          )}

          {/* Username / Email Field */}
          <div className="admin-modal-field">
            <label htmlFor="admin-modal-username" className="admin-modal-label">
              {isBn ? t.admin.loginModal.usernameLabel : 'Username or Email'}
            </label>
            <div className="admin-modal-input-wrap">
              <User className="w-4 h-4 admin-modal-input-icon" />
              <input
                ref={usernameInputRef}
                id="admin-modal-username"
                name="mtk_adm_usr"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={isBn ? 'ইউজারনেম অথবা ইমেইল লিখুন' : 'Username or email'}
                className="admin-modal-input"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                data-lpignore="true"
                readOnly={!unlockedInput}
                onFocus={() => setUnlockedInput(true)}
                onMouseDown={() => setUnlockedInput(true)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="admin-modal-field">
            <label htmlFor="admin-modal-password" className="admin-modal-label">
              {isBn ? t.admin.loginModal.passwordLabel : 'Password'}
            </label>
            <div className="admin-modal-input-wrap">
              <Lock className="w-4 h-4 admin-modal-input-icon" />
              <input
                id="admin-modal-password"
                name="mtk_adm_pwd"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isBn ? 'পাসওয়ার্ড লিখুন' : 'Password'}
                className="admin-modal-input"
                style={{ paddingRight: '34px' }}
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                data-lpignore="true"
                data-form-type="other"
                readOnly={!unlockedInput}
                onFocus={() => setUnlockedInput(true)}
                onMouseDown={() => setUnlockedInput(true)}
              />
              <button
                type="button"
                className="admin-modal-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="admin-modal-submit"
            className="admin-modal-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 admin-modal-spinner" />
                <span>{isBn ? t.admin.loginModal.signingInBtn : 'Signing In...'}</span>
              </>
            ) : (
              <>
                <span>{isBn ? t.admin.loginModal.signInBtn : 'Sign In'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
