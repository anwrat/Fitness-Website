import { useState, useEffect } from "react";
import NormalButton from "../../components/NormalButton";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserNav from "../../components/UserNav";
import Footer from "../../components/Footer";

function EditProfile() {
  const { id } = useParams(); // user ID from URL

  const [formData, setFormData] = useState({
    user_id: "", // new
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
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/details/admin/${id}/`);
      const data = response.data;

      setFormData({
        user_id: data.user?.id || "", // set user_id
        username: data.user?.username || "",
        email: data.user?.email || "",
        first_name: data.details?.first_name || "",
        last_name: data.details?.last_name || "",
        height: data.details?.height || "",
        weight: data.details?.weight || "",
        date_of_birth: data.details?.date_of_birth || "",
        gender: data.details?.gender || "",
        avatar: data.details?.avatar || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMessage("Failed to load profile data.");
    }
  };

  useEffect(() => {
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
    setLoading(true);

    const payload = {
      user: {
        id: formData.user_id, // include ID to prevent duplicate validation
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
      await axios.put(`http://localhost:8000/details/admin/${id}/`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Profile successfully updated!");

      setTimeout(async () => {
        await fetchProfile();
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      setMessage("Failed to update profile. Please check your inputs.");
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <UserNav />
      <div className="max-w-5xl mx-auto mt-20 pt-30 px-10 p-6">
        <h1 className="text-center text-3xl font-semibold mb-6">Edit Profile</h1>

        {message && (
          <div
            className={`text-center mb-4 font-medium ${
              message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        {loading ? (
          <div className="text-center text-lg font-semibold mt-10">Updating profile...</div>
        ) : (
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
                <label htmlFor={field.name} className="block font-medium">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  required={["username", "email"].includes(field.name)}
                />
              </div>
            ))}

            {/* Gender Dropdown */}
            <div className="mb-4">
              <label htmlFor="gender" className="block font-medium">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded text-white bg-black"
              >
                <option value="" className="text-black">
                  Select Gender
                </option>
                <option value="male" className="text-black">
                  Male
                </option>
                <option value="female" className="text-black">
                  Female
                </option>
                <option value="other" className="text-black">
                  Other
                </option>
                <option value="prefer_not_to_say" className="text-black">
                  Prefer not to say
                </option>
              </select>
            </div>

            {/* Submit Button */}
            <NormalButton
              text="Update Profile"
              btype="submit"
              bgColor="#D90A14"
              textColor="white"
              hoverBorder="#D90A14"
              hoverBg="#0F0505"
              hoverText="#D90A14"
              bColor="#D90A14"
            />
          </form>
        )}

        {/* Cancel Button */}
        <div className="w-full max-w-xl mx-auto mt-4 px-4">
          <NormalButton
            text="Cancel"
            btype="button"
            textColor="white"
            bgColor="gray"
            hoverBg="white"
            hoverText="gray"
            onClick={() => window.history.back()}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditProfile;