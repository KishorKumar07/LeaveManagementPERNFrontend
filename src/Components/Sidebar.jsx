import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaEnvelope, FaAddressBook, FaComments, FaUserPlus, FaUser, FaWpforms, FaBook, FaArrowDown,FaCalendarAlt,FaClock  } from 'react-icons/fa';
import { MdOutlinePendingActions } from 'react-icons/md';
import { useSelector } from 'react-redux';

function Sidebar() {
  const name = useSelector((state) => state.auth.name);
  const dept = useSelector((state) => state.auth.dept);
  const role = useSelector((state) => state.auth.role);
  const userImage = useSelector((state) => state.auth.userImage);

  const [activeLink, setActiveLink] = useState('');
  const [isAttendanceDropdownOpen, setAttendanceDropdownOpen] = useState(false);
  console.log(userImage);
  useEffect(() => {
    setActiveLink(`/${role}/dashboard`);
  }, [role]);

  const handleClick = (link) => {
    setActiveLink(link);
    if (link !== "/Employee/leavemanagement/applyleave" && link !== "/Employee/timesheet") {
      setAttendanceDropdownOpen(false);
    }
  };

  const toggleAttendanceDropdown = () => {
    setAttendanceDropdownOpen(!isAttendanceDropdownOpen);
  };

  return (
    <>
  <div className="w-60 "> 
      <div className="w-full p-2  text-lg text-blue">
       The Reciprocal Solutions
      </div>
      <div className="w-full px-3 py-6 flex gap-3 items-center justify-start shadow-top-bottom">
         <div>
         <div className="rounded-full flex items-center justify-center bg-gray-300 text-gray-600 m-auto " style={{ width: '50px', height: '50px' }}>
      {userImage ? (
          <img src={userImage} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) :  (
            <FaUser style={{ width: '40%', height: '40%' }} />
          )
        }

            </div>
        
         </div >
         <div className="flex flex-col items-start ">
             <p className="text-left text-lg">{name}</p>
             <p className="text-left text-vsm "style={{color:" #bfbfbf"}} >{dept}</p>
        </div>
      </div>
      <div>
      <div className="flex flex-col justify-between w-full   space-y-3  text-sbar text-scolor ">
      {role === 'Employee' &&
      <Link
        to={`/${role}/employee-dashboard`} 
        onClick={() => handleClick(`/${role}/employee-dashboard` )}
        className={`flex items-center gap-4 w-full py-3 rounded ${activeLink === `/${role}/employee-dashboard` ? 'bg-gray-100' : ''}`}
        
      >
        <FaHome style={{ color: activeLink === `/${role}/employee-dashboard` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/${role}/employee-dashboard` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Dashboard</span>
      </Link>
}
{role === 'Manager' &&
      <Link
        to={`/${role}/manager-dashboard`} 
        onClick={() => handleClick(`/${role}/manager-dashboard` )}
        className={`flex items-center gap-4 w-full py-3 rounded ${activeLink === `/${role}/manager-dashboard` ? 'bg-gray-100' : ''}`}
        
      >
        <FaHome style={{ color: activeLink === `/${role}/manager-dashboard` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/${role}/manager-dashboard` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Dashboard</span>
      </Link>
}

      {role === 'Admin' &&
<>
<Link
        to={`/${role}/admin-dashboard`} 
        onClick={() => handleClick(`/${role}/admin-dashboard` )}
        className={`flex items-center gap-4 w-full py-3 rounded ${activeLink === `/${role}/admin-dashboard` ? 'bg-gray-100' : ''}`}
        
      >
        <FaHome style={{ color: activeLink === `/${role}/admin-dashboard` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/${role}/admin-dashboard` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Dashboard</span>
      </Link>
        <Link
        to={`/Admin/fundamentals`}
        onClick={() => handleClick(`/Admin/fundamentals`)}
        className={`flex items-center gap-4 w-full py-3  rounded ${activeLink === `/Admin/fundamentals` ? 'bg-gray-100' : ''}`}
        >
        <FaBook style={{ color: activeLink === `/Admin/fundamentals` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/Admin/fundamentals` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Fundamentals</span>
        </Link></>
}

    {(role === 'Admin' ) &&
      <Link
        to={`/Admin/register-employee`}
        onClick={() => handleClick(`/Admin/register-employee`)}
        className={`flex items-center gap-4 w-full py-3  rounded ${activeLink === `/Admin/register-employee` ? 'bg-gray-100' : ''}`}
      >
        <FaUserPlus style={{ color: activeLink === `/Admin/register-employee` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/Admin/register-employee` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Register Employee</span>
      </Link>
    }


{(role === 'Manager') &&
      <Link
        to={`/Manager/register-employee`}
        onClick={() => handleClick(`/Manager/register-employee`)}
        className={`flex items-center gap-4 w-full py-3  rounded ${activeLink === `/Manager/register-employee` ? 'bg-gray-100' : ''}`}
      >
        <FaUserPlus style={{ color: activeLink === `/Manager/register-employee` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/Manager/register-employee` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Register Employee</span>
      </Link>
    }
      <Link
        to={`/${role}/tasks`} 
        onClick={() => handleClick(`/${role}/tasks`)}
        className={`flex items-center gap-4 w-full py-3   rounded ${activeLink === `/${role}/tasks` ? 'bg-gray-100' : ''}`}
      >
        <FaTasks style={{ color: activeLink === `/${role}/tasks` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px" }} />
        <span className={`ml-2 ${activeLink === `/${role}/tasks` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Tasks</span>
      </Link>

      <Link
        to={`/${role}/email`}
        onClick={() => handleClick(`/${role}/email`)}
        className={`flex items-center gap-4 w-full py-3  rounded ${activeLink === `/${role}/email` ? 'bg-gray-100' : ''}`}
      >
        <FaEnvelope style={{ color: activeLink === `/${role}/email` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px" }} />
        <span className={`ml-2 ${activeLink === `/${role}/email` ? 'text-blue' : ''}`}style={{position:"relative",left:"25px"}}>Email</span>
      </Link>

      <Link
        to={`/${role}/contacts`}
        onClick={() => handleClick(`/${role}/contacts`)}
        className={`flex items-center gap-4 w-full py-3  rounded ${activeLink ===`/${role}/contacts`? 'bg-gray-100' : ''}`}
      >
        <FaAddressBook style={{ color: activeLink === `/${role}/contacts` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px" }} />
        <span className={`ml-2 ${activeLink === `/${role}/contacts`? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Contacts</span>
      </Link>

      <Link
        to={`/${role}/chats`}
        onClick={() => handleClick(`/${role}/chats`)}
        className={`flex items-center gap-4 w-full py-3   rounded ${activeLink === `/${role}/chats`? 'bg-gray-100' : ''}`}
      >
        <FaComments style={{ color: activeLink === `/${role}/chats` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/${role}/chats` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Chats</span>
      </Link>


   {role === 'Manager' && <>
   <Link
        to={`/Manager/leavemanagement/pending`}
        onClick={() => handleClick(`/Manager/leavemanagement/pending`)}
        className={`flex items-center gap-4 w-full py-3  rounded ${activeLink === `/Manager/leavemanagement/pending` ? 'bg-gray-100' : ''}`}
      >
        <MdOutlinePendingActions  style={{ color: activeLink === `/Manager/leavemanagement/pending` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/Manager/leavemanagement/pending` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Leave Management</span>
      </Link>
      
      
      <Link
        to={`/Manager/manager-profile`}
        onClick={() => handleClick(`/Manager/manager-profile`)}
        className={`flex items-center gap-4 w-full py-3  rounded ${activeLink === `/Manager/manager-profile` ? 'bg-gray-100' : ''}`}
      >
        <FaUser style={{ color: activeLink === `/Manager/manager-profile` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/Manager/manager-profile` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Profile</span>
      </Link></>
      }

      {role === 'Employee' &&
      <>
     <div
          onClick={toggleAttendanceDropdown}
          className={`flex items-center gap-4 w-full py-3 rounded }`}
        >
          <FaWpforms
            style={{ color: activeLink === `/Employee/leavemanagement/applyleave` || activeLink === `/Employee/timesheet` ?  '#DAA520' : '#C8C8C8', position: 'relative', left: '25px' }}
          />
        <span className={`ml-2 ${ activeLink === `/Employee/leavemanagement/applyleave` || activeLink === `/Employee/timesheet` ? 'text-blue' : ''}`} style={{ cursor: "default", position: 'relative', left: '25px' }}>
            Attendance
          </span>

        
          <FaArrowDown className='relative left-5 '
            style={{
              color:activeLink === `/Employee/leavemanagement/applyleave` || activeLink === `/Employee/timesheet` ? '#DAA520' : '',
              transform: isAttendanceDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
        </div>
                
          {isAttendanceDropdownOpen && (
           
          <div className='text-sm relative left-2'> 

        <Link

        to={`/Employee/leavemanagement/applyleave`}
        onClick={() => handleClick(`/Employee/leavemanagement/applyleave`)}
        className={`flex items-center gap-4 w-full py-3  rounded ${activeLink === `/Employee/leavemanagement/applyleave` ? 'bg-gray-100' : ''}`}
        >
        <FaCalendarAlt  style={{ color: activeLink === `/Employee/leavemanagement/applyleave` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/Employee/leavemanagement/applyleave` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Leave Management</span>
       
        </Link>   

        <Link  

        to={`/Employee/timesheet`}
        onClick={() => handleClick(`/Employee/timesheet`)}
        className={`flex items-center gap-4 w-full py-3  rounded ${activeLink === `/Employee/timesheet` ? 'bg-gray-100' : ''}`}
        >
        <FaClock  style={{ color: activeLink === `/Employee/timesheet` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/Employee/timesheet` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Time Sheet</span>
       
        </Link> 
        
        </div>  

          )}

      <Link
        to={`/Employee/profile`}
        onClick={() => handleClick(`/Employee/profile`)}
        className={`flex items-center gap-4 w-full py-3  rounded ${activeLink === `/Employee/profile` ? 'bg-gray-100' : ''}`}
      >
        <FaUser style={{ color: activeLink === `/Employee/profile` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/Employee/profile` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Profile</span>
      </Link>
      
      </>
      }

{role === 'Admin' && 
<>
   <Link
        to={`/Admin/admin-profile`}
        onClick={() => handleClick(`/Admin/admin-profile`)}
        className={`flex items-center gap-4 w-full py-3  rounded ${activeLink === `/Admin/admin-profile` ? 'bg-gray-100' : ''}`}
      >
        <FaUser style={{ color: activeLink === `/Admin/admin-profile` ? '#DAA520' : '#C8C8C8' ,position:"relative",left:"25px"}} />
        <span className={`ml-2 ${activeLink === `/Admin/admin-profile` ? 'text-blue' : ''}`} style={{position:"relative",left:"25px"}}>Profile</span>
      </Link></>
      }
    
    </div>
      </div>
  </div>


    </>
  )
}


export default Sidebar