import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Wingo from './pages/Wingo';
import Profile from './pages/Profile';
import Activity from './pages/Activity';
import Wallet from './pages/Wallet';
import AdminDashboard from './pages/AdminDashboard';

const PrivateRoute = ({ children, requireAdmin = false }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token) return <Navigate to="/login" />;
    if (requireAdmin && user.role !== 'ADMIN') return <Navigate to="/" />;

    return children;
};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected Game Routes */}
                <Route 
                    path="/play" 
                    element={
                        <PrivateRoute>
                            <Wingo />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/profile" 
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/activity" 
                    element={
                        <PrivateRoute>
                            <Activity />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/wallet" 
                    element={
                        <PrivateRoute>
                            <Wallet />
                        </PrivateRoute>
                    } 
                />
                
                {/* Admin Route */}
                <Route 
                    path="/admin" 
                    element={
                        <PrivateRoute requireAdmin={true}>
                            <AdminDashboard />
                        </PrivateRoute>
                    } 
                />
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
