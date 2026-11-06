import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, Building2 } from 'lucide-react';
import { UratexUser } from '../types';
import { DIRECTORY_DATA } from '../data/uratexDirectory';

interface GoogleSignInProps {
  onSignIn: (user: UratexUser) => void;
}

export const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onSignIn }) => {
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const authenticateWithGoogle = (targetEmail?: string) => {
    const rawEmail = (targetEmail || emailInput).trim().toLowerCase();

    if (!rawEmail) {
      setError('Please enter your Uratex Google Workspace email address.');
      return;
    }

    if (!rawEmail.endsWith('@uratex.com.ph')) {
      setError(
        'Access restricted: Only @uratex.com.ph Google Workspace accounts are authorized.'
      );
      return;
    }

    setIsSigningIn(true);
    setError(null);

    // Look up in official Uratex IT Directory
    const matched = DIRECTORY_DATA.find(
      (p) => p.email.toLowerCase() === rawEmail
    );

    if (matched) {
      const isItStaff =
        matched.department.includes('DEV') ||
        matched.department.includes('TECH') ||
        matched.department.includes('SUPPORT') ||
        matched.department.includes('BSA') ||
        matched.isManager;

      const initials = matched.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

      setTimeout(() => {
        onSignIn({
          id: matched.id,
          name: matched.name,
          email: matched.email,
          department: matched.departmentName || matched.department,
          location: matched.plantLocation,
          role: isItStaff ? 'admin' : 'employee',
          avatarInitials: initials,
        });
      }, 350);
      return;
    }

    // Standard employee under @uratex.com.ph
    const localPart = rawEmail.split('@')[0];
    const formattedName = localPart
      .split('.')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    const initials = formattedName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const isItAdmin = localPart.includes('it.') || localPart.includes('admin');

    setTimeout(() => {
      onSignIn({
        id: `usr-${Date.now()}`,
        name: formattedName || 'Uratex Employee',
        email: rawEmail,
        department: isItAdmin ? 'Information Technology' : 'Operations & Logistics',
        location: 'Plant 1 - Valenzuela',
        role: isItAdmin ? 'admin' : 'employee',
        avatarInitials: initials || 'UX',
      });
    }, 350);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authenticateWithGoogle();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-display font-bold text-sm">
              U
            </div>
            <span className="font-display font-bold text-lg text-slate-900 tracking-tight">
              Uratex IT Service Desk
            </span>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-2 whitespace-nowrap shrink-0">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>Uratex Philippines · Internal Support Portal</span>
          </div>
        </div>
      </header>

      {/* Main Sign-In Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-3.5 text-blue-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
              Sign In
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              Single Sign-On for Uratex Philippines Google Workspace accounts
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="google-email" className="block text-xs font-medium text-slate-700 mb-1.5">
                Google Workspace Email
              </label>
              <input
                id="google-email"
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="name@uratex.com.ph"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-sans"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Enter your official @uratex.com.ph address
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-800 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shadow-xs disabled:opacity-60"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isSigningIn ? 'Authenticating...' : 'Continue with Google'}</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              Uratex Help Desk Ext: <span className="font-mono-tabular font-medium text-slate-600">4401</span> · Manager: <span className="font-medium text-slate-600">Eric Borromeo</span>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        Uratex Philippines · Information Technology Department · Service Desk Portal
      </footer>
    </div>
  );
};
