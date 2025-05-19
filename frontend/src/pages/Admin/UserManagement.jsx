import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNav from "../../components/AdminNav";
import NormalButton from "../../components/NormalButton";

function UserManagement() {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/details/admin/");
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch user list");
        console.error("Error fetching users:", error);
      }
    };

    fetchUserList();
  }, []);

  const handleDeleteClick = (userData) => {
    setSelectedUser(userData);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    const userId = selectedUser?.user?.id || selectedUser?.id;

    if (!userId) {
      console.error("Invalid selected user, no id found", selectedUser);
      setError("Invalid user selected for deletion");
      setShowDeletePopup(false);
      setSelectedUser(null);
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/details/admin/${userId}/`);
      setUsers(users.filter((u) => (u.user?.id || u.id) !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    } finally {
      setShowDeletePopup(false);
      setSelectedUser(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setSelectedUser(null);
  };

  return (
    <div className="w-1/2 min-h-screen p-4 ml-48 relative">
      <AdminNav />
      <h1 className="text-black text-center mb-10">User Management</h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <table className="text-black text-left w-full border">
        <thead>
          <tr className="border bg-gray-100">
            <th className="border px-2 py-1">Username</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">First Name</th>
            <th className="border px-2 py-1">Last Name</th>
            <th className="border px-2 py-1">Height</th>
            <th className="border px-2 py-1">Weight</th>
            <th className="border px-2 py-1">Gender</th>
            <th className="border px-2 py-1">Avatar</th>
            <th className="border px-2 py-1 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((userData, index) => {
              const user = userData.user || {};
              const details = userData.details || {};
              const firstName = details.first_name || "N/A";
              const lastName = details.last_name || "N/A";

              const key = user.id ?? index;

              return (
                <tr key={key} className="border">
                  <td className="border px-2 py-1">{user.username}</td>
                  <td className="border px-2 py-1">{user.email}</td>
                  <td className="border px-2 py-1">{firstName}</td>
                  <td className="border px-2 py-1">{lastName}</td>
                  <td className="border px-2 py-1">{details.height}</td>
                  <td className="border px-2 py-1">{details.weight}</td>
                  <td className="border px-2 py-1">{details.gender}</td>
                  <td className="border px-2 py-1">
                    {details.avatar ? (
                      <img
                        src={details.avatar}
                        alt={user.username}
                        className="w-20 h-20 object-cover"
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td className="border px-2 py-1 flex items-center justify-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                      alt="Delete"
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => handleDeleteClick(userData)}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-4">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="w-1/2 mt-6 mx-auto">
        {/* <NormalButton
          text="Create a User"
          bgColor="green"
          onClick={() => navigate("/createUser")}
          textColor="white"
          hoverBg="white"
          hoverText="green"
        /> */}
      </div>

      {showDeletePopup && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4 text-lg text-black font-semibold">
              Are you sure you want to delete{" "}
              <span className="text-red-600">{selectedUser.user?.username || "this user"}</span>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
