import { useEffect, useState } from "react";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    /* ================= FETCH TRANSACTIONS ================= */
    const fetchTransactions = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/transactions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (data.success) {
                setTransactions(data.transactions);

            } else {
                setError(data.message);
            }
        } catch {
            setError("Failed to load transactions");
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    /* ================= DEPOSIT ================= */
    const handleDeposit = async () => {

        if (!amount || Number(amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }


        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/transactions/deposit", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: Number(amount) }),
            });

            const data = await res.json();
            if (data.success) {
                setAmount("");


                fetchTransactions();
            } else {
                setError(data.message);
            }
        } catch {
            setError("Deposit failed");
        } finally {
            setLoading(false);
        }
    };

    /* ================= WITHDRAW ================= */
    const handleWithdraw = async () => {
        if (!amount || Number(amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/transactions/withdraw", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: Number(amount) }),
            });

            const data = await res.json();
            if (data.success) {
                setAmount("");
                fetchTransactions();
            } else {
                setError(data.message);
            }
        } catch {
            setError("Withdraw failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">

            {/* ===== HEADER ===== */}
            <h1 className="text-2xl font-bold">Transactions</h1>

            {/* ===== ACTIONS ===== */}
            <div className="bg-white p-6 rounded-xl shadow space-y-4 max-w-md">
                <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full border p-3 rounded"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <div className="flex gap-4">
                    <button
                        onClick={handleDeposit}
                        disabled={loading}
                        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Deposit
                    </button>

                    <button
                        onClick={handleWithdraw}
                        disabled={loading}
                        className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                    >
                        Withdraw
                    </button>
                </div>
            </div>

            {/* ===== TRANSACTION HISTORY ===== */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
                {error && <p className="text-red-600 mt-3">{error}</p>}

                {transactions.length === 0 ? (
                    <p className="text-gray-500">No transactions found.</p>
                ) : (
                    <div className="space-y-3">
                        {transactions.map((txn) => (
                            <div
                                key={txn._id}
                                className="flex justify-between border-b pb-2"
                            >
                                <div>
                                    <p className="font-medium">
                                        {txn.type === "credit" ? "➕ Credit" : "➖ Debit"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(txn.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p
                                        className={`font-semibold ${txn.type === "credit"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        ₹{txn.amount}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Bal: ₹{txn.balanceAfter}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Transactions;
