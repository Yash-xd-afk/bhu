import { useState, useEffect } from 'react';
import { LECTURE_HALL_IMAGE_URL } from '../data/timetableData';
import {
  Camera,
  MapPin,
  Timer,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Bluetooth,
  Fingerprint,
  ArrowRight,
  AlertTriangle,
  Focus,
} from 'lucide-react';

interface ScanScreenProps {
  isAttendanceConfirmed: boolean;
  onConfirmAttendance: () => void;
  onNavigateToLiveQr: () => void;
}

export default function ScanScreen({
  isAttendanceConfirmed,
  onConfirmAttendance,
  onNavigateToLiveQr,
}: ScanScreenProps) {
  const [gateSeconds, setGateSeconds] = useState(868); // 14m 28s
  const [qrCountdown, setQrCountdown] = useState(4);
  const [isQrDetected, setIsQrDetected] = useState(false);
  const [scanPos, setScanPos] = useState(50);
  const [scanDir, setScanDir] = useState(1);
  const [attendanceTimestamp, setAttendanceTimestamp] = useState('12:15:32');

  // Scanning laser animation loop
  useEffect(() => {
    const laserInterval = setInterval(() => {
      setScanPos((prev) => {
        let next = prev + scanDir * 2;
        if (next >= 94) setScanDir(-1);
        if (next <= 6) setScanDir(1);
        return next;
      });
    }, 30);

    return () => clearInterval(laserInterval);
  }, [scanDir]);

  // QR refresh ticker countdown
  useEffect(() => {
    const qrTimer = setInterval(() => {
      setQrCountdown((prev) => (prev <= 1 ? 5 : prev - 1));
    }, 1000);
    return () => clearInterval(qrTimer);
  }, []);

  // Gate closing countdown
  useEffect(() => {
    const gateTimer = setInterval(() => {
      setGateSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(gateTimer);
  }, []);

  const formatGateTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleSimulateScan = () => {
    setIsQrDetected(true);
  };

  const handleBiometricClick = () => {
    if (!isQrDetected || isAttendanceConfirmed) return;
    const now = new Date();
    setAttendanceTimestamp(
      now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    );
    onConfirmAttendance();
  };

  return (
    <div className="flex flex-col w-full space-y-4 pb-8">
      {/* Active Class Header Card */}
      <section className="w-full bg-[#1c1c1e] rounded-3xl p-5 relative overflow-hidden border border-white/[0.08] shadow-md">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#ff9f0a]/15 text-[#ff9f0a] text-[11px] font-semibold rounded-full border border-[#ff9f0a]/25">
                Current Class
              </span>
              <span className="text-[12px] text-[#8e8e93]">
                Sec-E • Semester I
              </span>
            </div>
            <h2 className="text-[22px] font-bold text-white tracking-tight mt-1.5 truncate">
              Financial Accounting
            </h2>
            <div className="flex items-center gap-1.5 mt-1 text-[#8e8e93] text-[13px]">
              <MapPin className="w-3.5 h-3.5 text-[#0a84ff]" />
              <span className="text-white/80">Room 327, Commerce Faculty</span>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0 bg-white/[0.06] px-3 py-1.5 rounded-2xl border border-white/[0.06]">
            <span className="text-[11px] text-[#30d158] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse"></span>
              Live
            </span>
            <span className="text-[13px] text-white font-semibold mt-0.5">
              12:00 – 1:00
            </span>
          </div>
        </div>

        {/* Gate Timer Progress */}
        <div className="mt-4 pt-2 border-t border-white/[0.06] flex flex-col space-y-1.5">
          <div className="flex items-center justify-between text-[12px]">
            <span className="flex items-center gap-1.5 text-[#8e8e93]">
              <Timer className="w-3.5 h-3.5 text-[#ff9f0a]" />
              <span>Attendance Window Remaining</span>
            </span>
            <span className="text-white font-semibold">{formatGateTime(gateSeconds)}</span>
          </div>
          <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ff9f0a] rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(10, (gateSeconds / 900) * 100)}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Central Camera Scanner Viewfinder */}
      <section className="w-full bg-[#1c1c1e] rounded-3xl p-4 relative flex flex-col items-center border border-white/[0.08] shadow-lg">
        {/* Reticle Header */}
        <div className="w-full flex items-center justify-between mb-3 px-1">
          <span className="text-[12px] text-[#8e8e93] flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-[#30d158]" />
            <span>Camera Optics Active</span>
          </span>
          <span className="text-[11px] font-semibold text-[#ff9f0a] px-2 py-0.5 bg-[#ff9f0a]/15 rounded-full border border-[#ff9f0a]/20">
            Scanner Ready
          </span>
        </div>

        {/* Viewfinder Box */}
        <div className="w-full aspect-[4/3] bg-black rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
          {/* Video Feed Scenery */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 select-none"
            style={{ backgroundImage: `url(${LECTURE_HALL_IMAGE_URL})` }}
          ></div>

          {/* Animated Scanning Laser */}
          <div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ff9f0a] to-transparent z-20 shadow-[0_0_14px_#ff9f0a]"
            style={{ top: `${scanPos}%` }}
          ></div>

          {/* Viewfinder Overlay */}
          <div className="absolute inset-4 pointer-events-none z-10 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-5 h-5 border-t-2 border-l-2 border-[#ff9f0a] rounded-tl-lg"></div>
              <div className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-[11px] font-medium text-white/90 border border-white/10 shadow-sm">
                QR Refresh in 0{qrCountdown}s
              </div>
              <div className="w-5 h-5 border-t-2 border-r-2 border-[#ff9f0a] rounded-tr-lg"></div>
            </div>

            {/* Center Focus Target */}
            <div className="self-center flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl border border-white/30 flex items-center justify-center relative">
                <div className="w-2 h-2 rounded-full bg-[#ff9f0a] animate-ping"></div>
                <div className="w-2 h-2 rounded-full bg-[#ff9f0a] absolute"></div>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="w-5 h-5 border-b-2 border-l-2 border-[#ff9f0a] rounded-bl-lg"></div>
              <div className="px-2.5 py-0.5 bg-black/70 backdrop-blur-md rounded-full text-[10px] text-[#8e8e93] border border-white/10">
                60 FPS • Auto ISO
              </div>
              <div className="w-5 h-5 border-b-2 border-r-2 border-[#ff9f0a] rounded-br-lg"></div>
            </div>
          </div>

          {/* Action to simulate QR alignment */}
          <button
            id="simScanBtn"
            type="button"
            onClick={handleSimulateScan}
            className={`absolute bottom-3 z-30 px-4 py-2 rounded-full text-[12px] font-semibold flex items-center gap-2 backdrop-blur-xl active:scale-95 transition-all shadow-md ${
              isQrDetected
                ? 'bg-[#30d158] text-black shadow-[#30d158]/20'
                : 'bg-white/15 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            {isQrDetected ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>QR Token Verified</span>
              </>
            ) : (
              <>
                <Focus className="w-4 h-4 text-[#ff9f0a]" />
                <span>Align QR Displayed by CR</span>
              </>
            )}
          </button>
        </div>

        {/* Dynamic Telemetry Coordinates */}
        <div className="w-full flex items-center justify-between mt-3 text-[11px] text-[#8e8e93] px-1">
          <span>Lat: 25.2677° N</span>
          <span>Lon: 82.9913° E</span>
          <span className="text-[#30d158] font-medium">GPS Accuracy: ±4.2m</span>
        </div>
      </section>

      {/* Multi-layer Anti-Proxy Handshake Card */}
      <section className="w-full bg-[#1c1c1e] rounded-3xl p-5 space-y-3 border border-white/[0.08] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#ff9f0a]" />
            <h3 className="text-[15px] font-semibold text-white tracking-tight">
              Anti-Proxy Verification
            </h3>
          </div>
          <span className="px-2.5 py-0.5 bg-[#30d158]/15 text-[#30d158] text-[11px] font-semibold rounded-full border border-[#30d158]/25">
            3/3 Validated
          </span>
        </div>

        <div className="space-y-2 mt-1">
          {/* 1. GPS Geofence */}
          <div className="w-full bg-white/[0.04] p-3.5 rounded-2xl flex items-center justify-between border border-white/[0.06]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#30d158]/15 text-[#30d158] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-medium text-white truncate">
                  Geofence Perimeter
                </span>
                <span className="text-[11px] text-[#8e8e93]">
                  Within 35m bounds • Commerce Hall
                </span>
              </div>
            </div>
            <span className="text-[11px] text-[#30d158] font-semibold px-2 py-0.5 bg-[#30d158]/10 rounded-full shrink-0">
              4.2m Away
            </span>
          </div>

          {/* 2. Hardware Fingerprint */}
          <div className="w-full bg-white/[0.04] p-3.5 rounded-2xl flex items-center justify-between border border-white/[0.06]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#30d158]/15 text-[#30d158] flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-medium text-white truncate">
                  Hardware Fingerprint
                </span>
                <span className="text-[11px] text-[#8e8e93]">
                  Pixel 8 Pro • Aryan Verma (Roll 24)
                </span>
              </div>
            </div>
            <span className="text-[11px] text-[#30d158] font-semibold px-2 py-0.5 bg-[#30d158]/10 rounded-full shrink-0">
              Matched
            </span>
          </div>

          {/* 3. Local Beacon */}
          <div className="w-full bg-white/[0.04] p-3.5 rounded-2xl flex items-center justify-between border border-white/[0.06]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#30d158]/15 text-[#30d158] flex items-center justify-center shrink-0">
                <Bluetooth className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-medium text-white truncate">
                  Lecture Hall Beacon
                </span>
                <span className="text-[11px] text-[#8e8e93]">
                  Room 327 Access Point • -62 dBm
                </span>
              </div>
            </div>
            <span className="text-[11px] text-[#30d158] font-semibold px-2 py-0.5 bg-[#30d158]/10 rounded-full shrink-0">
              Connected
            </span>
          </div>
        </div>
      </section>

      {/* Biometric Confirmation Button */}
      <section className="w-full flex flex-col items-center space-y-2.5">
        <button
          id="biometricBtn"
          type="button"
          disabled={!isQrDetected || isAttendanceConfirmed}
          onClick={handleBiometricClick}
          className={`w-full py-4 px-5 rounded-2xl text-[15px] font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md ${
            isAttendanceConfirmed
              ? 'bg-[#30d158] text-black cursor-default'
              : isQrDetected
              ? 'bg-[#ff9f0a] text-black hover:brightness-105 active:scale-[0.98] cursor-pointer'
              : 'bg-white/[0.08] text-[#8e8e93] cursor-not-allowed'
          }`}
        >
          {isAttendanceConfirmed ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-black" />
              <span>Presence Confirmed • Roll #24</span>
            </>
          ) : isQrDetected ? (
            <>
              <Fingerprint className="w-5 h-5 text-black" />
              <span>Confirm Presence (Biometric Lock)</span>
            </>
          ) : (
            <>
              <Fingerprint className="w-5 h-5 text-[#8e8e93]" />
              <span>Align QR to Enable Attendance</span>
            </>
          )}
        </button>

        {/* Confirmation Status Pill */}
        {isAttendanceConfirmed && (
          <div className="w-full p-3.5 bg-[#30d158]/15 text-[#30d158] rounded-2xl text-[12px] font-medium flex items-center justify-between border border-[#30d158]/25 shadow-sm">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Attendance recorded &amp; synced to BHU Commerce ledger</span>
            </span>
            <span className="text-white font-mono text-[11px]">{attendanceTimestamp}</span>
          </div>
        )}

        <button
          onClick={onNavigateToLiveQr}
          className="text-[13px] text-[#0a84ff] hover:text-[#0a84ff]/80 flex items-center gap-1 font-medium transition-colors pt-1"
          type="button"
        >
          <span>Return to CR Live QR Screen</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* Ordinance Warning Card */}
      <footer className="w-full bg-white/[0.04] p-4 rounded-2xl flex items-start gap-3 border border-white/[0.06]">
        <AlertTriangle className="w-5 h-5 text-[#ff9f0a] shrink-0 mt-0.5" />
        <div className="flex flex-col min-w-0">
          <span className="text-[12px] font-bold text-white tracking-tight">
            BHU Statute Ordinance 18/B
          </span>
          <p className="text-[12px] text-[#8e8e93] mt-0.5 leading-relaxed">
            Minimum 75% attendance is required to sit for Semester I exams. Proxy attempts are flagged to the Dean Office.
          </p>
        </div>
      </footer>
    </div>
  );
}
