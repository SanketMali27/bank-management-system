import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-md text-center w-[400px]">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">
                    Bank Management System
                </h1>

                <p className="text-gray-600 mb-6">
                    Manage your bank account digitally.
                    Create accounts, manage balance, and more.
                </p>

                <Link
                    to="/create-account"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Create Account
                </Link>
            </div>
        </div>
    );
}

export default Home;
