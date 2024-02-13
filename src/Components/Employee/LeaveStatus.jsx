import EmployeeLeaveManagementNavbar from "./EmployeeLeaveManagementNavbar";
import OnLeaveBar from "../OnLeaveBarEmployee";
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';

function LeaveStatus() {

  const [rowData, setRowData] = useState([]);
  // const userEmail = useSelector((state) => state.auth.userEmail);
  const refId = useSelector((state) => state.auth.refId);
  useEffect(() => {
  
    fetchLeaveData(refId );
  }, []);

  const fetchLeaveData = async (refId )  => {
    try {
      const response = await fetch(`http://localhost:3000/user/leave-data?refId=${refId }`); 
      const data = await response.json();

      if (data.success) {
        setRowData(data.leaveData);
        console.log(data.leaveData);
      } else {
        console.error('Failed to fetch leave data');
      }
    } catch (error) {
      console.error('Error fetching leave data:', error);
    }
  };


  return (
    <div>
      <EmployeeLeaveManagementNavbar />
      <div className="flex">
        <div style={{marginTop:"90px"}}> 
        
          <div className="flex gap-2 mt-4">
          <table className="w-full   px-10  shadow-leave-count bg-white rounded-md " style={{ width: '898px' }}>

              <thead>
                <tr>
                  {["Leave type", "From", "To", "Total Days", "Leave Status"].map((header, index) => (
                    <th key={index} className="px-4 py-2 border-2 border-table text-tableHead text-form bg-darkblue text-white">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {rowData.map((leave, rowIndex) => {
                
                  let cellStyle = {
                    padding: '1rem',
                    fontSize:'15px',
                    border: '2px solid #E4E5E8',
                    textAlign: 'center',
                    color: '#747474' ,
                  };
                  let cellStyle1 = {
                    padding: '1rem',
                    fontSize:'15px',
                    border: '2px solid #E4E5E8',
                    textAlign: 'center',
                    
                  };
                  let cellStyle2= {
                    padding: '1rem',
                    fontSize:'15px',
                    border: '2px solid #E4E5E8',
                    textAlign: 'center',
                    color:'',
                  };
                  
                    if (leave.leaveStatus === "Pending") {
                      cellStyle2.color = 'goldenrod';
                    } else if (leave.leaveStatus === "Approved") {
                      cellStyle2.color = '#22dd22';
                    } else if (leave.leaveStatus === "Rejected") {
                      cellStyle2.color = 'red';
                    }
                 
                    return (
                  <tr key={rowIndex}>
                  <td style={cellStyle}>{leave.leaveType}</td>
                  <td style={cellStyle}>{leave.startDate}</td>
                  <td style={cellStyle}>{leave.endDate}</td>
                  <td style={cellStyle1}>{leave.noOfDays}</td>
                  <td style={cellStyle2}> {leave.leaveStatus} </td>
                </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{marginTop:"90px"}}>
          <OnLeaveBar />
        </div>
      </div>
    </div>
  );
}

export default LeaveStatus;
