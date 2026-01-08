import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/account/login", {
                method: "POST",
                headers: {

                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log(data);
            if (data.success) {

                localStorage.setItem("user", JSON.stringify(data.account));
                localStorage.setItem("token", data.token);

                print("Login successful");
                print("User: " + data.account.fullName);
                console.log("token: " + data.token);
                // Update app state
                setUser(data.account);

                // Redirect to home page 
                navigate("/");

                // go to home
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow w-[350px]"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 mb-4 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Password"
                    className="w-full border p-3 mb-4 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-600 mb-3">{error}</p>}

                <button className="w-full bg-blue-600 text-white py-2 rounded">
                    Login
                </button>
                <div className="mt-4 text-center">
                    <p>
                        Don't have an account?{" "}
                        <a
                            href="/create-account"
                            className="text-blue-600 underline"
                        >
                            Create one
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
