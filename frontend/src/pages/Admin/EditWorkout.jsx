import { useState, useEffect } from "react";
import AdminNav from "../../components/AdminNav";
import NormalButton from "../../components/NormalButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditWorkout() {
    const { id } = useParams();  // Get the workout ID from the URL params
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        instruction: "",
        intensity: "Low",
        category: "Calisthenics",
        muscle_group: "Chest",
        image_url: "",
    });

    // Predefined image URLs for each muscle group
    const muscleGroupImages = {
        "Chest": "https://www.flexxp.com/assets/images/body-muscles-images/Chest%20Category%20Image.jpg",
        "Legs": "https://media.istockphoto.com/id/1281915915/photo/human-body-muscular-system-leg-muscles-anatomy.webp?a=1&b=1&s=612x612&w=0&k=20&c=oEa9E8e9PMTDLX6bC5S_DP7q7sk4FK6gbpLqSU2aVPY=",
        "Core": "https://media.istockphoto.com/id/1073134522/photo/3d-illustration-male-anatomy-figure-on-white.jpg?s=612x612&w=0&k=20&c=Gj5vyHjFJnGiOVZu-nnTqcMKvQmWN7a-SttZaWOodYs=",
        "Arms": "https://plus.unsplash.com/premium_photo-1722629715464-43c7bf7bdd41?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJtJTIwbXVzY2xlc3xlbnwwfHwwfHx8MA%3D%3D",
        "Back": "https://media.istockphoto.com/id/155244530/photo/human-back-muscular-system-posterior-view-isolated.jpg?s=612x612&w=0&k=20&c=JBomKkhWRnvRd3No3WmqnPXoHVskO2c4_c7I1m_EZNE=",
    };

    useEffect(() => {
        // Fetch the current workout data by ID
        const fetchWorkout = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/workouts/${id}/`);
                setFormData(response.data);  // Set the fetched workout data into form state
            } catch (error) {
                console.error("Error fetching workout:", error);
            }
        };

        fetchWorkout();
    }, [id]);  // Trigger this effect when the component mounts or the ID changes

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Update image URL when muscle group changes
        if (name === "muscle_group") {
            const imageUrl = muscleGroupImages[value];
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                image_url: imageUrl,  // Update the image URL automatically
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/workouts/${id}/`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Workout updated:", response.data);
            alert("Workout successfully updated!");
            navigate("/exercisemanagement");  // Redirect to exercise management page after update
        } catch (error) {
            console.error("Error updating workout:", error.response?.data || error.message);
            alert("Failed to update workout. Please check your backend.");
        }
    };

    return (
        <div className="w-screen min-h-screen">
            <AdminNav />
            <h1 className="text-black text-center">Edit Workout</h1>

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

                {/* Instruction */}
                <div className="mb-4">
                    <label htmlFor="instruction" className="block text-gray-700">Instruction</label>
                    <textarea
                        id="instruction"
                        name="instruction"
                        value={formData.instruction}
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
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
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
                        <option value="Calisthenics">Calisthenics</option>
                        <option value="Weight Lifting">Weight Lifting</option>
                        <option value="Cardio">Cardio</option>
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
                        <option value="Chest">Chest</option>
                        <option value="Back">Back</option>
                        <option value="Legs">Legs</option>
                        <option value="Arms">Arms</option>
                        <option value="Core">Core</option>
                    </select>
                </div>

                {/* Image URL (hidden, will be auto-generated) */}
                <div className="mb-4">
                    <label htmlFor="image_url" className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        readOnly
                        className="w-full p-2 mt-1 border border-gray-300 rounded text-black bg-gray-100"
                    />
                </div>

                {/* Submit Button */}
                <NormalButton text="Update Workout" btype="submit" textColor="white" bgColor="green" hoverBg="white" hoverText="green"/>
            </form>

            {/* Cancel Button */}
            <div className="w-1/2 mx-auto mt-4">
                <NormalButton
                    text="Cancel"
                    btype="button"
                    textColor="white"
                    bgColor="gray"
                    hoverBg="white"
                    hoverText="gray"
                    onClick={() => navigate("/exercisemanagement")}
                />
            </div>
        </div>
    );
}

export default EditWorkout;
