import React, { useState } from "react";
import classNames from "classnames";
import axios from "axios"; // Import axios for API calls

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="bg-[#e0e0e0] h-screen w-screen flex justify-center items-center">
      <form onSubmit={handleReset} className="bg-[#f5f5f5] h-[40vh] w-[30vw] p-8 flex flex-col justify-center items-center gap-2 rounded-lg shadow-lg">
        <h2 className="text-[#838383] text-2xl font-bold">Reset Password</h2>
        <input
          type="email"
          value={email}
          className={classNames(
            "bg-[#e9e9e9] outline-blue-600 h-[6vh] w-[25vw] rounded-[5px] p-[10px] font-semibold cursor-black",
            { "text-black": email }
          )}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="text-lg text-[#aed1f5] h-12 w-full bg-blue-600 rounded-lg mt-4">
          Reset Password
        </button>
        {message && <p className="text-center text-[#838383] mt-4">{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
