import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNav from "../../components/AdminNav";
import NormalButton from "../../components/NormalButton";

function ExerciseManagement() {
    const navigate = useNavigate();

    // States to manage delete confirmation popup and selected exercise for deletion
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [exercises, setExercises] = useState([]);  // State to store fetched exercises

    // Fetch exercises from API when the component mounts
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                // Make an API call to fetch workouts
                const response = await axios.get("http://127.0.0.1:8000/api/workouts/");
                console.log("Fetched exercises:", response.data);  // Log the API response to check the data structure
                setExercises(response.data);  // Set the fetched exercises data to state
            } catch (error) {
                console.error("Error fetching exercises:", error);  // Log error if fetching fails
            }
        };

        fetchExercises();  // Call the function to fetch exercises
    }, []);  // Empty dependency array ensures this runs only once after initial render

    // Function to handle the click on the delete button
    const handleDeleteClick = (exercise) => {
        setSelectedExercise(exercise);  // Store the selected exercise for deletion
        setShowDeletePopup(true);  // Show the delete confirmation popup
    };

    // Function to confirm the deletion and send a request to delete
    const confirmDelete = async () => {
        try {
            // Make an API call to delete the selected exercise by ID
            await axios.delete(`http://127.0.0.1:8000/api/workouts/${selectedExercise.id}/`);
            // Filter out the deleted exercise from the state to update the table view
            setExercises(exercises.filter(exercise => exercise.id !== selectedExercise.id)); 
        } catch (error) {
            console.error("Error deleting exercise:", error);  // Log error if deleting fails
        } finally {
            // Close the popup after deleting or on cancel
            setShowDeletePopup(false);
            setSelectedExercise(null);  // Reset selected exercise state
        }
    };

    // Function to cancel the deletion action and close the popup
    const cancelDelete = () => {
        setShowDeletePopup(false);  // Close the delete popup
        setSelectedExercise(null);  // Reset selected exercise state
    };

    return (
        <div className="w-1/2 min-h-screen p-4 ml-48 relative">
            <AdminNav />
            <h1 className="text-black text-center mb-10">Exercise Management</h1>

            {/* Table to display all exercises */}
            <table className="text-black text-left w-full border">
                <thead>
                    <tr className="border bg-gray-100">
                        <th className="border px-2 py-1">Name</th> {/* Removed ID column */}
                        <th className="border px-2 py-1">Category</th>
                        <th className="border px-2 py-1">Intensity</th>
                        <th className="border px-2 py-1">Muscle Group</th>
                        <th className="border px-2 py-1">Description</th>
                        <th className="border px-2 py-1">Instructions</th>
                        <th className="border px-2 py-1">Image</th> {/* Changed 'Image URL' to 'Image' */}
                        <th className="border px-2 py-1 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through exercises and display each one */}
                    {exercises.length > 0 ? (
                        exercises.map((exercise) => (
                            <tr key={exercise.id} className="border">
                                <td className="border px-2 py-1">{exercise.name}</td>
                                <td className="border px-2 py-1">{exercise.category}</td>
                                <td className="border px-2 py-1">{exercise.intensity}</td>
                                <td className="border px-2 py-1">{exercise.muscle_group}</td>
                                <td className="border px-2 py-1">{exercise.description}</td>
                                <td className="border px-2 py-1">{exercise.instruction}</td>
                                <td className="border px-2 py-1">
                                    {exercise.image_url ? (
                                        <img
                                            src={exercise.image_url} // Display the image from the URL in the database
                                            alt={exercise.name}
                                            className="w-20 h-20 object-cover"
                                        />
                                    ) : (
                                        "No image" // Display this text if no image URL is available
                                    )}
                                </td>
                                <td className="border px-2 py-1 flex items-center justify-center space-x-4">
                                    {/* Edit Button */}
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                                        alt="Edit"
                                        className="w-5 h-5 cursor-pointer"
                                        onClick={() => navigate(`/editWorkout/${exercise.id}`)} // Pass exercise ID in the route
                                    />

                                    {/* Delete Button */}
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                                        alt="Delete"
                                        className="w-5 h-5 cursor-pointer"
                                        onClick={() => handleDeleteClick(exercise)} // Trigger delete confirmation
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-4">No exercises available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Button to create a new workout */}
            <div className="w-1/2 mt-6 mx-auto">
                <NormalButton
                    text="Create a Workout"
                    bgColor="green"
                    onClick={() => navigate("/createWorkout")}
                    textColor="white"
                    hoverBg="white"
                    hoverText="green"
                />
            </div>

            {/* Delete confirmation popup */}
            {showDeletePopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p className="mb-4 text-lg text-black font-semibold">
                            Are you sure you want to delete <span className="text-red-600">{selectedExercise.name}</span>?
                        </p>
                        <div className="flex justify-center space-x-4">
                            {/* Confirm Delete Button */}
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={confirmDelete}  // Confirm deletion action
                            >
                                Yes, Delete
                            </button>
                            {/* Cancel Delete Button */}
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={cancelDelete}  // Close the popup without deleting
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

export default ExerciseManagement;
