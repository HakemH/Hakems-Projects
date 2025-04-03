import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Landing from "./Landing";
import "./App.css";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    // Function to handle successful login
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    // Function to handle logout
    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div style={{ 
                ...styles.appContainer, 
                backgroundColor: darkMode ? "#0d1117" : "#f5f5f5",
                color: darkMode ? "#c9d1d9" : "#333"
            }}>
                {/* Navigation Bar */}
                <nav style={{
                    ...styles.navbar,
                    backgroundColor: darkMode ? "#161b22" : "#ffffff",
                    borderBottom: darkMode ? "1px solid #30363d" : "1px solid #e1e4e8"
                }}>
                    <div style={styles.navbarBrand}>
                        <span style={{fontSize: "1.5rem", fontWeight: "bold"}}>MyApp</span>
                    </div>
                    <div style={styles.navbarLinks}>
                        {isAuthenticated ? (
                            <>
                                <Link to="/landing" style={{...styles.navLink, color: darkMode ? "#58a6ff" : "#007bff"}}>
                                    Dashboard
                                </Link>
                                <button 
                                    onClick={handleLogout} 
                                    style={{
                                        ...styles.navButton,
                                        backgroundColor: darkMode ? "#21262d" : "#f8f9fa",
                                        color: darkMode ? "#c9d1d9" : "#333"
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{...styles.navLink, color: darkMode ? "#58a6ff" : "#007bff"}}>
                                    Login
                                </Link>
                                <Link to="/register" style={{...styles.navLink, color: darkMode ? "#58a6ff" : "#007bff"}}>
                                    Register
                                </Link>
                            </>
                        )}
                        <div style={styles.toggleContainer} onClick={toggleDarkMode}>
                            <div style={{ ...styles.toggleSwitch, backgroundColor: darkMode ? "#30363d" : "#e1e4e8" }}>
                                <div style={{ ...styles.toggleCircle, transform: darkMode ? "translateX(26px)" : "translateX(2px)" }}>
                                    {darkMode ? "🌙" : "☀️"}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div style={styles.mainContent}>
                    <Routes>
                        <Route path="/" element={isAuthenticated ? <Navigate to="/landing" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
                        <Route path="/register" element={isAuthenticated ? <Navigate to="/landing" /> : <Register />} />
                        <Route path="/login" element={isAuthenticated ? <Navigate to="/landing" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
                        <Route path="/landing" element={isAuthenticated ? <Landing /> : <Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

const styles = {
    appContainer: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: "background-color 0.3s ease, color 0.3s ease",
    },
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem",
        height: "60px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        transition: "background-color 0.3s ease",
    },
    navbarBrand: {
        display: "flex",
        alignItems: "center",
    },
    navbarLinks: {
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
    },
    navLink: {
        textDecoration: "none",
        fontWeight: "500",
        transition: "color 0.3s ease",
    },
    navButton: {
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "500",
        transition: "background-color 0.3s ease, color 0.3s ease",
    },
    mainContent: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
    },
    toggleContainer: {
        width: "50px",
        height: "24px",
        borderRadius: "50px",
        display: "flex",
        alignItems: "center",
        padding: "2px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    toggleSwitch: {
        width: "100%",
        height: "100%",
        borderRadius: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        transition: "background-color 0.3s ease",
    },
    toggleCircle: {
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        transition: "transform 0.3s ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    },
};

export default App;
