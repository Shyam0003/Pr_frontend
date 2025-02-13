// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import classNames from "classnames";

// function Register({ onSkip }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const userExists = users.some((u) => u.email === email);

//     if (userExists) {
//       setMessage("User already exists");
//     } else {
//       users.push({ name, email, password });
//       localStorage.setItem("users", JSON.stringify(users));
//       setMessage("Registration successful!");

//       setTimeout(() => {
//         localStorage.setItem("hasVisited", "true");
//         navigate("/"); // Redirect to home page
//       }, 1000); // 1-second delay for showing the success message
//     }
//   };

//   const handleSkip = () => {
//     onSkip();
//     navigate("/");
//   };

//   return (
//     <div className="bg-[#e0e0e0] h-[100vh] w-[100vw] text-[#fff] flex justify-center items-center flex-col relative">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#f5f5f5] h-[68vh] w-[30vw] flex justify-center items-center flex-col gap-[15px] rounded-[10px]"
//       >
//         <div className="image">
//           <img
//             src="https://cdn-icons-png.flaticon.com/128/64/64572.png"
//             className="h-[20vh] absolute top-[6%] left-[45%] bg-[#fff] rounded-[50%]"
//             alt=""
//           />
//         </div>
//         <h2 className="text-[#838383] text-[25px] font-bold">
//           User Registration
//         </h2>
//         <div className="flex justify-center flex-col gap-[20px]">
//           <div>
//             <input
//               type="text"
//               value={name}
//               className={classNames(
//                 "bg-[#e9e9e9] outline-blue-600 h-[6vh] w-[20vw] rounded-[5px] p-[10px] font-semibold cursor-black",
//                 { "text-black": name }
//               )}
//               placeholder="Name"
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               value={email}
//               className={classNames(
//                 "bg-[#e9e9e9] outline-blue-600 h-[6vh] w-[20vw] rounded-[5px] p-[10px] font-semibold cursor-black",
//                 { "text-black": email }
//               )}
//               placeholder="Email"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               value={password}
//               className={classNames(
//                 "bg-[#e9e9e9] outline-blue-600 h-[6vh] w-[20vw] rounded-[5px] p-[10px] font-semibold cursor-black",
//                 { "text-black": password }
//               )}
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="text-[17px] text-[#aed1f5] h-[6vh] w-[20vw] bg-blue-600 rounded-[5px]"
//           >
//             Register
//           </button>
//           {message && <p>{message}</p>}
//         </div>
//         <button
//           type="button"
//           onClick={handleSkip}
//           className="text-[17px] text-red-500 h-[6vh] w-[20vw] rounded-[5px]"
//         >
//           Skip Registration
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;
import React, { useState } from "react";
import { registerUser } from "../../api";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData);
      setMessage(result.message);

      if (result.success) {
        localStorage.setItem("isLoggedIn", "true"); // Store login status
        navigate("/"); // Redirect to Home
      }
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("isLoggedIn", "true"); // Store login status
    navigate("/"); // Redirect to home
  };

  return (
    <div className="bg-[#e0e0e0] h-[100vh] w-[100vw] text-[#fff] flex justify-center items-center flex-col relative">
      <form
        onSubmit={handleSubmit}
        className="bg-[#f5f5f5] h-[68vh] w-[30vw] flex justify-center items-center flex-col gap-[15px] rounded-[10px]"
      >
        <h2 className="text-[#838383] text-[25px] font-bold">
          User Registration
        </h2>
        <div className="flex justify-center flex-col gap-[20px]">
          <input
            type="text"
            name="name"
            value={formData.name}
            className="bg-[#e9e9e9] outline-blue-600 h-[6vh] w-[20vw] rounded-[5px] p-[10px]"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            className="bg-[#e9e9e9] outline-blue-600 h-[6vh] w-[20vw] rounded-[5px] p-[10px]"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            className="bg-[#e9e9e9] outline-blue-600 h-[6vh] w-[20vw] rounded-[5px] p-[10px]"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="text-[17px] text-white h-[6vh] w-[20vw] bg-blue-600 rounded-[5px]"
          >
            Register
          </button>
          {message && <p className="text-[#000] text-center">{message}</p>}
          <button
            type="button"
            onClick={handleSkip}
            className="text-[17px] text-red-500 h-[6vh] w-[20vw] rounded-[5px] bg-gray-300"
          >
            Skip Registration
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;

