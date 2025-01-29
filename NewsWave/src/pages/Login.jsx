"use client"
import axios from "axios";
import Cookies from "js-cookie";
import * as React from "react"
import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [theme, setTheme] = useState('dark') 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/authentication/login/", {
        email,
        password,
      });
      alert("Login successful! Redirecting..."); 
      console.log("Response:", response.data);
      Cookies.set("accessToken", response.data.access, { expires: 30 });
      Cookies.set("refreshToken", response.data.refresh, { expires: 30 });
      // Redirect to the news articles page or fetch articles here

    } catch (error) {
      setErrorMessage("Invalid credentials, please try again.");
      console.error(error);
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className={`flex justify-center py-3 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <Card className={`w-full max-w-md ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login to NewsWave</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-black' : 'text-gray-500'}>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                    placeholder="Enter your password"
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
            <Button className="w-full mt-6 bg-black text-white border border-gray-300 hover:bg-black" type="submit">
              Log in
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className={`text-sm ${theme === 'dark' ? 'text-black' : 'text-gray-600'}`}>
            Don&apos;t have an account?{" "}
            <a href="/register" className="font-medium text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}














// "use client"

// import React, { useState } from "react"
// import { Eye, EyeOff } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// export function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [errorMessage, setErrorMessage] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const response = await fetch("https://your-api-url.com/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       })

//       if (!response.ok) {
//         throw new Error("Login failed")
//       }

//       const data = await response.json()
//       console.log(data)
//       localStorage.setItem("authToken", data.token)
//     } catch (error) {
//       setErrorMessage("Invalid credentials, please try again.")
//       console.error(error)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <Card className="w-full max-w-4xl overflow-hidden shadow-2xl">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-1/2 bg-black p-8 text-white flex flex-col justify-center">
//             <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
//             <p className="text-gray-300 mb-6">Log in to access your personalized NewsWave experience.</p>
//             <div className="h-1 w-20 bg-white mb-8"></div>
//             <img
//               src="/placeholder.svg?height=300&width=300"
//               alt="Login illustration"
//               className="mx-auto max-w-[200px] filter invert"
//             />
//           </div>
//           <div className="md:w-1/2 bg-white p-8">
//             <CardHeader className="p-0 mb-6">
//               <CardTitle className="text-2xl font-bold text-black">Login to NewsWave</CardTitle>
//               <CardDescription className="text-gray-600">Enter your credentials to access your account</CardDescription>
//             </CardHeader>
//             <CardContent className="p-0">
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="text-gray-700">
//                     Email
//                   </Label>
//                   <Input
//                     id="email"
//                     placeholder="Enter your email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="w-full bg-gray-100 text-black border-gray-300 focus:border-black focus:ring-black"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="password" className="text-gray-700">
//                     Password
//                   </Label>
//                   <div className="relative">
//                     <Input
//                       id="password"
//                       placeholder="Enter your password"
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                       className="w-full bg-gray-100 text-black border-gray-300 focus:border-black focus:ring-black"
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="icon"
//                       className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4 text-gray-600" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-gray-600" />
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//                 {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
//                 <Button className="w-full bg-black text-white hover:bg-gray-800 transition-colors" type="submit">
//                   Log in
//                 </Button>
//               </form>
//             </CardContent>
//             <CardFooter className="p-0 mt-6">
//               <p className="text-sm text-gray-600">
//                 Don&apos;t have an account?{" "}
//                 <a href="/register" className="font-medium text-black hover:underline">
//                   Register here
//                 </a>
//               </p>
//             </CardFooter>
//           </div>
//         </div>
//       </Card>
//     </div>
//   )
// }


