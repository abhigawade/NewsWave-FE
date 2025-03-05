import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Twitter, Youtube, Facebook, Instagram } from "lucide-react";

export function Footer({theme}) {
  return (
    <footer className={`${
      theme === "dark"
        ? "bg-gray-900 text-white py-5"
        : "bg-white text-black py-5"
    }`}>
      <div className="container mx-auto px-4">
        {/* Navigation Links */}
        <nav className="flex justify-center space-x-6 mb-5">
          <Link to="/about" className="hover:text-white transition-colors">
            About us
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/jobs" className="hover:text-white transition-colors">
            Jobs
          </Link>
          <Link
            href="/press-kit"
            className="hover:text-white transition-colors"
          >
            Press kit
          </Link>
        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-8 mb-5">
          <Link
            href="https://twitter.com"
            className="hover:text-white transition-colors"
          >
            <Twitter size={24} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://youtube.com"
            className="hover:text-white transition-colors"
          >
            <Youtube size={24} />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link
            href="https://facebook.com"
            className="hover:text-white transition-colors"
          >
            <Facebook size={24} />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="https://facebook.com"
            className="hover:text-white transition-colors"
          >
            <Instagram size={24} />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            NewsWave Industries Ltd
          </p>
        </div>
      </div>
    </footer>
  );
}
