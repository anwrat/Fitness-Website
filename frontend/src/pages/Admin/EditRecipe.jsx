import { useState, useEffect } from "react";
import AdminNav from "../../components/AdminNav";
import NormalButton from "../../components/NormalButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        category: "Breakfast",
        image_url: ""
    });

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/recipes/${id}/`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/recipes/${id}/`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Recipe updated:", response.data);
            alert("Recipe successfully updated!");
            navigate("/recipemanagement");
        } catch (error) {
            console.error("Error updating recipe:", error.response?.data || error.message);
            alert("Failed to update recipe. Please check your backend.");
        }
    };

    return (
        <div className="w-screen min-h-screen">
            <AdminNav />
            <h1 className="text-black text-center">Edit Recipe</h1>

            <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-6">
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Recipe Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                    />
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                    <label htmlFor="ingredients" className="block text-gray-700">Ingredients</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                    />
                </div>

                {/* Instructions */}
                <div className="mb-4">
                    <label htmlFor="instructions" className="block text-gray-700">Instructions</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                    />
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                    >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Dessert">Dessert</option>
                    </select>
                </div>

                {/* Image URL */}
                <div className="mb-4">
                    <label htmlFor="image_url" className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                    />
                </div>

                <NormalButton text="Update Recipe" btype="submit" textColor="white" bgColor="green" hoverBg="white" hoverText="green" />
            </form>

            <div className="w-1/2 mx-auto mt-4">
                <NormalButton
                    text="Cancel"
                    btype="button"
                    textColor="white"
                    bgColor="gray"
                    hoverBg="white"
                    hoverText="gray"
                    onClick={() => navigate("/recipemanagement")}
                />
            </div>
        </div>
    );
}

export default EditRecipe;
