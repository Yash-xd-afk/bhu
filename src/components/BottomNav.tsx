import { ScreenType } from '../types';
import { QrCode, ScanLine, CalendarDays, BarChart3 } from 'lucide-react';

interface BottomNavProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
}

export default function BottomNav({ currentScreen, onSelectScreen }: BottomNavProps) {
  const navItems = [
    { id: 'live-qr' as ScreenType, label: 'Live QR', icon: QrCode },
    { id: 'scan' as ScreenType, label: 'Scan', icon: ScanLine },
    { id: 'timetable' as ScreenType, label: 'Timetable', icon: CalendarDays },
    { id: 'analytics' as ScreenType, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#121214]/85 backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-4">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => onSelectScreen(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[64px] h-12 transition-all duration-200 active:scale-90 ${
                isActive ? 'text-[#ff9f0a]' : 'text-[#8e8e93] hover:text-[#f2f2f7]'
              }`}
              type="button"
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-6 h-6 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-[#ff9f0a] rounded-full shadow-[0_0_6px_#ff9f0a]"></span>
                )}
              </div>
              <span
                className={`text-[11px] mt-1 tracking-tight transition-colors ${
                  isActive ? 'font-semibold text-[#ff9f0a]' : 'font-normal text-[#8e8e93]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
