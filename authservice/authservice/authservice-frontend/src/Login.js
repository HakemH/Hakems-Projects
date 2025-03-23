import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./AuthService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setError(null);
        console.log("Sending login request:", { email, password });

        try {
            const response = await loginUser(email, password);
            if (response !== "Invalid credentials!") {
                navigate("/landing", { state: { message: "LOGIN SUCCESS" } });
            } else {
                setMessage(response);
            }
        } catch (error) {
            console.error("Network error during login:", error.message);
            setError("Network error: " + error.message);
        }
    };

    const handleRegisterRedirect = () => {
        console.log("Navigating to /register");
        navigate("/register");
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
                <button type="submit" style={styles.button}>Login</button>
                <button type="button" onClick={handleRegisterRedirect} style={styles.button}>
                    Register
                </button>
            </form>
            {message && (
                <p style={{ color: message === "Invalid credentials!" ? "red" : "green", textAlign: "center" }}>
                    {message}
                </p>
            )}
            {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
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

export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "./AuthService";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [message, setMessage] = useState("");
//     const [error, setError] = useState(null);
//     const [isSuccess, setIsSuccess] = useState(false);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setMessage("");
//         setError(null);
//         setIsSuccess(false);
//         console.log("Sending login request:", { email, password });

//         try {
//             const response = await loginUser(email, password);
//             if (response !== "Invalid credentials!") {
//                 setIsSuccess(true);
//                 setMessage("LOGIN SUCCESSFUL");
//                 setTimeout(() => {
//                     navigate("/dashboard"); // Redirect after 2 seconds
//                 }, 2000);
//             } else {
//                 setMessage(response);
//             }
//         } catch (error) {
//             console.error("Network error during login:", error.message);
//             setError("Network error: " + error.message);
//         }
//     };

//     const handleRegisterRedirect = () => {
//         console.log("Navigating to /register");
//         navigate("/register");
//     };

//     return (
//         <div style={styles.container}>
//             {isSuccess ? (
//                 <div style={styles.successMessage}>
//                     <h1 style={styles.successText}>LOGIN SUCCESSFUL</h1>
//                 </div>
//             ) : (
//                 <form onSubmit={handleLogin} style={styles.form}>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         style={styles.input}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         style={styles.input}
//                     />
//                     <button type="submit" style={styles.button}>Login</button>
//                     <button type="button" onClick={handleRegisterRedirect} style={styles.button}>
//                         Register
//                     </button>
//                 </form>
//             )}
//             {!isSuccess && message && (
//                 <p style={{ color: message === "Invalid credentials!" ? "red" : "green", textAlign: "center" }}>
//                     {message}
//                 </p>
//             )}
//             {!isSuccess && error && (
//                 <p style={{ color: "red", textAlign: "center" }}>{error}</p>
//             )}
//         </div>
//     );
// };

// const styles = {
//     container: {
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100%",
//     },
//     form: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "10px",
//         width: "100%",
//     },
//     input: {
//         padding: "8px",
//         borderRadius: "4px",
//         border: "1px solid #ccc",
//     },
//     button: {
//         padding: "8px",
//         borderRadius: "4px",
//         border: "none",
//         backgroundColor: "#007bff",
//         color: "#fff",
//         cursor: "pointer",
//     },
//     successMessage: {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100%",
//     },
//     successText: {
//         fontSize: "48px",
//         fontWeight: "bold",
//         color: "green",
//         textAlign: "center",
//     },
// };

// export default Login;
// // import React, { useState } from "react";
// // import { loginUser } from "./AuthService";

// // const Login = () => {
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [message, setMessage] = useState("");

// //     const handleLogin = async (e) => {
// //         e.preventDefault();
// //         const response = await loginUser(email, password);
// //         setMessage(response);
// //     };

// //     return (
// //         <div>
// //             <h2>Login</h2>
// //             <form onSubmit={handleLogin}>
// //                 <input
// //                     type="email"
// //                     placeholder="Email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                 />
// //                 <input
// //                     type="password"
// //                     placeholder="Password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     required
// //                 />
// //                 <button type="submit">Login</button>
// //             </form>
// //             {message && <p>{message}</p>}
// //         </div>
// //     );
// // };

// // export default Login;