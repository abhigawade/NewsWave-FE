import React from 'react'
import {Link, NavLink} from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    console.log('Newsletter signup submitted')
  }

  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          <div className="space-y-4">
            <h2 className="text-white text-lg font-semibold">NewsWave</h2>
            <p className="text-sm">Stay informed with curated headlines tailored to your interests. Explore stories that matter, from around the world to your local community.</p>
          </div>
          
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Stay Connected</h3>
            
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} NewsWave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

