import { useState } from "react";
import AdminNav from "../../components/AdminNav";
import NormalButton from "../../components/NormalButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FOOD_TYPE_CHOICES = ["Vegan", "Vegetarian", "Non-Vegetarian"];
const NUTRITION_TYPE_CHOICES = [
    "High Carb",
    "Low Carb",
    "High Protein",
    "Low Protein",
    "Balanced",
    "Very Nutritious",
];

function CreateRecipe() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        calories: "",
        ingredients: "",
        instruction: "",
        image_url: "",
        food_type: "",
        nutrition_type: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/recipes/", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Recipe added:", response.data);
            alert("Recipe successfully added!");
            navigate("/recipemanagement");
        } catch (error) {
            console.error("Error adding recipe:", error.response?.data || error.message);
            alert("Failed to add recipe. Check the backend.");
        }
    };

    return (
        <div className="w-screen min-h-screen">
            <AdminNav />
            <h1 className="text-black text-center">Add Recipe</h1>

            <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-6">

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Recipe Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                        required
                    />
                </div>

                {/* Calories */}
                <div className="mb-4">
                    <label htmlFor="calories" className="block text-gray-700">Calories (per serving)</label>
                    <input
                        type="number"
                        id="calories"
                        name="calories"
                        value={formData.calories}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                        required
                    />
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                    <label htmlFor="ingredients" className="block text-gray-700">Ingredients (comma separated)</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                        required
                    />
                </div>

                {/* Instructions */}
                <div className="mb-4">
                    <label htmlFor="instruction" className="block text-gray-700">Instructions</label>
                    <textarea
                        id="instruction"
                        name="instruction"
                        value={formData.instruction}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                        required
                    />
                </div>

                {/* Image URL */}
                <div className="mb-4">
                    <label htmlFor="image_url" className="block text-gray-700">Image URL</label>
                    <input
                        type="url"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                    />
                </div>

                {/* Food Type */}
                <div className="mb-4">
                    <label htmlFor="food_type" className="block text-gray-700">Food Type</label>
                    <select
                        id="food_type"
                        name="food_type"
                        value={formData.food_type}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                        required
                    >
                        <option value="">-- Select --</option>
                        {FOOD_TYPE_CHOICES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Nutrition Type */}
                <div className="mb-4">
                    <label htmlFor="nutrition_type" className="block text-gray-700">Nutrition Type</label>
                    <select
                        id="nutrition_type"
                        name="nutrition_type"
                        value={formData.nutrition_type}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                        required
                    >
                        <option value="">-- Select --</option>
                        {NUTRITION_TYPE_CHOICES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <NormalButton
                    text="Add Recipe"
                    btype="submit"
                    textColor="white"
                    bgColor="green"
                    hoverBg="white"
                    hoverText="green"
                />
            </form>

            {/* Cancel Button */}
            <div className="w-1/2 mx-auto mt-4">
                <NormalButton
                    text="Cancel"
                    textColor="white"
                    onClick={() => navigate("/recipemanagement")}
                    bgColor="red"
                    hoverBg="white"
                    hoverText="red"
                />
            </div>
        </div>
    );
}

export default CreateRecipe;
