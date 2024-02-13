import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const ManagerProfileNavbar = () => {
 
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(window.location.pathname);  
    }, []);

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex text-sbar text-scolor shadow-top-bottom mt-6 relative bg-white" style={{ position: 'fixed', left:"-20px", width: '1300px' ,marginLeft:"260px",zIndex: '1'}}>
      <Link
        className={`py-5 px-10 cursor-pointer ${
          activeLink === '/Admin/admin-profile'
            ? 'border-b-2 border-blue text-blue'
            : 'text-scolor'
        }`}
        to="/Admin/admin-profile"
        onClick={() => handleClick('/Admin/admin-profile')}
      >
       Profile
      </Link>
      <Link
        className={`py-5 px-10 cursor-pointer ${
          activeLink === '/Admin/employeesList'
            ? 'border-b-2 border-blue text-blue'
            : 'text-scolor'
        }`}
        to="/Admin/employeesList"
        onClick={() => handleClick('/Admin/employeesList')}
      >
       Employees List
      </Link>
  
    </div>
  );
};

export default ManagerProfileNavbar;
