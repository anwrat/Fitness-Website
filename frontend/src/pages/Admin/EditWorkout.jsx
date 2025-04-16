import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function EditWorkout() {
  const { id } = useParams();  // Get the workout ID from the URL
  const navigate = useNavigate();
  
  const [workout, setWorkout] = useState({
    name: '',
    category: '',
    description: '',
    image_url: ''
  });  // Initialize with empty values for the form
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the workout data when the component mounts
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/workouts/${id}/`);
        setWorkout(response.data);  // Set the fetched workout data
      } catch (err) {
        setError('Error fetching workout data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkout();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8000/api/workouts/${id}/`, workout);  // Send the PUT request to update the workout
      navigate('/workouts');  // Redirect to the workouts page after successful edit
    } catch (err) {
      console.error('Error updating workout', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-workout-form">
      <h2>Edit Workout: {workout.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Workout Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={workout.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={workout.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={workout.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={workout.image_url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditWorkout;
