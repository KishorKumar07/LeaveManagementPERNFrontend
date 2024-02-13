import{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ManagerProfileNavbar from './ManagerProfileNavbar';
import { useSelector } from 'react-redux';
import {FaUser } from 'react-icons/fa';

const AddTeamMembers = () => {
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const department = useSelector((state) => state.auth.dept);
  const email = useSelector((state) => state.auth.userEmail);
  const name = useSelector((state) => state.auth.name);
  const refId = useSelector((state) => state.auth.refId);
 

  useEffect(() => {
    const fetchData = async () => {
      console.log(department);
      try {
        const response = await fetch(`http://localhost:3000/user/get-all-employees-department?department=${department}&refId=${refId}`);
        const data = await response.json();
        setEmployeeList(data.employees);
        console.log("emoloyeelISts::::",data.employees);     
      }     
      catch (error) {
        console.error('Error fetching employee data:',error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (employeeId) => {
    setEmployeeList((prevList) => {
      const updatedList = prevList.map((employee) =>
        employee.refId === employeeId
          ? { ...employee, selected: !employee.selected }
          : employee
      );
  
      return updatedList;
    });
  };

  const handleSaveTeamMembers = () => {
   
    const updatedSelectedEmployees = employeeList
      .filter((employee) => employee.selected)
      .map((employee) => ({
        refId:employee.refId,
        name: employee.name,
        email: employee.email,
        department: employee.department,
        image:renderEmployeeImageString(employee),
        managerRefId : refId,
      }));
    
    onSaveTeamMembers(updatedSelectedEmployees);
   
  };

 
  const handleSelectAllCheckboxChange = () => {
    setEmployeeList((prevList) => {
      const updatedList = prevList.map((employee) => ({
        ...employee,
        selected: !selectAllCheckbox,
      }));

      return updatedList;
    });

    setSelectAllCheckbox((prevValue) => !prevValue);
  };

  const onSaveTeamMembers = async (newTeamMembers) => {
    try {
      console.log("Team:",newTeamMembers);
      await fetch('http://localhost:3000/user/save-team-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refId,
          email,
          name,
          teamMembers: newTeamMembers,
        }),
      });
       window.location.reload();
    } catch (error) {
      console.error('Error saving team members data:', error);
    }
  };
  
  let cellStyle = {
    padding: '1rem',
    fontSize:'15px',
    border: '2px solid #E4E5E8',
    textAlign: 'center',
    color:  '#747474' 
  };

  let firstCellStyle = {
    padding: '1rem',
    fontSize:'15px',
    border: '0.01px solid #E4E5E8',
    display:"flex",
    gap:"2",
    alignItems:"center"
  };


  const arrayBufferToBase64 = (buffer)=> {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};


  const renderEmployeeImage = (employee) => {
    if (employee.image_data) {
      const userImage = employee.image_data;
      if(userImage && Object.keys(userImage).length > 0){
      
        const dataArray = Array.from(userImage.data);
      
        const base64Image = `data:${userImage.contentType};base64,${btoa(
          String.fromCharCode.apply(null, dataArray)
        )}`;
  
        var imageStr = arrayBufferToBase64(userImage.data.data);
        const combinedString = base64Image+imageStr;
        
        return <img src={combinedString} alt="Profile"  style={{ width: '100%', height: '100%', borderRadius: '50%' }}/>;
    } 
    else {
      return <FaUser style={{ width: '40%', height: '40%' }} />;
    }
  
    }}


    
  const renderEmployeeImageString = (employee) => {
    if (employee.image_data) {
      const userImage = employee.image_data;
      if(userImage && Object.keys(userImage).length > 0){
      
        const dataArray = Array.from(userImage.data);
      
        const base64Image = `data:${userImage.contentType};base64,${btoa(
          String.fromCharCode.apply(null, dataArray)
        )}`;
  
        var imageStr = arrayBufferToBase64(userImage.data.data);
        const combinedString = base64Image+imageStr;
        
        return combinedString;
    } 
    
  
    }}

  return (
   <div>   <ManagerProfileNavbar />
    <div className="modal relative "style={{top:'10px',height:"665px"}}>
    
            
        <div className="flex gap-2 pt-20" >
        <div className="overflow-x-auto">
        <table className="w-full mt-5 p-5 ml-5 mb-5 shadow-leave-count bg-white rounded-md" style={{ width: '876px' }}>
          <thead>
            <tr>
              <th className="p-4 border-2 border-table text-tableHead text-form">Employee Name</th>
              <th className="p-4 border-2 border-table text-tableHead text-form">Department</th>
              <th className="p-4 border-2 border-table text-tableHead text-form">Email</th>
              <th className="p-4 border-2 border-table text-tableHead text-form">
                <input  type="checkbox"
              checked={selectAllCheckbox}
              onChange={handleSelectAllCheckboxChange}/></th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee, index) => (
              <tr key={index} >
              
                <td style={firstCellStyle} className='flex gap-3'>
                <div className="rounded-full flex items-center justify-center bg-gray-300 text-gray-600  " style={{ width: '50px', height: '50px' }}>
      
         {renderEmployeeImage(employee)}
          
            </div>
                 
                  {employee.name}
                </td>
                <td style={cellStyle}>{employee.department}</td>
                <td style={cellStyle}>{employee.email}</td>
                <td style={cellStyle}>  <input
                          type="checkbox"
                          checked={!!employee.selected} 
                          onChange={() => handleCheckboxChange(employee.refId)}/></td>
                
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>

        <button className=" bg-green text-white px-4 py-2 rounded-md mt-4 relative hover:bg-green focus:outline-none focus:ring focus:border-green" onClick={handleSaveTeamMembers} style={{left:'400px'}}> 
          Add Members
        </button>
     
    </div> </div>
  );
};

AddTeamMembers.propTypes = {
  
  onSaveTeamMembers: PropTypes.func.isRequired,
};

export default AddTeamMembers;

