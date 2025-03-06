import { Link } from "react-router-dom"
import { Twitter, Youtube, Facebook, Instagram } from "lucide-react"

export function Footer({ theme }) {
  // Determine styles based on theme
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white"
  const textColor = theme === "dark" ? "text-white" : "text-gray-800"
  const hoverColor = theme === "dark" ? "hover:text-blue-300" : "hover:text-blue-600"

  return (
    <footer className={`${bgColor} ${textColor} py-5`}>
      <div className="container mx-auto px-4">
        {/* Navigation Links */}
        <nav className="flex justify-center space-x-6 mb-5">
          <Link to="/about" className={`${hoverColor} transition-colors`}>
            About us
          </Link>
          <Link to="/contact" className={`${hoverColor} transition-colors`}>
            Contact us
          </Link>
        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-8 mb-5">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${hoverColor} transition-colors`}
          >
            <Twitter size={24} />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${hoverColor} transition-colors`}
          >
            <Youtube size={24} />
            <span className="sr-only">YouTube</span>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${hoverColor} transition-colors`}
          >
            <Facebook size={24} />
            <span className="sr-only">Facebook</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${hoverColor} transition-colors`}
          >
            <Instagram size={24} />
            <span className="sr-only">Instagram</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>Copyright © {new Date().getFullYear()} - All right reserved by NewsWave</p>
        </div>
      </div>
    </footer>
  )
}

