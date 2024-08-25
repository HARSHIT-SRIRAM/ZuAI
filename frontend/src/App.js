import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Login from "./Components/Login";
import BlogList from "./Components/BlogList";
import BlogDetail from "./Components/BlogDetail";
import Profile from "./Components/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
