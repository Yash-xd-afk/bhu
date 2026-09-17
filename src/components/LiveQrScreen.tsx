import React, { useState, useEffect } from 'react';
import { CheckInRecord } from '../types';
import {
  Radio,
  MapPin,
  GraduationCap,
  RefreshCw,
  Lock,
  Unlock,
  FileDown,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  UserX,
  Shield,
  X,
  Activity,
  Fingerprint,
  Edit3,
} from 'lucide-react';

interface LiveQrScreenProps {
  presentCount: number;
  totalStudents: number;
  onStudentCheckIn: (student: CheckInRecord) => void;
  checkInList: CheckInRecord[];
  isSessionLocked: boolean;
  onToggleLock: () => void;
  onNavigateToScan: () => void;
}

export default function LiveQrScreen({
  presentCount,
  totalStudents,
  onStudentCheckIn,
  checkInList,
  isSessionLocked,
  onToggleLock,
  onNavigateToScan,
}: LiveQrScreenProps) {
  const maxTime = 12;
  const [timeLeft, setTimeLeft] = useState(12);
  const [cryptoHash, setCryptoHash] = useState('89F1');
  const [cryptoSub, setCryptoSub] = useState('327B');
  const [timestampStr, setTimestampStr] = useState('12:18:42 PM');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showManualPanel, setShowManualPanel] = useState(false);
  const [manualRoll, setManualRoll] = useState('');
  const [manualName, setManualName] = useState('');
  const [freezeToast, setFreezeToast] = useState<string | null>(null);

  // Generate random 4-char hex
  const generateHex = () => {
    const chars = '0123456789ABCDEF';
    let res = '';
    for (let i = 0; i < 4; i++) {
      res += chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
  };

  const rotateTokens = () => {
    setIsRefreshing(true);
    const newHash = generateHex();
    const newSub = generateHex();
    const now = new Date();
    const tStr = now.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setCryptoHash(newHash);
    setCryptoSub(newSub);
    setTimestampStr(tStr);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 200);
  };

  // Timer loop for rolling QR
  useEffect(() => {
    if (isSessionLocked) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          rotateTokens();
          return maxTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSessionLocked]);

  // Initial timestamp sync
  useEffect(() => {
    const now = new Date();
    setTimestampStr(
      now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    );
  }, []);

  const handleBroadcastRefresh = () => {
    setTimeLeft(maxTime);
    rotateTokens();
  };

  const handleFreezeSheet = () => {
    const csvHeader = 'Roll No,Student Name,Verification Status,MAC Hash,Timestamp\n';
    const csvRows = checkInList
      .map(
        (c) =>
          `"${c.roll}","${c.name}","${c.verified ? 'DEV-VERIFIED' : 'PENDING'}","${c.mac}","${c.timeAgo}"`
      )
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BHU_SecE_Attendance_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    setFreezeToast('Snapshot exported: BHU-SEC-E-ATTENDANCE.CSV');
    setTimeout(() => setFreezeToast(null), 3500);
  };

  const handleSubmitOverride = (e: React.FormEvent) => {
    e.preventDefault();
    const rollNum = manualRoll.trim();
    if (!rollNum) return;

    const newRecord: CheckInRecord = {
      id: 'ovr-' + Date.now(),
      roll: rollNum.padStart(2, '0'),
      name: manualName.trim() || `Scholar #${rollNum}`,
      verified: true,
      mac: 'CR-TERMINAL',
      timeAgo: 'Just now',
      isOverride: true,
    };

    onStudentCheckIn(newRecord);
    setManualRoll('');
    setManualName('');
    setShowManualPanel(false);
  };

  const absentCount = Math.max(0, totalStudents - presentCount);
  const attendanceRatio = ((presentCount / totalStudents) * 100).toFixed(1);

  return (
    <div className="flex flex-col w-full space-y-4 pb-8">
      {/* Geofence Status Pill */}
      <div className="w-full bg-[#1c1c1e] rounded-2xl px-4 py-3 flex items-center justify-between border border-white/[0.08] shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#30d158]/15 flex items-center justify-center shrink-0">
            <Radio className="w-4 h-4 text-[#30d158] animate-pulse" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-semibold text-white truncate">
              Faculty of Commerce, BHU
            </span>
            <span className="text-[11px] text-[#8e8e93]">
              Geofence Active • ±15m Radius Lock
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-[#30d158]/15 text-[#30d158] text-[11px] font-semibold rounded-full border border-[#30d158]/20 shrink-0">
          Secured
        </span>
      </div>

      {/* Active Class Header Card */}
      <div className="w-full bg-[#1c1c1e] rounded-3xl p-5 flex flex-col space-y-3 relative overflow-hidden border border-white/[0.08] shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#ff9f0a]/15 text-[#ff9f0a] text-[11px] font-semibold rounded-full border border-[#ff9f0a]/25">
              Live Session
            </span>
            <span className="text-[12px] text-[#8e8e93] font-medium">
              Thursday Slot
            </span>
          </div>
          <span className="text-[13px] text-[#ff9f0a] font-semibold flex items-center gap-1.5">
            12:00 PM – 1:00 PM
          </span>
        </div>

        <div className="flex flex-col">
          <h2 className="text-[22px] font-bold text-white tracking-tight">
            Financial Accounting
          </h2>
          <div className="flex items-center justify-between text-[#8e8e93] pt-1">
            <span className="text-[13px] flex items-center gap-1.5 text-white/80">
              <GraduationCap className="w-4 h-4 text-[#ff9f0a]" />
              Prof. M.A.S.
            </span>
            <span className="text-[12px] text-white flex items-center gap-1 bg-white/[0.08] px-2.5 py-1 rounded-full border border-white/[0.06]">
              <MapPin className="w-3.5 h-3.5 text-[#0a84ff]" />
              Room 327
            </span>
          </div>
        </div>
      </div>

      {/* Freeze Sheet Notice Toast */}
      {freezeToast && (
        <div className="w-full p-3 bg-[#0a84ff]/15 border border-[#0a84ff]/30 rounded-2xl text-[#0a84ff] text-[13px] font-medium flex items-center justify-between shadow-sm">
          <span className="flex items-center gap-2">
            <FileDown className="w-4 h-4" />
            {freezeToast}
          </span>
          <span className="text-[11px] text-[#8e8e93]">EXPORT COMPLETED</span>
        </div>
      )}

      {/* Dynamic Apple-Style QR Container */}
      <div className="w-full bg-[#1c1c1e] rounded-3xl p-5 flex flex-col items-center space-y-4 relative border border-white/[0.08] shadow-lg">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#ff9f0a]" />
            <span className="text-[13px] text-white font-semibold tracking-tight">
              Anti-Screenshot Dynamic QR
            </span>
          </div>
          <span
            className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
              isSessionLocked
                ? 'bg-[#ff453a]/15 text-[#ff453a] border border-[#ff453a]/25'
                : 'bg-[#30d158]/15 text-[#30d158] border border-[#30d158]/25'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSessionLocked ? 'bg-[#ff453a]' : 'bg-[#30d158] animate-pulse'
              }`}
            ></span>
            {isSessionLocked ? 'Locked' : 'Rotating'}
          </span>
        </div>

        {/* QR Code Presentation Box */}
        <div className="relative w-64 h-64 bg-white/[0.04] rounded-3xl p-4 flex items-center justify-center border border-white/10 shadow-inner group select-none">
          {/* Subtle Watermark Overlay */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3.5 z-20 opacity-25 select-none">
            <div className="flex justify-between text-[9px] text-[#ff9f0a] font-mono uppercase tracking-wider">
              <span>{timestampStr}</span>
              <span>SEC-E</span>
            </div>
            <div className="flex justify-center text-[10px] text-[#ff9f0a] tracking-widest font-mono uppercase rotate-[-25deg] scale-95 font-semibold">
              DO NOT CAPTURE
            </div>
            <div className="flex justify-between text-[9px] text-[#ff9f0a] font-mono uppercase tracking-wider">
              <span>{cryptoHash}-{cryptoSub}</span>
              <span>DEV-LOCK</span>
            </div>
          </div>

          {/* Clean High-Contrast QR Pattern */}
          <div className="relative z-10 w-full h-full bg-[#121214] rounded-2xl p-3.5 flex items-center justify-center border border-white/10 shadow-sm">
            <svg
              className={`w-full h-full text-white transition-opacity duration-200 ${
                isRefreshing ? 'opacity-30' : 'opacity-100'
              }`}
              viewBox="0 0 100 100"
            >
              {/* Corner Position Boxes */}
              <rect fill="currentColor" height="24" width="24" x="6" y="6" rx="4" />
              <rect fill="#121214" height="16" width="16" x="10" y="10" rx="3" />
              <rect fill="#ff9f0a" height="8" width="8" x="14" y="14" rx="2" />

              <rect fill="currentColor" height="24" width="24" x="70" y="6" rx="4" />
              <rect fill="#121214" height="16" width="16" x="74" y="10" rx="3" />
              <rect fill="#ff9f0a" height="8" width="8" x="78" y="14" rx="2" />

              <rect fill="currentColor" height="24" width="24" x="6" y="70" rx="4" />
              <rect fill="#121214" height="16" width="16" x="10" y="74" rx="3" />
              <rect fill="#ff9f0a" height="8" width="8" x="14" y="78" rx="2" />

              {/* Data Blocks */}
              <g fill="currentColor">
                <rect height="5" width="5" x="36" y="8" rx="1" />
                <rect height="10" width="5" x="46" y="8" rx="1" />
                <rect height="5" width="7" x="56" y="8" rx="1" />
                <rect fill="#ff9f0a" height="5" width="15" x="36" y="18" rx="1" />
                <rect height="5" width="5" x="56" y="18" rx="1" />

                <rect height="10" width="5" x="8" y="36" rx="1" />
                <rect height="5" width="10" x="18" y="36" rx="1" />
                <rect height="5" width="15" x="8" y="51" rx="1" />
                <rect height="5" width="5" x="18" y="60" rx="1" />

                {/* Center Core */}
                <rect fill="#30d158" height="6" width="6" x="36" y="36" rx="1.5" />
                <rect height="6" width="6" x="46" y="36" rx="1.5" />
                <rect fill="#ff9f0a" height="6" width="6" x="56" y="36" rx="1.5" />
                <rect fill="#0a84ff" height="6" width="18" x="41" y="46" rx="1.5" />
                <rect height="6" width="6" x="36" y="56" rx="1.5" />
                <rect fill="#ff9f0a" height="6" width="6" x="46" y="56" rx="1.5" />
                <rect height="6" width="6" x="56" y="56" rx="1.5" />

                <rect height="5" width="5" x="70" y="36" rx="1" />
                <rect height="5" width="14" x="80" y="36" rx="1" />
                <rect height="10" width="10" x="70" y="46" rx="1" />
                <rect fill="#30d158" height="5" width="10" x="84" y="51" rx="1" />

                <rect height="5" width="10" x="36" y="70" rx="1" />
                <rect height="5" width="12" x="51" y="70" rx="1" />
                <rect height="14" width="5" x="36" y="80" rx="1" />
                <rect fill="#ff9f0a" height="5" width="10" x="46" y="80" rx="1" />
                <rect height="5" width="18" x="46" y="89" rx="1" />

                <rect height="10" width="5" x="70" y="70" rx="1" />
                <rect height="5" width="14" x="80" y="75" rx="1" />
                <rect height="10" width="10" x="70" y="84" rx="1" />
                <rect height="5" width="9" x="85" y="84" rx="1" />
              </g>
            </svg>
          </div>

          {/* Smooth Scanning Laser Indicator */}
          <div
            className="absolute left-6 right-6 h-0.5 bg-[#ff9f0a] shadow-[0_0_12px_#ff9f0a] z-30 pointer-events-none rounded-full animate-pulse"
            style={{ top: '50%' }}
          ></div>
        </div>

        {/* Countdown Progress & Seed */}
        <div className="w-full flex flex-col space-y-2">
          <div className="flex justify-between items-center text-[12px]">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <RefreshCw
                className={`w-3.5 h-3.5 text-[#ff9f0a] ${
                  isSessionLocked ? '' : 'animate-spin'
                }`}
                style={{ animationDuration: '4s' }}
              />
              Refreshes in{' '}
              <span className="text-[#ff9f0a] font-semibold">
                {isSessionLocked ? 'Paused' : `${timeLeft}s`}
              </span>
            </span>
            <span className="text-[11px] text-[#8e8e93]">
              Seed:{' '}
              <span className="font-mono text-white/90">
                {cryptoHash}-{cryptoSub.substring(0, 2)}
              </span>
            </span>
          </div>

          {/* Apple Style Smooth Progress Pill */}
          <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                isSessionLocked ? 'bg-[#ff453a]' : 'bg-[#ff9f0a]'
              }`}
              style={{ width: `${(timeLeft / maxTime) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Student Scan Switcher Link */}
        <button
          onClick={onNavigateToScan}
          className="text-[13px] text-[#0a84ff] hover:text-[#0a84ff]/80 flex items-center gap-1 font-medium transition-colors pt-0.5"
          type="button"
        >
          <span>Switch to Camera Scanner</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Apple Metrics Cards (3-Column Inset Grid) */}
      <div className="grid grid-cols-3 gap-2.5 w-full">
        {/* Present KPI */}
        <div className="bg-[#1c1c1e] p-3.5 rounded-2xl flex flex-col justify-between border border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between text-[#30d158]">
            <span className="text-[12px] font-medium text-[#8e8e93]">Present</span>
            <CheckCircle2 className="w-4 h-4 text-[#30d158]" />
          </div>
          <div className="mt-2 flex flex-col">
            <span className="text-[22px] font-bold text-white tracking-tight">
              {presentCount}
              <span className="text-[13px] text-[#8e8e93] font-normal">
                /{totalStudents}
              </span>
            </span>
            <span className="text-[11px] text-[#30d158] font-semibold mt-0.5">
              {attendanceRatio}% ratio
            </span>
          </div>
        </div>

        {/* Absent KPI */}
        <div className="bg-[#1c1c1e] p-3.5 rounded-2xl flex flex-col justify-between border border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between text-[#ff9f0a]">
            <span className="text-[12px] font-medium text-[#8e8e93]">Absent</span>
            <UserX className="w-4 h-4 text-[#ff9f0a]" />
          </div>
          <div className="mt-2 flex flex-col">
            <span className="text-[22px] font-bold text-white tracking-tight">
              {absentCount}
            </span>
            <span className="text-[11px] text-[#8e8e93] font-medium mt-0.5">Pending</span>
          </div>
        </div>

        {/* Proxy Flagged KPI */}
        <div className="bg-[#1c1c1e] p-3.5 rounded-2xl flex flex-col justify-between border border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between text-[#0a84ff]">
            <span className="text-[12px] font-medium text-[#8e8e93]">Proxies</span>
            <Shield className="w-4 h-4 text-[#0a84ff]" />
          </div>
          <div className="mt-2 flex flex-col">
            <span className="text-[22px] font-bold text-[#30d158] tracking-tight">0</span>
            <span className="text-[11px] text-[#30d158] font-semibold mt-0.5">All Secure</span>
          </div>
        </div>
      </div>

      {/* Real-Time Check-In Stream Card */}
      <div className="w-full bg-[#1c1c1e] rounded-3xl p-4 flex flex-col space-y-3 border border-white/[0.08] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#30d158]" />
            <h3 className="text-[15px] font-semibold text-white tracking-tight">
              Live Check-In Stream
            </h3>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[#8e8e93] border border-white/[0.06]">
            Real-time Feed
          </span>
        </div>

        {/* Stream List */}
        <div className="flex flex-col space-y-2 max-h-64 overflow-y-auto" id="checkin-stream">
          {checkInList.map((item) => (
            <div
              key={item.id}
              className="bg-white/[0.04] p-3 rounded-2xl flex items-center justify-between border border-white/[0.05] transition-all hover:bg-white/[0.07]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 shadow-sm ${
                    item.isOverride
                      ? 'bg-[#30d158]/20 text-[#30d158] border border-[#30d158]/30'
                      : 'bg-[#ff9f0a]/15 text-[#ff9f0a] border border-[#ff9f0a]/30'
                  }`}
                >
                  {item.roll}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-medium text-white truncate">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8e8e93]">
                    <span className="text-[#30d158] font-medium flex items-center gap-1">
                      {item.isOverride ? (
                        <Edit3 className="w-3 h-3" />
                      ) : (
                        <Fingerprint className="w-3 h-3" />
                      )}
                      {item.isOverride ? 'Manual Override' : 'Verified'}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[10px] text-[#8e8e93]">{item.mac}</span>
                  </div>
                </div>
              </div>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0 ${
                  item.timeAgo === 'Just now' || item.timeAgo === '2s ago'
                    ? 'text-[#ff9f0a] bg-[#ff9f0a]/10 border border-[#ff9f0a]/20'
                    : 'text-[#8e8e93] bg-white/[0.04]'
                }`}
              >
                {item.timeAgo}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CR Operational Command Center Controls */}
      <div className="w-full bg-[#1c1c1e] rounded-3xl p-4 flex flex-col space-y-3 border border-white/[0.08] shadow-sm">
        <div className="flex items-center justify-between pb-0.5">
          <h3 className="text-[15px] font-semibold text-white tracking-tight">
            Representative Controls
          </h3>
          <span className="text-[11px] font-semibold text-[#8e8e93]">
            CR Authorization
          </span>
        </div>

        {/* Action Grid (Apple iOS style cards with soft haptics) */}
        <div className="grid grid-cols-2 gap-2.5 w-full">
          {/* Broadcast Refresh */}
          <button
            id="btn-broadcast"
            onClick={handleBroadcastRefresh}
            className="bg-[#ff9f0a] text-black p-3.5 rounded-2xl flex flex-col justify-between space-y-2 active:scale-[0.97] transition-all text-left shadow-sm hover:brightness-105"
            type="button"
          >
            <div className="flex items-center justify-between w-full">
              <RefreshCw className="w-5 h-5 text-black" strokeWidth={2.2} />
              <span className="text-[10px] font-bold uppercase tracking-wider bg-black/10 px-1.5 py-0.5 rounded-md">
                Force
              </span>
            </div>
            <div>
              <div className="text-[14px] font-bold text-black tracking-tight">
                Refresh Token
              </div>
              <div className="text-[11px] text-black/75">Regenerate cipher</div>
            </div>
          </button>

          {/* Lock Session */}
          <button
            id="btn-lock"
            onClick={onToggleLock}
            className={`p-3.5 rounded-2xl flex flex-col justify-between space-y-2 active:scale-[0.97] transition-all text-left border ${
              isSessionLocked
                ? 'bg-[#ff453a] text-white border-[#ff453a]/40 shadow-sm'
                : 'bg-white/[0.06] text-white hover:bg-white/[0.09] border-white/[0.08]'
            }`}
            type="button"
          >
            <div className="flex items-center justify-between w-full">
              {isSessionLocked ? (
                <Lock className="w-5 h-5 text-white" strokeWidth={2.2} />
              ) : (
                <Unlock className="w-5 h-5 text-[#ff453a]" strokeWidth={2.2} />
              )}
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                  isSessionLocked ? 'bg-white/20 text-white' : 'bg-[#ff453a]/15 text-[#ff453a]'
                }`}
              >
                {isSessionLocked ? 'Locked' : 'Standby'}
              </span>
            </div>
            <div>
              <div className="text-[14px] font-bold tracking-tight">
                {isSessionLocked ? 'Session Locked' : 'Lock Session'}
              </div>
              <div
                className={`text-[11px] ${
                  isSessionLocked ? 'text-white/80' : 'text-[#8e8e93]'
                }`}
              >
                {isSessionLocked ? 'Check-ins paused' : 'Stop incoming scans'}
              </div>
            </div>
          </button>

          {/* Freeze Sheet */}
          <button
            id="btn-freeze"
            onClick={handleFreezeSheet}
            className="bg-white/[0.06] text-white p-3.5 rounded-2xl flex flex-col justify-between space-y-2 hover:bg-white/[0.09] active:scale-[0.97] transition-all text-left border border-white/[0.08]"
            type="button"
          >
            <div className="flex items-center justify-between w-full">
              <FileDown className="w-5 h-5 text-[#0a84ff]" strokeWidth={2.2} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0a84ff] bg-[#0a84ff]/15 px-1.5 py-0.5 rounded-md">
                CSV
              </span>
            </div>
            <div>
              <div className="text-[14px] font-bold tracking-tight">
                Export Roster
              </div>
              <div className="text-[11px] text-[#8e8e93]">Download CSV snapshot</div>
            </div>
          </button>

          {/* Manual Override Trigger */}
          <button
            id="btn-manual"
            onClick={() => setShowManualPanel(!showManualPanel)}
            className={`p-3.5 rounded-2xl flex flex-col justify-between space-y-2 active:scale-[0.97] transition-all text-left border ${
              showManualPanel
                ? 'bg-[#30d158] text-black border-[#30d158]/50 shadow-sm'
                : 'bg-white/[0.06] text-white hover:bg-white/[0.09] border-white/[0.08]'
            }`}
            type="button"
          >
            <div className="flex items-center justify-between w-full">
              <UserPlus
                className={`w-5 h-5 ${showManualPanel ? 'text-black' : 'text-[#30d158]'}`}
                strokeWidth={2.2}
              />
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                  showManualPanel ? 'bg-black/15 text-black' : 'bg-[#30d158]/15 text-[#30d158]'
                }`}
              >
                Manual
              </span>
            </div>
            <div>
              <div className="text-[14px] font-bold tracking-tight">
                Add Scholar
              </div>
              <div
                className={`text-[11px] ${
                  showManualPanel ? 'text-black/80' : 'text-[#8e8e93]'
                }`}
              >
                Manual roll entry
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Manual Add Drawer / Panel */}
      {showManualPanel && (
        <form
          onSubmit={handleSubmitOverride}
          className="w-full bg-[#1c1c1e] p-5 rounded-3xl flex flex-col space-y-3 border border-[#ff9f0a]/40 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-[#ff9f0a]" />
              <h3 className="text-[15px] font-bold text-white tracking-tight">
                Manual Attendance Override
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowManualPanel(false)}
              className="w-7 h-7 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#8e8e93] hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[12px] text-[#8e8e93] font-medium">
              Student Roll Number &amp; Full Name
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                id="input-roll"
                value={manualRoll}
                onChange={(e) => setManualRoll(e.target.value)}
                placeholder="Roll (e.g. 29)"
                type="number"
                min="1"
                max="99"
                required
                className="col-span-1 bg-white/[0.06] text-white px-3.5 py-2.5 rounded-xl border border-white/10 text-[14px] focus:outline-none focus:border-[#ff9f0a]"
              />
              <input
                id="input-name"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="Scholar Name (Optional)"
                type="text"
                className="col-span-2 bg-white/[0.06] text-white px-3.5 py-2.5 rounded-xl border border-white/10 text-[14px] focus:outline-none focus:border-[#ff9f0a]"
              />
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-[#8e8e93]">
                Logs CR digital signature to audit trail.
              </span>
              <button
                type="submit"
                className="bg-[#ff9f0a] text-black px-4 py-2.5 rounded-full text-[13px] font-bold active:scale-95 transition-transform"
              >
                Confirm Entry
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
