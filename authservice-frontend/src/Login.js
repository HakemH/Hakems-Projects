import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./AuthService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setError(null);
        setLoading(true);

        try {
            const response = await loginUser(email, password);

            if (response.token) {
                localStorage.setItem("authToken", response.token); // Save token
                setMessage("Login successful!");
                setTimeout(() => navigate("/landing", { state: { message: "LOGIN SUCCESS" } }), 1500);
            } else {
                setMessage(response);
            }
        } catch (error) {
            console.error("Network error during login:", error.message);
            setError("Network error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleLogin} style={styles.form}>
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
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <button type="button" onClick={() => navigate("/register")} style={styles.button}>
                    Register
                </button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
            {error && <p style={styles.error}>{error}</p>}
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
    message: {
        color: "green",
        textAlign: "center",
    },
    error: {
        color: "red",
        textAlign: "center",
    },
};

export default Login;
