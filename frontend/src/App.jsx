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


  return (
    <BrowserRouter>

      <Navbar
        user={user}
        onProfileClick={() => setIsSidebarOpen(true)}
      />
      <div className="flex">

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

        <main className="flex-1 bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/dashboard"
              element={
                user ? (
                  <DashBoard user={user} />
                ) : (
                  <Login setUser={setUser} />
                )
              }
            />
            <Route
              path="/transactions"
              element={user ? <Transactions /> : <Login setUser={setUser} />}
            />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route
              path="/account/:accountNumber"
              element={<AccountDetails user={user} />}
            />
          </Routes>
          <Routes path="/transfer" element={<TransferMoney />} >
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
