"use client"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { API_URL } from "../auth/ApiUrl"
import { motion, AnimatePresence } from "framer-motion"

export function LoginPage({ setIsAuthenticated }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [theme, setTheme] = useState("dark")
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await axios.post(`${API_URL}/authentication/login/`, {
        email,
        password,
      })
      console.log("Response:", response.data)
      Cookies.set("accessToken", response.data.token.access, { expires: 30, path: "/", sameSite: "Lax", secure: false })
      Cookies.set("refreshToken", response.data.token.refresh, {
        expires: 30,
        path: "/",
        sameSite: "Lax",
        secure: false,
      })

      setLoginSuccess(true)
      setIsAuthenticated(true)
      toast.success("Login successful")

      // Delay navigation to show success animation
      setTimeout(() => {
        navigate("/")
      }, 800)
    } catch (error) {
      setIsLoading(false)
      setErrorMessage("Invalid credentials, please try again.")
      console.error(error)
      console.error("Login failed:", error.response?.data || error.message)
      toast.error("Failed to login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-4xl overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <motion.div
              className="md:w-1/2 bg-black p-8 text-white flex flex-col justify-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4">Welcome</h2>
              <p className="text-gray-300 mb-6">Log in to access your personalized NewsWave experience.</p>
              <div className="h-1 w-20 bg-white mb-8"></div>
              <motion.img
                src="/placeholder.svg?height=300&width=300"
                alt="Login illustration"
                className="mx-auto max-w-[200px] filter invert"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </motion.div>
            <motion.div
              className="md:w-1/2 bg-white p-8"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-black">Login to NewsWave</CardTitle>
                <CardDescription className="text-gray-600">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <AnimatePresence mode="wait">
                  {loginSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-10"
                    >
                      <motion.div
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.5, times: [0, 0.6, 1] }}
                      >
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <motion.h3
                        className="text-xl font-bold text-gray-800"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Login Successful!
                      </motion.h3>
                      <motion.p
                        className="text-gray-600 mt-2 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        Redirecting you to dashboard...
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="space-y-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Label htmlFor="email" className="text-gray-700">
                          Email
                        </Label>
                        <Input
                          id="email"
                          placeholder="Enter your email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-gray-100 text-black border-gray-300 focus:border-black focus:ring-black"
                        />
                      </motion.div>
                      <motion.div
                        className="space-y-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <Label htmlFor="password" className="text-gray-700">
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-gray-100 text-black border-gray-300 focus:border-black focus:ring-black"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-600" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-600" />
                            )}
                          </Button>
                        </div>
                      </motion.div>
                      <AnimatePresence>
                        {errorMessage && (
                          <motion.p
                            className="text-sm text-red-500"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0, x: [0, -5, 5, -5, 5, 0] }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{
                              duration: 0.4,
                              x: { duration: 0.5, times: [0, 0.1, 0.3, 0.5, 0.7, 1] },
                            }}
                          >
                            {errorMessage}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Logging in...
                            </span>
                          ) : (
                            "Log in"
                          )}
                        </Button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
              <CardFooter className="p-0 mt-6">
                <motion.p
                  className="text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Don&apos;t have an account?{" "}
                  <motion.a
                    href="/register"
                    className="font-medium text-black hover:underline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register here
                  </motion.a>
                </motion.p>
              </CardFooter>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

