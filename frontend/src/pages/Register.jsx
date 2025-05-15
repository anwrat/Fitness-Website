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
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    height: "",
    weight: "",
    date_of_birth: "",
    gender: "",
    avatar: "",
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

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (!validateEmail(formData.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!validateHeight(formData.height)) {
      setMessage("Please enter a valid height.");
      return;
    }

    if (!validateWeight(formData.weight)) {
      setMessage("Please enter a valid weight.");
      return;
    }

    if (!validateDateOfBirth(formData.date_of_birth)) {
      setMessage("Please enter a valid date of birth in YYYY-MM-DD format.");
      return;
    }

    if (formData.avatar && !validateUrl(formData.avatar)) {
      setMessage("Please enter a valid avatar URL.");
      return;
    }

    const payload = { ...formData };
    delete payload.confirmPassword;

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      setMessage("Failed to connect to the server");
    }
  };

  // Helper functions for validation
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateHeight = (height) => {
    return height > 0 && !isNaN(height);
  };

  const validateWeight = (weight) => {
    return weight > 0 && !isNaN(weight);
  };

  const validateDateOfBirth = (dob) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dob);
  };

  const validateUrl = (url) => {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9.-]+(?:\/[^\s]*)?)$/;
    return regex.test(url);
  };

  return (
    <div className="flex h-screen w-screen bg-[#0F0505] text-white overflow-hidden">
      {/* Left Side - Scrollable Form */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mt-4">Start Your Journey!</h1>
        <h4 className="text-lg mt-2">Register with email</h4>

        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-4 space-y-4">
          {message && (
            <p className={message.includes("successful") ? "text-green-500" : "text-red-500"}>
              {message}
            </p>
          )}

          <InputField
            fieldtype="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            label="Username"
          />
          <InputField
            fieldtype="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            label="Email"
          />
          <InputField
            fieldtype="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            label="Password"
          />
          <InputField
            fieldtype="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            label="Confirm Password"
          />
          <InputField
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter your first name"
            label="First Name"
          />
          <InputField
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter your last name"
            label="Last Name"
          />
          <InputField
            fieldtype="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Height in cm"
            label="Height (cm)"
          />
          <InputField
            fieldtype="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Weight in kg"
            label="Weight (kg)"
          />
          <InputField
            fieldtype="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            label="Date of Birth"
          />

          <div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 text-gray-400 rounded-md border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D90A14] pr-10"
            >
              <option value="" className="text-black">Select gender</option>
              <option value="male" className="text-black">Male</option>
              <option value="female" className="text-black">Female</option>
              <option value="other" className="text-black">Other</option>
            </select>
          </div>

          <InputField
            fieldtype="url"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Enter avatar image URL"
            label="Avatar (URL)"
          />

          <NormalButton
            btype="submit"
            text="Register"
            bgColor="#D90A14"
            textColor="white"
            hoverBorder="#D90A14"
            hoverBg="#0F0505"
            hoverText="#D90A14"
            bColor="#D90A14"
          />
        </form>

        <p className="mt-6 text-sm">
          Already have an account?{" "}
          <span
            className="text-[#D90A14] cursor-pointer hover:text-[#78050a] font-bold"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>

      {/* Right Side - Fixed Image */}
      <div className="hidden md:block md:w-1/2 h-full relative">
        <img src={loginimage} alt="Register Illustration" className="w-full h-full object-cover opacity-40" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h1 className="font-luckiest text-white text-3xl font-bold">FitForge</h1>
        </div>
      </div>
    </div>
  );
}

export default Register;
