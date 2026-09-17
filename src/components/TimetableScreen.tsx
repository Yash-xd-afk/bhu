import { useState } from 'react';
import { TIMETABLE_DATA } from '../data/timetableData';
import { TimetableEntry } from '../types';
import {
  Clock,
  User,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Building2,
  Check,
  Radio,
  ShieldCheck,
} from 'lucide-react';

interface TimetableScreenProps {
  onVerifySlot: (slotCode: string, room: string) => void;
}

export default function TimetableScreen({ onVerifySlot }: TimetableScreenProps) {
  const [selectedDay, setSelectedDay] = useState<'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT'>('WED');
  const [activeFilter, setActiveFilter] = useState<'all' | 'core' | 'vac'>('all');
  const [verifiedSlots, setVerifiedSlots] = useState<Record<string, boolean>>({
    'BCH-102-WED': true,
  });

  const days: {
    key: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';
    label: string;
    date: number;
    isToday?: boolean;
  }[] = [
    { key: 'MON', label: 'Mon', date: 16 },
    { key: 'TUE', label: 'Tue', date: 17 },
    { key: 'WED', label: 'Wed', date: 18, isToday: true },
    { key: 'THU', label: 'Thu', date: 19 },
    { key: 'FRI', label: 'Fri', date: 20 },
    { key: 'SAT', label: 'Sat', date: 21 },
  ];

  const dayNames: Record<string, string> = {
    MON: 'Monday',
    TUE: 'Tuesday',
    WED: 'Wednesday',
    THU: 'Thursday',
    FRI: 'Friday',
    SAT: 'Saturday',
  };

  const dayEntries: TimetableEntry[] = TIMETABLE_DATA[selectedDay] || [];
  const filteredEntries = dayEntries.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const handleVerify = (entry: TimetableEntry) => {
    const key = `${entry.code}-${selectedDay}`;
    setVerifiedSlots((prev) => ({ ...prev, [key]: true }));
    onVerifySlot(entry.code, entry.room);
  };

  return (
    <div className="flex flex-col w-full space-y-4 pb-8">
      {/* Overview Context Card */}
      <section className="w-full bg-[#1c1c1e] rounded-3xl p-5 relative overflow-hidden border border-white/[0.08] shadow-md">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 bg-[#ff9f0a]/15 text-[#ff9f0a] text-[11px] font-semibold rounded-full border border-[#ff9f0a]/25">
            B.Com. (Hons.) Sec-E
          </span>
          <span className="text-[12px] text-[#8e8e93]">
            Semester I • 2026-27
          </span>
        </div>

        <div className="mt-2">
          <h2 className="text-[22px] font-bold text-white tracking-tight">
            Academic Schedule
          </h2>
          <p className="text-[13px] text-[#8e8e93] flex items-center gap-1.5 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-[#0a84ff]" />
            Faculty of Commerce, BHU • Anchor Room 327
          </p>
        </div>

        {/* Apple Style Metric Chips */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/[0.06]">
          <div className="bg-white/[0.04] p-2.5 rounded-2xl flex flex-col border border-white/[0.05]">
            <span className="text-[11px] text-[#8e8e93]">Geofence</span>
            <span className="text-[16px] font-bold text-[#30d158] mt-0.5">15.4m</span>
            <span className="text-[10px] text-[#30d158]">In Radius</span>
          </div>
          <div className="bg-white/[0.04] p-2.5 rounded-2xl flex flex-col border border-white/[0.05]">
            <span className="text-[11px] text-[#8e8e93]">Lectures</span>
            <span className="text-[16px] font-bold text-white mt-0.5">16 / wk</span>
            <span className="text-[10px] text-[#8e8e93]">Section E</span>
          </div>
          <div className="bg-white/[0.04] p-2.5 rounded-2xl flex flex-col border border-white/[0.05]">
            <span className="text-[11px] text-[#8e8e93]">Base Hub</span>
            <span className="text-[16px] font-bold text-[#ff9f0a] mt-0.5">R-327</span>
            <span className="text-[10px] text-[#ff9f0a]">Main Hall</span>
          </div>
        </div>
      </section>

      {/* Apple Calendar Day Picker (Segmented Carousel) */}
      <section className="w-full flex flex-col space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[13px] font-semibold text-white">
            {dayNames[selectedDay]}
          </span>
          <span className="text-[11px] text-[#8e8e93]">
            {dayEntries.length} Sessions Scheduled
          </span>
        </div>

        <div className="grid grid-cols-6 gap-1.5 bg-[#1c1c1e] p-1.5 rounded-2xl border border-white/[0.08] shadow-sm">
          {days.map((d) => {
            const isSelected = selectedDay === d.key;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => setSelectedDay(d.key)}
                className={`flex flex-col items-center py-2.5 px-1 rounded-xl transition-all duration-150 active:scale-95 relative ${
                  isSelected
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-[#8e8e93] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className="text-[11px] font-medium uppercase tracking-tight">
                  {d.label}
                </span>
                <span
                  className={`text-[16px] mt-0.5 ${
                    isSelected ? 'font-bold text-black' : 'font-medium text-white'
                  }`}
                >
                  {d.date}
                </span>
                {d.isToday && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1 ${
                      isSelected ? 'bg-[#ff9f0a]' : 'bg-[#ff9f0a]'
                    }`}
                  ></span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Apple Segmented Control Filter */}
      <section className="w-full">
        <div className="flex items-center bg-[#1c1c1e] p-1 rounded-xl border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-[#8e8e93] hover:text-white'
            }`}
          >
            All ({dayEntries.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('core')}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
              activeFilter === 'core'
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-[#8e8e93] hover:text-white'
            }`}
          >
            Core (R-327)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('vac')}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
              activeFilter === 'vac'
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-[#8e8e93] hover:text-white'
            }`}
          >
            Value Added / VAC
          </button>
        </div>
      </section>

      {/* Schedule Feed */}
      <section className="w-full flex flex-col space-y-3">
        {filteredEntries.length === 0 ? (
          <div className="bg-[#1c1c1e] rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-white/[0.08]">
            <Calendar className="w-8 h-8 text-[#8e8e93] mb-2" />
            <h3 className="text-[16px] font-bold text-white">No Lectures Scheduled</h3>
            <p className="text-[13px] text-[#8e8e93] max-w-xs mt-1">
              No Section E sessions match the selected filter for {dayNames[selectedDay]}.
            </p>
          </div>
        ) : (
          filteredEntries.map((session) => {
            const slotKey = `${session.code}-${selectedDay}`;
            const isVerified = verifiedSlots[slotKey] || false;

            return (
              <div
                key={slotKey}
                className="bg-[#1c1c1e] rounded-3xl p-4 flex flex-col space-y-3 border border-white/[0.08] shadow-sm transition-all hover:border-white/15"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2.5 py-0.5 bg-[#ff9f0a]/15 text-[#ff9f0a] text-[11px] font-semibold rounded-full border border-[#ff9f0a]/25 shrink-0">
                      {session.code}
                    </span>
                    <span className="text-[12px] text-[#8e8e93] truncate">
                      {session.badge}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                      isVerified
                        ? 'bg-[#30d158]/15 text-[#30d158] border border-[#30d158]/25'
                        : 'bg-white/[0.06] text-[#8e8e93]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isVerified ? 'bg-[#30d158]' : 'bg-[#ff9f0a]'
                      }`}
                    ></span>
                    {isVerified ? 'Verified In-Person' : session.status}
                  </span>
                </div>

                {/* Subject Title */}
                <div>
                  <h3 className="text-[17px] font-bold text-white tracking-tight">
                    {session.subject}
                  </h3>
                </div>

                {/* Details Pill Box */}
                <div className="bg-white/[0.04] p-3 rounded-2xl flex flex-col space-y-1.5 border border-white/[0.05]">
                  <div className="flex items-center gap-2 text-[13px] text-white">
                    <Clock className="w-4 h-4 text-[#ff9f0a] shrink-0" />
                    <span className="font-medium">{session.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#8e8e93]">
                    <User className="w-4 h-4 text-[#8e8e93] shrink-0" />
                    <span>{session.faculty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#0a84ff]">
                    <MapPin className="w-4 h-4 text-[#0a84ff] shrink-0" />
                    <span className="font-medium">{session.room}</span>
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#8e8e93]">
                    Sec-E Perimeter Lock
                  </span>
                  <button
                    type="button"
                    onClick={() => handleVerify(session)}
                    className={`px-4 py-2 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                      isVerified
                        ? 'bg-[#30d158]/15 text-[#30d158] border border-[#30d158]/25'
                        : 'bg-white text-black hover:bg-white/90 shadow-sm'
                    }`}
                  >
                    <span>{isVerified ? 'Presence Logged' : 'Verify Presence'}</span>
                    {isVerified ? (
                      <Check className="w-3.5 h-3.5 text-[#30d158]" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Official Signatories Card */}
      <section className="w-full bg-[#1c1c1e] rounded-3xl p-5 flex flex-col space-y-3 border border-white/[0.08]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#ff9f0a]" />
          <h3 className="text-[15px] font-semibold text-white tracking-tight">
            Official BHU Signatories &amp; Control
          </h3>
        </div>

        <div className="space-y-2 pt-1 border-t border-white/[0.06]">
          <div className="flex items-center justify-between text-[13px]">
            <div>
              <div className="font-medium text-white">Dr. Chinmoy Kumar Roy</div>
              <div className="text-[11px] text-[#8e8e93]">Co-Incharge, Timetable</div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-[#30d158]" />
          </div>

          <div className="flex items-center justify-between text-[13px] pt-1">
            <div>
              <div className="font-medium text-white">Prof. F.B. Singh</div>
              <div className="text-[11px] text-[#8e8e93]">Incharge, Timetable Committee</div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-[#30d158]" />
          </div>

          <div className="flex items-center justify-between text-[13px] pt-1">
            <div>
              <div className="font-medium text-white">Prof. H.K. Singh</div>
              <div className="text-[11px] text-[#ff9f0a]">Head &amp; Dean, Faculty of Commerce</div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-[#30d158]" />
          </div>
        </div>

        <div className="bg-white/[0.04] p-2.5 rounded-2xl flex items-center justify-between text-[11px] text-[#8e8e93] border border-white/[0.05]">
          <span>Auth Code: 2026-COMM-SECE-VERIFIED</span>
          <span className="text-[#30d158] font-semibold">Official Stamp</span>
        </div>
      </section>
    </div>
  );
}
