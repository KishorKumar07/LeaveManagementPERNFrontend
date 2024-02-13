import { FaUser ,FaTrash } from 'react-icons/fa';
import  {  useEffect,useState } from 'react';
import { useSelector} from 'react-redux';
import ManagerProfileNavbar from './ManagerProfileNavbar';


function TeamMembersList() {
    const [selectedEmployees, setSelectedEmployees] = useState([]);
     const email = useSelector((state) => state.auth.userEmail);
     const refId = useSelector((state) => state.auth.refId);
    useEffect(() => {
    
        const fetchTeamMembers = async () => {
          try {
            const response = await fetch(`http://localhost:3000/user/get-team-members?refId=${refId }`);
            const data = await response.json();
            
            setSelectedEmployees(data.teamMembers);
            
          } catch (error) {
            console.error('Error fetching team members data:', error);
          }
        };
    
        fetchTeamMembers();
      }, [email]);


      const handleDeleteEmployee = async (employeeRefId) => {
        try {
        
          await fetch(`http://localhost:3000/user/delete-team-member?refId=${refId }&employeeRefId=${employeeRefId}`, {
            method: 'DELETE',
          });
    

          const updatedEmployees = selectedEmployees.filter(employee => employee.refId !== employeeRefId);
          setSelectedEmployees(updatedEmployees);
        } catch (error) {
          console.error('Error deleting team member:', error);
        }
      };
    
      console.log("team:",selectedEmployees);

  return (
  <div>   <ManagerProfileNavbar />

    <div className=" relative"style={{top:'10px',height:'655px'}} >  
   
    < div className="flex flex-wrap   mb-10" style={{width:"1200px" ,paddingTop:'90px'}} >
  
  {selectedEmployees.map((employee, index) => (
    
    <div className=" relative mt-4 p-5 shadow-leave-count bg-white flex flex-col gap-2 rounded-md m-auto items-center justify-center" style={{ width: '280px', height: '250px' }} key={index}>

    <div className="rounded-full flex items-center justify-center bg-gray-300 text-gray-600 m-auto mb-5" style={{ width: '120px', height: '120px' }}>
    <div className="rounded-full flex items-center justify-center bg-gray-300 text-gray-600  " >
      {employee.image ? (
         <img src={employee.image}  alt="Profile" className="mt-2" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
         
        ) :  (
            <FaUser style={{ width: '100%', height: '100%' }} />
          )
        }

            </div>
    </div>

    <p>{employee.name}</p>
    <p>{employee.email}</p>

   
    <div className="absolute top-0 right-0 m-2 cursor-pointer" onClick={() => handleDeleteEmployee(employee.refId)} >
      <FaTrash style={{ color: 'red' }} />
    </div>
    </div>
  ))}
</div>
</div>
</div>


  )
}

export default TeamMembersList


