import { useNavigate } from "react-router-dom";

function Home({ user }) {
    const navigate = useNavigate();

    return (
        <div>
            {user ? (
                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-blue-600 text-white px-6 py-3 rounded"
                >
                    Go to Dashboard
                </button>
            ) : (
                <p>Please login to continue</p>
            )}
        </div>
    );
}

export default Home;
