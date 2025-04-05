import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginimage from "../assets/loginpage.jpg";
import InputField from "../components/InputField";
import NormalButton from "../components/NormalButton";

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage("Failed to connect to the server");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#0F0505] text-white">
      {/* Left Side: Form and Welcome Text */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <h1 className="text-4xl text-center font-bold">Start Your Journey!</h1>
        <h4 className="text-lg mt-2">Register with email</h4>

        <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 rounded-lg shadow-lg mt-4">
          {message && <p className={message.includes("successful") ? "text-green-500" : "text-red-500"}>{message}</p>}

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <InputField fieldtype="email" name="username" value={formData.username} onChange={handleChange} 
            placeholder="Enter your email"/>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <InputField 
             fieldtype="password"
             name="password"
             value={formData.password}
             onChange={handleChange}
             placeholder="Enter your password"/>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Confirm Password</label>
            <InputField 
            fieldtype="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"/>
          </div>
          <NormalButton btype="submit" text="Register" bgColor="#D90A14" textColor="white" hoverBorder="#D90A14" hoverBg="#0F0505" hoverText="#D90A14" bColor="#D90A14"/>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-[#D90A14] cursor-pointer hover:text-[#78050a] font-bold"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:block w-1/2 h-full relative">
        <img
          src={loginimage}
          alt="Register Illustration"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Overlay Text */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h1 className="font-luckiest text-white text-3xl font-bold">FitForge</h1>
        </div>
      </div>
    </div>
  );
}

export default Register;