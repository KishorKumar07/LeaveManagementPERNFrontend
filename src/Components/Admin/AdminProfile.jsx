import  { useState,useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { setIsLoggedIn, setName, setUserEmail,setUserImage } from '../../redux/slice/authSlice';
import AdminProfileNavbar from './AdminProfileNavbar';
import { useSelector ,useDispatch} from 'react-redux';

const TeamProfile = () => {
  const email = useSelector((state) => state.auth.userEmail);
  const name = useSelector((state) => state.auth.name);
  const refId = useSelector((state) => state.auth.refId);
  const [managerEmail, setManagerEmail] = useState(email);
  const [managerName, setManagerName] = useState(name);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();



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
        console.log("userprofileeee:",userProfile);
        setManagerName(userProfile.name);
        setManagerEmail(userProfile.email);
        console.log("uuuIII:",userProfile.image_data);
    
        if(userProfile.image_data){
          // console.log('Binary data:', userProfile.image_data.data.data);
          const dataArray = Array.from(userProfile.image_data.data);

          const base64Image = `data:${userProfile.image_data.contentType};base64,${btoa(
            String.fromCharCode.apply(null, dataArray)
          )}`;

          var imageStr = arrayBufferToBase64(userProfile.image_data.data.data);
          const combinedString = base64Image+imageStr;
          
          setImageUrl(combinedString);
          console.log("imageUrl:",combinedString);
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
  
  console.log('Fetched user profile:', imageUrl);

}, [imageUrl, dispatch]);

const handleImageChange = (e) => {
  setImageUrl('');
  const file = e.target.files[0];
  setSelectedImage(file);


};

const handleUpdate = async () => {
  try {
      console.log("MangerImage:::::::::::",selectedImage);
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('email', managerEmail);
      formData.append('name', managerName);
      // formData.append('refId', refId);
      const response = await fetch(`http://localhost:3000/user/update-manager-profile/${refId}`, {
        method: 'PUT',
        body: formData,
        
      });

      dispatch(setName(managerName));
      dispatch(setUserEmail(managerEmail));
      updateLeaveApplicationImage();
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


const updateLeaveApplicationImage = async () => {
  try {
    const leaveAppData = {
      refId,
      imageUrl,
    };

    const response = await fetch('http://localhost:3000/user/update-leave-application', {
      method: 'POST',
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
   <div >

   <AdminProfileNavbar />
   
  
<div style={{ width: '600px' ,top:"120px"}} className="m-auto px-10 py-5 bg-white rounded-lg shadow-lg relative">
 
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
     value={managerName}
     onChange={(e) => setManagerName(e.target.value)}
   />
 </div>
 <div className="mb-4">
   <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="email">
    Email
   </label>
   <input
     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
     
     type="email"
     value={managerEmail}
     onChange={(e) => setManagerEmail(e.target.value)}
   />
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
    </div>
  );
};

export default TeamProfile;
