import { useState, useEffect } from "react";
import {
    ArrowUpRight,
    ArrowDownLeft,
    Send,
    Wallet
} from "lucide-react";

/* ================= TRANSFER PAGE ================= */

function Transfer({ refreshUser }) {
    const [receiverAccount, setReceiverAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);
    const token = localStorage.getItem("token");

    const handleTransfer = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                "http://localhost:5000/api/transactions/transfer",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        receiverAccountNumber: receiverAccount,
                        amount: Number(amount),
                    }),
                }
            );

            const data = await res.json();
            console.log("transfer Money:", data);
            if (data.success) {
                setReceiverAccount("");
                setAmount("");
                await refreshUser();
                setRefreshKey(prev => prev + 1);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Transfer failed:", error);
            alert("Transfer failed");
        }
    };

    return (
        <div className="space-y-10">

            {/* ===== TRANSFER FORM ===== */}
            <div className="max-w-md mx-auto rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Send size={22} />
                    Transfer Money
                </h2>

                <form onSubmit={handleTransfer} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Receiver Account Number"
                        value={receiverAccount}
                        onChange={(e) => setReceiverAccount(e.target.value)}
                        className="
                            w-full rounded-xl border px-4 py-3
                            focus:ring-2 focus:ring-blue-500 outline-none
                        "
                        required
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="
                            w-full rounded-xl border px-4 py-3
                            focus:ring-2 focus:ring-blue-500 outline-none
                        "
                        required
                    />

                    <button
                        className="
                            w-full rounded-xl bg-gradient-to-r
                            from-blue-600 to-indigo-600
                            text-white py-3 font-semibold
                            hover:opacity-90 transition
                        "
                    >
                        Send Money
                    </button>
                </form>
            </div>

            {/* ===== TRANSFER HISTORY ===== */}
            <div className="max-w-3xl mx-auto">
                <TransferHistory refreshKey={refreshKey} />
            </div>
        </div>
    );
}

export default Transfer;

/* ================= TRANSFER HISTORY ================= */

function TransferHistory({ refreshKey }) {
    const [history, setHistory] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await fetch(
                "http://localhost:5000/api/transactions/transfer-history",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await res.json();
            if (data.success) setHistory(data.transactions);
        };

        fetchHistory();
    }, [refreshKey]);

    return (
        <div className="rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Wallet size={22} />
                Transfer History
            </h2>

            {history.length === 0 ? (
                <p className="text-gray-500">No transfers yet.</p>
            ) : (
                <div className="grid gap-4">
                    {history.map(txn => {
                        const isDebit = txn.type === "debit";

                        return (
                            <div
                                key={txn._id}
                                className={`
                                    rounded-xl p-5 shadow-md
                                    flex justify-between items-center
                                    transition hover:shadow-xl
                                    ${isDebit
                                        ? "bg-gradient-to-r from-red-50 to-red-100"
                                        : "bg-gradient-to-r from-green-50 to-green-100"}
                                `}
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`
                                            rounded-full p-3
                                            ${isDebit
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"}
                                        `}
                                    >
                                        {isDebit
                                            ? <ArrowUpRight size={20} />
                                            : <ArrowDownLeft size={20} />}
                                    </div>

                                    <div>
                                        <p className={`font-semibold ${isDebit ? "text-red-700" : "text-green-700"}`}>
                                            {isDebit ? "Sent" : "Received"} ₹{txn.amount}
                                        </p>

                                        <p className="text-sm text-gray-600">
                                            {isDebit
                                                ? `To • ${txn.relatedAccount}`
                                                : `From • ${txn.relatedAccount}`}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(txn.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600">
                                    Balance ₹{txn.balanceAfter}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export { TransferHistory };
