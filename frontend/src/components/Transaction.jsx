import { useEffect, useState } from "react";
import {
    PlusCircle,
    MinusCircle,
    ArrowUpRight,
    ArrowDownLeft,
    Wallet
} from "lucide-react";

function Transactions({ refreshUser }) {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    /* ================= FETCH TRANSACTIONS ================= */
    const fetchTransactions = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/transactions", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) setTransactions(data.transactions);
            else setError(data.message);
        } catch {
            setError("Failed to load transactions");
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    /* ================= DEPOSIT ================= */
    const handleDeposit = async () => {
        if (!amount || Number(amount) <= 0) return alert("Enter valid amount");
        setLoading(true);

        try {
            const res = await fetch(
                "http://localhost:5000/api/transactions/deposit",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ amount: Number(amount) }),
                }
            );
            const data = await res.json();
            if (data.success) {
                setAmount("");
                await refreshUser();
                fetchTransactions();
            } else setError(data.message);
        } catch {
            setError("Deposit failed");
        } finally {
            setLoading(false);
        }
    };

    /* ================= WITHDRAW ================= */
    const handleWithdraw = async () => {
        if (!amount || Number(amount) <= 0) return alert("Enter valid amount");
        setLoading(true);

        try {
            const res = await fetch(
                "http://localhost:5000/api/transactions/withdraw",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ amount: Number(amount) }),
                }
            );
            const data = await res.json();
            if (data.success) {
                setAmount("");
                await refreshUser();
                fetchTransactions();
            } else setError(data.message);
        } catch {
            setError("Withdraw failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10">

            {/* ===== HEADER ===== */}
            <h1 className="text-3xl font-bold flex items-center gap-2">
                <Wallet size={26} />
                Transactions
            </h1>

            {/* ===== ACTION CARD ===== */}
            <div className="max-w-md rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl p-6 space-y-5">
                <input
                    type="number"
                    placeholder="Enter amount"
                    className="
                        w-full rounded-xl border px-4 py-3
                        focus:ring-2 focus:ring-indigo-500 outline-none
                    "
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <div className="flex gap-4">
                    <button
                        onClick={handleDeposit}
                        disabled={loading}
                        className="
                            flex-1 flex items-center justify-center gap-2
                            rounded-xl bg-gradient-to-r
                            from-green-500 to-emerald-600
                            text-white py-3 font-semibold
                            hover:opacity-90 transition
                        "
                    >
                        <PlusCircle size={18} />
                        Deposit
                    </button>

                    <button
                        onClick={handleWithdraw}
                        disabled={loading}
                        className="
                            flex-1 flex items-center justify-center gap-2
                            rounded-xl bg-gradient-to-r
                            from-red-500 to-rose-600
                            text-white py-3 font-semibold
                            hover:opacity-90 transition
                        "
                    >
                        <MinusCircle size={18} />
                        Withdraw
                    </button>
                </div>
            </div>

            {/* ===== TRANSACTION HISTORY ===== */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6">
                    Transaction History
                </h2>

                {error && <p className="text-red-600 mb-4">{error}</p>}

                {transactions.length === 0 ? (
                    <p className="text-gray-500">No transactions found.</p>
                ) : (
                    <div className="grid gap-4">
                        {transactions.map(txn => {
                            const isCredit = txn.type === "credit";

                            return (
                                <div
                                    key={txn._id}
                                    className={`
                                        flex justify-between items-center
                                        rounded-xl p-5 shadow-md
                                        transition hover:shadow-xl
                                        ${isCredit
                                            ? "bg-gradient-to-r from-green-50 to-emerald-100"
                                            : "bg-gradient-to-r from-red-50 to-rose-100"}
                                    `}
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`
                                                rounded-full p-3
                                                ${isCredit
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"}
                                            `}
                                        >
                                            {isCredit
                                                ? <ArrowDownLeft size={20} />
                                                : <ArrowUpRight size={20} />}
                                        </div>

                                        <div>
                                            <p className="font-semibold">
                                                {isCredit ? "Credit" : "Debit"}
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                {txn.description}
                                            </p>

                                            {txn.relatedAccount && (
                                                <p className="text-xs text-gray-500">
                                                    {isCredit ? "From" : "To"} • {txn.relatedAccount}
                                                </p>
                                            )}

                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(txn.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p
                                            className={`text-lg font-bold ${isCredit
                                                ? "text-green-700"
                                                : "text-red-700"
                                                }`}
                                        >
                                            ₹{txn.amount}
                                        </p>

                                        <p className="text-sm text-gray-600">
                                            Bal ₹{txn.balanceAfter}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Transactions;
