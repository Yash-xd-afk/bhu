import { useState } from 'react';
import {
  User,
  Terminal,
  X,
  ShieldCheck,
  Smartphone,
  Download,
  Mail,
  Edit2,
  Check,
  GraduationCap,
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onChangeRole: (role: UserRole) => void;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenExport: () => void;
  presentCount: number;
}

export default function ProfileModal({
  isOpen,
  onClose,
  userProfile,
  onChangeRole,
  onUpdateProfile,
  onOpenExport,
  presentCount,
}: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [rollInput, setRollInput] = useState(userProfile.roll);
  const [enrollmentInput, setEnrollmentInput] = useState(userProfile.enrollment);
  const [emailInput, setEmailInput] = useState(userProfile.email);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      name: nameInput.trim() || userProfile.name,
      roll: rollInput.trim() || userProfile.roll,
      enrollment: enrollmentInput.trim() || userProfile.enrollment,
      email: emailInput.trim() || userProfile.email,
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-md bg-[#1c1c1e] rounded-3xl border border-white/10 p-6 flex flex-col space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#ff9f0a]/15 flex items-center justify-center text-[#ff9f0a]">
              {userProfile.role === 'admin' ? (
                <ShieldCheck className="w-4 h-4 text-[#ff9f0a]" />
              ) : userProfile.role === 'cr' ? (
                <Terminal className="w-4 h-4 text-[#ff9f0a]" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-[17px] font-semibold text-white tracking-tight">
                {userProfile.role === 'admin' ? 'Administrator Identity' : 'Scholar Profile'}
              </h3>
              <span className="text-[11px] text-[#8e8e93]">
                Faculty of Commerce • BHU Section E
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#8e8e93] hover:text-white flex items-center justify-center transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scholar Card Identity */}
        <div className="bg-white/[0.04] p-4 rounded-2xl border border-white/[0.06] flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-[#ff9f0a] uppercase tracking-wider">
                Banaras Hindu University
              </span>
              <span className="px-2 py-0.5 bg-white/[0.08] text-white text-[10px] font-semibold rounded-full">
                Section E
              </span>
            </div>
            {userProfile.role === 'admin' && (
              <span className="px-2.5 py-0.5 bg-[#ff9f0a] text-black text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Admin
              </span>
            )}
          </div>

          {!isEditing ? (
            <div className="flex items-start justify-between gap-3 pt-1">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-13 h-13 rounded-2xl bg-[#ff9f0a] text-black font-bold flex items-center justify-center text-[20px] shadow-sm shrink-0">
                  {userProfile.roll}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[17px] font-bold text-white tracking-tight truncate">
                      {userProfile.name}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#8e8e93] flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#ff9f0a]" />
                    <span className="truncate">{userProfile.email}</span>
                  </span>
                  <span className="text-[11px] text-[#8e8e93] mt-0.5">
                    Enrollment: {userProfile.enrollment}
                  </span>
                  <span className="text-[11px] text-[#30d158] flex items-center gap-1 mt-0.5">
                    <Smartphone className="w-3 h-3" />
                    {userProfile.device}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-[#8e8e93] hover:text-white transition-colors shrink-0"
                title="Edit Identity"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-2.5 pt-1">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#8e8e93] uppercase font-semibold">Name</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 bg-black/60 border border-white/15 rounded-xl text-[13px] text-white focus:outline-none focus:border-[#ff9f0a]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8e8e93] uppercase font-semibold">Roll #</label>
                  <input
                    type="text"
                    value={rollInput}
                    onChange={(e) => setRollInput(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 bg-black/60 border border-white/15 rounded-xl text-[13px] text-white focus:outline-none focus:border-[#ff9f0a]"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-[#8e8e93] uppercase font-semibold">Admin Email</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-black/60 border border-white/15 rounded-xl text-[13px] text-white focus:outline-none focus:border-[#ff9f0a]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#8e8e93] uppercase font-semibold">Enrollment ID</label>
                <input
                  type="text"
                  value={enrollmentInput}
                  onChange={(e) => setEnrollmentInput(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 bg-black/60 border border-white/15 rounded-xl text-[13px] text-white focus:outline-none focus:border-[#ff9f0a]"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#ff9f0a] text-black font-semibold text-[12px] rounded-xl flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-2 bg-white/10 text-[#8e8e93] text-[12px] rounded-xl hover:text-white active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06] text-[12px]">
            <div className="bg-white/[0.03] p-2.5 rounded-xl">
              <span className="text-[11px] text-[#8e8e93]">Attendance Quorum</span>
              <div className="text-[18px] font-bold text-[#30d158] mt-0.5">81.4%</div>
            </div>
            <div className="bg-white/[0.03] p-2.5 rounded-xl">
              <span className="text-[11px] text-[#8e8e93]">Present Today</span>
              <div className="text-[18px] font-bold text-white mt-0.5">{presentCount} / 62</div>
            </div>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="p-4 bg-white/[0.04] rounded-2xl border border-white/[0.06] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-white">
              System Access Tier
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-white/10 text-white">
              Current: {userProfile.role.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => onChangeRole('admin')}
              className={`py-2 px-2 rounded-xl text-[11px] font-semibold flex flex-col items-center gap-1 transition-all ${
                userProfile.role === 'admin'
                  ? 'bg-[#ff9f0a] text-black shadow-md'
                  : 'bg-white/[0.05] text-[#8e8e93] hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={() => onChangeRole('cr')}
              className={`py-2 px-2 rounded-xl text-[11px] font-semibold flex flex-col items-center gap-1 transition-all ${
                userProfile.role === 'cr'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/[0.05] text-[#8e8e93] hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CR Terminal</span>
            </button>

            <button
              type="button"
              onClick={() => onChangeRole('student')}
              className={`py-2 px-2 rounded-xl text-[11px] font-semibold flex flex-col items-center gap-1 transition-all ${
                userProfile.role === 'student'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/[0.05] text-[#8e8e93] hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>
          </div>
        </div>

        {/* Export App Quick Access */}
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenExport();
          }}
          className="p-3.5 bg-[#0a84ff]/10 hover:bg-[#0a84ff]/15 border border-[#0a84ff]/25 rounded-2xl flex items-center justify-between transition-colors active:scale-95"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#0a84ff] text-white flex items-center justify-center">
              <Download className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[13px] font-semibold text-white">
                Export App & Self-Hosting Guide
              </span>
              <span className="text-[11px] text-[#8e8e93]">
                ZIP download, GitHub push, local commands
              </span>
            </div>
          </div>
          <span className="text-[11px] text-[#0a84ff] font-medium">View Guide</span>
        </button>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-white text-black font-semibold rounded-full text-[14px] active:scale-95 transition-transform"
          type="button"
        >
          Confirm & Close
        </button>
      </div>
    </div>
  );
}
