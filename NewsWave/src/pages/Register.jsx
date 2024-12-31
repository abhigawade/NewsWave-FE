"use client"

import * as React from "react"
import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [theme, setTheme] = useState('dark') // You might want to get this from a context or prop

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the registration logic
    console.log("Registration attempt with:", { firstName, lastName, email, password })
  }

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <Card className={`w-full max-w-md ${theme === 'dark' ? 'bg-white text-black' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Register for NewsWave</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-black' : 'text-gray-500'}>
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className={theme === 'dark' ? 'text-text-black' : 'text-gray-700'}>First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className={`w-full ${theme === 'dark' ? 'bg-white text-black' : 'bg-white text-gray-900'}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className={theme === 'dark' ? 'text-black' : 'text-gray-700'}>Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className={`w-full ${theme === 'dark' ? 'bg-white text-black' : 'bg-white text-gray-900'}`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className={theme === 'dark' ? 'text-black' : 'text-gray-700'}>Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full ${theme === 'dark' ? 'bg-white text-black' : 'bg-white text-gray-900'}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className={theme === 'dark' ? 'text-black' : 'text-gray-700'}>Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Create a password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full ${theme === 'dark' ? 'bg-white text-black' : 'bg-white text-gray-900'}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    ) : (
                      <Eye className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <Button className="w-full mt-6" type="submit">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className={`text-sm ${theme === 'dark' ? 'text-black' : 'text-gray-600'}`}>
            Already have an account?{" "}
            <a href="/login" className="font-medium text-blue-500 hover:underline">
              Log in here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

