import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
   
    refId: '',
    managerRefId: '',
    role: '',
    name: '',
    userImage: '',
    userEmail: '',
    userPassword: '',
    dept: '',
    teamLeadName: '',
    teamLeadEmail: '',
    pending: '0',
    approved: '0',
    rejected: '0',
    employeeRoleList: [],
    departmentList: [],
    leaveCount: 0,
    workingHours: 0,
   
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
   
    setRefId: (state, action) => {
      state.refId = action.payload;
    },
    setManagerRefId: (state, action) => {
      state.managerRefId = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setUserPassword: (state, action) => {
      state.userPassword = action.payload;
    },
    setDept: (state, action) => {
      state.dept = action.payload;
    },
    setTeamLeadName: (state, action) => {
      state.teamLeadName = action.payload;
    },
    setTeamLeadEmail: (state, action) => {
      state.teamLeadEmail = action.payload;
    },
    setPending: (state, action) => {
      state.pending = action.payload;
    },
    setApproved: (state, action) => {
      state.approved = action.payload;
    },
    setRejected: (state, action) => {
      state.rejected = action.payload;
    },
    setEmployeeRoleList: (state, action) => {
      state.employeeRoleList = action.payload;
    },
    setDepartmentList: (state, action) => {
      state.departmentList = action.payload;
    },
    setLeaveCount: (state, action) => {
      state.leaveCount = action.payload;
    },
    setWorkingHours : (state, action) => {
      state.workingHours = action.payload;
    },
  },
});

export const {
  setIsLoggedIn,
  setRefId,
  setManagerRefId,
  setRole,
  setName,
  setUserImage,
  setUserEmail,
  setUserPassword,
  setDept,
  setTeamLeadName,
  setTeamLeadEmail,
  setPending,
  setApproved,
  setRejected,
  setEmployeeRoleList,
  setDepartmentList,
  setLeaveCount,
  setWorkingHours
} = authSlice.actions;

export default authSlice.reducer;
