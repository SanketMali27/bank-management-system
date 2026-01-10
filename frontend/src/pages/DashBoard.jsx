import {
    CreditCard,
    Send,
    Activity,
    FileText,
    PiggyBank,
    Percent,
    TrendingUp,
    Eye,
    EyeOff
} from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
function Dashboard({ user }) {
    const [showBalance, setShowBalance] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {

    })
    return (
        <div className="space-y-10">

            {/* ===== WELCOME CARD ===== */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />

                <div className="relative p-8">
                    <h2 className="text-3xl font-bold">
                        Welcome back, {user.fullName} 👋
                    </h2>

                    <p className="text-white/80 mt-1">
                        Account No • {user.accountNumber}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-4">
                        <div>
                            <p
                                className={`
                        text-4xl font-extrabold tracking-tight
                        transition-all duration-300
                        ${showBalance ? "opacity-100" : "opacity-60"}
                    `}
                            >
                                {showBalance ? `₹ ${user.balance}` : "₹ ••••••"}
                            </p>

                            <p className="text-sm text-white/80">
                                Available Balance
                            </p>
                        </div>

                        <button
                            onClick={() => setShowBalance(!showBalance)}
                            className="
                    flex items-center justify-center
                    rounded-full p-2
                    bg-white/20 hover:bg-white/30
                    transition
                "
                            aria-label={showBalance ? "Hide balance" : "Show balance"}
                        >
                            {showBalance ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* ===== QUICK ACTIONS ===== */}
            <section>
                <h3 className="text-xl font-bold mb-5">
                    Quick Actions
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    <ActionCard
                        title="UPI Transfer"
                        icon={<Send />}
                        color="from-indigo-500 to-blue-600"

                    />
                    <ActionCard
                        title="Net Banking"
                        icon={<CreditCard />}
                        color="from-purple-500 to-fuchsia-600"
                        onClick={() => navigate("/transfer")}
                    />
                    <ActionCard
                        title="Transactions"
                        icon={<Activity />}
                        color="from-orange-500 to-red-500"
                    />
                    <ActionCard
                        title="Pay Bills"
                        icon={<FileText />}
                        color="from-teal-500 to-cyan-600"
                    />
                </div>
            </section>

            {/* ===== BANKING SERVICES ===== */}
            <section>
                <h3 className="text-xl font-bold mb-5">
                    Banking Services
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                        title="Loans"
                        desc="Home, Personal & Education loans"
                        icon={<PiggyBank />}
                    />
                    <InfoCard
                        title="Fixed Deposits"
                        desc="Earn up to 7.5% annual interest"
                        icon={<Percent />}
                    />
                    <InfoCard
                        title="Interest Rates"
                        desc="Latest savings & FD rates"
                        icon={<TrendingUp />}
                    />
                </div>
            </section>

            {/* ===== INVESTMENTS ===== */}
            <section>
                <h3 className="text-xl font-bold mb-5">
                    Investments
                </h3>

                <div className="rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 p-8 text-gray-700 shadow-inner">
                    🚧 Stock market & Mutual Fund investments coming soon.
                </div>
            </section>

        </div>
    );
}

/* ===== REUSABLE COMPONENTS ===== */

function ActionCard({ title, icon, color, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer p-6 rounded-xl text-white bg-gradient-to-r ${color} 
                  hover:scale-105 transition transform`}
        >
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold">{title}</h3>
        </div>
    );
}

export default ActionCard;

function InfoCard({ title, desc, icon }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition">
            <div className="flex items-center gap-4">
                <div className="rounded-xl bg-green-100 p-3 text-green-600">
                    {icon}
                </div>

                <div>
                    <h4 className="font-semibold text-lg">
                        {title}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
