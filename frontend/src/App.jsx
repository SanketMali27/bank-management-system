import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import AccountDetails from "./pages/AccountDetail";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
function App() {

  const [user, setUser] = useState(null);

  // 🔁 Restore session on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/account/:accountNumber"
          element={<AccountDetails user={user} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
