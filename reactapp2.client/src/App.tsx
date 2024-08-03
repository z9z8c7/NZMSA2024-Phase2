import React from 'react';
import Weather from './pages/Weather';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import UserProfile from './pages/UserProfile';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Weather />} />
                <Route path="/userprofile" element={<UserProfile />} />
            </Routes>
        </Router>
    );
};

export default App;