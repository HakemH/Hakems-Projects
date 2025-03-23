import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Landing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const message = location.state?.message || "WELCOME"; // Default message if none provided

    useEffect(() => {
        // Store in session so users stay on this page until they close the browser
        sessionStorage.setItem("userLoggedIn", "true");
    }, []);

    // Logout function
    const handleLogout = () => {
        sessionStorage.removeItem("userLoggedIn");
        navigate("/login");
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.successText}>{message}</h1>
            <button style={styles.button} onClick={handleLogout}>Logout</button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
    },
    successText: {
        fontSize: "48px",
        fontWeight: "bold",
        color: "green",
        textAlign: "center",
        marginBottom: "20px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
    },
};

export default Landing;
