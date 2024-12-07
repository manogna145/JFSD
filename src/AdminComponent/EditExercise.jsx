import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

const EditExercise = () => {
  const location = useLocation();
  const { exercise } = location.state || {};
  const [exerciseData, setExerciseData] = useState({
    eid: '',
    exerciseType: '',
    calorieBurn: '',
  });

  const [imageFile, setImageFile] = useState();

  const setExercise = () => {
    if (exercise) {
      setExerciseData({
        eid: exercise.eid,
        exerciseType: exercise.exerciseType || '',
        calorieBurn: exercise.calorieBurn || '',
        image: `data:${exercise.imageType};base64,${exercise.imageData}` || '',
      });
    }
  };

  useEffect(() => {
    setExercise();
  }, [exercise]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 20 * 1024 * 1024) {
        alert('Please select an image smaller than 20MB.');
        setImageFile(null);
        return;
      }
      setImageFile(file);
    } else {
      alert('Please select a valid image file (JPEG, PNG, etc.).');
      setImageFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!exerciseData.exerciseType || !exerciseData.calorieBurn) {
      alert('Please fill in all required fields.');
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append(
      'exercise',
      new Blob([JSON.stringify(exerciseData)], { type: 'application/json' })
    );

    // Append new image file if selected, else rely on previous image
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      // Send the request to the backend
      const response = await axios.post('http://localhost:8080/exercise/editexercise', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(response.data.message || 'Exercise edited successfully!');
    } catch (error) {
      console.error('There was an error editing the exercise!', error);
      alert(error.response?.data?.message || 'Failed to edit exercise. Please try again.');
    }
  };

  return (
    <div style={styles.form}>
      <h2 style={styles.heading}>Edit Exercise</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={styles.fieldContainer}>
          <label htmlFor="exerciseType" style={styles.label}>Exercise Type:</label>
          <input
            id="exerciseType"
            style={styles.input}
            type="text"
            name="exerciseType"
            value={exerciseData.exerciseType}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          <label htmlFor="calorieBurn" style={styles.label}>Calories Burned:</label>
          <input
            id="calorieBurn"
            style={styles.input}
            type="number"
            name="calorieBurn"
            value={exerciseData.calorieBurn}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.fieldContainer}>
          {exerciseData.image && (
            <div style={styles.fieldContainer}>
              <label style={styles.label}>Previous Image:</label>
              <img
                src={exerciseData.image}
                alt="Previous exercise"
                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
              />
            </div>
          )}
          <div style={styles.fieldContainer}>
            <label htmlFor="image" style={styles.label}>
              New Image:
            </label>
            <input
              id="image"
              style={{ ...styles.input, marginBottom: '1.5rem' }}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button style={styles.button} type="submit">
          Edit Exercise
        </button>
      </form>
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '2rem auto',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
  },
  fieldContainer: {
    marginBottom: '1rem',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    fontSize: '1rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    backgroundColor: '#f9f9f9',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default EditExercise;