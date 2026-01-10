import { useNavigate } from "react-router-dom";

import {
    X,
    Building2,
    Repeat,
    TrendingUp,
    LogOut,
    UserPen
} from "lucide-react";

function Sidebar({ user, isOpen, onClose, onLogout }) {
    const navigate = useNavigate();

    return (
        <>
            {/* ===== BACKDROP ===== */}
            <div
                className={`
                    fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
                    transition-opacity duration-300
                    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
                onClick={onClose}
            />

            {/* ===== SIDEBAR ===== */}
            <aside
                className={`
                    fixed top-0 right-0 z-50 h-full w-80
                    bg-white/80 backdrop-blur-xl
                    shadow-2xl
                    transition-transform duration-300 ease-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                `}
            >
                {/* ===== HEADER ===== */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                    <div>
                        <p className="text-lg font-semibold">
                            {user.fullName}
                        </p>
                        <p className="text-sm text-gray-500">
                            Account • {user.accountNumber}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* ===== NAVIGATION ===== */}
                <nav className="px-4 py-6 space-y-2">

                    <NavItem
                        icon={<Building2 size={18} />}
                        label="Account Details"
                        onClick={() => {
                            console.log("Navigating to account:", user.accountNumber);
                            navigate(`/account/${user.accountNumber}`);
                            onClose();
                        }}
                    />

                    <NavItem
                        icon={<Repeat size={18} />}
                        label="Transactions"
                        onClick={() => {
                            navigate(`/transactions`);
                            onClose();
                        }}
                    />

                    <NavItem
                        icon={<TrendingUp size={18} />}
                        label="Investments"
                        badge="Coming Soon"
                    />
                    <NavItem
                        icon={<UserPen size={18} />}
                        label="Update Profile"

                    />
                </nav>

                {/* ===== FOOTER ===== */}
                <div className="absolute bottom-0 w-full p-4 border-t">
                    <button
                        onClick={onLogout}
                        className="
                            w-full flex items-center gap-3
                            rounded-xl px-4 py-3
                            text-red-600 font-medium
                            hover:bg-red-50 transition
                        "
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}

/* ===== NAV ITEM ===== */

function NavItem({ icon, label, onClick, badge }) {
    return (
        <button
            onClick={onClick}
            className="
                group w-full flex items-center gap-4
                rounded-xl px-4 py-3
                text-gray-700 font-medium
                hover:bg-gray-100 transition
            "
        >
            <span className="text-gray-500 group-hover:text-gray-800">
                {icon}
            </span>

            <span className="flex-1 text-left">
                {label}
            </span>

            {badge && (
                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                    {badge}
                </span>
            )}
        </button>
    );
}

export default Sidebar;
