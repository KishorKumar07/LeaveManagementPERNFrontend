import { FaUser ,FaTrash } from 'react-icons/fa';
import  {useEffect,useState } from 'react';
import { useSelector} from 'react-redux';
import AdminProfileNavbar from './AdminProfileNavbar';


function TeamMembersList() {
    const [employees, setEmployees] = useState([]);
     const email = useSelector((state) => state.auth.userEmail);
     
    useEffect(() => {
    
      const fetchData = async () => {
       
        try {
          const response = await fetch(`http://localhost:3000/user/get-all-employees`);
          const data = await response.json();
          
          console.log("emoloyeelISts::::",data.employees);
          setEmployees(data.employees);  
          console.log(data.employees.image_data); 
        }     
        catch (error) {
          console.error('Error fetching employee data:',error);
        }
      };
      fetchData();
      }, [email]);


      const handleDeleteEmployee = async (employeeRefId) => {
        try {
            const response = await fetch(`http://localhost:3000/user/delete-employee/${employeeRefId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                setEmployees(employees.filter(employee => employee.refId !== employeeRefId));
                console.log('Employee deleted successfully');
            } else {
                console.error('Failed to delete employee');
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

      
  return (
  <div>   <AdminProfileNavbar />

    <div className=" relative"style={{top:'10px',height:'655px'}} >  
   
    < div className="flex flex-wrap   mb-10" style={{width:"1200px" ,paddingTop:'90px'}} >
  
  {employees.map((employee, index) => (
    
    <div className=" relative mt-4 p-5 shadow-leave-count bg-white flex flex-col gap-2 rounded-md m-auto items-center justify-center" style={{ width: '280px', height: '250px' }} key={index}>

    <div className="rounded-full flex items-center justify-center bg-gray-300 text-gray-600 m-auto mb-5" style={{ width: '120px', height: '120px' }}>
    <div className="rounded-full flex items-center justify-center bg-gray-300 text-gray-600  " >
      {employee.image_data ? (
         <img src={employee.image_data}  alt="Profile" className="mt-2" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
         
        ) :  (
            <FaUser style={{ width: '100%', height: '100%' }} />
          )
        }

            </div>
    </div>

    <p>{employee.name}</p>
    <p>{employee.email}</p>

   
    <div className="absolute top-0 right-0 m-2 cursor-pointer"  >
      <FaTrash style={{ color: 'red' }} onClick={() => handleDeleteEmployee(employee.refId)}/>
    </div>
    </div>
  ))}
</div>
</div>
</div>


  )
}

export default TeamMembersList


