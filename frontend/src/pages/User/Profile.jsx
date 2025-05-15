import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  // Replace this with actual user ID from auth or context
  const userId = 26;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/details/admin/${userId}/`);
        setUserData(response.data);
      } catch (err) {
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;

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
          {/* Add more fields if you want */}
          <tr>
            <td colSpan={2} className="text-center py-4">
              <button
                onClick={() => navigate(`/profile/edit/${userId}`)}
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
