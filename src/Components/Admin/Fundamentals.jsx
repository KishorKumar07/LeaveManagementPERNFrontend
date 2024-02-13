import { useState, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { setEmployeeRoleList, setDepartmentList ,setLeaveCount,setWorkingHours} from '../../redux/slice/authSlice';
import { useSelector, useDispatch } from 'react-redux';

function Fundamentals() {
  const [isRolesDialogOpen, setIsRolesDialogOpen] = useState(false);
  const [isDepartmentsDialogOpen, setIsDepartmentsDialogOpen] = useState(false);
  const [newRoles, setNewRoles] = useState('');
  const [newDepartments, setNewDepartments] = useState('');
  const [currentRoles, setCurrentRoles] = useState([]);
  const [currentDepartments, setCurrentDepartments] = useState([]);

  const employeeRoleList = useSelector((state) => state.auth.employeeRoleList);
  const departmentList = useSelector((state) => state.auth.departmentList);
  const leaveCount = useSelector((state) => state.auth.leaveCount);
  const workingHours = useSelector((state) => state.auth.workingHours);
          
  
  const handleLeaveCountChange = (e) => {
   
    dispatch(setLeaveCount(e.target.value));
  };

  const handleWorkingHoursChange = (e) => {
   
    dispatch(setWorkingHours(e.target.value));
  };

 
  console.log("departmentList:",departmentList);
  const dispatch = useDispatch();
  

  useEffect(() => {
    setCurrentRoles([...(employeeRoleList ?? [])]);
    setCurrentDepartments([...(departmentList ?? [])]);
  }, [isRolesDialogOpen, isDepartmentsDialogOpen, employeeRoleList, departmentList]);

  const openRolesDialog = () => {
    setIsRolesDialogOpen(true);
  };

  const openDepartmentsDialog = () => {
    setIsDepartmentsDialogOpen(true);
  };

  const closeRolesDialog = () => {
    setIsRolesDialogOpen(false);
    setCurrentRoles([]);
  };

  const closeDepartmentsDialog = () => {
    setIsDepartmentsDialogOpen(false);
    setCurrentDepartments([]);
  };

  const handleRoleInputChange = (e) => {
    setNewRoles(e.target.value);
  };

  const handleDepartmentInputChange = (e) => {
    setNewDepartments(e.target.value);
  };

  const handleRoleAdd = (e) => {
    if (e.key === 'Enter') {
      setCurrentRoles([...currentRoles, newRoles.trim()]);
      setNewRoles('');
    }
  };

  const handleDepartmentAdd = (e) => {
    if (e.key === 'Enter') {
      setCurrentDepartments([...currentDepartments, newDepartments.trim()]);
      setNewDepartments('');
    }
  };

  const handleRoleDelete = (index) => {
    const updatedRoles = [...currentRoles];
    updatedRoles.splice(index, 1);
    setCurrentRoles(updatedRoles);
  };

  const handleDepartmentDelete = (index) => {
    const updatedDepartments = [...currentDepartments];
    updatedDepartments.splice(index, 1);
    setCurrentDepartments(updatedDepartments);
  };

  const addRoles = () => {
    const updatedRolesList = [ ...currentRoles];
    dispatch(setEmployeeRoleList(updatedRolesList));
    setCurrentRoles([]);
    closeRolesDialog();
  };

  const addDepartments = () => {
    const updatedDepartmentsList = [...currentDepartments];
    dispatch(setDepartmentList(updatedDepartmentsList));
    setCurrentDepartments([]);
    closeDepartmentsDialog();
  };


  return (
    <div className="flex h-screen justify-center items-center">
      <div style={{ width: '500px', height: '500px' }} className="m-auto p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center">Fundamentals</h2>
        <div className="flex mt-10 justify-center items-center">
          <div className="flex flex-col mt-1" style={{ gap: "50px" }}>
            <p className="flex justify-end">Roles</p>
            <p className="flex justify-end">Departments</p>
            <p className="flex justify-end">Leave Count</p>
            <p className="flex justify-end">Working Hours</p>
          </div>
          <section className="flex gap-4 text-gray-400">
            <div className="flex flex-col  gap-10 ml-10">
              <div className="flex  gap-10">
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  id="role"
                >
                  {employeeRoleList && employeeRoleList.map((r, index) => (
                    <option key={index} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-10">
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  id="department"
                >
                  {departmentList && departmentList.map((r, index) => (
                    <option key={index} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
               <input
                  type="text"
                  className="p-1 shadow-prof border rounded-md"
                  value={leaveCount}
                  onChange={handleLeaveCountChange}
                />
                <div>
        {/* <button onClick={handleIncrement}>▲</button>
        <button onClick={handleDecrement}>▼</button> */}
      </div>
              </div>

              <div>
               <input
                  type="text"
                  className="p-1 shadow-prof border rounded-md"
                  value={workingHours}
                  onChange={handleWorkingHoursChange}
                />
              
              </div>
              
            </div>
            <div className="flex flex-col mt-2" style={{ gap: "60px" }}>
              <MdModeEdit onClick={openRolesDialog} />
              <MdModeEdit onClick={openDepartmentsDialog} />
           
            </div>
          </section>
        </div>
      </div>

         
            {isRolesDialogOpen && (
        <div className="fixed top-0 left-60 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg " style={{ width: "500px" }}>
            <h3 className="text-lg font-semibold mb-2 ">Add Roles</h3>
            <textarea
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Type the roles "
              value={newRoles}
              onChange={handleRoleInputChange}
              onKeyDown={handleRoleAdd}
            />
            <div className="flex flex-wrap gap-2 mb-5  ">
              {currentRoles.map((role, index) => (
                <div
                  key={index}
                  className="bg-blue-200 p-2 rounded-md flex items-center shadow-prof1 w-fit rounded"
                >
                  {role}
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={() => handleRoleDelete(index)}
                  >
                    &#10006;
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-center justify-center">
              <button className="bg-blue text-white px-4 py-2 rounded-md text-sm" onClick={addRoles}>
                Add Roles
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 text-sm" onClick={closeRolesDialog}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDepartmentsDialogOpen && (
        <div className="fixed top-0 left-60 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg " style={{ width: "500px" }}>
            <h3 className="text-lg font-semibold mb-2 ">Add Departments</h3>
            <textarea
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Type the departments"
              value={newDepartments}
              onChange={handleDepartmentInputChange}
              onKeyDown={handleDepartmentAdd}
            />
            <div className="flex flex-wrap gap-2 mb-5  ">
              {currentDepartments.map((department, index) => (
                <div
                  key={index}
                  className="bg-blue-200 p-2 rounded-md flex items-center shadow-prof1 w-fit rounded"
                >
                  {department}
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={() => handleDepartmentDelete(index)}
                  >
                    &#10006;
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-center justify-center">
              <button className="bg-blue text-white px-4 py-2 rounded-md text-sm" onClick={addDepartments}>
                Add Departments
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 text-sm" onClick={closeDepartmentsDialog}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fundamentals;

