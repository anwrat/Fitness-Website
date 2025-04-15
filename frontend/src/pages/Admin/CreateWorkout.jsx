import { useState } from "react";
import AdminNav from "../../components/AdminNav";

function CreateWorkout() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        instructions: "",
        intensity: "medium", // default intensity
        category: "calisthenics", // default category
        muscle_group: "chest", // default muscle group
        image_url: "",
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Send formData as JSON to the backend
        console.log("Form data to be sent to backend:", formData);
        // You can use fetch/axios to send it to the backend here
    };

    return (
        <div className="w-screen min-h-screen">
            <AdminNav />
            <h1 className="text-black text-center">Add Workout</h1>
            
            <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-6">
                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Exercise Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
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

                {/* Intensity */}
                <div className="mb-4">
                    <label htmlFor="intensity" className="block text-gray-700">Intensity</label>
                    <select
                        id="intensity"
                        name="intensity"
                        value={formData.intensity}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
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
                        <option value="calisthenics">Calisthenics</option>
                        <option value="weightlifting">Weightlifting</option>
                        <option value="cardio">Cardio</option>
                    </select>
                </div>

                {/* Muscle Group */}
                <div className="mb-4">
                    <label htmlFor="muscle_group" className="block text-gray-700">Muscle Group</label>
                    <select
                        id="muscle_group"
                        name="muscle_group"
                        value={formData.muscle_group}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
                    >
                        <option value="chest">Chest</option>
                        <option value="back">Back</option>
                        <option value="legs">Legs</option>
                        <option value="arms">Arms</option>
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

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded mt-4"
                >
                    Add Workout
                </button>
            </form>
        </div>
    );
}

export default CreateWorkout;