import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* NAVBAR */}
            <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600"></div>
                    <h1 className="text-xl font-bold text-gray-800">MyBank</h1>
                </div>

                <div className="hidden md:flex gap-6 text-gray-600 font-medium">
                    <a href="#">Bank</a>
                    <a href="#">Borrow</a>
                    <a href="#">Invest</a>
                    <a href="#">Protect</a>
                    <a href="#">About</a>
                </div>

                <Link
                    to="/create-account"
                    className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
                >
                    Become a Member
                </Link>
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
