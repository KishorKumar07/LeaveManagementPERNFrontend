import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsLoggedIn, setName, setUserEmail,setUserImage } from '../../redux/slice/authSlice';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.userEmail);
  const name = useSelector((state) => state.auth.name);
  const teamLeadName = useSelector((state) => state.auth.teamLeadName);
  const teamLeadEmail = useSelector((state) => state.auth.teamLeadEmail);
  const refId = useSelector((state) => state.auth.refId);

  const [employeeEmail, setEmployeeEmail] = useState(email);
  const [employeeName, setEmployeeName] = useState(name);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
 
  
  const arrayBufferToBase64 = (buffer)=> {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

  useEffect(() => {

    
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/get-user-profile/${refId}`);
        const data = await response.json();
        
        if (data.success) {
          const userProfile = data.userProfile;
          console.log(userProfile);
          setEmployeeName(userProfile.name);
          setEmployeeEmail(userProfile.email);
         
          console.log("uuuIIIEmployee:",userProfile.image_data);
          if(userProfile.image_data){
        
            const dataArray = Array.from(userProfile.image_data.data);
  
            const base64Image = `data:${userProfile.image_data.contentType};base64,${btoa(
              String.fromCharCode.apply(null, dataArray)
            )}`;
  
            var imageStr = arrayBufferToBase64(userProfile.image_data.data.data);
            const combinedString = base64Image+imageStr;
            
            setImageUrl(combinedString);
            updateLeaveApplicationImage(combinedString);
          }
         
          
         
        } else {
          console.error('Failed to fetch user profile:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [refId]);

  useEffect(() => {
   
    dispatch(setUserImage(imageUrl));
    
   

  }, [imageUrl, dispatch]);

  const handleImageChange = (e) => {
    setImageUrl('');
    const file = e.target.files[0];
    setSelectedImage(file);


  };
  
  const handleUpdate = async () => {
    try {
      console.log("selectedImageeee",selectedImage);
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('email', employeeEmail);
      formData.append('name', employeeName);
   
      const response = await fetch(`http://localhost:3000/user/update-employee-profile/${refId}`, {
        method: 'PUT', 
        body: formData,
      });
      
      dispatch(setName(employeeName));
      dispatch(setUserEmail(employeeEmail));
  
      const data = await response.json();
      console.log('Update response:', data);
      alert('Profile Updated Successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error updating employee profile:', error);
    }
  };
  

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    dispatch(setUserImage(''));
    navigate('/login');
  };

  const updateLeaveApplicationImage = async (imageString) => {
    console.log("imageeeeh:", imageString);
    try {
      const leaveAppData = {
        refId,
        imageString,
      };
  
      const response = await fetch('http://localhost:3000/user/update-leave-application', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveAppData),
      });
  
      const data = await response.json();
      console.log('Update leave application image response:', data);
    } catch (error) {
      console.error('Error updating leave application image:', error);
    }
  };
  
  return (
    <div style={{ width: '600px' }} className="m-auto px-10 py-5 bg-white rounded-lg shadow-lg mt-8">
      <div className="rounded-full flex items-center justify-center bg-gray-300 text-gray-600 m-auto mb-5" style={{ width: '120px', height: '120px' }}>
      {imageUrl ? (
          <img src={imageUrl} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) : (
          selectedImage ? (
            <img src={URL.createObjectURL(selectedImage)} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          ) : (
            <FaUser style={{ width: '40%', height: '40%' }} />
          )
        )}

            </div>

      <div className="mb-4">
        <input type="file" accept="image/*" id="profileImage" onChange={handleImageChange} className="hidden" />
        <div className="flex justify-center items-center">
        <label 
          htmlFor="profileImage" 
          className="cursor-pointer  border border-gray-400 rounded p-2"
          style={{
            transition: 'all 0.3s',
            color: '#647C90',
          }}
          onMouseEnter={(e) => {
            e.target.style.border = '1px solid black';
            e.target.style.color = 'black';
          }}
          onMouseLeave={(e) => {
            e.target.style.border = '1px solid #ccc'; 
            e.target.style.color = '#647C90'; 
          }}
        >
          Change Profile Image
        </label>

        </div>
      </div>


  <div className="mb-4">
    <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="name">
      Name
    </label>
    <input
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
      type="text"
      value={employeeName}
      onChange={(e) => setEmployeeName(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="email">
     Email
    </label>
    <input
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
      
      type="email"
      value={employeeEmail}
      onChange={(e) => setEmployeeEmail(e.target.value)}
    />
  </div>
 
  <div className="mb-4">
    <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="email">
    Team Lead name
    </label>
    <p className="block mb-2 border border-gray rounded-md p-2 h-10">
      {teamLeadName}
        </p>
  </div> <div className="mb-4 ">
    <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="email">
    Team Lead Email
    </label>
    <p className="block mb-2 border border-gray rounded-md  p-2 h-10 ">
         {teamLeadEmail} 
        </p>

  </div>


  <div className="mt-8 space-x-4 flex items-center justify-center">
        <button
          onClick={handleUpdate}
          className="bg-blue text-white px-4 py-2 rounded-md hover:bg-darkblue focus:outline-none focus:ring focus:border-blue"
        >
          Update
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
        >
          Logout
        </button>
      </div>
</div>

  );
};

export default EmployeeProfile;
