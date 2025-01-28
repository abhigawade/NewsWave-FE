"use client";

import React, { useState } from "react";
import { Menu, Search, MoreVertical, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "../assets/testlogo3.png";

import { Link, NavLink } from "react-router-dom";

export function Navbar({ theme, toggleTheme, setCategory, setSearchQuery  }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm); // Update the parent state with the search term
  }

  return (
    <nav
      className={`flex flex-col w-full ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700">
        {/* Logo and mobile menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${
              theme === "dark"
                ? "text-white hover:bg-gray-700"
                : "text-gray-900 hover:bg-gray-200"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="NewsWave Logo"
              className="h-9 w-12" // Adjust height and width as per your design
            />
            <span
              className={`text-xl font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              NewsWave
            </span>
          </NavLink>
        </div>

        {/* Desktop search bar */}
        <form className="hidden md:flex flex-1 mx-4 max-w-2xl relative" onSubmit={handleSearch}>
          <div className="relative w-full flex">
            <div className="relative flex-grow">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <Input
                type="search"
                placeholder="Search for topics, locations & sources"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded"
                    : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 rounded"
                } focus-visible:ring-gray-600`}
              />
            </div>
            <Button
              type="submit"
              size="icon"
              className={`ml-2 ${
                theme === "dark"
                  ? "bg-gray-700 text-white hover:bg-gray-600 rounded"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300 rounded"
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
            className={`${
              theme === "dark" ? "text-white" : "text-gray-900 bg-gray-200"
            } px-2 py-2 rounded-md`}
          >
            Register
          </NavLink>

          <NavLink
            to="/login"
            className={`${
              theme === "dark" ? "text-white" : "text-gray-900 bg-gray-200"
            } px-2 py-2 rounded-md`}
          >
            Login
          </NavLink>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`${
              theme === "dark"
                ? "text-white hover:bg-gray-700"
                : "text-gray-900 hover:bg-gray-200"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`${
                  theme === "dark"
                    ? "text-white hover:bg-gray-700"
                    : "text-gray-900 hover:bg-gray-200"
                }`}
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Send feedback</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Navigation items */}
      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } md:flex w-full justify-center items-center border-b border-gray-700 text-sm`}
      >
        <Button
          onClick={() => setCategory("general")}
          className="px-4 py-3 md:py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
        >
          Home
        </Button>
        <Button className="px-4 py-3 md:py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
          For you
        </Button>
        <Button
         onClick={() => setSearchQuery("trends")}
         className="px-4 py-3 md:py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
          Trends
        </Button>
        <Button 
        onClick={() => setSearchQuery("india")}
        className="px-4 py-3 md:py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
          India
        </Button>
        <Button 
        onClick={() => setSearchQuery("world")}
        className="px-4 py-3 md:py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
          World
        </Button>
        <Button
         onClick={() => setSearchQuery("mumbai")}
         className="px-4 py-3 md:py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
          Local
        </Button>
        <Button
          onClick={() => setCategory("business")}
          className="px-4 py-3 md:py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
        >
          Business
        </Button>
        <Button
          onClick={() => setCategory("technology")}
          className="px-4 py-3 md:py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
        >
          Technology
        </Button>
        <Button
          onClick={() => setCategory("entertainment")}
          className="px-4 py-3 md:py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
        >
          Entertainment
        </Button>
        <Button
          onClick={() => setCategory("sports")}
          className="px-4 py-3 md:py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
        >
          Sports
        </Button>
        <Button
          onClick={() => setCategory("science")}
          className="px-4 py-3 md:py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
        >
          Science
        </Button>
        <Button
          onClick={() => setCategory("health")}
          className="px-4 py-3 md:py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
        >
          Health
        </Button>
      </div>
    </nav>
  );
}
