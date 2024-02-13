import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TokenExpirationWrapper from './TokenExpirationWrapper';
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import Register from './Pages/Register';
import EmployeeTimeSheet from "./Components/Employee/EmployeeTimeSheet";
import ManagerTimeSheet from "./Components/Manager/ManagerTimeSheet";
import AdminTimeSheet from "./Components/Admin/AdminTimeSheet";
// import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import LeaveApplication from './Components/Employee/LeaveApplication';
import LeaveStatus from './Components/Employee/LeaveStatus';
import ApplyPermission from './Components/Employee/ApplyPermission';
import Chats from "./Components/Employee/Chats";
import Contacts from './Components/Employee/Contacts';
import Email from './Components/Employee/Email';
import Tasks from './Components/Employee/Tasks';
import EmployeeProfile from './Components/Employee/EmployeeProfile';
// import ManagerDashboard from "./Components/Manager/ManagerDashboard";
import PendingLeaves from './Components/Manager/PendingLeaves';
import ApprovedLeaves from './Components/Manager/ApprovedLeaves';
import RejectedLeaves from './Components/Manager/RejectedLeaves';
import AdminProfile from './Components/Admin/AdminProfile';
import EmployeeList from './Components/Admin/EmployeeList';
import ManagerProfile from './Components/Manager/ManagerProfile';
import { setIsLoggedIn } from '../src/redux/slice/authSlice'; 
import TeamMembersList from './Components/Manager/TeamMembersList';
import AddTeamMembers from './Components/Manager/AddTeamMembers';

// import AdminDashboard from "./Components/Admin/AdminDashboard";
import Fundamentals from './Components/Admin/Fundamentals';


const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
 
  
  React.useEffect(() => {
    if (window.location.pathname === '/login' || window.location.pathname === '/register') {
      dispatch(setIsLoggedIn(false));
    }

  }, [dispatch]);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {!isLoggedIn ? (
          <div className="flex flex-col flex-1 h-full">
            <div className="bg-background h-full flex-1">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </div>
        ) : (
          <>
            <TokenExpirationWrapper>
            <div className="flex flex-col flex-1 h-full " style={{ marginLeft: '240px'  }}>
            <div className="sidebar-container" style={{ position: 'fixed', left: 0, top: 0, height: '100vh' }}>
              <Sidebar />
            </div>
              <div className="bg-white"  style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}  > <Header/></div>
              <div  className="bg-background px-5 pt-5 " >
                <Routes >
                 
                    <>
                      
                      <Route path={`/${role}/profile`} element={<EmployeeProfile />} />
                      <Route path={`/${role}/employee-dashboard`} element={<EmployeeTimeSheet/>} />
                      <Route path={`/${role}/leavemanagement/applyleave`} element={<LeaveApplication />} />
                      <Route path={`/${role}/leavemanagement/leavestatus`} element={<LeaveStatus />} />
                      <Route path={`/${role}/leavemanagement/applypermission`} element={<ApplyPermission />} />
                  
                      <Route path={`/${role}/manager-dashboard`} element={< ManagerTimeSheet />} />
                      <Route path={`/${role}/manager-profile`} element={<ManagerProfile />} />
                      <Route path={`/${role}/team-members`} element={<TeamMembersList />} />
                      <Route path={`/${role}/add-team-members`} element={<AddTeamMembers/>} />
                      <Route path={`/${role}/leavemanagement/pending`} element={<PendingLeaves />} />
                      <Route path={`/${role}/leavemanagement/approved`} element={<ApprovedLeaves />} />
                      <Route path={`/${role}/leavemanagement/rejected`} element={<RejectedLeaves />} />


                      <Route path={`/${role}/admin-dashboard`} element={<AdminTimeSheet  />} />
                      <Route path={`/${role}/employeesList`} element={<EmployeeList/>} />
                      <Route path={`/${role}/fundamentals`} element={<Fundamentals />} />
                      <Route path={`/${role}/admin-profile`} element={<AdminProfile />} />
                      <Route path={`/${role}/register-employee`} element={<Register />} />
                      
                      <Route path={`/${role}/chats`} element={<Chats />} />
                      <Route path={`/${role}/contacts`} element={<Contacts />} />
                      <Route path={`/${role}/email`} element={<Email />} />
                      <Route path={`/${role}/tasks`} element={<Tasks />} />

                      <Route path={`/${role}/timesheet`} element={<EmployeeTimeSheet />} />

                    </>
                 
                </Routes>
              </div>
            </div>
            </TokenExpirationWrapper>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
