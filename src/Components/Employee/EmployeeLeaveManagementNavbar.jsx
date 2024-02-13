import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmployeeLeaveManagementNavbar = () => {
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex text-sbar text-scolor shadow-top-bottom mt-6 relative bg-white" style={{ position: 'fixed', left:"-20px", width: '1300px' ,marginLeft:"260px",zIndex: '9999'}}>
      <Link
        className={`py-5 px-10 cursor-pointer ${
          activeLink === '/Employee/leavemanagement/applyleave'
            ? 'border-b-2 border-blue text-blue'
            : 'text-scolor'
        }`}
        to="/Employee/leavemanagement/applyleave"
        onClick={() => handleClick('/Employee/leavemanagement/applyleave')}
      >
        Apply Leave
      </Link>
      <Link
        className={`py-5 px-10 cursor-pointer ${
          activeLink === '/Employee/leavemanagement/applypermission'
            ? 'border-b-2 border-blue text-blue'
            : 'text-scolor'
        }`}
        to="/Employee/leavemanagement/applypermission"
        onClick={() => handleClick('/Employee/leavemanagement/applypermission')}
      >
        Apply Permission
      </Link>
      <Link
        className={`py-5 px-10 cursor-pointer ${
          activeLink === '/Employee/leavemanagement/leavestatus'
            ? 'border-b-2 border-blue text-blue'
            : 'text-scolor'
        }`}
        to="/Employee/leavemanagement/leavestatus"
        onClick={() => handleClick('/Employee/leavemanagement/leavestatus')}
      >
        Leave Status
      </Link>
    </div>
  );
};

export default EmployeeLeaveManagementNavbar;
