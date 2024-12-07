import React, { useState } from 'react';
import axios from 'axios';

const AddFood = () => {
  const [foodData, setFoodData] = useState({
    name: '',
    calories: '',
    fat: '',
    protein: '',
    carbohydrates: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
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

    // Basic validation
    if (
      !foodData.name ||
      !foodData.calories ||
      !foodData.fat ||
      !foodData.protein ||
      !foodData.carbohydrates
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    // Append food data as a single object
    const food = {
      name: foodData.name,
      calories: foodData.calories,
      fat: foodData.fat,
      protein: foodData.protein,
      carbohydrates: foodData.carbohydrates,
    };
    formData.append('food', new Blob([JSON.stringify(food)], { type: 'application/json' }));

    if (imageFile) formData.append('image', imageFile);

    try {
      const response = await axios.post('http://localhost:8080/food/addfood', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFoodData({
        name: '',
        calories: '',
        fat: '',
        protein: '',
        carbohydrates: '',
      });
      alert(response.data.message || 'Food item added successfully!');
      
      setImageFile(null);
    } catch (error) {
      console.error('There was an error adding the food item!', error);
      alert(error.response?.data?.message || 'Failed to add food item. Please try again.');
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
        <h2 style={styles.heading}>Add Food</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Name"
            value={foodData.name}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="number"
            name="calories"
            placeholder="Calories"
            value={foodData.calories}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="number"
            name="fat"
            placeholder="Fat"
            value={foodData.fat}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="number"
            name="protein"
            placeholder="Protein"
            value={foodData.protein}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="number"
            name="carbohydrates"
            placeholder="Carbohydrates"
            value={foodData.carbohydrates}
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
            Add Food
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

export default AddFood;
