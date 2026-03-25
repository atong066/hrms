import { HashRouter, Route, Routes } from "react-router";
import { Login } from "./pages/login";
import { LoginV2 } from "./pages/login_v2";
import { Dashboard } from "./pages/dashboard";
import { EmployeeOverview } from "./pages/employee";
import { ProtectedRoute, PublicRoute } from "./ProtectedRoute";
import { AttendanceOverview } from "./pages/attendance";
import { PayrollOverview } from "./pages/payroll";
import { PerformanceOverview } from "./pages/performance";
import { RecruitmentOverview } from "./pages/recruitment";
import { SettingsOverview } from "./pages/settings";
import { LeaveOverview } from "./pages/leave";
import { DepartmentsOverview } from "./pages/departments";
import { SchedulingOverview } from "./pages/scheduling";
import { DocumentsOverview } from "./pages/documents";
import { RequestsOverview } from "./pages/requests";
import { TrainingOverview } from "./pages/training";
import { AnnouncementsOverview } from "./pages/announcements";
import { AssetsOverview } from "./pages/assets";
import { ReportsOverview } from "./pages/reports";
import { CalendarOverview } from "./pages/calendar";
import { FallbackRoute, LogoutRoute } from "./ProtectedRoute";


function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Publicasd */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/login-v2" element={<LoginV2 />} />
        </Route>

        <Route path="/logout" element={<LogoutRoute />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<EmployeeOverview />} />
          <Route path="/attendance" element={<AttendanceOverview />} />
          <Route path="/calendar" element={<CalendarOverview />} />
          <Route path="/leave" element={<LeaveOverview />} />
          <Route path="/payroll" element={<PayrollOverview />} />
          <Route path="/performance" element={<PerformanceOverview />} />
          <Route path="/recruitment" element={<RecruitmentOverview />} />
          <Route path="/departments" element={<DepartmentsOverview />} />
          <Route path="/scheduling" element={<SchedulingOverview />} />
          <Route path="/documents" element={<DocumentsOverview />} />
          <Route path="/requests" element={<RequestsOverview />} />
          <Route path="/training" element={<TrainingOverview />} />
          <Route path="/announcements" element={<AnnouncementsOverview />} />
          <Route path="/assets" element={<AssetsOverview />} />
          <Route path="/reports" element={<ReportsOverview />} />
          <Route path="/settings" element={<SettingsOverview />} />
        </Route>

        <Route path="*" element={<FallbackRoute />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
