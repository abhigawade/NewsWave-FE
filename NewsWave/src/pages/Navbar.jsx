"use client"

import React, { useState } from "react"
import { Menu, Search, MoreVertical, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Link, NavLink } from "react-router-dom";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Add your search logic here
    console.log("Search submitted")
  }

  const navItems = [
    { name: "Home", href: "#" },
    { name: "For you", href: "#" },
    { name: "Trends", href: "#" },
    { name: "Politics", href: "#" },
    { name: "India", href: "#" },
    { name: "World", href: "#" },
    { name: "Local", href: "#" },
    { name: "Business", href: "#" },
    { name: "Technology", href: "#" },
    { name: "Entertainment", href: "#" },
    { name: "Sports", href: "#" },
    { name: "Science", href: "#" },
    { name: "Health", href: "#" },
    { name: "Fitness", href: "#" },
  ]

  return (
    <nav className={`flex flex-col w-full ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700">
        {/* Logo and mobile menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-200'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <NavLink to="/" className="flex items-center gap-2">
            <span className={`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>NewsWave</span>
          </NavLink>
        </div>

        {/* Desktop search bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-4 max-w-2xl relative">
          <div className="relative w-full flex">
            <div className="relative flex-grow">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <Input
                type="search"
                placeholder="Search for topics, locations & sources"
                className={`w-full pl-10 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                } focus-visible:ring-gray-600`}
              />
            </div>
            <Button
              type="submit"
              size="icon"
              className={`ml-2 ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/register"
            className={`${theme === 'dark' ? 'text-white bg-gray-700 hover:bg-gray-600' : 'text-gray-900 bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded-md`}
          >
            Sign Up
          </NavLink>
          
          <NavLink
            to="/login"
            className={`${theme === 'dark' ? 'text-white bg-gray-700 hover:bg-gray-600' : 'text-gray-900 bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded-md`}
          >
            Sign In
          </NavLink>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-200'}`}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-200'}`}
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help Center</DropdownMenuItem>
              <DropdownMenuItem>Send feedback</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile search bar */}
      <form onSubmit={handleSearch} className="md:hidden p-4 border-b border-gray-700">
        <div className="relative flex">
          <div className="relative flex-grow">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <Input
              type="search"
              placeholder="Search for topics, locations & sources"
              className={`w-full pl-10 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
              } focus-visible:ring-gray-600`}
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className={`ml-2 ${
              theme === 'dark'
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Navigation items */}
      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:items-center overflow-x-auto whitespace-nowrap border-b border-gray-700 text-sm`}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`px-4 py-3 md:py-2 ${
              theme === 'dark'
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
            } transition-colors`}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  )
}

