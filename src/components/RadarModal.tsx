import { Radio, X, CheckCircle2, Navigation, Satellite, Bluetooth } from 'lucide-react';

interface RadarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RadarModal({ isOpen, onClose }: RadarModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-md bg-[#1c1c1e] rounded-3xl border border-white/10 p-6 flex flex-col space-y-4 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#30d158]/15 flex items-center justify-center text-[#30d158]">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-[17px] font-semibold text-white tracking-tight">
                Geofence Radar
              </h3>
              <span className="text-[11px] text-[#8e8e93]">
                ±15m Spatial Lock • BHU Commerce
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

        {/* Tactical Apple Style Radar Display */}
        <div className="relative w-full aspect-square bg-[#121214] rounded-2xl border border-white/[0.08] flex items-center justify-center overflow-hidden shadow-inner">
          {/* Concentric rings */}
          <div className="absolute inset-8 border border-white/[0.08] rounded-full"></div>
          <div className="absolute inset-16 border border-white/[0.08] rounded-full"></div>
          <div className="absolute inset-28 border border-white/[0.06] rounded-full"></div>
          <div className="absolute w-full h-[1px] bg-white/[0.06]"></div>
          <div className="absolute h-full w-[1px] bg-white/[0.06]"></div>

          {/* Radar Sweep Beam */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#30d158]/10 to-transparent pointer-events-none animate-spin"
            style={{ animationDuration: '4s' }}
          ></div>

          {/* Anchor Center: Room 327 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-3.5 h-3.5 bg-[#ff9f0a] rounded-full shadow-[0_0_12px_#ff9f0a]"></div>
            <span className="text-[10px] font-semibold text-[#ff9f0a] mt-1 bg-black/60 px-2 py-0.5 rounded-full border border-[#ff9f0a]/30">
              R-327 Hub
            </span>
          </div>

          {/* Student Device Position Pip */}
          <div className="absolute top-[42%] left-[46%] z-10 flex flex-col items-center">
            <div className="w-2.5 h-2.5 bg-[#30d158] rounded-full animate-ping"></div>
            <div className="w-2.5 h-2.5 bg-[#30d158] rounded-full shadow-[0_0_8px_#30d158] -mt-2.5"></div>
            <span className="text-[9px] font-medium text-[#30d158] mt-1 bg-black/70 px-2 py-0.5 rounded-full border border-[#30d158]/30">
              Aryan (4.2m)
            </span>
          </div>
        </div>

        {/* Live Vector Telemetry Readings */}
        <div className="grid grid-cols-2 gap-2 bg-white/[0.04] p-3 rounded-2xl border border-white/[0.06] text-[12px]">
          <div className="flex flex-col">
            <span className="text-[#8e8e93] text-[11px]">Anchor Coordinates</span>
            <span className="text-white font-mono text-[11px] mt-0.5">25°16&apos;03&quot;N 82°59&apos;28&quot;E</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#8e8e93] text-[11px]">Geofence Radius</span>
            <span className="text-[#30d158] font-semibold text-[11px] mt-0.5">35.0m (Current: 4.2m)</span>
          </div>
          <div className="flex flex-col pt-1.5 border-t border-white/[0.05]">
            <span className="text-[#8e8e93] text-[11px] flex items-center gap-1">
              <Satellite className="w-3 h-3 text-[#0a84ff]" />
              Satellite Mesh
            </span>
            <span className="text-white font-mono text-[11px] mt-0.5">14 SVs • HDOP 0.82</span>
          </div>
          <div className="flex flex-col pt-1.5 border-t border-white/[0.05]">
            <span className="text-[#8e8e93] text-[11px] flex items-center gap-1">
              <Bluetooth className="w-3 h-3 text-[#0a84ff]" />
              Beacon Signal
            </span>
            <span className="text-white font-mono text-[11px] mt-0.5">R327_AP (-62 dBm)</span>
          </div>
        </div>

        {/* Confirmation Status */}
        <div className="p-3 bg-[#30d158]/15 border border-[#30d158]/25 rounded-2xl flex items-center justify-between">
          <span className="text-[12px] text-[#30d158] font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Perimeter Validated
          </span>
          <span className="text-[11px] text-[#8e8e93] font-mono">BHU_WLAN_AUTH</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-white/[0.08] hover:bg-white/[0.12] text-white font-semibold rounded-full transition-colors active:scale-95 text-[14px]"
          type="button"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
