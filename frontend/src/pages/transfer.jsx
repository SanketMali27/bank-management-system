import { useState } from "react";

function Transfer() {
    const [receiverAccount, setReceiverAccount] = useState("");
    const [amount, setAmount] = useState("");
    const token = localStorage.getItem("token");

    const handleTransfer = async (e) => {
        e.preventDefault();

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

        if (data.success) {
            alert("Transfer successful");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Transfer Money</h2>

            <form onSubmit={handleTransfer} className="space-y-4">
                <input
                    type="text"
                    placeholder="Receiver Account Number"
                    value={receiverAccount}
                    onChange={(e) => setReceiverAccount(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded">
                    Transfer
                </button>
            </form>
        </div>
    );
}

export default Transfer;
