import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserNav from "../../components/UserNav";
import Footer from "../../components/Footer";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserIdFromToken = (token) => {
    try {
      const payload = token.split(".")[1];
      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const data = JSON.parse(jsonPayload);
      return data.user_id || data.id;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please login");
        setLoading(false);
        return;
      }

      const userId = getUserIdFromToken(token);
      if (!userId) {
        setError("Invalid token or user ID not found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/details/admin/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (err) {
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div className="text-center mt-10 text-white">Loading profile...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!userData) return null;

  const { user, details } = userData;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <UserNav />
      
      {/* Profile Content */}
      <div className="max-w-5xl mx-auto mt-20 pt-30 px-10 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center bg-gray-800 rounded-xl shadow-lg p-6">
          <img
            src={details.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-36 h-36 rounded-full border-4 border-white object-cover"
          />
          <div className="md:ml-6 mt-4 md:mt-0">
            <h2 className="text-3xl font-bold">{user.username}</h2>
            <p className="text-gray-300">{user.email}</p>
            <p className="mt-2 text-gray-400">
              {details.first_name} {details.last_name} | {details.gender}
            </p>
            <button
              onClick={() => navigate(`/editProfile/${user.id}`)}
              className="mt-4 px-5 py-2 bg-[#D90A14] text-white rounded-lg hover:bg-[#78050a] transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-8 bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <p className="font-semibold text-gray-400">First Name:</p>
              <p>{details.first_name}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-400">Last Name:</p>
              <p>{details.last_name}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-400">Date of Birth:</p>
              <p>{details.date_of_birth}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-400">Gender:</p>
              <p>{details.gender}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-400">Height:</p>
              <p>{details.height} cm</p>
            </div>
            <div>
              <p className="font-semibold text-gray-400">Weight:</p>
              <p>{details.weight} kg</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;