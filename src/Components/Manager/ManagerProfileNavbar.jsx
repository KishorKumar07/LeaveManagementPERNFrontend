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
          activeLink === '/Manager/manager-profile'
            ? 'border-b-2 border-blue text-blue'
            : 'text-scolor'
        }`}
        to="/Manager/manager-profile"
        onClick={() => handleClick('/Manager/manager-profile')}
      >
       Profile
      </Link>
      <Link
        className={`py-5 px-10 cursor-pointer ${
          activeLink === '/Manager/team-members'
            ? 'border-b-2 border-blue text-blue'
            : 'text-scolor'
        }`}
        to="/Manager/team-members"
        onClick={() => handleClick('/Manager/team-members')}
      >
       Team Members 
      </Link>
      <Link
        className={`py-5 px-10 cursor-pointer ${
          activeLink === '/Manager/add-team-members'
            ? 'border-b-2 border-blue text-blue'
            : 'text-scolor'
        }`}
        to = "/Manager/add-team-members"
        onClick = {() => handleClick('/Manager/add-team-members')}      >
        Add Team Members
      </Link>
    </div>
  );
};

export default ManagerProfileNavbar;
