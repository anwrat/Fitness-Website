import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNav from "../../components/AdminNav";
import NormalButton from "../../components/NormalButton";

function ExerciseManagement() {
    const navigate = useNavigate();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/workouts/");
                console.log("Fetched exercises:", response.data);
                setExercises(response.data);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };

        fetchExercises();
    }, []);

    const handleDeleteClick = (exercise) => {
        setSelectedExercise(exercise);
        setShowDeletePopup(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/workouts/${selectedExercise.id}/`);
            setExercises(exercises.filter(exercise => exercise.id !== selectedExercise.id)); 
        } catch (error) {
            console.error("Error deleting exercise:", error);
        } finally {
            setShowDeletePopup(false);
            setSelectedExercise(null);
        }
    };

    const cancelDelete = () => {
        setShowDeletePopup(false);
        setSelectedExercise(null);
    };

    return (
        <div className="w-1/2 min-h-screen p-4 ml-48 relative">
            <AdminNav />
            <h1 className="text-black text-center mb-10">Exercise Management</h1>

            <table className="text-black text-left w-full border">
                <thead>
                    <tr className="border bg-gray-100">
                        {/* Removed ID column */}
                        <th className="border px-2 py-1">Name</th>
                        <th className="border px-2 py-1">Category</th>
                        <th className="border px-2 py-1">Intensity</th>
                        <th className="border px-2 py-1">Muscle Group</th>
                        <th className="border px-2 py-1">Description</th>
                        <th className="border px-2 py-1">Instructions</th>
                        {/* Changed 'Image URL' to 'Image' */}
                        <th className="border px-2 py-1">Image</th>
                        <th className="border px-2 py-1 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
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
                                            src={exercise.image_url}
                                            alt={exercise.name}
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
                                        onClick={() => navigate(`/editWorkout/${exercise.id}`)}
                                    />
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                                        alt="Delete"
                                        className="w-5 h-5 cursor-pointer"
                                        onClick={() => handleDeleteClick(exercise)}
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

            {showDeletePopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p className="mb-4 text-lg text-black font-semibold">
                            Are you sure you want to delete <span className="text-red-600">{selectedExercise.name}</span>?
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

export default ExerciseManagement;
