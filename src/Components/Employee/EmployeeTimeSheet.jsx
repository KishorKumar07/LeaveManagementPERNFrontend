import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function TimeSheet() {
  const [attendanceData, setAttendanceData] = useState([]);
  const email = useSelector((state) => state.auth.userEmail);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [displayedMonth, setDisplayedMonth] = useState('');
  const [totalWorkedHours, setTotalWorkedHours] = useState('');
  const [totalExtraWorkedHours, setTotalExtraWorkedHours] = useState('');
  const refId = useSelector((state) => state.auth.refId);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('http://localhost:3000/attendance/getAttendanceForCurrentMonth',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refId
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setAttendanceData(data.attendance);
          setTotalWorkedHours(data.totalHoursWorked);
          setTotalExtraWorkedHours(data.totalExtraHoursWorked);
        } else {
          throw new Error(`Failed to fetch attendance data: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error.message);
      }
    };

    fetchAttendanceData();

    // Set the displayed month
    const currentDate = new Date();
    const monthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(currentDate);
    setDisplayedMonth(monthName);
  }, [email]);

  const formatDateRange = (from, to) => {
    const options = { day: 'numeric', month: 'short' };
    const fromDateFormatted = new Intl.DateTimeFormat('en', options).format(new Date(from));
    const toDateFormatted = new Intl.DateTimeFormat('en', options).format(new Date(to));
    
    const fromDay = new Date(from).getDate();
    const toDay = new Date(to).getDate();
  
    const addOrdinalIndicator = (day) => {
      if (day > 3 && day < 21) return `${day}th`;
      switch (day % 10) {
        case 1: return `${day}st`;
        case 2: return `${day}nd`;
        case 3: return `${day}rd`;
        default: return `${day}th`;
      }
    };
  
    return `${addOrdinalIndicator(fromDay)} ${fromDateFormatted.split(' ')[0]} To ${addOrdinalIndicator(toDay)} ${toDateFormatted.split(' ')[0]}`;
  };

  const exportToExcel = () => {
    const tableHeaders = ["Date", "Check In", "Check Out", "Hours worked", "Extra Hours Worked"];
    const worksheetData = [tableHeaders, ...attendanceData.map(data => [data.date, data.checkInTime, data.checkOutTime, data.hoursWorked, data.extraHoursWorked])];
  
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'AttendanceData');
    XLSX.writeFile(workbook, 'attendance_data.xlsx');
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/attendance/getAttendanceBetweenDates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refId,
          fromDate,
          toDate
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAttendanceData(data.attendance);
        setTotalWorkedHours(data.totalHoursWorked);
        setTotalExtraWorkedHours(data.totalExtraHoursWorked);
        setDisplayedMonth(formatDateRange(fromDate, toDate));
      } else {
        throw new Error(`Failed to fetch attendance data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error.message);
    }
  };

  return (
    <>
      <div style={{ width: '100%', top: '20px', fontSize: "25px", height: "650px" }} className="px-10 py-5 relative">
        <div>
          <form className="flex justify-center items-center gap-8 mt-5" style={{ fontSize: "15px" }} >
            <div className="flex items-center gap-3">
              <label htmlFor="fromDate">From Date:</label>
              <input type="date" id="fromDate" name="fromDate" className='shadow-prof px-2' value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="toDate">To Date:</label>
              <input type="date" id="toDate" name="toDate" className='shadow-prof px-2' value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
            <button type="submit" className="bg-blue hover:bg-darkblue text-white px-4 py-1 rounded h-fit" onClick={handleSubmit}>
              Submit
            </button>

            <button type="button" className="bg-green hover:bg-darkgreen text-white px-4 rounded h-fit py-1" onClick={exportToExcel}>
              Export To Excel
            </button>
          </form>
        </div>
          <div className='flex gap-4 text-center justify-center align-center text-sm mt-7'>
          <p className=" text-xl  text-yellow-600">{displayedMonth}</p>
          <div className='flex gap-2 mt-1'>
            <p>Total Worked Hours : </p>
            <p>{totalWorkedHours}</p>
          </div>
          <div className='flex gap-2 mt-1'>
            <p>Total Extra Worked Hours : </p>
            <p>{totalExtraWorkedHours}</p>
          </div>
          </div>
     

        <div className="flex items-center justify-center">
          <div className="flex gap-2 mt-4">
            <table className="w-full px-10 shadow-leave-count bg-white rounded-md " style={{ width: '898px' }}>
              <thead>
                <tr>
                  {["Date", "Check In", "Check Out", "Hours worked", "Extra Hours Worked"].map((header, index) => (
                    <th key={index} className="px-4 py-2 border-2 border-table text-tableHead text-sm bg-darkblue text-white rounded-md">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((data, rowIndex) => {

                  let cellStyle = {
                    padding: '1rem',
                    fontSize: '15px',
                    border: '2px solid #E4E5E8',
                    textAlign: 'center',
                    color: '#747474',
                  };

                  return (
                    <tr key={rowIndex}>
                      <td style={cellStyle}>{data.date}</td>
                      <td style={cellStyle}>{data.checkInTime}</td>
                      <td style={cellStyle}>{data.checkOutTime}</td>
                      <td style={cellStyle}>{data.hoursWorked}</td>
                      <td style={cellStyle}>{data.extraHoursWorked} </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeSheet;
