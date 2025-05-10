import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import PasswordReset from './pages/PasswordReset';
import Register from "./pages/Register";
import Dashboard from "./pages/User/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import RecipeManagement from "./pages/Admin/RecipeManagement";
import CreateRecipe from "./pages/Admin/CreateRecipe";
import EditRecipe from "./pages/Admin/EditRecipe";
import ExerciseManagement from "./pages/Admin/ExerciseManagement";
import CreateWorkout from "./pages/Admin/CreateWorkout";
import EditWorkout from "./pages/Admin/EditWorkout";
import Exercises from "./pages/User/Exercises";
import Recipes from "./pages/User/Recipes";
import Tools from "./pages/User/Tools";
import BMICalculator from "./pages/User/Tools/BMICalculator";
import CalorieCalculator from "./pages/User/Tools/CalorieCalculator";

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

          {/* Admin Routes */}
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/recipemanagement" element={<RecipeManagement />} />
          <Route path="/createRecipe" element={<CreateRecipe />} />
          <Route path="/editRecipe/:id" element={<EditRecipe />} />
          <Route path="/exercisemanagement" element={<ExerciseManagement />} />
          <Route path="/createWorkout" element={<CreateWorkout />} />
          <Route path="/editWorkout/:id" element={<EditWorkout />} />
          
          {/* User Routes */}
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/tools" element={<Tools />} />

          {/* Tools */}
          <Route path="/tools/bmi" element={<BMICalculator />} />
          <Route path="/tools/calorie" element={<CalorieCalculator/>} />
        </Routes>
      </BrowserRouter>
    );
}
