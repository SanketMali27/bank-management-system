import StockCard from "./StockCards";
import { useNavigate } from "react-router-dom";

function Stocks() {
    const navigate = useNavigate();

    const stocks = [
        {
            id: 1,
            name: "Reliance Industries",
            symbol: "RELIANCE",
            price: 2945.30,
            change: 1.24,
        },
        {
            id: 2,
            name: "Tata Consultancy Services",
            symbol: "TCS",
            price: 3870.10,
            change: -0.45,
        },
        {
            id: 3,
            name: "Infosys",
            symbol: "INFY",
            price: 1652.80,
            change: 0.88,
        },
        {
            id: 4,
            name: "HDFC Bank",
            symbol: "HDFCBANK",
            price: 1523.50,
            change: -1.12,
        },
    ];

    return (
        <div className="space-y-8">

            {/* ===== HEADER ===== */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 shadow-xl">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

                <div className="relative">
                    <h2 className="text-3xl font-extrabold tracking-tight">
                        Stocks Market
                    </h2>
                    <p className="text-white/80 mt-1">
                        Invest in top Indian companies
                    </p>
                </div>
            </div>

            {/* ===== STOCKS LIST ===== */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl p-6">
                <div className="grid gap-4">
                    {stocks.map((stock) => (
                        <StockCard
                            key={stock.id}
                            stock={stock}
                            onClick={() =>
                                navigate(`/investments/stocks/${stock.symbol}`)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Stocks;
