import { useState, useEffect } from "react";
import axios from "axios";
import UserNav from "../../components/UserNav";
import Footer from "../../components/Footer";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/workouts/");
        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const handleCardClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleClosePopup = () => {
    setSelectedExercise(null);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black">
      <UserNav />
      <div className="flex-grow mt-20 pt-30 px-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Explore Exercises</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {exercises.length > 0 ? (
            exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="rounded-xl overflow-hidden shadow-lg bg-[#1a1a1a] cursor-pointer hover:shadow-red-500/50 transform transition hover:-translate-y-1 hover:scale-105"
                onClick={() => handleCardClick(exercise)}
              >
                <div className="relative">
                  {exercise.image_url ? (
                    <img
                      src={exercise.image_url}
                      alt={exercise.name}
                      className="w-full h-56 object-cover"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-300 flex items-center justify-center text-gray-600">
                      No Image Available
                    </div>
                  )}
                  {/* Exercise Category Overlay */}
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {exercise.category}
                  </span>
                </div>

                {/* Exercise Name Below */}
                <div className="p-4 text-white">
                  <h3 className="text-lg font-semibold truncate">{exercise.name}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-white">No exercises found.</p>
          )}
        </div>
      </div>

      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-white text-lg font-bold"
              onClick={handleClosePopup}
            >
              &times;
            </button>
            <div className="flex flex-col items-center text-white">
              <h3 className="text-2xl font-semibold mb-4">{selectedExercise.name}</h3>
              <p className="text-lg mb-2"><strong>Category:</strong> {selectedExercise.category}</p>
              <p className="text-lg mb-2"><strong>Intensity:</strong> {selectedExercise.intensity}</p>
              <p className="text-lg mb-2"><strong>Muscle Group:</strong> {selectedExercise.muscle_group}</p>
              <p className="text-lg mb-2"><strong>Description:</strong> {selectedExercise.description}</p>
              <p className="text-lg mb-6"><strong>Instructions:</strong> {selectedExercise.instruction}</p>
              <button
                className="px-6 py-2 bg-[#D90A14] text-white rounded-lg hover:bg-[#78050a] transition duration-300"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Exercises;
