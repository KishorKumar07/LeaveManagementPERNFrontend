import ManagerLeaveManagementNavbar from "./ManagerLeaveManagementNavbar";
import { useEffect,useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { setRejected} from "../../redux/slice/authSlice" 


function ApprovedLeaves() {
  const [leaveData, setLeaveData] = useState([]);
  const dispatch = useDispatch();
  // const userEmail = useSelector((state) => state.auth.userEmail);
  const refId = useSelector((state) => state.auth.refId);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/leave-data-rejected?managerRefId=${refId}&leaveStatus=Rejected`);

        const data = await response.json();
        console.log('Server Response Data:', data);
        setLeaveData(data.leaveData);
        const rejectedLeaveCount = data.leaveData.length;
        dispatch(setRejected(rejectedLeaveCount));
       
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };

    fetchLeaveData();
  }, []);

 

  let cellStyle = {
    padding: '1rem',
    fontSize:'15px',
    border: '2px solid #E4E5E8',
    textAlign: 'center',
    color:  '#747474' 
  };

  let firstCellStyle = {
    padding: '1rem',
    fontSize:'15px',
    border: '0.01px solid #E4E5E8',
    display:"flex",
    gap:"2",
    alignItems:"center"
  };

  return (
    <div>
      <ManagerLeaveManagementNavbar />
      <div className="flex gap-2 pt-20">
      <div className="overflow-x-auto">
      <table className="w-full mt-5 p-5 ml-5 mb-5 shadow-leave-count bg-white rounded-md" style={{ width: '876px' }}>
        <thead>
          <tr>
            <th className="p-4 border-2 border-table text-tableHead text-form">Employee Name</th>
            <th className="p-4 border-2 border-table text-tableHead text-form">Role</th>
            <th className="p-4 border-2 border-table text-tableHead text-form">Leave Type</th>
            <th className="p-4 border-2 border-table text-tableHead text-form">From</th>
            <th className="p-4 border-2 border-table text-tableHead text-form">To</th>
            <th className="p-4 border-2 border-table text-tableHead text-form">Total Days</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map((employee, index) => (
            <tr key={index} >
             
              <td style={firstCellStyle} >
              <div className="pr-3">
                    <img className="w-11 h-11 rounded-full " src={employee.image} alt="Description" />
                  </div>
                {employee.name}
              </td>
              <td style={cellStyle}>{employee.department}</td>
              <td style={cellStyle}>{employee.leaveType}</td>
              <td style={cellStyle}>{employee.startDate}</td>
              <td style={cellStyle}>{employee.endDate}</td>
              <td style={cellStyle}>{employee.noOfDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div></div>
  )
}

export default ApprovedLeaves;




