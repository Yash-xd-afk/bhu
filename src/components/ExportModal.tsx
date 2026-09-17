import { Download, Github, Terminal, Copy, Check, X, ShieldCheck, Laptop, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminEmail: string;
}

export default function ExportModal({ isOpen, onClose, adminEmail }: ExportModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadSetupScript = () => {
    const guideContent = `# BHU Sec-E Telemetry Application Export & Self-Hosting Guide

Administrator: ${adminEmail}
System: BHU Faculty of Commerce - Section E Telemetry

---

## 1. Exporting Directly from Google AI Studio
You can export this entire project directly from the Google AI Studio interface:
1. Look at the top navigation bar / settings menu in AI Studio.
2. Click the **Export** button (or open the Settings menu).
3. Select either:
   - **Download ZIP**: Downloads the complete self-contained source code archive.
   - **Export to GitHub**: Pushes this codebase directly to your personal GitHub repository.

---

## 2. Running the Exported App Locally

### Prerequisites
- Node.js 18+ or 20+ installed
- npm or pnpm / yarn

### Quick Start Commands:
\`\`\`bash
# 1. Extract the downloaded zip archive and enter the folder
cd bhu-sec-e-telemetry

# 2. Install all dependencies
npm install

# 3. Start the development server (runs on port 3000)
npm run dev

# 4. Open in your browser
# Visit http://localhost:3000
\`\`\`

### Production Build & Deployment
\`\`\`bash
# Build static assets
npm run build

# Preview production build
npm run preview
\`\`\`

---

## 3. Administrator Configuration
Your account (${adminEmail}) is pre-configured as the primary **Super Admin & CR In-Charge** in \`src/App.tsx\`.
To customize administrator credentials or add additional authorized admin emails, open \`src/App.tsx\` and configure the \`currentUser\` state or add server-side authentication.

Generated on: ${new Date().toLocaleString()}
`;

    const blob = new Blob([guideContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BHU_SecE_Export_Guide_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-lg bg-[#1c1c1e] rounded-3xl border border-white/10 p-6 flex flex-col space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0a84ff]/20 flex items-center justify-center text-[#0a84ff]">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[17px] font-semibold text-white tracking-tight">
                Export App & Admin Setup
              </h3>
              <span className="text-[11px] text-[#8e8e93]">
                Self-hosting, GitHub & Admin Guide
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

        {/* Admin status pill */}
        <div className="p-3.5 bg-[#ff9f0a]/10 border border-[#ff9f0a]/25 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#ff9f0a] text-black font-bold flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-bold text-[#ff9f0a] uppercase tracking-wider">
                Admin Configured
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-[#30d158]/20 text-[#30d158] font-semibold rounded-full">
                Active
              </span>
            </div>
            <span className="text-[13px] font-medium text-white truncate">
              {adminEmail}
            </span>
          </div>
        </div>

        {/* Step 1: Exporting from AI Studio */}
        <div className="bg-white/[0.04] p-4 rounded-2xl border border-white/[0.06] space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0a84ff] text-white text-[11px] font-bold flex items-center justify-center">
              1
            </span>
            <h4 className="text-[14px] font-semibold text-white">
              Export from Google AI Studio
            </h4>
          </div>
          <p className="text-[12px] text-[#8e8e93] leading-relaxed">
            In the Google AI Studio top bar, open the <strong>Settings</strong> menu (or click the <strong>Export</strong> button in the top right header):
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2.5 bg-black/40 rounded-xl border border-white/5 flex flex-col">
              <div className="flex items-center gap-1.5 text-white text-[12px] font-medium">
                <Github className="w-3.5 h-3.5 text-[#30d158]" />
                <span>Export to GitHub</span>
              </div>
              <span className="text-[10px] text-[#8e8e93] mt-1">
                Pushes directly to a new repo in your GitHub account
              </span>
            </div>
            <div className="p-2.5 bg-black/40 rounded-xl border border-white/5 flex flex-col">
              <div className="flex items-center gap-1.5 text-white text-[12px] font-medium">
                <Download className="w-3.5 h-3.5 text-[#ff9f0a]" />
                <span>Download ZIP</span>
              </div>
              <span className="text-[10px] text-[#8e8e93] mt-1">
                Downloads complete source code archive to your PC
              </span>
            </div>
          </div>
        </div>

        {/* Step 2: Running Locally */}
        <div className="bg-white/[0.04] p-4 rounded-2xl border border-white/[0.06] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#30d158] text-black text-[11px] font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="text-[14px] font-semibold text-white">
                Run Locally on Your Machine
              </h4>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard('npm install && npm run dev', 'commands')}
              className="text-[11px] text-[#0a84ff] flex items-center gap-1 hover:underline"
            >
              {copiedKey === 'commands' ? (
                <>
                  <Check className="w-3 h-3 text-[#30d158]" />
                  <span className="text-[#30d158]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Commands</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-black/60 p-3 rounded-xl font-mono text-[11px] text-[#30d158] border border-white/10 space-y-1">
            <p className="text-[#8e8e93]"># 1. Install packages</p>
            <p className="text-white">npm install</p>
            <p className="text-[#8e8e93] mt-1.5"># 2. Launch dev server</p>
            <p className="text-white">npm run dev</p>
            <p className="text-[#8e8e93] mt-1.5"># 3. Access in browser at http://localhost:3000</p>
          </div>
        </div>

        {/* Step 3: Admin Configuration */}
        <div className="bg-white/[0.04] p-4 rounded-2xl border border-white/[0.06] space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#ff9f0a] text-black text-[11px] font-bold flex items-center justify-center">
              3
            </span>
            <h4 className="text-[14px] font-semibold text-white">
              Admin Access & Persistence
            </h4>
          </div>
          <p className="text-[12px] text-[#8e8e93] leading-relaxed">
            Your profile has been set as <strong>Lead Administrator & CR In-Charge</strong> with full access to the dynamic rolling QR generation, session freeze locks, and student attendance registers.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-white/[0.08]">
          <button
            onClick={handleDownloadSetupScript}
            className="w-full sm:flex-1 py-3 bg-white/10 hover:bg-white/15 text-white font-medium rounded-full text-[13px] flex items-center justify-center gap-2 transition-colors border border-white/10 active:scale-95"
            type="button"
          >
            <Download className="w-4 h-4 text-[#0a84ff]" />
            <span>Download Instructions (.md)</span>
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-28 py-3 bg-white text-black font-semibold rounded-full text-[13px] active:scale-95 transition-transform"
            type="button"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
