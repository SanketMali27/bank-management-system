import { useParams } from "react-router-dom";


function StockDetail() {
    const { stockId } = useParams();
    const fakeStocks = [
        {
            id: "1",
            name: "Reliance Power",
            symbol: "RPOWER",
            price: 31.88,
            change: -3.92,
            high: 32.65,
            low: 31.57,
            marketCap: "₹13,189 Cr",
            pe: 44.29,
            roe: "1.81%",
            chart: [30, 31, 32, 31.5, 31.8, 31.2, 31.88],
        },
        {
            id: "ntpc",
            name: "NTPC",
            symbol: "NTPC",
            price: 346.35,
            change: -0.79,
            high: 350,
            low: 340,
            marketCap: "₹3,36,000 Cr",
            pe: 16.2,
            roe: "13.5%",
            chart: [330, 335, 340, 345, 348, 346.35],
        },
    ];

    const stock = fakeStocks.find(s => s.id === stockId);

    if (!stock) return <p>Stock not found</p>;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">{stock.name}</h1>
                <p className="text-gray-500">{stock.symbol}</p>

                <div className="mt-2">
                    <span className="text-3xl font-bold">₹{stock.price}</span>
                    <span
                        className={`ml-3 ${stock.change < 0 ? "text-red-600" : "text-green-600"
                            }`}
                    >
                        {stock.change}%
                    </span>
                </div>
            </div>

            {/* Fake chart */}
            <div className="h-40 bg-black rounded-lg flex items-end p-4 gap-2">
                {stock.chart.map((v, i) => (
                    <div
                        key={i}
                        style={{ height: `${v}px` }}
                        className="w-4 bg-green-500 rounded"
                    />
                ))}
            </div>

            {/* Performance */}
            <div className="grid grid-cols-2 gap-4">
                <div>Day Low: ₹{stock.low}</div>
                <div>Day High: ₹{stock.high}</div>
                <div>Market Cap: {stock.marketCap}</div>
                <div>P/E: {stock.pe}</div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button className="flex-1 bg-green-600 text-white py-3 rounded-lg">
                    Buy
                </button>
                <button className="flex-1 bg-red-600 text-white py-3 rounded-lg">
                    Sell
                </button>
            </div>
        </div>
    );
}

export default StockDetail;
