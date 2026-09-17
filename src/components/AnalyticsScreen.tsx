import { useState, useId } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Sliders,
  FileText,
  HeartPulse,
  ShieldAlert,
  Radio,
  Clock,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface AnalyticsScreenProps {
  onOpenLeaveModal: () => void;
  onDownloadReport: () => void;
  userRoll: string;
}

export default function AnalyticsScreen({
  onOpenLeaveModal,
  onDownloadReport,
  userRoll,
}: AnalyticsScreenProps) {
  const [bunkMisses, setBunkMisses] = useState(0);
  const bunkInputId = useId();

  const currentHeld = 86;
  const currentAttended = 70;

  // Real-time calculations for simulator
  const projectedHeld = currentHeld + bunkMisses;
  const projectedAttended = currentAttended;
  const projectedPercentage = ((projectedAttended / projectedHeld) * 100).toFixed(1);
  const numericPct = parseFloat(projectedPercentage);

  let yieldColorClass = 'text-[#30d158]';
  let bufferStatus = 'Safe (+7 classes can miss)';
  let bufferColorClass = 'text-[#30d158]';

  if (numericPct >= 80.0) {
    yieldColorClass = 'text-[#30d158]';
    bufferColorClass = 'text-[#30d158]';
    const classesCanMiss = Math.max(0, Math.floor((currentAttended - 0.75 * projectedHeld) / 0.75));
    bufferStatus = `Safe (+${classesCanMiss} can miss)`;
  } else if (numericPct >= 75.0) {
    yieldColorClass = 'text-[#ff9f0a]';
    bufferColorClass = 'text-[#ff9f0a]';
    bufferStatus = 'Warning: Near 75% threshold';
  } else {
    yieldColorClass = 'text-[#ff453a]';
    bufferColorClass = 'text-[#ff453a]';
    bufferStatus = 'Debarred: Examination barred';
  }

  // Radial Ring calculation
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (81.4 / 100) * circumference;

  return (
    <div className="flex flex-col w-full space-y-4 pb-8">
      {/* Geofence Status Pill */}
      <div className="w-full bg-[#1c1c1e] rounded-2xl px-4 py-3 flex items-center justify-between border border-white/[0.08] shadow-sm">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#30d158] animate-pulse" />
          <span className="text-[13px] font-semibold text-white">
            Telemetry Synced • Sec-E Quorum
          </span>
        </div>
        <span className="text-[11px] text-[#8e8e93] font-mono">
          Roll #{userRoll}
        </span>
      </div>

      {/* BHU Academic Notice Card */}
      <div className="w-full bg-[#ff9f0a]/10 rounded-2xl p-4 flex items-start gap-3 border border-[#ff9f0a]/25 shadow-sm">
        <AlertCircle className="w-5 h-5 text-[#ff9f0a] shrink-0 mt-0.5" />
        <div className="flex flex-col min-w-0">
          <span className="text-[12px] font-bold text-[#ff9f0a] uppercase tracking-wider">
            BHU Statute Ordinance 18/B
          </span>
          <p className="text-[12px] text-white/90 mt-0.5 leading-relaxed">
            Minimum <span className="text-[#ff9f0a] font-bold">75% attendance</span> is strictly mandatory for Section E scholars to sit for Semester I examinations.
          </p>
        </div>
      </div>

      {/* Overall Attendance Health Card (Apple Fitness style gauge) */}
      <section className="w-full bg-[#1c1c1e] rounded-3xl p-5 flex flex-col items-center border border-white/[0.08] shadow-md relative">
        <div className="w-full flex items-center justify-between mb-2">
          <div>
            <h2 className="text-[18px] font-bold text-white tracking-tight">
              Semester 1 Quorum
            </h2>
            <p className="text-[12px] text-[#8e8e93]">Cumulative aggregate</p>
          </div>
          <span className="px-2.5 py-1 bg-[#30d158]/15 text-[#30d158] text-[11px] font-semibold rounded-full border border-[#30d158]/25 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Safe (&gt;75%)
          </span>
        </div>

        {/* Apple Style Ring Graphic */}
        <div className="relative w-48 h-48 flex items-center justify-center my-2">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              fill="transparent"
              r={radius}
              stroke="#2c2c2e"
              strokeWidth="12"
            />
            {/* 75% Requirement Tick Guide */}
            <circle
              cx="80"
              cy="80"
              fill="transparent"
              r={radius}
              stroke="white"
              strokeDasharray="2 12"
              strokeWidth="12"
              className="opacity-15"
            />
            {/* Progress Arc */}
            <circle
              cx="80"
              cy="80"
              fill="transparent"
              r={radius}
              stroke="#30d158"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="12"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Data */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-[11px] text-[#8e8e93] font-medium tracking-tight uppercase">
              Current Rate
            </span>
            <span className="text-[34px] font-bold text-white tracking-tight leading-none mt-1">
              81.4%
            </span>
            <span className="text-[11px] text-[#30d158] font-semibold mt-1 bg-[#30d158]/10 px-2 py-0.5 rounded-full">
              +6.4% above limit
            </span>
          </div>
        </div>

        {/* 3 Metrics Row */}
        <div className="w-full grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/[0.06]">
          <div className="bg-white/[0.04] p-3 rounded-2xl flex flex-col items-center border border-white/[0.05]">
            <span className="text-[11px] text-[#8e8e93]">Held</span>
            <span className="text-[18px] font-bold text-white mt-0.5">{currentHeld}</span>
          </div>
          <div className="bg-white/[0.04] p-3 rounded-2xl flex flex-col items-center border border-white/[0.05]">
            <span className="text-[11px] text-[#30d158]">Attended</span>
            <span className="text-[18px] font-bold text-[#30d158] mt-0.5">{currentAttended}</span>
          </div>
          <div className="bg-white/[0.04] p-3 rounded-2xl flex flex-col items-center border border-white/[0.05]">
            <span className="text-[11px] text-[#ff453a]">Missed</span>
            <span className="text-[18px] font-bold text-[#ff453a] mt-0.5">16</span>
          </div>
        </div>
      </section>

      {/* Bunk Simulator Card */}
      <section className="w-full bg-[#1c1c1e] rounded-3xl p-5 flex flex-col space-y-3 border border-white/[0.08] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#ff9f0a]" />
            <h3 className="text-[16px] font-semibold text-white tracking-tight">
              Attendance Simulator
            </h3>
          </div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#ff9f0a]/15 text-[#ff9f0a] border border-[#ff9f0a]/25">
            Predictive Model
          </span>
        </div>

        <p className="text-[12px] text-[#8e8e93] leading-relaxed">
          Estimate aggregate percentage drop if you miss consecutive future sessions across Section E curriculum.
        </p>

        <div className="bg-white/[0.04] p-4 rounded-2xl flex flex-col space-y-3 border border-white/[0.06]">
          <div className="flex justify-between items-center">
            <label htmlFor={bunkInputId} className="text-[13px] font-medium text-white cursor-pointer">
              Simulate Missed Classes:
            </label>
            <span className="text-[14px] font-bold text-[#ff9f0a] px-2.5 py-0.5 bg-[#ff9f0a]/15 rounded-full">
              {bunkMisses} {bunkMisses === 1 ? 'Class' : 'Classes'}
            </span>
          </div>

          {/* iOS Slider */}
          <input
            id={bunkInputId}
            type="range"
            min="0"
            max="10"
            step="1"
            value={bunkMisses}
            onChange={(e) => setBunkMisses(parseInt(e.target.value, 10))}
            className="w-full accent-[#ff9f0a] h-2 bg-white/10 rounded-full cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-[#8e8e93]">
            <span>0 (Safe)</span>
            <span>5 (Caution)</span>
            <span>10 (Debarred)</span>
          </div>

          {/* Projected Result */}
          <div className="flex items-center justify-between p-3 bg-white/[0.05] rounded-xl border border-white/[0.06]">
            <div>
              <span className="text-[11px] text-[#8e8e93] uppercase">Projected Rate</span>
              <div className={`text-[20px] font-bold tracking-tight ${yieldColorClass}`}>
                {projectedPercentage}%
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-[#8e8e93] uppercase">Status</span>
              <div className={`text-[12px] font-semibold ${bufferColorClass}`}>
                {bufferStatus}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Breakdown Cards */}
      <section className="w-full flex flex-col space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[15px] font-semibold text-white tracking-tight">
            Course Breakdown
          </h3>
          <span className="text-[11px] text-[#8e8e93]">5 Registered Modules</span>
        </div>

        {/* Subject 1: Financial Accounting */}
        <div className="bg-[#1c1c1e] rounded-3xl p-4 flex flex-col space-y-2 border border-white/[0.08] shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#30d158]/15 text-[#30d158] text-[11px] font-semibold rounded-full">
                  BCH-101
                </span>
                <span className="text-[11px] text-[#8e8e93]">Room 327</span>
              </div>
              <h4 className="text-[16px] font-bold text-white tracking-tight mt-1">
                Financial Accounting
              </h4>
              <span className="text-[12px] text-[#8e8e93]">Prof. M.A.S.</span>
            </div>
            <div className="text-right">
              <span className="text-[18px] font-bold text-[#30d158]">85.7%</span>
              <div className="text-[11px] text-[#8e8e93]">24 / 28 classes</div>
            </div>
          </div>
          <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
            <div className="bg-[#30d158] h-full rounded-full" style={{ width: '85.7%' }}></div>
          </div>
        </div>

        {/* Subject 2: Business Economics */}
        <div className="bg-[#1c1c1e] rounded-3xl p-4 flex flex-col space-y-2 border border-white/[0.08] shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#ff9f0a]/15 text-[#ff9f0a] text-[11px] font-semibold rounded-full">
                  BCH-102
                </span>
                <span className="text-[11px] text-[#8e8e93]">Room 327</span>
              </div>
              <h4 className="text-[16px] font-bold text-white tracking-tight mt-1">
                Business Economics
              </h4>
              <span className="text-[12px] text-[#8e8e93]">Prof. L.B.J.</span>
            </div>
            <div className="text-right">
              <span className="text-[18px] font-bold text-[#ff9f0a]">78.6%</span>
              <div className="text-[11px] text-[#8e8e93]">22 / 28 classes</div>
            </div>
          </div>
          <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
            <div className="bg-[#ff9f0a] h-full rounded-full" style={{ width: '78.6%' }}></div>
          </div>
        </div>

        {/* Subject 3: Business Entrepreneurship */}
        <div className="bg-[#1c1c1e] rounded-3xl p-4 flex flex-col space-y-2 border border-white/[0.08] shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#30d158]/15 text-[#30d158] text-[11px] font-semibold rounded-full">
                  BCH-103
                </span>
                <span className="text-[11px] text-[#8e8e93]">Room 329</span>
              </div>
              <h4 className="text-[16px] font-bold text-white tracking-tight mt-1">
                Business Entrepreneurship
              </h4>
              <span className="text-[12px] text-[#8e8e93]">Prof. T.P.</span>
            </div>
            <div className="text-right">
              <span className="text-[18px] font-bold text-[#30d158]">80.0%</span>
              <div className="text-[11px] text-[#8e8e93]">16 / 20 classes</div>
            </div>
          </div>
          <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
            <div className="bg-[#30d158] h-full rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>

        {/* Subject 4: AEC English */}
        <div className="bg-[#1c1c1e] rounded-3xl p-4 flex flex-col space-y-2 border border-white/[0.08] shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#0a84ff]/15 text-[#0a84ff] text-[11px] font-semibold rounded-full">
                  AEC-101
                </span>
                <span className="text-[11px] text-[#8e8e93]">Room 330</span>
              </div>
              <h4 className="text-[16px] font-bold text-white tracking-tight mt-1">
                English Language
              </h4>
              <span className="text-[12px] text-[#8e8e93]">Arts Faculty</span>
            </div>
            <div className="text-right">
              <span className="text-[18px] font-bold text-[#0a84ff]">83.3%</span>
              <div className="text-[11px] text-[#8e8e93]">5 / 6 classes</div>
            </div>
          </div>
          <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
            <div className="bg-[#0a84ff] h-full rounded-full" style={{ width: '83.3%' }}></div>
          </div>
        </div>

        {/* Subject 5: VAC Yoga */}
        <div className="bg-[#1c1c1e] rounded-3xl p-4 flex flex-col space-y-2 border border-[#ff453a]/30 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#ff453a]/15 text-[#ff453a] text-[11px] font-semibold rounded-full">
                  VAC-02
                </span>
                <span className="text-[11px] text-[#ff453a] font-medium">Borderline</span>
              </div>
              <h4 className="text-[16px] font-bold text-white tracking-tight mt-1">
                Yoga &amp; Ayurveda
              </h4>
              <span className="text-[12px] text-[#8e8e93]">Malaviya Bhawan</span>
            </div>
            <div className="text-right">
              <span className="text-[18px] font-bold text-[#ff453a]">75.0%</span>
              <div className="text-[11px] text-[#8e8e93]">3 / 4 classes</div>
            </div>
          </div>
          <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
            <div className="bg-[#ff453a] h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
          <div className="pt-1 text-[11px] text-[#ff453a] font-semibold flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Zero buffer margin • Attend next session</span>
          </div>
        </div>
      </section>

      {/* Official Actions */}
      <section className="flex flex-col space-y-2.5 pt-2">
        <button
          type="button"
          onClick={onDownloadReport}
          className="w-full py-3.5 px-4 bg-[#ff9f0a] text-black font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md text-[14px]"
        >
          <FileText className="w-4 h-4" />
          <span>Download Attendance Dossier (PDF)</span>
        </button>

        <button
          type="button"
          onClick={onOpenLeaveModal}
          className="w-full py-3.5 px-4 bg-white/[0.06] hover:bg-white/[0.1] text-white font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all border border-white/[0.08] text-[14px]"
        >
          <HeartPulse className="w-4 h-4 text-[#ff9f0a]" />
          <span>Apply for Medical Exemption / OD</span>
        </button>
      </section>
    </div>
  );
}
