import { useNavigate} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setIsLoggedIn,setRefId,setManagerRefId,setRole, setName,setUserImage,setUserEmail,setUserPassword,setDept,setTeamLeadName,setTeamLeadEmail} from '../redux/slice/authSlice';
import  {useState} from 'react';


function App() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const arrayBufferToBase64 = (buffer)=> {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
         
      if (response.ok) {
        const token = data.token;
        localStorage.setItem('token', token);
        console.log("dataaaaaaaaaaa:",data.refId);
        const refId = data.refId;
        const managerRefId = data. managerRefId;
        const userRole = data.role;
        const userName = data.name;
        const userImage =  data.image_data;
        const userEmail = data.email;
        const password = data.password;
        const userDepartment = data.department;
        const teamLeadName = data.teamLeadName;
        const teamLeadEmail = data.teamLeadEmail;
        console.log("userrrrimaege:",userImage);

        if(userImage && Object.keys(userImage).length > 0){
      
          const dataArray = Array.from(userImage.data);
        
          const base64Image = `data:${userImage.contentType};base64,${btoa(
            String.fromCharCode.apply(null, dataArray)
          )}`;
    
          var imageStr = arrayBufferToBase64(userImage.data.data);
          const combinedString = base64Image+imageStr;
          
          dispatch(setUserImage(combinedString));
          console.log("CombinedString:",combinedString);     
        }
      
        dispatch(setIsLoggedIn(true));
        dispatch(setRefId(refId));
        dispatch(setManagerRefId(managerRefId));
        dispatch(setRole(userRole));
        dispatch(setName(userName));       
        dispatch(setUserEmail(userEmail));
        dispatch(setUserPassword(password));
        dispatch(setDept(userDepartment));
        dispatch(setTeamLeadName(teamLeadName));
        dispatch(setTeamLeadEmail(teamLeadEmail));
        
              
        if (userRole === 'Manager') {
          navigate('/Manager/manager-dashboard');
        } else if (userRole === 'Employee') {
          navigate('/Employee/employee-dashboard');
        } 
        else if (userRole === 'Admin') {
          navigate('/Admin/admin-dashboard');
        } 
        else {
          console.error('Unknown user role:', userRole);
        }
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-200 justify-center items-center">
      <div style={{ width: '600px' ,height:"500px"}} className="m-auto p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      

        <div className="mb-8">
        
  <button
    className="w-full bg-blue text-white py-2 rounded-md hover:bg-blue focus:outline-none"
    onClick={handleLogin}
  >
    Login
  </button>

        </div>
       
      </div>
    </div>
  );
}



export default App;