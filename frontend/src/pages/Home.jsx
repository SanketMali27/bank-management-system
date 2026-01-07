import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ user, setUser }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const handleLogout = () => {
        // 1️⃣ Clear session
        console.log("Logging out user:", user);
        alert("You have been logged out.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // 2️⃣ Reset user state
        setUser(null);

        // 3️⃣ Close sidebar
        setIsSidebarOpen(false);

        // 4️⃣ Redirect to home
        navigate("/");
    };



    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100">
            {/* NAVBAR */}
            <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center relative z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600"></div>
                    <h1 className="text-xl font-bold text-gray-800">MyBank</h1>
                </div>

                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
                        >
                            {user.fullName.charAt(0)}
                        </button>
                        {/* SIDEBAR OVERLAY */}
                        {isSidebarOpen && (
                            <div
                                className="fixed inset-0 bg-black/40 z-40"
                                onClick={() => setIsSidebarOpen(false)}
                            ></div>
                        )}

                        {/* SIDEBAR */}
                        <div
                            className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
                                }`}
                        >
                            {/* HEADER */}
                            <div className="p-6 border-b flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-lg">{user?.fullName}</p>
                                    <p className="text-sm text-gray-500">
                                        Account No: {user?.accountNumber}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="text-gray-500 text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* MENU */}
                            <div className="p-6 space-y-4">
                                <button
                                    onClick={() => {
                                        navigate(`/account/${user.accountNumber}`);
                                        setIsSidebarOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                                >
                                    🏦 Account Details
                                </button>

                                <button
                                    className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                                >
                                    🔁 Transactions
                                </button>

                                <button
                                    className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                                >
                                    📈 Investments
                                </button>

                                <button
                                    className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                                >
                                    🏠 Loans
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 rounded text-red-600 hover:bg-red-50"
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        </div>

                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="bg-green-600 text-white px-5 py-2 rounded-full"
                    >
                        Become a Member/Login
                    </Link>
                )}
            </nav>

            {/* HERO SECTION */}
            <section
                className="relative h-[85vh] flex items-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1521791136064-7986c2920216')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-blue-900/40"></div>

                <div className="relative z-10 w-full px-6 md:px-16 flex flex-col md:flex-row items-center justify-between">
                    {/* LOGIN CARD */}
                    <div className="bg-white w-full md:w-[380px] rounded-xl shadow-lg p-8 mb-10 md:mb-0">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Online Banking
                        </h2>

                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                            Secure Log In
                        </button>

                        <div className="text-sm text-center text-gray-500 mt-4">
                            <a href="#" className="underline">
                                Forgot username/password?
                            </a>
                        </div>

                        <div className="flex justify-between text-sm text-blue-600 mt-6">
                            <a href="#" className="underline">
                                Set up in 1 minute
                            </a>
                            <a href="#" className="underline">
                                Security Center
                            </a>
                        </div>
                    </div>

                    {/* MARKETING TEXT */}
                    <div className="text-white max-w-xl">
                        <p className="uppercase tracking-wide text-sm mb-3">
                            Celebrating smarter banking
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                            Earn more on <br /> your money
                        </h1>

                        <p className="text-lg mb-8">
                            Open a digital savings account and enjoy higher returns with
                            secure online banking.
                        </p>

                        <Link
                            to="/create-account"
                            className="inline-block bg-green-500 text-white px-8 py-3 rounded-full text-lg hover:bg-green-600 transition"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
