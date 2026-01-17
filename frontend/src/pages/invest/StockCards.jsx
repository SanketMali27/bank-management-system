// src/pages/investments/StockCard.jsx
import { TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
function StockCard({ stock }) {
    const isPositive = stock.change >= 0;
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/stocks/${stock.id}`)}
            className={`
                group cursor-pointer relative overflow-hidden
                rounded-2xl bg-white/80 backdrop-blur-xl
                p-5 shadow-md transition-all duration-300
                hover:-translate-y-1 hover:shadow-2xl
                flex justify-between items-center
            `}
        >
            {/* ===== LEFT ACCENT BAR ===== */}
            <div
                className={`
                    absolute left-0 top-0 h-full w-1
                    ${isPositive ? "bg-green-500" : "bg-red-500"}
                `}
            />

            {/* ===== STOCK INFO ===== */}
            <div className="pl-3">
                <h4 className="text-lg font-semibold text-gray-900">
                    {stock.name}
                </h4>
                <p className="text-sm text-gray-500 tracking-wide">
                    {stock.symbol}
                </p>
            </div>

            {/* ===== PRICE INFO ===== */}
            <div className="text-right space-y-1">
                <p className="text-xl font-extrabold text-gray-900">
                    ₹ {stock.price.toLocaleString()}
                </p>

                <p
                    className={`
                        inline-flex items-center justify-end gap-1
                        text-sm font-semibold
                        ${isPositive ? "text-green-600" : "text-red-600"}
                    `}
                >
                    {isPositive ? (
                        <TrendingUp size={16} />
                    ) : (
                        <TrendingDown size={16} />
                    )}
                    {Math.abs(stock.change)}%
                </p>
            </div>

            {/* ===== HOVER OVERLAY ===== */}
            <div
                className={`
                    pointer-events-none absolute inset-0
                    opacity-0 group-hover:opacity-100
                    transition
                    ${isPositive
                        ? "bg-green-500/5"
                        : "bg-red-500/5"}
                `}
            />
        </div>
    );
}

export default StockCard;
