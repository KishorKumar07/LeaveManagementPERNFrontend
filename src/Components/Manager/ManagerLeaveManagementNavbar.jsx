import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useSelector,} from 'react-redux';


const ManagerLeaveManagementNavbar = () => {
  const [activeLink, setActiveLink] = useState('/Manager/leavemanagement/pending');
  const [approvedLeaveCount, setApprovedLeaveCount] = useState('');
  const [rejectedLeaveCount, setRejectedLeaveCount] = useState('');
  const pending =  useSelector((state) => state.auth.pending);
  // const userEmail = useSelector((state) => state.auth.userEmail);
  const refId = useSelector((state) => state.auth.refId);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  
      const fetchApprovedLeaveData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/user/leave-data-approved?managerRefId=${refId}&leaveStatus=Approved`);
  
          const data = await response.json();
          console.log('Server Response Data:', data);
         
          setApprovedLeaveCount (data.leaveData.length);
         
         
        } catch (error) {
          console.error('Error fetching leave data:', error);
        }
      };
  

      const fetchRejectedLeaveData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/user/leave-data-rejected?managerRefId=${refId}&leaveStatus=Rejected`);
  
          const data = await response.json();
          console.log('Server Response Data:', data);
          
        setRejectedLeaveCount(data.leaveData.length);
         
         
        } catch (error) {
          console.error('Error fetching leave data:', error);
        }
      };

      fetchApprovedLeaveData();
      fetchRejectedLeaveData();
    }, []);


  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
  
    <div className="flex text-sbar text-scolor shadow-top-bottom mt-5 relative bg-white" style={{ position: 'fixed', left:"-20px", width: '1300px' ,marginLeft:"260px"}} >
      <Link
        className={`py-5 px-10 cursor-pointer ${
          activeLink === '/Manager/leavemanagement/pending'
            ? 'border-b-2 border-blue text-blue'
            : 'text-scolor'
        }`}
        to="/Manager/leavemanagement/pending"
        onClick={() => handleClick('/Manager/leavemanagement/pending')}
      >
        Pending ({pending})
      </Link>
      <Link
        className={`py-5 px-10 cursor-pointer ${
          activeLink === '/Manager/leavemanagement/approved'
            ? 'border-b-2 border-blue text-blue'
            : 'text-scolor'
        }`}
        to="/Manager/leavemanagement/approved"
        onClick={() => handleClick('/Manager/leavemanagement/approved')}
      >
        Approved ({approvedLeaveCount}) 
      </Link>
      <Link
        className={`py-5 px-10 cursor-pointer ${
          activeLink === '/Manager/leavemanagement/rejected'
            ? 'border-b-2 border-blue text-blue'
            : 'text-scolor'
        }`}
        to="/Manager/leavemanagement/rejected"
        onClick={() => handleClick('/Manager/leavemanagement/rejected')}
      >
        Rejected ({rejectedLeaveCount})
      </Link>
    </div>
  );
};

export default ManagerLeaveManagementNavbar;
