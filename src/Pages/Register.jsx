import  { useState } from 'react';

import { useSelector } from 'react-redux';

function Register() {

  const employeeRoleList = useSelector((state) => state.auth.employeeRoleList);
  const departmentList = useSelector((state) => state.auth.departmentList);
 
  const [refId, setRefId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [department, setDepartment] = useState('Web Development');
  

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/register', { 
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refId,name, email, password, role,department}),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Registration failed with status ${response.status} `);
      }

      const data = await response.json();
      console.log('Server Response Data:', data);

      if (data.success) {
        alert("User registered successfully");
        console.log('User registered successfully');
        setRefId('');
        setName('')
        setEmail('');
        setPassword('');
    
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
    
    }
  };


  return (
    <div className="flex h-screen   justify-center items-center" >
      <div style={{ width: '600px' }} className="m-auto p-10 bg-white rounded-lg shadow-lg " >
        <h2 className="text-3xl font-semibold mb-4 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="refId">
           RefID
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            id="refId"
            placeholder="Enter RefId"
            value={refId}
            onChange={(e) => setRefId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            id="name"
            placeholder="Enter employee name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="email"
           
            placeholder="Enter employee email"
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
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Role
  </label>
  <select
    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
    id="role"
    value={role}
    onChange={(e) => setRole(e.target.value)}
  >
   {employeeRoleList.map((employeeOption, index) => (
      <option key={index} value={employeeOption}>
        {employeeOption}
      </option>
      ))}
  </select>
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Department
  </label>
  <select
  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
    role === 'Admin' ? 'bg-gray-200' : 'bg-white'
  }`}
  id="department"
  value={department}
  onChange={(e) => {
    if (role === 'Admin') {
      setDepartment(''); 
    } else {
      setDepartment(e.target.value);
    }
  }}
  disabled={role === 'Admin'}
>
  {departmentList.map((departmentOption, index) => (
    <option key={index} value={departmentOption}>
      {departmentOption}
    </option>
  ))}
</select>

</div>

        <div className="mb-8">
          <button
            className="w-full bg-blue  text-white py-2 rounded-md hover:bg-blue focus:outline-none"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
       
      </div>
    </div>
  );
}

export default Register;
