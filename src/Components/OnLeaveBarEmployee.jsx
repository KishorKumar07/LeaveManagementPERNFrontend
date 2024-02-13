import { useState, useEffect } from 'react';
import { FaUserAlt,FaUser } from 'react-icons/fa';
import {useSelector} from 'react-redux';

function OnLeaveBar() {
  const [leaveData, setLeaveData] = useState({ today: [], thisWeek: [], nextWeek: [] });
  const department = useSelector((state) => state.auth.dept);
 

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
  
    const fetchLeaveData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/leave-data-range?department=${department}`, { signal });
        const data = await response.json();
        console.log('Server Response Data:', data);
     
  
        setLeaveData(data.leaveData);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch request was aborted');
        } else {
          console.error('Error fetching leave data:', error);
        }
      }
    };
  
    fetchLeaveData();
  
    // Cleanup function
    return () => abortController.abort();
  }, [department]);
  

  return (
    <div className="flex flex-col mt-5 px-5 py-7 ml-5 bg-white shadow-leave-count rounded-md fixed right-0" style={{ width: '320px', height: '561px', overflowY: 'auto' }}>
     <div className="flex gap-5 px-5 ">
      <FaUserAlt className="mt-1"/>
     <p> Who&apos;s on Leave </p>

      </div>

      <div className="flex flex-col mt-7">
        <p className="text-form text-vsm ml-3">Today</p>
        {leaveData.today.map((employee, index) => (
          <div key={index} className="w-full px-3 py-3 flex gap-3 items-center justify-start">
                  <div className="rounded-full flex items-center justify-center bg-gray-300 text-gray-600  " style={{ width: '50px', height: '50px' }}>
      {employee.image ? (
          <img src={employee.image} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) :  (
            <FaUser style={{ width: '40%', height: '40%' }} />
          )
        }

            </div>
         <div className="flex flex-col items-start ">
             <p className="text-left text-lg">{employee.name}</p>
             <p className="text-left text-vsm "style={{color:" #bfbfbf"}} >{employee.department}</p>
        </div>
      </div>
           
        ))}
      </div>

      <div className="flex flex-col mt-7">
        <p className="text-form text-vsm ml-3">This week</p>
        {leaveData.thisWeek.map((employee, index) => (
          <div key={index} className="w-full px-3 py-3 flex gap-3 items-center justify-start">
               <div className="rounded-full flex items-center justify-center bg-gray-300 text-gray-600  " style={{ width: '50px', height: '50px' }}>
      {employee.image ? (
          <img src={employee.image} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) :  (
            <FaUser style={{ width: '40%', height: '40%' }} />
          )
        }

            </div>
         <div className="flex flex-col items-start ">
         <p className="text-left text-lg">{employee.name}</p>
             <p className="text-left text-vsm "style={{color:" #bfbfbf"}} >{employee.department}</p>
        </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col mt-7">
        <p className="text-form text-vsm ml-3">Next week</p>
        {leaveData.nextWeek.map((employee, index) => (
          <div key={index} className="w-full px-3 py-3 flex gap-3 items-center justify-start">
             <div className="rounded-full flex items-center justify-center bg-gray-300 text-gray-600 " style={{ width: '50px', height: '50px' }}>
      {employee.image ? (
          <img src={employee.image} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) :  (
            <FaUser style={{ width: '40%', height: '40%' }} />
          )
        }

            </div>
         <div className="flex flex-col items-start ">
         <p className="text-left text-lg">{employee.name}</p>
             <p className="text-left text-vsm "style={{color:" #bfbfbf"}} >{employee.department}</p>
        </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default OnLeaveBar;
