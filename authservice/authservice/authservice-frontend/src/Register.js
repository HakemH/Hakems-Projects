import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserExists, registerUser } from "./AuthService"; // Import checkUserExists function

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");
        setError(null);

        try {
            // Check if the user already exists
            const userExists = await checkUserExists(email);
            if (userExists) {
                setMessage("User already exists!");
                return;
            }

            // If user doesn't exist, proceed with registration
            const response = await registerUser({ email, password });
            if (response === "User registered successfully!") {
                navigate("/landing", { state: { message: "REGISTER SUCCESS" } });
            } else {
                setMessage(response);
            }
        } catch (error) {
            console.error("Error during registration:", error.message);
            setError("Network error: " + error.message);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleRegister} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Register</button>
            </form>
            {message && (
                <p style={{ color: message === "User already exists!" ? "red" : "green", textAlign: "center" }}>
                    {message}
                </p>
            )}
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
    },
    input: {
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "8px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
    },
};

export default Register;
