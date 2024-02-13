import { useState, useEffect } from 'react';
import ManagerLeaveManagementNavbar from "./ManagerLeaveManagementNavbar";
import OnLeaveBar from "../OnLeaveBarEmployee";
import { BsArrowRight } from "react-icons/bs";
import { useSelector,useDispatch } from 'react-redux';
import { setPending} from "../../redux/slice/authSlice" 

function PendingLeaves() {
  const [ndays, setNdays] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const dispatch = useDispatch();
  // const userEmail = useSelector((state) => state.auth.userEmail);
  const refId = useSelector((state) => state.auth.refId);

  useEffect(() => {
    const populateNdays = () => {
      const ndaysArray = Array.from({ length: 100 }, (_, i) => i + 1);
      setNdays(ndaysArray);
    };

    const fetchLeaveData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/leave-data-pending?managerRefId=${refId}&leaveStatus=Pending`);

        const data = await response.json();
        console.log('Server Response Data:', data);
        setLeaveData(data.leaveData);
        const pendingLeaveCount = data.leaveData.length;
        dispatch(setPending(pendingLeaveCount));
       
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };

    populateNdays();
    fetchLeaveData();
  }, []);

  
  const updateLeaveStatus = async (status, employee) => { 
    console.log("Leaveid:",employee.id);
    try {
      const response = await fetch(`http://localhost:3000/user/update-leave-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: employee.id ,leaveStatus: status }),
      });
  
      const data = await response.json();
      console.log('Leave Status Updated:', data);
  
   
    } catch (error) {


      console.error('Error updating leave status:', error);
    }
  };
  
  const handleApprove = (employee) => {
    updateLeaveStatus('Approved', employee);
     window.location.reload();
  };

  const handleReject = (employee) => {
    updateLeaveStatus('Rejected', employee);
    window.location.reload();
  };


  return (
    <div >
      <ManagerLeaveManagementNavbar />
      <div className="flex " style={{paddingTop:"100px"}}>
       <div className="flex flex-wrap gap-1  " style={{ maxWidth: '935px' }} >
          {leaveData.map((employee, index) => (
            <div className="mt-5 p-5 ml-5 shadow-leave-count bg-white flex flex-col rounded-md relative" style={{ width: '400px' }} key={index}>     
            <div className={`absolute top-0 left-0 h-4 w-4 ${employee.leaveAvailable <= 5 ? 'bg-red-500' : 'bg-green'} rounded-full`}></div>

              <div className="flex w-full items-center">
                <div className="w-full px-3 py-3 flex gap-3 justify-start">
                  <div>
                    <img className="w-11 h-11 rounded-full " src={employee.image} alt="Description" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-left text-lg">{employee.name}</p>
                    <p className="text-left text-vsm" style={{ color: " #bfbfbf" }}>{employee.department}</p>
                  </div>
                </div>
                <div> <p className="text-vsm text-black text-opacity-50" style={{ width: "75px" }}>{employee.appliedData}</p></div>
              </div>

              <section className="flex justify-evenly gap-10 mt-8 items-center">
                <section className="flex flex-col space-y-2 w-20 items-center">
                  <p>{new Date(employee.startDate).toLocaleString('en-us', { month: 'short' })}</p>
                  <select className="border rounded p-2 text-sbar" defaultValue={new Date(employee.startDate).getDate()}>
                      {ndays.map((day, index) => (
                        <option key={index} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>

                  <p className="text-sm text-black text-opacity-50">{new Date(employee.startDate).toLocaleString('en-us', { weekday: 'short' }).toUpperCase()}</p>
                </section>

                <section className="mt-6 flex flex-col items-center ">
                  <span className="text-xl">
                    <BsArrowRight style={{ width: '2em', height: '2em' }} />
                  </span>
                  <p className="text-sm text-black text-opacity-50">{employee.noOfDays} days </p>
                </section>

                <section className="flex flex-col space-y-2 w-20 items-center">
                  <p>{new Date(employee.endDate).toLocaleString('en-us', { month: 'short' })}</p>
                  <select className="border rounded p-2 text-sbar" defaultValue={new Date(employee.endDate).getDate()}>
                    {ndays.map((day, index) => (
                      <option key={index} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>

                  <p className="text-sm text-black text-opacity-50">{new Date(employee.endDate).toLocaleString('en-us', { weekday: 'short' }).toUpperCase()}</p>
                </section>
              </section>

              <section className='flex flex-col border-2 border-table m-5 rounded-md'>
                <p className="text-sbar border-b-2 border-table p-3">{employee.leaveType}</p>
                <p className="text-sm text-black text-opacity-50 p-3">{employee.reason}</p>
              </section>

              <section className='flex gap-2 mt-2 items-center ml-5'>
              <p className={`text-lg ${employee.leaveAvailable <= 5 ? 'text-red-500' : 'text-green'}`}>
                        {employee.leaveAvailable}
                      </p>
                <p className='text-sm'>Leaves Available</p>
              </section>

              <section className='flex gap-2 mt-4 items-center ml-11'>
              <button onClick={() => handleApprove(employee)} className="bg-blue text-white px-10 py-2 rounded-md text-sbar">Approve</button>
            <button onClick={() => handleReject(employee)} className="bg-white border-2 border-blue text-blue px-10 py-2 rounded-md text-sbar">Reject</button>
              </section>
            </div>
          ))}
        </div>

        <div ><OnLeaveBar /></div>
      </div>
    </div>
  );
}

export default PendingLeaves;
