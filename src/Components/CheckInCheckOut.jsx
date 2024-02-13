import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import { AiOutlineCloseCircle, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Clock from '../Components/Clock';

const CheckInCheckOut = ({ setIsCheckInOutVisible }) => {
  const email = useSelector((state) => state.auth.userEmail);
  const [checkedInTime, setCheckedInTime] = useState(null);
  const [checkedOutTime, setCheckedOutTime] = useState(null);
  const workingHours = useSelector((state) => state.auth.workingHours);
  const refId = useSelector((state) => state.auth.refId);

  useEffect(() => {
   
    fetchAttendanceData();
    console.log("hi");
  }, []);


   const fetchAttendanceData = async () => {
    try {
      const response = await fetch('http://localhost:3000/attendance/getCheckInCheckOut', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data:",data);
        setCheckedInTime(data?.checkInTime || null);
        setCheckedOutTime(data?.checkOutTime || null);
      } else {
        throw new Error(`Failed to fetch attendance: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching attendance:', error.message);
    }
  };


const handleCheckIn = async () => {
  const currentTime = new Date();
  const formattedTime = formatDateTime(currentTime);

  setCheckedInTime(formattedTime);
 
    console.log('Sending data:', email, formattedTime);
  
  
  try {
    const response = await fetch('http://localhost:3000/attendance/updateCheckIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refId,
        userEmail: email,
        checkInTime:formattedTime,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update attendance: ${response.statusText}`);
    }

  
  } catch (error) {
    console.error('Error updating attendance:', error.message);
    
  }
};

const handleCheckOut = async () => {
  const currentTime = new Date();
  const formattedTime = formatDateTime(currentTime);

  setCheckedOutTime(formattedTime);
  console.log('Sending data:', email, formattedTime);
  
  try {
    const response = await fetch('http://localhost:3000/attendance/updateCheckOut', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refId,
        userEmail: email,
        checkOutTime:formattedTime,
        workingHours,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update attendance: ${response.statusText}`);
    }

  
  } catch (error) {
    console.error('Error updating attendance:', error.message);

  }
};


const formatDateTime = (dateTime) => {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  
  };

  return new Intl.DateTimeFormat('en-US', options).format(dateTime);
};

  console.log("Type:", typeof setIsCheckInOutVisible);
  return (
    <div className='absolute flex ' style={{ zIndex: "9999", width: "100%", height: '100vh', backgroundColor: 'rgba(0, 0, 50, 0.4)', right: "240px" }}>
      <div className='bg-white absolute rounded 'style={{ width: "500px", height: "500px", left: "550px", top: "70px" }}>
        <div className='flex py-5 px-5 justify-between items-center' style={{ width: "100%" }}>
          <p>
            Check In / Check Out
          </p>
          <AiOutlineCloseCircle className='text-gray-400 hover:text-black' size={28} onClick={() =>{ 
            setIsCheckInOutVisible(false);
            window.location.reload();}} />
        </div>

        <div className='flex justify-center items-center' style={{ marginTop: "110px" }}>
          <Clock />
        </div>

        <div className=" space-x-4 flex items-center justify-center" style={{ marginTop: "130px" }}>
          <button
           className={`px-4 py-2 rounded-md  ${
            checkedInTime ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue text-white hover:bg-darkblue'
          }`}
            onClick={handleCheckIn} disabled={checkedInTime !== null} 
          >
            Check In
          </button>
          <button 
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-400"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>

        <section className='flex flex-col mt-10 gap-4 items-center justify-center'>
          <div className='flex ' style={{ width: "400px" }}>
            <div className='flex items-center justify-center  pl-5 pr-2'><AiOutlineLogin size={20} className="text-blue" style={{ marginRight: '5px' }} />
              <span>Checked In at:</span></div>
            <div>
              <p>{checkedInTime}</p>
            </div>
          </div>

          <div className='flex' style={{ width: "400px" }}>
            <div className='flex items-center justify-center pl-5 pr-2'><AiOutlineLogout size={20} className="text-yellow-400" style={{ marginRight: '5px', transform: 'rotate(180deg)' }} />
              <span>Checked Out at:</span></div>
            <div>
              <p>{checkedOutTime}</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

CheckInCheckOut.propTypes = {
  setIsCheckInOutVisible: PropTypes.func.isRequired,
};

export default CheckInCheckOut;

