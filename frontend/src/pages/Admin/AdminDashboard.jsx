import { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../components/AdminNav";

function AdminDashboard() {
  const [userCount, setUserCount] = useState(null);
  const [workoutCount, setWorkoutCount] = useState(null);
  const [recipeCount, setRecipeCount] = useState(null);
  const [error, setError] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState("Hello");

  useEffect(() => {
    // Greeting logic
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("Good morning");
    else if (hour < 18) setTimeOfDay("Good afternoon");
    else setTimeOfDay("Good evening");

    const fetchCounts = async () => {
      try {
        const [usersRes, workoutsRes, recipesRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/details/admin/"),
          axios.get("http://127.0.0.1:8000/api/workouts/"),
          axios.get("http://127.0.0.1:8000/api/recipes/"),
        ]);

        setUserCount(usersRes.data.length);
        setWorkoutCount(workoutsRes.data.length);
        setRecipeCount(recipesRes.data.length);
      } catch (err) {
        console.error("Error fetching counts:", err);
        setError("Failed to fetch dashboard data.");
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen text-white ml-48">
      <AdminNav />
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-black bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
          {timeOfDay}, Admin!
        </h1>

        {error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-center">
            <div className="bg-white/10 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2 text-black">Total Users</h2>
              <p className="text-4xl font-bold text-yellow-400">{userCount ?? "..."}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2 text-black">Total Workouts</h2>
              <p className="text-4xl font-bold text-pink-400">{workoutCount ?? "..."}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2 text-black">Total Recipes</h2>
              <p className="text-4xl font-bold text-green-400">{recipeCount ?? "..."}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;