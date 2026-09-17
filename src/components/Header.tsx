import { ScreenType, UserRole } from '../types';
import { CREST_IMAGE_URL } from '../data/timetableData';
import { Radio, Bell, Terminal, User, ShieldCheck, Download } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenType;
  onOpenRadar: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenExport: () => void;
  hasUnreadNotifications: boolean;
  userRole: UserRole;
}

export default function Header({
  currentScreen,
  onOpenRadar,
  onOpenNotifications,
  onOpenProfile,
  onOpenExport,
  hasUnreadNotifications,
  userRole,
}: HeaderProps) {
  const getScreenTitle = (screen: ScreenType) => {
    switch (screen) {
      case 'live-qr':
        return 'Live Attendance';
      case 'scan':
        return 'Verify Presence';
      case 'timetable':
        return 'Class Timetable';
      case 'analytics':
        return 'Quorum & Insights';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#000000]/80 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      <div className="h-16 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div
            onClick={onOpenProfile}
            className="w-10 h-10 rounded-full bg-white/[0.07] p-1 border border-white/10 flex items-center justify-center cursor-pointer transition-transform active:scale-95 shadow-sm overflow-hidden shrink-0"
            title="BHU Section E Profile"
          >
            <img
              alt="BHU Section E Crest"
              className="h-full w-full object-contain rounded-full"
              src={CREST_IMAGE_URL}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#8e8e93] font-medium tracking-wide uppercase">
                BHU Sec-E
              </span>
              <span className="px-2 py-0.5 bg-[#ff9f0a]/15 text-[#ff9f0a] text-[10px] font-semibold rounded-full border border-[#ff9f0a]/20">
                R-327
              </span>
              {userRole === 'admin' && (
                <span className="px-1.5 py-0.5 bg-[#ff9f0a] text-black text-[9px] font-bold rounded-sm uppercase tracking-wider">
                  Admin
                </span>
              )}
            </div>
            <h1 className="text-[17px] font-semibold text-white tracking-tight">
              {getScreenTitle(currentScreen)}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Export Quick Button */}
          <button
            id="header-export-btn"
            onClick={onOpenExport}
            className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.12] text-white/90 flex items-center justify-center transition-all active:scale-90 border border-white/[0.06]"
            title="Export App & Guide"
            type="button"
          >
            <Download className="w-4 h-4 text-[#0a84ff]" strokeWidth={2.2} />
          </button>

          {/* Radar Telemetry Action */}
          <button
            id="header-radar-btn"
            onClick={onOpenRadar}
            className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.12] text-white/90 flex items-center justify-center transition-all active:scale-90 border border-white/[0.06]"
            title="Geofence Radar"
            type="button"
          >
            <Radio className="w-4 h-4 text-[#30d158]" strokeWidth={2.2} />
          </button>

          {/* Notifications Action */}
          <button
            id="header-notifications-btn"
            onClick={onOpenNotifications}
            className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.12] text-white/90 flex items-center justify-center relative transition-all active:scale-90 border border-white/[0.06]"
            title="Notifications"
            type="button"
          >
            <Bell className="w-4 h-4" strokeWidth={2.2} />
            {hasUnreadNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff453a] rounded-full ring-2 ring-black"></span>
            )}
          </button>

          {/* Profile / Role Switcher */}
          <button
            id="header-profile-btn"
            onClick={onOpenProfile}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 relative border ${
              userRole === 'admin'
                ? 'bg-[#ff9f0a] text-black border-[#ff9f0a]/50 shadow-sm'
                : userRole === 'cr'
                ? 'bg-[#ff9f0a]/20 text-[#ff9f0a] border-[#ff9f0a]/40'
                : 'bg-white/[0.12] text-white border-white/10'
            }`}
            title={`Active Mode: ${
              userRole === 'admin'
                ? 'Administrator (Lead)'
                : userRole === 'cr'
                ? 'CR Terminal'
                : 'Student Mode'
            }`}
            type="button"
          >
            {userRole === 'admin' ? (
              <ShieldCheck className="w-4 h-4 text-black" strokeWidth={2.4} />
            ) : userRole === 'cr' ? (
              <Terminal className="w-4 h-4 text-[#ff9f0a]" strokeWidth={2.4} />
            ) : (
              <User className="w-4 h-4" strokeWidth={2.2} />
            )}
            {userRole === 'admin' && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#30d158] rounded-full ring-2 ring-black"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
