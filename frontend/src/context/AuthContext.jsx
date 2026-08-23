import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Dark mode toggle
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default dark for sleek EdTech vibe
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // User state
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('placement_user');
    return savedUser ? JSON.parse(savedUser) : {
      name: "John Doe",
      email: "john@example.com",
      college: "Institute of Technology & Engineering",
      branch: "Computer Science & Engineering",
      year: "4th Year",
      skills: ["Python", "React", "SQL", "Data Structures"]
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('placement_token');
  });

  // Current Prediction Result state
  const [currentPrediction, setCurrentPrediction] = useState(() => {
    const saved = localStorage.getItem('latest_prediction');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password, userData) => {
    const authUser = userData || {
      name: email.split('@')[0].toUpperCase(),
      email,
      college: "Institute of Technology",
      branch: "Computer Science",
      year: "4th Year",
      skills: ["Python", "JavaScript", "SQL"]
    };
    setUser(authUser);
    setIsAuthenticated(true);
    localStorage.setItem('placement_user', JSON.stringify(authUser));
    localStorage.setItem('placement_token', 'mock-token-xyz');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('placement_user');
    localStorage.removeItem('placement_token');
  };

  const updateUserProfile = (updatedData) => {
    const newProfile = { ...user, ...updatedData };
    setUser(newProfile);
    localStorage.setItem('placement_user', JSON.stringify(newProfile));
  };

  const savePredictionResult = (resultData) => {
    setCurrentPrediction(resultData);
    localStorage.setItem('latest_prediction', JSON.stringify(resultData));
  };

  return (
    <AuthContext.Provider value={{
      darkMode,
      toggleDarkMode,
      user,
      isAuthenticated,
      login,
      logout,
      updateUserProfile,
      currentPrediction,
      savePredictionResult
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
