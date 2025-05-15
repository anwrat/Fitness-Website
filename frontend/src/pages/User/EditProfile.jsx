import { useState, useEffect } from "react";
import AdminNav from "../../components/AdminNav";
import NormalButton from "../../components/NormalButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProfile() {
  const { id } = useParams(); // user ID from URL
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
    avatar: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/details/admin/${id}/`);
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
          avatar: data.details.avatar || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Failed to load profile data.");
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
    setMessage("");

    // Flatten payload: user nested, others at root level
    const payload = {
      user: {
        username: formData.username,
        email: formData.email,
      },
      first_name: formData.first_name,
      last_name: formData.last_name,
      height: formData.height,
      weight: formData.weight,
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      avatar: formData.avatar,
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/details/admin/${id}/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Profile successfully updated!");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      setMessage("Failed to update profile. Please check your inputs.");
    }
  };

  return (
    <div className="w-screen min-h-screen">
      <AdminNav />
      <h1 className="text-black text-center text-3xl font-semibold mb-6">Edit Profile</h1>

      {message && (
        <div
          className={`text-center mb-4 font-medium ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto px-4">
        {[
          { label: "Username", name: "username", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "First Name", name: "first_name", type: "text" },
          { label: "Last Name", name: "last_name", type: "text" },
          { label: "Height (cm)", name: "height", type: "number" },
          { label: "Weight (kg)", name: "weight", type: "number" },
          { label: "Date of Birth", name: "date_of_birth", type: "date" },
          { label: "Avatar URL", name: "avatar", type: "url" },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label htmlFor={field.name} className="block text-gray-700 font-medium">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
              required={field.name === "username" || field.name === "email"}
            />
          </div>
        ))}

        {/* Gender Dropdown */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700 font-medium">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
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
      <div className="w-full max-w-xl mx-auto mt-4 px-4">
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
