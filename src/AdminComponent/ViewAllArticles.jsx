import React from 'react';

export default function ViewAllArticles() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Add Articles</h1>
      
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5', 
    padding: '20px',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#4caf50', 
    marginBottom: '20px',
    fontFamily: "'Poppins', sans-serif", 
  },
  description: {
    fontSize: '1.2rem',
    color: '#555', 
    textAlign: 'center',
    maxWidth: '600px',
    fontFamily: "'Poppins', sans-serif",
  },
};
