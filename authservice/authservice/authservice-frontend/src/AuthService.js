const API_URL = "http://localhost:9090/auth";

export const checkUserExists = async (email) => {
    try {
        const response = await fetch(`${API_URL}/check-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error("Failed to check user existence");
        }

        const data = await response.json();
        return data.exists; // API should return { exists: true/false }
    } catch (error) {
        console.error("Error checking user:", error);
        return false; // Default to false in case of an error
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        return response.text(); // Returns response message as text
    } catch (error) {
        console.error("Error registering user:", error);
        return "Registration failed";
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        return response.text(); // Returns JWT token as text
    } catch (error) {
        console.error("Error logging in:", error);
        return "Login failed";
    }
};
