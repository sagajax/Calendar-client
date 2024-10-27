import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AuthProvider } from './contexts/AuthContext';
import theme from './theme';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Calendar from './components/calendar/Calendar';
import PrivateRoute from './components/PrivateRoute';

//hello

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/calendar" 
                element={
                  <PrivateRoute>
                    <Calendar />
                  </PrivateRoute>
                  // <Calendar />
                } 
              />
              <Route path="/" element={<Navigate to="/calendar" />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;


