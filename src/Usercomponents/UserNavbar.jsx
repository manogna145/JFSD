import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import logo from '../images/logo.jpg';
import Dashboard from './Dashboard';
import Articles from './Articles';
import UserLogout from './UserLogout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import UserProfile from './UserProfile';
import GetFoods from './Getfoods';
import UpdateDiet from './Updatediet';
import { ListChecks } from 'lucide-react';
import GetExercises from './GetExercises';
import UpdateExercise from './UpdateExercise';


function AdminNavbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {

    setIsDrawerOpen(open);

  };

  const handleLogout = () => {
    localStorage.removeItem('userlogged');
    localStorage.removeItem("adminLogged");
    navigate("/");
    window.location.reload();
  };

  const menuItems = [
    { text: 'Dashboard', path: '/user/dashboard', icon: <DashboardIcon /> },
    { text: 'Update Diet', path: '/user/updatediet', icon: <RestaurantIcon /> },
    { text: 'Articles', path: '/user/articles', icon: <ArticleIcon /> },
    {text:'View Exercises', path:'user/viewexercise',icon:<ListChecks/>},
    { text: 'Profile', path: '/user/profile', icon: <AccountCircleIcon /> },
    { text: 'logout', path: '/user/logout',icon:<LogoutIcon /> },

  ];

  const drawerList = (
    <Box
      sx={{
        width: 250,
        background: '#F4F6FF',  // Apply the color here
        height: '100%',
        color: 'black'
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Link to="/admin/adminhome">
          <img src={logo} alt="Logo" style={{ width: '80%', height: 'auto' }} />
        </Link>
      </Box>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon sx={{ color: 'grey' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
       
      </List>
    </Box>
  );

  return (
    <div>
      {!isDrawerOpen && (
        <Button onClick={toggleDrawer(true)} sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 1201,
          color: 'black',
          backgroundColor: 'lightgrey',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ width: '25px', height: '3px', background: 'black', margin: '4px 0' }} />
            <span style={{ width: '25px', height: '3px', background: 'black', margin: '4px 0' }} />
            <span style={{ width: '25px', height: '3px', background: 'black', margin: '4px 0' }} />
          </div>
        </Button>
      )}

      {/* Drawer Component */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList}
      </Drawer>

      {/* Main Content */}
      <Box sx={{
        marginLeft: isDrawerOpen ? '250px' : '0',
        transition: 'margin-left 0.3s ease',
        p: 3
      }}>
        <Routes>
          <Route path="/user/" element={<Dashboard />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/updatediet" element={<GetFoods />} />
          <Route path="/user/viewexercise" element={<GetExercises />} />

          <Route path="/user/articles" element={<Articles />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/logout" element={<UserLogout />} />
          <Route path="/user/updatedietpage" element={<UpdateDiet/>}/>
          <Route path="/user/updatexercisepage" element={<UpdateExercise/>}/>

        </Routes>

      </Box>
    </div>
  );
}

export default AdminNavbar;
