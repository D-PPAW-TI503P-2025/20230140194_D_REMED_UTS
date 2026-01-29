import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import AdminBooks from "./pages/AdminBooks";
import AddBookForm from "./pages/AddBookForm";
import BorrowLogs from "./pages/BorrowLogs";
import UserBorrow from "./pages/UserBorrow";
import "./App.css";

function App() {
  const [mode, setMode] = useState("public");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="app-wrapper">

      {/* HEADER */}
      <div className="header">
        <h1>Library System</h1>

        <div className="top-bar">
          {(mode === "public") && (
            <div className="search-box">
              <input
                placeholder="Cari buku..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          <div className="role-box">
            <select value={mode} onChange={e => setMode(e.target.value)}>
              <option value="public">Public</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>

      {/* PUBLIC */}
      {mode === "public" && (
        <>
          <h2 className="section-title">Daftar Buku</h2>
          <div className="container">
            <Dashboard searchTerm={searchTerm} />
          </div>
        </>
      )}

      {/* ADMIN */}
      {mode === "admin" && (
        <>
          <h2 className="section-title">Admin Panel</h2>
          <div className="container">
            <AddBookForm />
          </div>

          <div className="container">
            <AdminBooks />
          </div>

          <h2 className="section-title">Borrow Logs</h2>
          <div className="container">
            <BorrowLogs />
          </div>
        </>
      )}


      {/* USER */}
      {mode === "user" && (
        <>
          <h2 className="section-title">User Borrow</h2>
          <div className="container user-section">
            <UserBorrow searchTerm={searchTerm} />
          </div>
        </>
      )}

    </div>
  );
}

export default App;
