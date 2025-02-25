"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Cookies from "js-cookie"
import axios from "axios"
import { toast } from "react-toastify"
import { API_URL } from "../auth/ApiUrl"

const UserProfile = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(`${API_URL}/authentication/profile/`, formData, {
        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
      })

      if (response.status === 200) {
        toast.success("Profile updated successfully!")
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Profile update failed:", error)
      toast.error("Failed to update profile")
    }
  }

  return (
    <Card className="w-full max-w-[500px] lg:max-w-[800px] xl:max-w-[1000px] bg-white overflow-hidden mx-auto">
      <h2 className="text-lg font-bold mb-3 text-center mt-3">Your Profile</h2>
      <CardContent className="p-2 px-6 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">First Name</label>
            <Input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Last Name</label>
            <Input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:col-span-2 space-y-2">
            <label className="text-sm font-medium text-gray-900">Email</label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                className="bg-green-600 text-white hover:bg-green-500 transition-colors px-8"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                variant="outline"
                className="bg-gray-400 text-white hover:bg-gray-500 transition-colors px-8"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="bg-black text-white hover:bg-primary/90 transition-colors px-8"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfile

