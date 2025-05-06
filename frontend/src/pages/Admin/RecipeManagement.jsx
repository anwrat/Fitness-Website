import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNav from "../../components/AdminNav";
import NormalButton from "../../components/NormalButton";

function RecipeManagement() {
    const navigate = useNavigate();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/recipes/"); // Adjust API endpoint as needed
                console.log("Fetched recipes:", response.data);
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

    const handleDeleteClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowDeletePopup(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/recipes/${selectedRecipe.id}/`);
            setRecipes(recipes.filter(recipe => recipe.id !== selectedRecipe.id));
        } catch (error) {
            console.error("Error deleting recipe:", error);
        } finally {
            setShowDeletePopup(false);
            setSelectedRecipe(null);
        }
    };

    const cancelDelete = () => {
        setShowDeletePopup(false);
        setSelectedRecipe(null);
    };

    return (
        <div className="w-1/2 min-h-screen p-4 ml-48 relative">
            <AdminNav />
            <h1 className="text-black text-center mb-10">Recipe Management</h1>

            <table className="text-black text-left w-full border">
                <thead>
                    <tr className="border bg-gray-100">
                        <th className="border px-2 py-1">Name</th>
                        <th className="border px-2 py-1">Food Type</th>
                        <th className="border px-2 py-1">Nutrition Type</th>
                        <th className="border px-2 py-1">Calories</th>
                        <th className="border px-2 py-1">Ingredients</th>
                        <th className="border px-2 py-1">Instructions</th>
                        <th className="border px-2 py-1">Image</th>
                        <th className="border px-2 py-1 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <tr key={recipe.id} className="border">
                                <td className="border px-2 py-1">{recipe.name}</td>
                                <td className="border px-2 py-1">{recipe.food_type}</td>
                                <td className="border px-2 py-1">{recipe.nutrition_type}</td>
                                <td className="border px-2 py-1">{recipe.calories}</td>
                                <td className="border px-2 py-1">{recipe.ingredients}</td>
                                <td className="border px-2 py-1">{recipe.instruction}</td>
                                <td className="border px-2 py-1">
                                    {recipe.image_url ? (
                                        <img
                                            src={recipe.image_url}
                                            alt={recipe.name}
                                            className="w-20 h-20 object-cover"
                                        />
                                    ) : (
                                        "No image"
                                    )}
                                </td>
                                <td className="border px-2 py-1 flex items-center justify-center space-x-4">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                                        alt="Edit"
                                        className="w-5 h-5 cursor-pointer"
                                        onClick={() => navigate(`/editRecipe/${recipe.id}`)} // Adjust navigation route as needed
                                    />
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                                        alt="Delete"
                                        className="w-5 h-5 cursor-pointer"
                                        onClick={() => handleDeleteClick(recipe)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-4">No recipes available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="w-1/2 mt-6 mx-auto">
                <NormalButton
                    text="Create a Recipe"
                    bgColor="green"
                    onClick={() => navigate("/createRecipe")} // Adjust navigation route as needed
                    textColor="white"
                    hoverBg="white"
                    hoverText="green"
                />
            </div>

            {showDeletePopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p className="mb-4 text-lg text-black font-semibold">
                            Are you sure you want to delete <span className="text-red-600">{selectedRecipe.name}</span>?
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

export default RecipeManagement;
