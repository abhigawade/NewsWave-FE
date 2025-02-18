"use client"

import { useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { Menu, Search, MoreVertical, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../assets/testlogo4.png"
import axios from "axios"

import { NavLink } from "react-router-dom"
import CommonPopup from "../components/common/CommonPopup"
import UserProfile from "./UserProfile"
import Userpreferences from "./Userpreferences"
import Savedarticles from "./Savedarticles"

export function Navbar({ theme, toggleTheme, setCategory, setSearchQuery, setIsAuthenticated }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isUserpreferencesOpen, setIsUserpreferencesOpen] = useState(false)
  const [isSavedArticlesOpen, setIsSavedArticlesOpen] = useState(false)
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(searchTerm)
  }

  const handleLogout = () => {
    Cookies.remove("accessToken")
    Cookies.remove("refreshToken")
    setIsAuthenticated(false)
    toast.success("Logged out successfully")
    navigate("/login")
  }

  const fetchUserProfile = async () => {
    try {
      const token = Cookies.get("accessToken")
      const response = await axios.get(`http://127.0.0.1:8000/authentication/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 400) {
        throw new Error("Failed to fetch profile")
      }

      const data = response.data
      console.log("User Data:", data)
      setUserData(data)
      setIsProfileOpen(true)
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const navItems = [
    {
      name: "Home",
      action: () => {
        setSearchQuery("")
        setCategory("general")
      },
    },
    { name: "For you", action: () => {} },
    { name: "Trends", action: () => setSearchQuery("trends") },
    { name: "India", action: () => setSearchQuery("india") },
    { name: "Travel", action: () => setSearchQuery("travel") },
    { name: "Food", action: () => setSearchQuery("food") },
    {
      name: "Business",
      action: () => {
        setSearchQuery("")
        setCategory("business")
      },
    },
    {
      name: "Technology",
      action: () => {
        setSearchQuery("")
        setCategory("tech")
      },
    },
    {
      name: "Entertainment",
      action: () => {
        setSearchQuery("")
        setCategory("entertainment")
      },
    },
    {
      name: "Sports",
      action: () => {
        setSearchQuery("")
        setCategory("sports")
      },
    },
    {
      name: "Science",
      action: () => {
        setSearchQuery("")
        setCategory("science")
      },
    },
    {
      name: "Health",
      action: () => {
        setSearchQuery("")
        setCategory("health")
      },
    },
    {
      name: "Politics",
      action: () => {
        setSearchQuery("")
        setCategory("politics")
      },
    },
  ]

  const isDark = theme === "dark"

  return (
    <>
      <CommonPopup isOpen={isProfileOpen} setOpen={setIsProfileOpen}>
        <UserProfile userData={userData} />
      </CommonPopup>

      <CommonPopup isOpen={isUserpreferencesOpen} setOpen={setIsUserpreferencesOpen}>
        <Userpreferences />
      </CommonPopup>

      <CommonPopup isOpen={isSavedArticlesOpen} setOpen={setIsSavedArticlesOpen}>
        <Savedarticles />
      </CommonPopup>

      <nav className={`flex flex-col w-full ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        <div
          className={`flex items-center justify-between px-4 h-16 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${isDark ? "text-white hover:bg-gray-800" : "text-gray-900 hover:bg-gray-100"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <NavLink to="/" className="flex items-center gap-2">
              <img src={logo || "/placeholder.svg"} alt="NewsWave Logo" className="h-8 w-auto" />
              <span className={`text-xl font-medium ${isDark ? "text-white" : "text-gray-900"}`}>NewsWave</span>
            </NavLink>
          </div>

          <form className="hidden md:flex flex-1 mx-4 max-w-2xl relative" onSubmit={handleSearch}>
            <div className="relative w-full flex">
              <div className="relative flex-grow">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                />
                <Input
                  type="search"
                  placeholder="Search for topics, locations & sources"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-500`}
                />
              </div>
              <Button
                type="submit"
                size="icon"
                className={`ml-2 ${
                  isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`${isDark ? "text-white hover:bg-gray-800" : "text-gray-900 hover:bg-gray-100"}`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${isDark ? "text-white hover:bg-gray-800" : "text-gray-900 hover:bg-gray-100"}`}
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={`w-48 ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
              >
                <DropdownMenuItem onClick={() => setIsUserpreferencesOpen(true)}>Your Preferences</DropdownMenuItem>
                <DropdownMenuItem onClick={fetchUserProfile}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsSavedArticlesOpen(true)}>Saved Articles</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row w-full justify-start lg:justify-center items-start lg:items-center border-b ${
            isDark ? "border-gray-700" : "border-gray-200"
          } text-sm overflow-x-auto`}
        >
          {navItems.map((item, index) => (
            <Button
              key={index}
              onClick={item.action}
              className={`w-full lg:w-auto px-4 py-3 lg:py-2 text-left lg:text-center ${
                isDark
                  ? "text-gray-300 hover:text-white hover:bg-gray-800"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              } transition-colors`}
            >
              {item.name}
            </Button>
          ))}
        </div>

        {/* Mobile search bar */}
        <form className="md:hidden flex flex-1 mx-4 my-2 relative" onSubmit={handleSearch}>
          <div className="relative w-full flex">
            <div className="relative flex-grow">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              />
              <Input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                } focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-500`}
              />
            </div>
            <Button
              type="submit"
              size="icon"
              className={`ml-2 ${
                isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </nav>
    </>
  )
}

