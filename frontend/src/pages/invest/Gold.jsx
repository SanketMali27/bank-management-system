import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function Gold() {
    // MOCK DATA (later replace with API)
    const goldPrice = 6245; // per gram
    const change = +1.25;

    const returns = [
        { label: "1 Day", value: "+0.4%" },
        { label: "1 Month", value: "+3.2%" },
        { label: "1 Year", value: "+12.8%" },
    ];

    return (
        <div className="space-y-10">

            {/* ===== HEADER ===== */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Gold Investment
                </h1>
                <p className="text-gray-600 mt-1">
                    A safe & long-term investment option
                </p>
            </div>

            {/* ===== PRICE CARD ===== */}
            <div className="rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 p-8 text-white shadow-xl">
                <p className="text-sm opacity-90">
                    Current Gold Price (per gram)
                </p>

                <div className="flex items-center justify-between mt-4">
                    <h2 className="text-4xl font-extrabold">
                        ₹ {goldPrice}
                    </h2>

                    <span
                        className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full
              ${change >= 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                    >
                        {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {change}%
                    </span>
                </div>
            </div>

            {/* ===== RETURNS ===== */}
            <div className="grid grid-cols-3 gap-4">
                {returns.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-xl bg-white p-6 text-center shadow hover:shadow-lg transition"
                    >
                        <p className="text-sm text-gray-500">
                            {item.label}
                        </p>
                        <p className="mt-2 text-xl font-bold text-green-600">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* ===== CHART PLACEHOLDER ===== */}
            <div className="rounded-2xl bg-white p-10 shadow text-center">
                <p className="text-gray-500">
                    📈 Gold price chart coming soon
                </p>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="flex gap-4">
                <button
                    disabled
                    className="flex-1 rounded-lg bg-green-600/60 py-3 text-white font-semibold cursor-not-allowed"
                >
                    Buy Gold
                </button>

                <button
                    disabled
                    className="flex-1 rounded-lg bg-red-600/60 py-3 text-white font-semibold cursor-not-allowed"
                >
                    Sell Gold
                </button>
            </div>
        </div>
    );
}

export default Gold;
