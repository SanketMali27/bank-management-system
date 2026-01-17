import { useNavigate } from "react-router-dom";
import {
    TrendingUp,
    Coins,
    Landmark,
    BarChart3,
    Repeat
} from "lucide-react";

function Investments() {
    const navigate = useNavigate();

    const investmentOptions = [
        {
            title: "Gold",
            desc: "Safe haven investment with long-term stability",
            icon: <Coins size={32} />,
            risk: "Low",
            route: "/investments/gold",
            color: "from-yellow-400 to-amber-500",
        },
        {
            title: "Silver",
            desc: "Affordable precious metal with growth potential",
            icon: <Coins size={32} />,
            risk: "Medium",
            route: "/investments/silver",
            color: "from-gray-400 to-gray-600",
        },
        {
            title: "Stocks",
            desc: "Invest in top companies and grow wealth",
            icon: <TrendingUp size={32} />,
            risk: "High",
            route: "/investments/stocks",
            color: "from-blue-500 to-indigo-600",
        },
        {
            title: "Mutual Funds",
            desc: "Professionally managed diversified funds",
            icon: <BarChart3 size={32} />,
            risk: "Medium",
            route: "/invest/mutual-funds",
            color: "from-green-500 to-emerald-600",
        },
        {
            title: "SIP",
            desc: "Invest small amounts regularly & build wealth",
            icon: <Repeat size={32} />,
            risk: "Medium",
            route: "/invest/sip",
            color: "from-purple-500 to-fuchsia-600",
        },
    ];

    return (
        <div className="space-y-8">
            {/* ===== HEADER ===== */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Investments
                </h1>
                <p className="text-gray-600 mt-1">
                    Choose where you want to grow your money
                </p>
            </div>

            {/* ===== GRID ===== */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {investmentOptions.map((item) => (
                    <div
                        key={item.title}
                        onClick={() => navigate(item.route)}
                        className={`
              cursor-pointer rounded-2xl p-6 text-white
              bg-gradient-to-br ${item.color}
              shadow-lg hover:shadow-2xl
              transform hover:-translate-y-1 transition
            `}
                    >
                        <div className="flex items-center justify-between">
                            <div className="bg-white/20 p-3 rounded-xl">
                                {item.icon}
                            </div>

                            <span
                                className={`text-xs px-3 py-1 rounded-full 
                  ${item.risk === "Low"
                                        ? "bg-green-100 text-green-800"
                                        : item.risk === "Medium"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                            >
                                {item.risk} Risk
                            </span>
                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            {item.title}
                        </h3>

                        <p className="mt-2 text-sm text-white/90">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Investments;
