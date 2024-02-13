import { useState, useEffect } from 'react';
import { MdDescription } from 'react-icons/md';
import Calendar from "./Calendar"
import moment from 'moment';
import EmployeeLeaveManagementNavbar from "./EmployeeLeaveManagementNavbar"
 import EmployeeLeaveCount from "./EmployeeLeaveCount"
import OnLeaveBar from "../OnLeaveBarEmployee"
import {useSelector} from 'react-redux';

function LeaveApplication() {
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [type, setType] = useState([]);

  const refId = useSelector((state) => state.auth.refId);
  const managerRefId = useSelector((state) => state.auth.managerRefId);
  const name = useSelector((state) => state.auth.name);
  const email = useSelector((state) => state.auth.userEmail);
  const teamLeadEmail = useSelector((state) => state.auth.teamLeadEmail);
  const department = useSelector((state) => state.auth.dept);
  const image = useSelector((state) => state.auth.userImage);
  
 
  useEffect(() => {

  
    const populateDays = () => {
      const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);
      setDays(daysArray);
    };

    const populateType = () => {
      const typeArray = [
        'Vacation Leave', 'Sick Leave', 'Maternity/Paternity Leave', 'Bereavement Leave', 'Special/Personal Leave'
      ];
      setType(typeArray);
    };

    const populateYears = () => {
      const currentYear = new Date().getFullYear();
      const yearsArray = [currentYear, currentYear + 1];
      setYears(yearsArray);
    };

  

    const populateMonths = () => {
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      setMonths(monthNames);
    };

    populateDays();
    populateMonths();
    populateYears();

    populateType();


  }, []);

  const currentDate = new Date();
  const [fromDay,setFromDay] = useState( currentDate.getDate());
  const [fromMonth,setFromMonth] = useState(currentDate.getMonth());
  const [fromYear,setFromYear] = useState(currentDate.getFullYear());

 
  const [toDay,setToDay] = useState(currentDate.getDate());
  const [toMonth,setToMonth] = useState(currentDate.getMonth());
  const [toYear,setToYear] = useState(currentDate.getFullYear());


  const [noOfDays, setNoOfDays] = useState('1');
  const [leaveType, setLeaveType] = useState('Vacation Leave');
  const [reason, setReason] = useState();
  

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(name,email,teamLeadEmail,department);
  
    try {
      const startDateFormatted = moment(`${fromDay}-${fromMonth + 1}-${fromYear}`, 'DD-MM-YYYY').format('DD MMM YYYY');
      const endDateFormatted = moment(`${toDay}-${toMonth + 1}-${toYear}`, 'DD-MM-YYYY').format('DD MMM YYYY');
  
      const formData = {
        refId,
        managerRefId,
        name,
        image,
        email,
        teamLeadEmail,
        department,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
        noOfDays,
        leaveType,
        reason,
        leaveStatus:"Pending"

      };
      console.log("teamLeadEmail:",teamLeadEmail);
      console.log('formData:', formData);
      const response = await fetch('http://localhost:3000/user/leave-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Form submitted successfully');
        alert("Leave Applied Successfully");
        
         setFromDay(currentDate.getDate());
         setFromMonth(currentDate.getMonth());
         setFromYear(currentDate.getFullYear());
       
         setToDay(currentDate.getDate());
         setToMonth(currentDate.getMonth());
         setToYear(currentDate.getFullYear());     
        
         setNoOfDays('1');
         setLeaveType('Vacation Leave');
         setReason("") 



      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
    window.location.reload();
  };
  
 const resetForm = ()=>{

         setFromDay(currentDate.getDate());
         setFromMonth(currentDate.getMonth());
         setFromYear(currentDate.getFullYear());
       
         setToDay(currentDate.getDate());
         setToMonth(currentDate.getMonth());
         setToYear(currentDate.getFullYear());     
        
         setNoOfDays('1');
         setLeaveType('Vacation Leave');
         setReason("") 
 }
 useEffect(() => {
 
  const fromMonthInt = parseInt(fromMonth);
  const toMonthInt = parseInt(toMonth);
  const fromYearInt = parseInt(fromYear);
  const toYearInt = parseInt(toYear);

 
  const fromDate = moment(`${fromYearInt}-${fromMonthInt + 1}-${fromDay}`, 'YYYY-MM-DD');
  const toDate = moment(`${toYearInt}-${toMonthInt + 1}-${toDay}`, 'YYYY-MM-DD');
  const diffInDays = toDate.diff(fromDate, 'days') + 1;
  setNoOfDays(diffInDays.toString());
}, [fromDay, fromMonth, fromYear, toDay, toMonth, toYear]);



  return (

    <div>
   
    <EmployeeLeaveManagementNavbar />
    <div className="flex" style={{paddingTop:"80px"}}>
    <div >
      <EmployeeLeaveCount />
   
    <div className="mt-4 p-5  shadow-leave-count bg-white flex gap-20 rounded-md"  style={{ width: '895px' }}>
    <div className="ml-3">
      <div className="flex gap-5 items-center">
        <MdDescription size={20} />
        <p>Leave Application</p>
        </div>
        
      <div className=" flex gap-8  mt-7" > 
      <div className=" flex flex-col gap-10 mt-2 text-form text-formText " style={{ width: '100px' }}>
        <p className='text-right'>From</p>
        <p className='text-right'>To</p>
        <p className='text-right'>No of Days</p>
        <p className='text-right'>Leave Type</p>
        </div>
        <div className="flex flex-col gap-6">
        <div className="flex space-x-4">
      <select value={fromDay}
      onChange={(e) => setFromDay(e.target.value)} className="border rounded p-2 text-sbar">
        {days.map((day, index) => (
          <option key={index} value={day}>
            {day}
          </option>
        ))}
      </select>

      <select value={fromMonth}  onChange={(e) => setFromMonth(e.target.value)} className="border rounded p-2 text-sbar">
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>

      <select value={fromYear}  onChange={(e) => setFromYear(e.target.value)} className="border rounded p-2 text-sbar">
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
    <div className="flex space-x-4">
      <select value={toDay}  onChange={(e) => setToDay(e.target.value)} className="border rounded p-2 text-sbar">
        {days.map((day, index) => (
          <option key={index} value={day}>
            {day}
          </option>
        ))}
      </select>

      <select value={toMonth}  onChange={(e) => setToMonth(e.target.value)} className="border rounded p-2 text-sbar">
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>

      <select value={toYear} onChange={(e) => {
        setToYear(e.target.value)
        
      }  
        }className="border rounded p-2 text-sbar">
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>



<div className="flex space-x-4">
 
  <input
    type="text"
    value={noOfDays}
    className="border rounded p-2 text-sbar"
    readOnly 
  />
</div>

<div>
<select value={leaveType}
      onChange={(e) => setLeaveType(e.target.value)} className="border rounded p-2 text-sbar">
        {type.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
</div>



    </div>

   
      </div>

      <textarea  value={reason}
      onChange={(e) => setReason(e.target.value)}
      className="border rounded p-2  h-32 resize-none mt-5  text-formText" 
      placeholder="Type Reason here..." style={{width :"365px"}}
    />
      </div>

    <div className="flex flex-col gap-5">
      <div className="ml-5 mt-10">
        <Calendar/>
        </div> 

        <div className="flex gap-5 ml-50">
          <button onClick={submitForm}  className="bg-blue text-white px-5 py-2 rounded-md text-sbar">Apply Leave</button>
          <button onClick={resetForm}className="bg-white border-2 border-blue text-blue px-10 py-2 rounded-md text-sbar">Reset</button>
        </div>
   </div>
      
      </div>
   </div>
    
    <div><OnLeaveBar /></div>
    </div>
    
    
    </div>

    

  )
}

export default LeaveApplication

