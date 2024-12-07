import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash, Users, Eye } from 'lucide-react';

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalFoodItems: 150,
    totalUsers: 1200,
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ backgroundColor: '#333', color: '#fff', width: '250px', padding: '20px' }}>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2>Admin Dashboard</h2>
        </div>
        <nav style={{ listStyle: 'none', padding: 0 }}>
          <ul>
            
            {/* ... other navigation items with similar inline styles */}
          </ul>
        </nav>
      </div>

      {/* Dashboard Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Welcome to Admin Dashboard</h1>

       

        
      </div>
    </div>
  );
};

export default AdminHome;