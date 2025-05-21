import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to decode JWT payload and get user ID
  const getUserIdFromToken = (token) => {
    try {
      // JWT format: header.payload.signature
      const payload = token.split(".")[1];
      // Decode base64 payload (replace '-' and '_' for standard base64)
      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const data = JSON.parse(jsonPayload);
      return data.user_id || data.id; // adjust key depending on your backend JWT
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
        // Assuming your API requires token for auth, add it to headers
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

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!userData) return null;

  return (
    <div className="w-1/2 min-h-screen p-4 ml-48 relative">
      <h1 className="text-black text-center mb-10">User Profile</h1>

      <table className="text-black text-left w-full border">
        <tbody>
          <tr>
            <th className="border px-2 py-1">Username</th>
            <td className="border px-2 py-1">{userData.user.username}</td>
          </tr>
          <tr>
            <th className="border px-2 py-1">Email</th>
            <td className="border px-2 py-1">{userData.user.email}</td>
          </tr>
          <tr>
            <th className="border px-2 py-1">First Name</th>
            <td className="border px-2 py-1">{userData.details.first_name}</td>
          </tr>
          <tr>
            <th className="border px-2 py-1">Last Name</th>
            <td className="border px-2 py-1">{userData.details.last_name}</td>
          </tr>
          <tr>
            <th className="border px-2 py-1">Height</th>
            <td className="border px-2 py-1">{userData.details.height}</td>
          </tr>
          <tr>
            <th className="border px-2 py-1">Weight</th>
            <td className="border px-2 py-1">{userData.details.weight}</td>
          </tr>
          <tr>
            <th className="border px-2 py-1">Date of Birth</th>
            <td className="border px-2 py-1">{userData.details.date_of_birth}</td>
          </tr>
          <tr>
            <th className="border px-2 py-1">Gender</th>
            <td className="border px-2 py-1">{userData.details.gender}</td>
          </tr>
          <tr>
            <td colSpan={2} className="text-center py-4">
              <button
                onClick={() => navigate(`/editProfile/${userData.user.id}`)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Edit Profile
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Profile;
