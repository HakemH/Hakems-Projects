import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Landing from "./Landing"; // Import the new Landing component

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <Router>
            <div style={{ ...styles.container, backgroundColor: darkMode ? "#0d1117" : "#f5f5f5" }}>
                <div style={{ ...styles.card, backgroundColor: darkMode ? "#161b22" : "#ffffff", color: darkMode ? "#c9d1d9" : "#333" }}>
                    <div style={styles.toggleContainer} onClick={toggleDarkMode}>
                        <div style={{ ...styles.toggleSwitch, backgroundColor: darkMode ? "#c9d1d9" : "#f5f5f5" }}>
                            <div style={{ ...styles.toggleCircle, transform: darkMode ? "translateX(26px)" : "translateX(2px)" }}>
                                {darkMode ? "🌙" : "☀️"}
                            </div>
                        </div>
                    </div>

                    <h2 style={styles.heading}>Sign in</h2>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/" element={<Login />} />
                    </Routes>
                    <div style={styles.linkContainer}>
                        <Link to="/register" style={{ ...styles.link, color: darkMode ? "#58a6ff" : "#007bff" }}>
                            New here? Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </Router>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        transition: "background-color 0.3s ease",
    },
    card: {
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        textAlign: "center",
        width: "300px",
        transition: "background-color 0.3s ease, color 0.3s ease",
        position: "relative",
    },
    heading: {
        marginBottom: "20px",
    },
    linkContainer: {
        marginTop: "10px",
    },
    link: {
        textDecoration: "none",
    },
    toggleContainer: {
        width: "50px",
        height: "24px",
        backgroundColor: "#ccc",
        borderRadius: "50px",
        display: "flex",
        alignItems: "center",
        padding: "2px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        marginBottom: "10px",
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
    },
};

export default App;