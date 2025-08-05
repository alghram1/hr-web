// App.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './Pages/LandingPage';
import DashboardLayout from './Pages/DashboardLayout';
import Dashboard from './Pages/Dashboard';

import EmployeesPage from './Pages/Employee/EmployeesPage';
import EmployeeProfilePage from './Pages/Employee/EmployeeProfile/EmployeeProfilePage';

import GoalsPage from './Pages/Employee/EmployeeProfile/Tabs/Performance/Goals/GoalsPage';
import CreateGoalPage from './Pages/Employee/EmployeeProfile/Tabs/Performance/Goals/CreateGoalPage';
import EditWeightsModal from './Pages/Employee/EmployeeProfile/Tabs/Performance/Goals/EditWeightsModal';

import TaskManagerPage from './Pages/Tasks/TaskManagerPage';
import MyTasksTable from './Pages/Tasks/MyTask/MyTasksTable';
import CreateTaskPage from './Pages/Tasks/CreateTaskPage';

//import PerformancePage from './Pages/Performance/PerformancePage'; // 🔁 موجه ذكي حسب الدور
import PerformanceSummaryPage from './Pages/Performance/PerformanceSummaryPage'; // 🔁 موجه ذكي حسب الدور
import PerformanceTabNavigation from './Pages/Performance/PerformanceTabNavigation'; // 🔁 موجه ذكي حسب الدور
import GoalsEvaluationTab from './Pages/Performance/GoalsEvaluationTab'; // 🔁 موجه ذكي حسب الدور
import TaskReviewPage from './Pages/Performance/TaskReviewPage'; // 🔁 موجه ذكي حسب الدور
import PerformanceHeaderSection from './Pages/Performance/PerformanceHeaderSection'; // 🔁 موجه ذكي حسب الدور
import AttendanceReviewTab from './Pages/Performance/AttendanceReviewTab'; // 
import QualityOfWorkTab from './Pages/Performance/QualityOfWorkTab'; // 
import 'bootstrap/dist/css/bootstrap.min.css';
import variables from './Styles/variables.scss';
//المستندات
import EmployeeDocumentsPage from './Pages/Documents/DocumentEmployee/EmployeeDocumentsPage'
import AllEmployeesDocumentsPage from './Pages/Documents/DocumentEmployee/AllEmployeesDocumentsPage'
import CreateNewDocument from './Pages/Documents/DocumentEmployee/CreateNewDocument'

//الحضور والانصراف
import AttendancePage from './Pages/Attendance/AttendanceTab/AttendancePage'
import TimeAdjustmentsPage from './Pages/Attendance/EditTimeTab/TimeAdjustmentsPage'
import MyAttendance from './Pages/Attendance/MyAttendance'

// تعريف الاجازة
import LeavePolicySetup from './Pages/Leave/LeavePolicySetup'
import CompanyProfilePage from './Pages/Company/CompanyProfile/CompanyProfilePage'
import PermissionsManagementPage from './Pages/Permission/PermissionsManagementPage'
import PageManagementForDeveloper from './Pages/Permission/PageManagementForDeveloper'

//اختبار الدردشة  
import FirebaseTestPage from './FirebaseTestPage';
import ChatWorkspacePage from '../src/Pages/Chat/ChatWorkspacePage';
import ChatWindow from '../src/Pages/Chat/ChatWindow';
import { ChatProvider } from './contexts/ChatContext';

import AcceptInvitePage from './Pages/Auth/AcceptInvitePage';
function App() {
    return (
        <ChatProvider>
        <Routes>
            {/* 🔹 الصفحة الرئيسية */}
            <Route path="/" element={<LandingPage />} />
             {/*رابط الدعوة للموظف */}
            <Route path="/invite/:token" element={<AcceptInvitePage />} /> 
            {/* 🔹 لوحة المدير DashboardLayout تشمل الـ Sidebar والـ Topbar */}
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="employees" element={<EmployeesPage />} />
                
                <Route path="employees/:id" element={<EmployeeProfilePage />} />
                <Route path="Tasks/TaskManagerPage" element={<TaskManagerPage />} />
                <Route path="Tasks/MyTask/MyTasksTable" element={<MyTasksTable />} />
                <Route path="PerformanceSummaryPage" element={<PerformanceSummaryPage />} />  
                <Route path="PerformanceTabNavigation" element={<PerformanceTabNavigation />} />  
                <Route path="TaskReviewPage" element={<TaskReviewPage />} />  
                <Route path="PerformanceHeaderSection" element={<PerformanceHeaderSection />} />   
                <Route path="PerformanceTabNavigation" element={<PerformanceTabNavigation />} />  
                <Route path="GoalsEvaluationTab" element={<GoalsEvaluationTab />} />   
                <Route path="AttendanceReviewTab" element={<AttendanceReviewTab />} />   
                <Route path="QualityOfWorkTab" element={<QualityOfWorkTab />} />   


                <Route path="employee/:employeeId/documents" element={<EmployeeDocumentsPage />} />   
                <Route path="Documents/DocumentEmployee/AllEmployeesDocumentsPage" element={<AllEmployeesDocumentsPage />} />   
                <Route path="employee/:employeeId/documents/create" element={<CreateNewDocument />} />

                {/*<Route index element={<Navigate to="/dashboard/attendance" replace />} />*/}
                <Route path="attendance" element={<AttendancePage />} />
                <Route path="time-adjustments" element={<TimeAdjustmentsPage />} />
                <Route path="MyAttendance" element={<MyAttendance />} />
                <Route path="LeavePolicySetup" element={<LeavePolicySetup />} />
                <Route path="CompanyProfilePage" element={<CompanyProfilePage />} />
                <Route path="PermissionsManagementPage" element={<PermissionsManagementPage />} />
                <Route path="PageManagementForDeveloper" element={<PageManagementForDeveloper />} />
                    <Route path="chat" element={<ChatWorkspacePage />} />
                    <Route path="chat/:chatId" element={<ChatWindow />} />

            </Route>

            {/* 🔹 المهام */}
            <Route path="/Tasks/CreateTaskPage" element={<CreateTaskPage />} />

            {/* 🔹 الأهداف */}
            <Route path="/employees/Goals" element={<GoalsPage />} />
            <Route path="/employees/Goals/Create" element={<CreateGoalPage />} />
            <Route path="/employees/Goals/EditWeightsModal" element={<EditWeightsModal />} />

            <Route path="/firebase-test" element={<FirebaseTestPage />} />
            </Routes>
        </ChatProvider>
    );
}                                                                                                           

export default App;
