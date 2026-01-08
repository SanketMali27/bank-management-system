import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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

                console.log("Login successful");
                console.log("User: " + data.account.fullName);
                // Update app state
                setUser(data.account);

                // Redirect to home page 
                navigate("/dashboard");

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

                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-3 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-black-500"
                        required
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>

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
