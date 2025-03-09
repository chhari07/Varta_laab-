import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { auth } from "../Firebase/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [photoURL, setPhotoURL] = useState("/default-avatar.png");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.photoURL) {
        setPhotoURL(currentUser.photoURL);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign Out Error:", error.message);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/Features" },
    { name: " How its work", path: "/Howitworks" },
    { name: "Contact Us", path: "/Contactus" },
    { name: "About Us", path: "/aboutus" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-white shadow-md backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-black font-bold text-2xl">"वार्ता-लाप"</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            <ul className="flex gap-6">
              {navItems.map(({ name, path }) => (
                <li key={name}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium transition ${
                        isActive ? "bg-gray-200 text-black rounded-lg" : "text-gray-900 hover:bg-gray-100"
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
              {user && (
                <>
                  <li>
                    <NavLink to="/qa" className="px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
                      Q&A
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/blogs" className="px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
                      Blogs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile" className="px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
                      Profile
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* User Profile & Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative group">
                <Link to="/profile">
                  <img src={photoURL} alt="Profile" className="h-10 w-10 rounded-full border cursor-pointer" />
                </Link>
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition">
                  <button onClick={handleSignOut} className="w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/signup" className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200">
                  Sign up
                </Link>
                <Link to="/login" className="bg-black px-4 py-2 text-sm font-semibold text-white rounded-lg hover:bg-gray-800">
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center gap-4 pb-4">
            {navItems.map(({ name, path }) => (
              <NavLink key={name} to={path} className="block w-full text-center py-2 text-sm font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                {name}
              </NavLink>
            ))}
            {user && (
              <>
                <NavLink to="/qa" className="block w-full text-center py-2 text-sm font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                  Q&A
                </NavLink>
                <NavLink to="/blogs" className="block w-full text-center py-2 text-sm font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                  Blogs
                </NavLink>
                <NavLink to="/profile" className="block w-full text-center py-2 text-sm font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                  Profile
                </NavLink>
                <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="w-full py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-400 rounded-lg">
                  Sign Out
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/signup" className="block w-full text-center py-2 text-sm font-semibold text-gray-900 bg-white ring-1 ring-gray-300 hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                  Sign up
                </Link>
                <Link to="/login" className="block w-full text-center py-2 text-sm font-semibold text-white bg-black rounded-lg" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
