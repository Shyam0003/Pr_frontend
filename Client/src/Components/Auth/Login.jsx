// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import classNames from 'classnames';
// // import '../styles.css'; // Import the CSS file

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const user = users.find(u => u.email === email && u.password === password);

//     if (user) {
//       setMessage('Login successful!');
//       localStorage.setItem('hasVisited', 'true');
//       navigate('/');  // Redirect to home page
//     } else {
//       setMessage('Invalid email or password');
//     }
//   };

//   return (
//     <div className="bg-[#e0e0e0] h-[100vh] w-[100vw] text-[#fff] flex justify-center items-center flex-col relative">
//       <form onSubmit={handleSubmit} className='bg-[#f5f5f5] h-[65vh] w-[30vw] flex justify-center items-center flex-col gap-[15px] rounded-[10px]'>
//         <div className="image">
//           <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" className='h-[20vh] absolute top-[8%] left-[45%] bg-[#fff] rounded-[50%]' alt="" />
//         </div>
//         <h2 className='text-[#838383] text-[25px] font-bold'>User Log in</h2>
//         <div className="flex justify-center flex-col gap-[20px]">
//           <div>
//               <input type="email" value={email} className={classNames(
//                 'bg-[#e9e9e9] outline-blue-600 h-[6vh] w-[20vw] rounded-[5px] p-[10px] font-semibold cursor-black',
//                 { 'text-black': email }
//               )} placeholder='User ID' onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//           <div>
//             <input type="password" value={password} className={classNames(
//               'bg-[#e9e9e9] outline-blue-600 h-[6vh] w-[20vw] rounded-[5px] p-[10px] font-semibold cursor-black',
//               { 'text-black': password }
//             )} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
//           </div>
//           <button type="submit" className='text-[17px] text-[#aed1f5] h-[6vh] w-[20vw] bg-blue-600 rounded-[5px]'>LOGIN</button>
//           {message && <p>{message}</p>}
//           <Link to="/forgot-password" className='text-[#007bff] text-center flex justify-center gap-x-[5px]'> <p className='text-[#000]'>Forgot</p> Password?</Link>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { loginUser } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(formData);
      setMessage(result.message);

      if (result.success) {
        localStorage.setItem("hasVisited", "true");
        navigate("/");
      }
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold text-center mb-4">User Login</h2>
        <input type="email" name="email" value={formData.email} className="border p-2 w-full" placeholder="User ID" onChange={handleChange} required />
        <input type="password" name="password" value={formData.password} className="border p-2 w-full mt-2" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full mt-4">LOGIN</button>
        {message && <p className="text-red-500 text-center mt-2">{message}</p>}
        <Link to="/forgot-password" className="text-blue-600 text-center block mt-4">Forgot Password?</Link>
      </form>
    </div>
  );
}

export default Login;
