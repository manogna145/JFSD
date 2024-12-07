import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

const UpdateDiet = () => {
  const location = useLocation();
  const { food } = location.state || {};


  const [userData, setUserData] = useState({
    uid: '',
    fullname: '',
    username: '',
    password: '',
    gender: '',
    age: '',
    email: ''
  });


  const fixedfood = {
    fid: food?.fid || '',
    name: food?.name || '',
    calories: food?.calories || '',
    fat: food?.fat || '',
    protein: food?.protein || '',
    carbohydrates: food?.carbohydrates || '',
  };

 

  const [foodData, setFoodData] = useState({
    fid: '',
    name: '',
    calories: '',
    fat: '',
    protein: '',
    carbohydrates: '',
    quantity: '',
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const setfood = () => {
    if (food) {
      setFoodData({
        fid: food.fid,
        name: food.name || '',
        calories: food.calories || '',
        fat: food.fat || '',
        protein: food.protein || '',
        carbohydrates: food.carbohydrates || '',
        image: food.imageData
          ? `data:${food.imageType};base64,${food.imageData}`
          : '',
      });
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const handlequantity = (e) => {
    const quantity = parseFloat(e.target.value) || 0;
    setFoodData({
      ...foodData,
      quantity: e.target.value,
      calories: ((fixedfood.calories * quantity) / 100).toFixed(2),
      fat: ((fixedfood.fat * quantity) / 100).toFixed(2),
      protein: ((fixedfood.protein * quantity) / 100).toFixed(2),
      carbohydrates: ((fixedfood.carbohydrates * quantity) / 100).toFixed(2),
    });
  };

  // const getuserdata=async ()=>{
  //   try{
  //     console.log("Before getting user data", userData)

  //   const response=await axios.get(`http://localhost:8080/user/getuserdata/${localStorage.getItem('user')}`)
  //   setUserData(response.data)
    
  //   console.log("After getting user data",userData)
  //   }
  //   catch(e){
  //     console.error('Error fetching user data:', e.response?.data || e.message);
  //   }
  // }

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !foodData.name ||
      !foodData.calories ||
      !foodData.fat ||
      !foodData.protein ||
      !foodData.carbohydrates ||
      !foodData.time
    ) {
      alert('Please fill in all required fields.');
      return;
    }
  
    try {
      const userResponse = await axios.get(`http://localhost:8080/user/getuserdata/${localStorage.getItem('user')}`);
      const preparedData = {
        uid: userResponse.data.uid, 
        fid: foodData.fid,
        name: foodData.name,
        calories: foodData.calories,
        fat: foodData.fat,
        protein: foodData.protein,
        carbohydrates: foodData.carbohydrates,
        quantity: foodData.quantity,
        time: foodData.time,
      };
  
      const response = await axios.post(
        'http://localhost:8080/diet/updatediet',
        preparedData,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      alert(response.data.message || 'Diet updated successfully!');
    } catch (error) {
      console.error('Error updating diet:', error);
      alert(error.response?.data?.message || 'Failed to update diet. Please try again.');
    }
  };
  
  
  useEffect(() => {
    setfood();
  }, [location.state]);


  return (
    <div style={styles.form}>
      <h2 style={styles.heading}>Update Diet</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {foodData.image && (
          <div style={styles.fieldContainer}>
            <img
              src={foodData.image}
              alt="Previous food"
              style={styles.imagePreview}
            />
          </div>
        )}

        <div style={styles.fieldContainer}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            id="name"
            style={styles.input}
            type="text"
            name="name"
            value={foodData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.fieldContainer}>
          <label htmlFor="calories" style={styles.label}>Calories:</label>
          <input
            id="calories"
            style={styles.input}
            type="number"
            name="calories"
            value={foodData.calories}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.fieldContainer}>
          <label htmlFor="fat" style={styles.label}>Fat:</label>
          <input
            id="fat"
            style={styles.input}
            type="number"
            name="fat"
            value={foodData.fat}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.fieldContainer}>
          <label htmlFor="protein" style={styles.label}>Protein:</label>
          <input
            id="protein"
            style={styles.input}
            type="number"
            name="protein"
            value={foodData.protein}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.fieldContainer}>
          <label htmlFor="carbohydrates" style={styles.label}>Carbohydrates:</label>
          <input
            id="carbohydrates"
            style={styles.input}
            type="number"
            name="carbohydrates"
            value={foodData.carbohydrates}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.fieldContainer}>
          <label htmlFor="quantity" style={styles.label}>Quantity:</label>
          <input
            id="quantity"
            style={styles.input}
            type="number"
            name="quantity"
            placeholder="Enter Quantity"
            value={foodData.quantity}
            onChange={handlequantity}
            required
          />
        </div>

        <div style={styles.fieldContainer}>
      <label htmlFor="time" style={styles.label}>Time:</label>
      <input
        id="time"
        style={{
          ...styles.input,
          ...timeInputStyles.input,
          ...(isHovered ? timeInputStyles.inputHover : {}),
          ...(isFocused ? timeInputStyles.inputFocus : {}),
        }}
        type="time"
        name="time"
        value={foodData.time}
        onChange={handleChange}  
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required
      />
    </div>

        <button style={styles.button} type="submit">
          Update Diet
        </button>
      </form>
    </div>
  );
};

const timeInputStyles = {
  input: {
    appearance: 'none',
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid transparent',
    borderRadius: '10px',
    background: 'linear-gradient(145deg, rgba(255,255,255,0.8), rgba(240,240,240,0.6))',
    fontSize: '1rem',
    color: '#2c3e50',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
  },
  inputHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 5px 15px rgba(0, 123, 255, 0.2)',
    borderColor: 'rgba(52, 152, 219, 0.3)',
  },
  inputFocus: {
    borderColor: '#3498db',
    boxShadow
: '0 0 0 3px rgba(52, 152, 219, 0.2)',
    background: 'linear-gradient(145deg, white, #f0f0f0)',
  }
};
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2.5rem',
    background: 'linear-gradient(145deg, #f4f7f6, #e6eaf0)',
    borderRadius: '16px',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(0, 0, 0, 0.06)',
    maxWidth: '500px',
    margin: '2rem auto',
    fontFamily: "'Inter', 'Roboto', sans-serif",
    border: '1px solid rgba(255, 255, 255, 0.18)',
    transition: 'transform 0.3s ease',
  },
  heading: {
    marginBottom: '2rem',
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
    letterSpacing: '-0.05em',
    background: 'linear-gradient(45deg, #3498db, #2980b9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  fieldContainer: {
    marginBottom: '1.5rem',
    width: '100%',
    position: 'relative',
  },
  label: {
    display: 'block',
    marginBottom: '0.7rem',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#34495e',
    transition: 'color 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '0.85rem 1.2rem',
    border: '2px solid transparent',
    borderRadius: '10px',
    fontSize: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    outline: 'none',
  },
  inputFocus: {
    borderColor: '#3498db',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(52, 152, 219, 0.2)',
  },
  button: {
    padding: '0.9rem 1.8rem',
    border: 'none',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #3498db, #2980b9)',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 20px rgba(52, 152, 219, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    position: 'relative',
    overflow: 'hidden',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 22px rgba(52, 152, 219, 0.4)',
  },
  imagePreview: {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
    transition: 'transform 0.3s ease',
  }
};


export default UpdateDiet;
