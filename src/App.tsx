import { useState } from 'react';
import { ScreenType, CheckInRecord, UserProfile, UserRole } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LiveQrScreen from './components/LiveQrScreen';
import ScanScreen from './components/ScanScreen';
import TimetableScreen from './components/TimetableScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import RadarModal from './components/RadarModal';
import NotificationModal from './components/NotificationModal';
import LeaveModal from './components/LeaveModal';
import ProfileModal from './components/ProfileModal';
import ExportModal from './components/ExportModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('live-qr');

  // Authenticated User Identity (Raj Yash / rajyash3161@gmail.com as Admin)
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    name: 'Raj Yash',
    email: 'rajyash3161@gmail.com',
    roll: '01',
    enrollment: '23411BC001',
    role: 'admin',
    device: 'Pixel 8 Pro (Admin Terminal)',
  });

  const [presentCount, setPresentCount] = useState<number>(48);
  const totalStudents = 62;
  const [isSessionLocked, setIsSessionLocked] = useState<boolean>(false);
  const [isAttendanceConfirmed, setIsAttendanceConfirmed] = useState<boolean>(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState<boolean>(true);

  // Modals
  const [isRadarOpen, setIsRadarOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Global Toast
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(null), 3500);
  };

  // Initial check-ins stream from screenshot
  const [checkInList, setCheckInList] = useState<CheckInRecord[]>([
    {
      id: 'c1',
      roll: '12',
      name: 'Aarav Sharma',
      verified: true,
      mac: 'MAC:..89F2',
      timeAgo: '2s ago',
    },
    {
      id: 'c2',
      roll: '44',
      name: 'Sneha Srivastava',
      verified: true,
      mac: 'MAC:..34AA',
      timeAgo: '9s ago',
    },
    {
      id: 'c3',
      roll: '07',
      name: 'Rohan Verma',
      verified: true,
      mac: 'MAC:..08C1',
      timeAgo: '18s ago',
    },
  ]);

  const handleStudentCheckIn = (newRecord: CheckInRecord) => {
    setCheckInList((prev) => [newRecord, ...prev]);
    setPresentCount((prev) => Math.min(totalStudents, prev + 1));
    showToast(`Verified Presence: ${newRecord.name} (Roll #${newRecord.roll})`);
  };

  const handleConfirmAttendanceFromScan = () => {
    setIsAttendanceConfirmed(true);
    const newStudent: CheckInRecord = {
      id: `admin-${currentUser.roll}`,
      roll: currentUser.roll,
      name: currentUser.name,
      verified: true,
      mac: 'MAC:..E042',
      timeAgo: 'Just now',
    };
    handleStudentCheckIn(newStudent);
  };

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentUser((prev) => ({ ...prev, role: newRole }));
    const roleLabels: Record<UserRole, string> = {
      admin: 'Administrator (Super Admin Terminal)',
      cr: 'Class Representative (CR Terminal)',
      student: 'Student Mode (Presence Verification)',
    };
    showToast(`Mode switched: ${roleLabels[newRole]}`);
  };

  const handleDownloadReport = () => {
    const reportText = `=====================================================
BANARAS HINDU UNIVERSITY - FACULTY OF COMMERCE
DEPARTMENT OF COMMERCE • SECTION E TELEMETRY REGISTER
ACADEMIC SESSION: 2026-2027 • B.COM. (HONS.) SEMESTER I
=====================================================
ADMINISTRATOR / SCHOLAR RECORD:
Name: ${currentUser.name}
Authorized Email: ${currentUser.email}
Roll Number: ${currentUser.roll} | Enrollment: ${currentUser.enrollment}
System Role: ${currentUser.role.toUpperCase()} (Lead In-Charge)
Primary Lecture Venue: Room 327, Commerce Hall
Geofence Location Lock: 25°16'03.7"N 82°59'28.7"E (±1.84m)
Hardware Fingerprint: ${currentUser.device}

AGGREGATED SEMESTER 01 QUORUM:
Overall Attendance: 81.4% (70 Attended / 86 Total Held)
Statutory Minimum (Ord. 18/B): 75.0%
Compliance Clearance: SAFE (+6.4% OVER STATUTORY THRESHOLD)

COURSE-WISE BREAKDOWN:
- BCH-101 Financial Accounting: 85.7% [24/28] (Prof. M.A.S.)
- BCH-102 Business Economics: 78.6% [22/28] (Prof. L.B.J.)
- BCH-103 Business Entrepreneurship: 80.0% [16/20] (Prof. T.P.)
- AEC-101 Ability Enhancement (English): 83.3% [5/6] (Dept. of Arts)
- VAC-02 Value Addition (Yoga & Ayurveda): 75.0% [3/4] (Malaviya Bhawan)

OFFICIAL SIGNATORIES & ENDORSEMENT:
- Raj Yash (Section Administrator, Lead CR)
- Dr. Chinmoy Kumar Roy (Co-Incharge, Timetable)
- Prof. F.B. Singh (Incharge, Timetable Committee)
- Prof. H.K. Singh (Head & Dean, Faculty of Commerce)

REGISTRY AUTH CODE: 2026-COMM-SECE-ADMIN-AUTH
SYSTEM KEY: ${currentUser.email}
GENERATED AT: ${new Date().toLocaleString()}
STATUS: OFFICIAL SEAL VALID
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BHU_SecE_Attendance_Report_${currentUser.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Attendance dossier downloaded');
  };

  const handleVerifyTimetableSlot = (code: string, room: string) => {
    showToast(`Presence confirmed for ${code} in ${room}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-[#f2f2f7] select-none font-sans antialiased">
      {/* Persistent iOS Frosted Navigation Header */}
      <Header
        currentScreen={currentScreen}
        onOpenRadar={() => setIsRadarOpen(true)}
        onOpenNotifications={() => {
          setIsNotificationsOpen(true);
          setHasUnreadNotifications(false);
        }}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
        hasUnreadNotifications={hasUnreadNotifications}
        userRole={currentUser.role}
      />

      {/* Apple Dynamic Island Style Pill Toast */}
      {globalToast && (
        <div className="fixed top-20 left-4 right-4 z-50 flex justify-center pointer-events-none animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-[#1c1c1e]/95 text-white px-4 py-2.5 rounded-full border border-white/15 shadow-2xl backdrop-blur-2xl flex items-center gap-2.5 text-[13px] font-medium tracking-tight">
            <CheckCircle2 className="w-4 h-4 text-[#30d158] shrink-0" />
            <span>{globalToast}</span>
          </div>
        </div>
      )}

      {/* Main Screen Content */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-24 max-w-2xl mx-auto px-4">
        {currentScreen === 'live-qr' && (
          <LiveQrScreen
            presentCount={presentCount}
            totalStudents={totalStudents}
            onStudentCheckIn={handleStudentCheckIn}
            checkInList={checkInList}
            isSessionLocked={isSessionLocked}
            onToggleLock={() => {
              setIsSessionLocked(!isSessionLocked);
              showToast(isSessionLocked ? 'Session Unlocked' : 'Session Locked');
            }}
            onNavigateToScan={() => setCurrentScreen('scan')}
          />
        )}

        {currentScreen === 'scan' && (
          <ScanScreen
            isAttendanceConfirmed={isAttendanceConfirmed}
            onConfirmAttendance={handleConfirmAttendanceFromScan}
            onNavigateToLiveQr={() => setCurrentScreen('live-qr')}
          />
        )}

        {currentScreen === 'timetable' && (
          <TimetableScreen onVerifySlot={handleVerifyTimetableSlot} />
        )}

        {currentScreen === 'analytics' && (
          <AnalyticsScreen
            userRoll={currentUser.roll}
            onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
            onDownloadReport={handleDownloadReport}
          />
        )}
      </main>

      {/* Fixed Apple iOS Floating Bottom Tab Bar */}
      <BottomNav
        currentScreen={currentScreen}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
      />

      {/* iOS Modal Sheets */}
      <RadarModal isOpen={isRadarOpen} onClose={() => setIsRadarOpen(false)} />

      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onClear={() => {
          setHasUnreadNotifications(false);
          setIsNotificationsOpen(false);
          showToast('Notifications acknowledged');
        }}
      />

      <LeaveModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onSubmit={({ days }) => {
          showToast(`Application submitted: ${days} lecture exemption`);
        }}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={currentUser}
        onChangeRole={handleRoleChange}
        onUpdateProfile={(updated) => {
          setCurrentUser(updated);
          showToast('Profile updated');
        }}
        onOpenExport={() => setIsExportModalOpen(true)}
        presentCount={presentCount}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        adminEmail={currentUser.email}
      />
    </div>
  );
}
