import React, { useState } from 'react';
import { HeartPulse, X, CheckCircle2, UploadCloud, FileText } from 'lucide-react';

interface LeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: { reason: string; type: string; days: number }) => void;
}

export default function LeaveModal({ isOpen, onClose, onSubmit }: LeaveModalProps) {
  const [leaveType, setLeaveType] = useState('Medical Exemption (BHU Health Centre)');
  const [days, setDays] = useState(2);
  const [reason, setReason] = useState('');
  const [certUploaded, setCertUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmit({ reason, type: leaveType, days });
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-md bg-[#1c1c1e] rounded-3xl border border-white/10 p-6 flex flex-col space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#ff9f0a]/15 flex items-center justify-center text-[#ff9f0a]">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[17px] font-semibold text-white tracking-tight">
                Attendance Exemption
              </h3>
              <span className="text-[11px] text-[#8e8e93]">
                Medical / OD Condonation Application
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

        <div className="p-3 bg-[#ff9f0a]/10 rounded-2xl border border-[#ff9f0a]/20 text-[12px] text-white/90 leading-relaxed">
          <span className="text-[#ff9f0a] font-bold">BHU Statute 18/B:</span> Up to 10% attendance condonation permitted upon endorsement by Head &amp; Dean, Faculty of Commerce.
        </div>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#30d158]/15 flex items-center justify-center text-[#30d158] mb-1">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-[17px] font-bold text-white">Application Submitted</h4>
            <span className="text-[12px] text-[#8e8e93] font-mono">
              Token #BHU-DEAN-COND-8812 Generated
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-1">
              <label className="text-[12px] text-[#8e8e93] font-medium">
                Exemption Category
              </label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="bg-white/[0.06] text-white px-3.5 py-2.5 rounded-xl border border-white/10 text-[13px] focus:outline-none focus:border-[#ff9f0a]"
              >
                <option value="Medical Exemption (BHU Health Centre)">
                  Medical Exemption (BHU Health Centre Certificate)
                </option>
                <option value="On-Duty (OD) University Representation">
                  On-Duty (OD) University / Faculty Event
                </option>
                <option value="Inter-University Sports Board Representation">
                  Inter-University Sports Board Representation
                </option>
                <option value="NCC / NSS Official Camp Deputation">
                  NCC / NSS Official Camp Deputation
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col space-y-1">
                <label className="text-[12px] text-[#8e8e93] font-medium">
                  Number of Lectures
                </label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value, 10))}
                  required
                  className="bg-white/[0.06] text-white px-3.5 py-2.5 rounded-xl border border-white/10 text-[13px] font-mono focus:outline-none focus:border-[#ff9f0a]"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-[12px] text-[#8e8e93] font-medium">
                  Roll Number
                </label>
                <input
                  type="text"
                  readOnly
                  value="23411BC042 (Roll 24)"
                  className="bg-white/[0.03] text-[#8e8e93] px-3.5 py-2.5 rounded-xl border border-white/10 text-[13px] font-mono cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[12px] text-[#8e8e93] font-medium">
                Statement of Grounds
              </label>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Specify clinical or university grounds..."
                required
                className="bg-white/[0.06] text-white px-3.5 py-2.5 rounded-xl border border-white/10 text-[13px] focus:outline-none focus:border-[#ff9f0a]"
              ></textarea>
            </div>

            {/* Document Upload Box */}
            <div
              onClick={() => setCertUploaded(!certUploaded)}
              className={`p-3 rounded-xl border-2 border-dashed cursor-pointer flex items-center justify-between transition-all ${
                certUploaded
                  ? 'border-[#30d158] bg-[#30d158]/10 text-[#30d158]'
                  : 'border-white/15 bg-white/[0.03] text-[#8e8e93] hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-2">
                {certUploaded ? (
                  <FileText className="w-4 h-4 text-[#30d158]" />
                ) : (
                  <UploadCloud className="w-4 h-4" />
                )}
                <span className="text-[12px] font-medium">
                  {certUploaded
                    ? 'BHU_SS_HOSPITAL_SLIP.PDF'
                    : 'Attach Certificate (PDF / JPG)'}
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono">
                {certUploaded ? 'Attached' : '< 5MB'}
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[13px] text-[#8e8e93] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#ff9f0a] text-black font-semibold rounded-full text-[13px] active:scale-95 transition-transform"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
