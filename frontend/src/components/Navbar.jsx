import { Link } from "react-router-dom";

function Navbar({ user, onProfileClick }) {
    return (
        <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
            {/* LEFT: Logo + Name */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    M
                </div>
                <h1 className="text-xl font-bold text-gray-800 tracking-wide">
                    MyBank
                </h1>
            </div>

            {/* RIGHT: Profile / Login */}
            {user && (
                <button
                    onClick={onProfileClick}
                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg
                 hover:bg-blue-700 transition shadow-md"
                    title="Open profile"
                >
                    {user.fullName.charAt(0).toUpperCase()}
                </button>
            )}
        </nav>

    );
}


export default Navbar;
