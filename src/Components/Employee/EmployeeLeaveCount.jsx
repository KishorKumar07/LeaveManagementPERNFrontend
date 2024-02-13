
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


function EmployeeLeaveCount() {
  
  const email = useSelector((state) => state.auth.userEmail);
  const refId = useSelector((state) => state.auth.refId);
  const totalAvailable = useSelector((state) => state.auth.leaveCount);
  const [leaveCounts, setLeaveCounts] = useState({
    available: 0,
    taken: 0,
    thisMonth: 0,
  });

  const updateLeaveAvailable = async (newLeaveAvailable) => {
    try {
      const response = await fetch('http://localhost:3000/user/update-leave-available', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refId,
          leaveAvailable: newLeaveAvailable,
        }),
      });
  
      const responseData = await response.json();
  
      if (responseData.success) {
        console.log('Leave available updated successfully');
      } else {
        console.error('Failed to update leave available');
      }
    } catch (error) {
      console.error('Error updating leave available:', error);
    }
  };
  

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/leave-data-count?refId=${refId}`);
        const responseData = await response.json();

        if (responseData.success && Array.isArray(responseData.leaveData)) {
          const leaveData = responseData.leaveData;

          
          let totalTaken = 0;
          let thisMonthTaken = 0;

          leaveData.forEach((leave) => {
            totalTaken += leave.noOfDays;

            const startDate = new Date(leave.startDate);
            const currentDate = new Date();

            if (
              startDate.getMonth() === currentDate.getMonth() &&
              startDate.getFullYear() === currentDate.getFullYear()
            ) {
              thisMonthTaken += leave.noOfDays;
            }
          });

          const avail = totalAvailable - totalTaken;

          // Update leaveAvailable in the backend
          updateLeaveAvailable(avail);

          
          setLeaveCounts({
            available: avail < 0 ? 0 : avail,
            taken: totalTaken,
            thisMonth: thisMonthTaken,
          });
        } else {
          console.error('Invalid response format:', responseData);
        }
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };

    fetchLeaveData();
  }, [email]);




  return (
    <div className="flex mt-5 px-5  py-7  bg-white shadow-leave-count inline-flex rounded-md pr-10">
      <div className="flex gap-10 border-r-2 border-solid border-gray-300 px-60">
        <p>{leaveCounts.available}</p>
        <p>Leave Available</p>
      </div>
      <div className="flex gap-10 border-r-2 border-gray-300 px-60">
        <p>{leaveCounts.taken}</p>
        <p>Leave Taken</p>
      </div>
      <div className="flex gap-10  border-gray-300 px-70">
        <p>{leaveCounts.thisMonth}</p>
        <p>This Month</p>
      </div>
    </div>
  );
}

export default EmployeeLeaveCount;
