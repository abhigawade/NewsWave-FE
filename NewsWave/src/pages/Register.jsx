import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

export function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("dark"); // You might want to get this from a context or prop
  const [loading, setLoading] = useState(false); // For handling loading state
  const [error, setError] = useState(""); // For displaying errors
  const [successMessage, setSuccessMessage] = useState(""); // For success feedback

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/authentication/register/", {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      });

      // Assuming the API responds with a success message
      setSuccessMessage("Registration successful! Please log in.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // Handle errors from the API
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-4xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-black p-8 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Join NewsWave</h2>
            <p className="text-gray-300 mb-6">Create your account and start exploring personalized news today.</p>
            <div className="h-1 w-20 bg-white mb-8"></div>
            <img
              src="/placeholder.svg?height=300&width=300"
              alt="Register illustration"
              className="mx-auto max-w-[200px] filter invert"
            />
          </div>
          <div className="md:w-1/2 bg-white p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold text-black">Register for NewsWave</CardTitle>
              <CardDescription className="text-gray-600">Fill in your details to create an account</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full bg-gray-100 text-black border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full bg-gray-100 text-black border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>
                </div>
                <div className="space-y-2">
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Create a password"
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
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
                <Button
                  className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="p-0 mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-black hover:underline">
                  Log in here
                </a>
              </p>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}







// import React, { useState } from "react"
// import { Eye, EyeOff } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import axios from "axios"

// export function RegisterPage() {
//   const [firstName, setFirstName] = useState("")
//   const [lastName, setLastName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [successMessage, setSuccessMessage] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError("")
//     setSuccessMessage("")

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/authentication/register/", {
//         email,
//         first_name: firstName,
//         last_name: lastName,
//         password,
//       })

//       setSuccessMessage("Registration successful! Please log in.")
//       setFirstName("")
//       setLastName("")
//       setEmail("")
//       setPassword("")
//     } catch (error) {
//       setError(error.response?.data?.message || "Registration failed. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <Card className="w-full max-w-4xl overflow-hidden shadow-2xl">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-1/2 bg-black p-8 text-white flex flex-col justify-center">
//             <h2 className="text-3xl font-bold mb-4">Join NewsWave</h2>
//             <p className="text-gray-300 mb-6">Create your account and start exploring personalized news today.</p>
//             <div className="h-1 w-20 bg-white mb-8"></div>
//             <img
//               src="/placeholder.svg?height=300&width=300"
//               alt="Register illustration"
//               className="mx-auto max-w-[200px] filter invert"
//             />
//           </div>
//           <div className="md:w-1/2 bg-white p-8">
//             <CardHeader className="p-0 mb-6">
//               <CardTitle className="text-2xl font-bold text-black">Register for NewsWave</CardTitle>
//               <CardDescription className="text-gray-600">Fill in your details to create an account</CardDescription>
//             </CardHeader>
//             <CardContent className="p-0">
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="firstName" className="text-gray-700">
//                       First Name
//                     </Label>
//                     <Input
//                       id="firstName"
//                       placeholder="Enter your first name"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       required
//                       className="w-full bg-gray-100 text-black border-gray-300 focus:border-black focus:ring-black"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="lastName" className="text-gray-700">
//                       Last Name
//                     </Label>
//                     <Input
//                       id="lastName"
//                       placeholder="Enter your last name"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       required
//                       className="w-full bg-gray-100 text-black border-gray-300 focus:border-black focus:ring-black"
//                     />
//                   </div>
//                 </div>
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
//                       placeholder="Create a password"
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
//                 {error && <p className="text-sm text-red-500">{error}</p>}
//                 {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
//                 <Button
//                   className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
//                   type="submit"
//                   disabled={loading}
//                 >
//                   {loading ? "Registering..." : "Register"}
//                 </Button>
//               </form>
//             </CardContent>
//             <CardFooter className="p-0 mt-6">
//               <p className="text-sm text-gray-600">
//                 Already have an account?{" "}
//                 <a href="/login" className="font-medium text-black hover:underline">
//                   Log in here
//                 </a>
//               </p>
//             </CardFooter>
//           </div>
//         </div>
//       </Card>
//     </div>
//   )
// }

