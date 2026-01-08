import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CreateAccount() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        street: "",
        password: "",
        city: "",
        state: "",
        pincode: "",
        balance: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            address: {
                street: formData.street,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
            },
            balance: Number(formData.balance),
        };

        try {
            const response = await fetch(
                "http://localhost:5000/api/account/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Account created successfully!");
                console.log("Created Account:", data.account);
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    street: "",
                    password: "",
                    city: "",
                    state: "",
                    pincode: "",
                    balance: ""
                });
                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Server error. Please try again.");
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Create Bank Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* FULL NAME */}
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* EMAIL */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* PHONE */}
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />


                    {/* ADDRESS */}
                    <input
                        type="text"
                        name="street"
                        placeholder="Street Address"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* BALANCE */}
                    <input
                        type="number"
                        name="balance"
                        placeholder="Initial Balance"
                        value={formData.balance}
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateAccount;
