
import './App.css';
import React from 'react'
//import AppRouter from './AppConfig/AppRouter'
//import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import AppRouter from './/AppConfig/AppRouter'
import Login from './Login/view'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import {BrowserRouter} from 'react-router-dom'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2', // Default primary color (blue)
      },
      secondary: {
        main: '#dc004e', // Default secondary color (pinkish-red)
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif', // Default font
    },
    spacing: 8, // Default spacing unit (can be used as theme.spacing(1), theme.spacing(2), etc.)
  });
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
      const loginModel = localStorage.getItem('loginModel');
      localStorage.clear();
     <AppRouter/>;
      setIsLogged(!!loginModel);  // Convert to boolean
  }); // Only run this effect on mount

  // Create a default theme


  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <div className="App">
      {!isLogged ? <AppRouter /> : <Login />}
      
      </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
