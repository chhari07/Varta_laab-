import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mx-auto w-full bg-black  max-w-container px-4 sm:px-6 lg:px-8">
      <div className="border-t border-slate-900/5 py-10">
        <Link to="/" className="flex items-center justify-center">
          <h1 className="text-white font-bold text-2xl">"वार्ता-लाप"</h1>
        </Link>
        <p className="mt-5 text-center text-sm leading-6 text-white">
          © {new Date().getFullYear()} वार्ता-लाप. All rights reserved.
        </p>
        <div className="mt-8 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-white">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <div className="h-4 w-px bg-slate-500/20"></div>
          <Link to="/changelog">Changelog</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
