import React from 'react';
import Weather from './pages/Weather';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Weather />} /> {/* 将 Weather 组件作为主页 */}
                {/* 其他路由配置 */}
            </Routes>
        </Router>
    );
};

export default App;