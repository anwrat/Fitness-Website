import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginimage from "../assets/loginpage.jpg";
// //Importing the NormalButton component
import NormalButton from "../components/NormalButton";
import InputField from "../components/InputField"; // Importing the InputField component

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formvalue,setFormData] = useState({
    username: "",
    password: "",
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
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setMessage(data.error || "Invalid credentials");
      } else {
        if(formvalue.username=="admin@gmail.com" && formvalue.password=="admin"){
          localStorage.setItem("token", data.access);
          setMessage("Welcome Admin!!");
          setTimeout(() => navigate("/admindashboard"), 2000);
        }
        else{
          localStorage.setItem("token", data.access);
          setMessage("Login successful! Redirecting...");
          setTimeout(() => navigate("/dashboard"), 2000);
        }
      }
    } catch (error) {
      setMessage("Failed to connect to the server");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#0F0505] text-white">
      {/* Left Side: Form and Welcome Text */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <h1 className="text-4xl font-bold">Welcome!</h1>
        <h4 className="text-lg mt-2">Login with email</h4>

        <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 rounded-lg shadow-lg mt-4">
          {message && <p className={message.includes("successful") ? "text-green-500" : "text-red-500"}>{message}</p>}
          
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <InputField name="username" value={formvalue.username} onChange={handleChange} placeholder="Enter your email" fieldtype="email" showToggle={false}/>
          </div>

          {/* Use InputField component for password */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <InputField
              name="password"
              fieldtype="password"
              value={formvalue.password}
              onChange={handleChange}
              placeholder="Enter your password"
              showToggle={true} 
            />
          </div>

          <p className="w-full flex py-3 cursor-pointer justify-end text-[#D90A14] hover:text-[#78050a]"
            onClick={()=>navigate('/pass')}>
            Forgot your password?
          </p>
          
          <NormalButton btype="submit" text="Login" bgColor="#D90A14" textColor="white" hoverBorder="#D90A14" hoverBg="#0F0505" hoverText="#D90A14" bColor="#D90A14"/>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-[#D90A14] cursor-pointer hover:text-[#78050a] font-bold"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:block w-1/2 h-full relative">
        <img
          src={loginimage}
          alt="Login Illustration"
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

export default Login;