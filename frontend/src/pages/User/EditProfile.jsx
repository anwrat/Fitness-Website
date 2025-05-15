import { useState, useEffect } from "react";
import AdminNav from "../../components/AdminNav";
import NormalButton from "../../components/NormalButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProfile() {
  const { id } = useParams();  // user ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    height: "",
    weight: "",
    date_of_birth: "",
    gender: "",
  });

  useEffect(() => {
    // Fetch existing profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/details/admin/${id}/`);
        // Assuming your API structure:
        // { user: {username, email}, details: {first_name, last_name, ...} }
        const data = response.data;
        setFormData({
          username: data.user.username || "",
          email: data.user.email || "",
          first_name: data.details.first_name || "",
          last_name: data.details.last_name || "",
          height: data.details.height || "",
          weight: data.details.weight || "",
          date_of_birth: data.details.date_of_birth || "",
          gender: data.details.gender || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to load profile data.");
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data payload depending on your API expected format
    const payload = {
      user: {
        username: formData.username,
        email: formData.email,
      },
      details: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        height: formData.height,
        weight: formData.weight,
        date_of_birth: formData.date_of_birth,
        gender: formData.gender,
      },
    };

    try {
      await axios.put(`http://localhost:8000/details/admin/${id}/`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Profile successfully updated!");
      navigate("/profile");  // or wherever you want to redirect
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert("Failed to update profile. Please check your inputs and backend.");
    }
  };

  return (
    <div className="w-screen min-h-screen">
      <AdminNav />
      <h1 className="text-black text-center mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
            required
          />
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-gray-700">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-gray-700">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
          />
        </div>

        {/* Height */}
        <div className="mb-4">
          <label htmlFor="height" className="block text-gray-700">Height (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
          />
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label htmlFor="weight" className="block text-gray-700">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label htmlFor="date_of_birth" className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        {/* Submit Button */}
        <NormalButton
          text="Update Profile"
          btype="submit"
          textColor="white"
          bgColor="green"
          hoverBg="white"
          hoverText="green"
        />
      </form>

      {/* Cancel Button */}
      <div className="w-1/2 mx-auto mt-4">
        <NormalButton
          text="Cancel"
          btype="button"
          textColor="white"
          bgColor="gray"
          hoverBg="white"
          hoverText="gray"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}

export default EditProfile;
