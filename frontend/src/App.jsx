import { useState } from "react";
import "./App.css";

function App() {
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle Register/Login
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isLogin
            ? "http://localhost:5000/api/auth/login"
            : "http://localhost:5000/api/auth/register";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);

                // Store JWT token after login
                if (isLogin && data.token) {
                    localStorage.setItem("token", data.token);
                }

                // Clear form
                setFormData({
                    name: "",
                    email: "",
                    password: ""
                });
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Unable to connect to server");
        }
    };

    return (
        <div className="container">

            <div className="auth-box">

                <h2>
                    {isLogin ? "User Login" : "User Registration"}
                </h2>

                <form onSubmit={handleSubmit}>

                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        {isLogin ? "Login" : "Register"}
                    </button>

                </form>

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

                <p>
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}
                </p>

                <button
                    className="switch-button"
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setMessage("");
                    }}
                >
                    {isLogin ? "Create Account" : "Go to Login"}
                </button>

            </div>

        </div>
    );
}

export default App;