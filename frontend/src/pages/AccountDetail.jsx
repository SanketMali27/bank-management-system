import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AccountDetails() {
    const { accountNumber } = useParams();
    const [account, setAccount] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/account/${accountNumber}`
                );
                const data = await res.json();

                if (data.success) {
                    setAccount(data.account);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("Failed to load account details");
            }
        };

        fetchAccount();
    }, [accountNumber]);

    if (error) {
        return <p className="text-red-600 text-center mt-10">{error}</p>;
    }

    if (!account) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
                <h2 className="text-2xl font-bold mb-6 text-blue-600">
                    Account Details
                </h2>

                <div className="grid grid-cols-2 gap-6">
                    <p><strong>Name:</strong> {account.fullName}</p>
                    <p><strong>Account No:</strong> {account.accountNumber}</p>
                    <p><strong>Email:</strong> {account.email}</p>
                    <p><strong>Phone:</strong> {account.phone}</p>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Address</h3>
                    <p>
                        {account.address.street}, {account.address.city},{" "}
                        {account.address.state} - {account.address.pincode}
                    </p>
                </div>

                <div className="mt-6 bg-green-100 p-4 rounded">
                    <h3 className="text-xl font-semibold text-green-700">
                        Current Balance
                    </h3>
                    <p className="text-2xl font-bold">
                        ₹ {account.balance}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;
