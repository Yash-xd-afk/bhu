import { Bell, X, CheckCircle2, AlertTriangle, RefreshCw, Check } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

export default function NotificationModal({
  isOpen,
  onClose,
  onClear,
}: NotificationModalProps) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'CR Cipher Token Broadcast Refresh',
      desc: 'Class Representative regenerated dynamic rolling QR token for Financial Accounting (R-327).',
      time: '3m ago',
      level: 'normal',
      icon: RefreshCw,
    },
    {
      id: 'n2',
      title: 'BHU Statute Ord. 18/B Notice',
      desc: 'Mid-term attendance quorum finalized. 75% threshold strictly enforced for Semester I exams.',
      time: '1h ago',
      level: 'warning',
      icon: AlertTriangle,
    },
    {
      id: 'n3',
      title: 'Geofence Perimeter Lock Confirmed',
      desc: 'Device matched Faculty of Commerce WLAN node #327 with 4m spatial accuracy.',
      time: '2h ago',
      level: 'success',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-md bg-[#1c1c1e] rounded-3xl border border-white/10 p-6 flex flex-col space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#ff9f0a]/15 flex items-center justify-center text-[#ff9f0a]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[17px] font-semibold text-white tracking-tight">
                Notifications
              </h3>
              <span className="text-[11px] text-[#8e8e93]">
                Section E System Feed
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

        <div className="flex flex-col space-y-2.5 max-h-80 overflow-y-auto">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className="p-3.5 bg-white/[0.04] rounded-2xl border border-white/[0.05] flex items-start gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-0.5 ${
                    n.level === 'warning'
                      ? 'bg-[#ff9f0a]/15 text-[#ff9f0a]'
                      : n.level === 'success'
                      ? 'bg-[#30d158]/15 text-[#30d158]'
                      : 'bg-[#0a84ff]/15 text-[#0a84ff]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-white truncate">
                      {n.title}
                    </span>
                    <span className="text-[10px] text-[#8e8e93] shrink-0 font-mono ml-2">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#8e8e93] mt-1 leading-relaxed">
                    {n.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-white/[0.08]">
          <button
            onClick={onClear}
            className="text-[13px] text-[#0a84ff] hover:text-[#0a84ff]/80 font-medium"
            type="button"
          >
            Mark All Read
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white text-black font-semibold rounded-full text-[13px] active:scale-95 transition-transform"
            type="button"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
