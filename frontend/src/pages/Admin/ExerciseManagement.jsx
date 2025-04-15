import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../components/AdminNav";
import NormalButton from "../../components/NormalButton";

function ExerciseManagement() {
    const navigate = useNavigate();

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    const exercises = [
        { name: "Burpees", muscleGroup: "Full Body" },
        { name: "Push Ups", muscleGroup: "Chest" },
        // Add more exercises as needed
    ];

    const handleDeleteClick = (exercise) => {
        setSelectedExercise(exercise);
        setShowDeletePopup(true);
    };

    const confirmDelete = () => {
        console.log(`Deleted: ${selectedExercise.name}`);
        setShowDeletePopup(false);
        setSelectedExercise(null);
        // Add your API call here to delete the exercise
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
                        <th className="border px-2 py-1">Name</th>
                        <th className="border px-2 py-1">Muscle Group</th>
                        <th className="border px-2 py-1 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, index) => (
                        <tr key={index} className="border">
                            <td className="border px-2 py-1">{exercise.name}</td>
                            <td className="border px-2 py-1">{exercise.muscleGroup}</td>
                            <td className="border px-2 py-1 flex items-center justify-center space-x-4">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                                    alt="Edit"
                                    className="w-5 h-5 cursor-pointer"
                                    onClick={() => navigate(`/editWorkout`)}
                                />
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                                    alt="Delete"
                                    className="w-5 h-5 cursor-pointer"
                                    onClick={() => handleDeleteClick(exercise)}
                                />
                            </td>
                        </tr>
                    ))}
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

            {/* Delete confirmation popup */}
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