//The file that will handle all the routing in our website
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import PasswordReset from './pages/PasswordReset';
import Register from "./pages/Register";
import Dashboard from "./pages/User/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import RecipeManagement from "./pages/Admin/RecipeManagement";
import ExerciseManagement from "./pages/Admin/ExerciseManagement";
import CreateWorkout from "./pages/Admin/CreateWorkout";
import EditWorkout from "./pages/Admin/EditWorkout";

export default function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pass" element={<PasswordReset />} />
          <Route path="/register" element={<Register />} />
          {/* User Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* For Admin */}
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/recipemanagement" element={<RecipeManagement />} />
          <Route path="/exercisemanagement" element={<ExerciseManagement />} />
          <Route path="/createWorkout" element={<CreateWorkout />} />
          <Route path="/editWorkout" element={<EditWorkout />} />
        </Routes>
      </BrowserRouter>
    );
  }