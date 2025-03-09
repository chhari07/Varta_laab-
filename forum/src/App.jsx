import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/Aboutus";
import Categories from "./components/Categories";
import Trending from "./pages/Trending";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import PrivateRoute from "./routes/PrivateRoute"; 
import { AuthProvider } from "./Firebase/AuthContext"; // Import Firebase Auth Context
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Q_A from "./pages/Q_A";
import Blogs from "./pages/Blogs";
import Contactus from "./pages/Contactus";
import  Features  from "./pages/Features";
import Howitworks from "./components/Howitworks";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="pt-20"> {/* Prevents content from hiding under fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Howitworks" element={<Howitworks />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/qa" element={<Q_A/>} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/Contactus" element={<Contactus/>} />
            <Route path="/Features" element={<Features/>} />
            {/* Protected Dashboard Route */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </Router>

    </AuthProvider>
  );
}

export default App;
