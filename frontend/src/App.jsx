import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import AccountDetails from "./pages/AccountDetail";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Transactions from "./components/Transaction";
import TransferMoney from "./pages/transfer";
function App() {

  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // 🔁 Restore session on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/account/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      setUser(data.account);
      localStorage.setItem("user", JSON.stringify(data.account));
    }
  };



  return (
    <BrowserRouter>

      <Navbar
        user={user}
        onProfileClick={() => setIsSidebarOpen(true)}
      />


      {user && (
        <Sidebar
          user={user}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
            setIsSidebarOpen(false);
          }}
        />
      )}


      <Routes>
        <Route path="/" element={<Home user={user} />} />

        <Route
          path="/dashboard"
          element={user ? <DashBoard user={user} /> : <Login setUser={setUser} />}
        />

        <Route
          path="/transactions"
          element={
            user ? (
              <Transactions refreshUser={refreshUser} />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />

        <Route
          path="/transfer"
          element={user ? <TransferMoney refreshUser={refreshUser} /> : <Login setUser={setUser} />}
        />

        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/create-account" element={<CreateAccount />} />

        <Route
          path="/account/:accountNumber"
          element={<AccountDetails user={user} />}
        />
      </Routes>


    </BrowserRouter>
  );
}

export default App;
