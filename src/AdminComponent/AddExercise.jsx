import React, { useState } from 'react';
import axios from 'axios';

const AddExercise = () => {
  const [exerciseData, setExerciseData] = useState({
    exerciseType: '',
    calorieBurn: '',
  });
  const [imageFile, setImageFile] = useState(null);

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

    if (!exerciseData.exerciseType || !exerciseData.calorieBurn) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    const exercise = {
      exerciseType: exerciseData.exerciseType,
      calorieBurn: exerciseData.calorieBurn,
    };
    formData.append('exercise', new Blob([JSON.stringify(exercise)], { type: 'application/json' }));

    if (imageFile) formData.append('image', imageFile);

    try {
      const response = await axios.post('http://localhost:8080/exercise/addexercise', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setExerciseData({
        exerciseType: '',
        calorieBurn: '',
      });
      alert(response.data.message || 'Exercise item added successfully!');
      
      setImageFile(null);
    } catch (error) {
      console.error('There was an error adding the exercise item!', error);
      alert(error.response?.data?.message || 'Failed to add exercise item. Please try again.');
    }
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #f4f4f9;
            color: #333;
          }
        `}
      </style>
      <div style={styles.form}>
        <h2 style={styles.heading}>Add Exercise</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            style={styles.input}
            type="text"
            name="exerciseType"
            placeholder="Exercise Type"
            value={exerciseData.exerciseType}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="number"
            name="calorieBurn"
            placeholder="Calorie Burn"
            value={exerciseData.calorieBurn}
            onChange={handleChange}
            required
          />
          <input
            style={{ ...styles.input, marginBottom: '1.5rem' }}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            style={styles.button}
            type="submit"
          >
            Add Exercise
          </button>
        </form>
      </div>
    </>
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
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
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

export default AddExercise;
