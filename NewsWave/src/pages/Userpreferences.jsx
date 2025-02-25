"use client"

import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { API_URL } from "../auth/ApiUrl"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Userpreferences() {
  const [preferred_topics, setPreferred_topics] = useState("")
  const [preferred_sources, setPreferred_sources] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    const topicsArray = preferred_topics.split(",").map((topic) => topic.trim())
    const sourcesArray = preferred_sources.split(",").map((source) => source.trim())

    const token = Cookies.get("accessToken")

    if (!token) {
      console.log("No token found")
      return
    }

    try {
      const response = await axios.post(
        `${API_URL}/userPreference/userPreference/`,
        {
          preferred_topics: topicsArray,
          preferred_sources: sourcesArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
      console.log(response.data)
      toast.success("Preferences saved successfully")
    } catch (error) {
      console.log(error)
      toast.error("Failed to save preferences")
    }
  }

  return (
    <Card className="w-full max-w-[500px] md:w-[600px] md:h-[350px]  bg-white overflow-hidden mx-auto">
      <CardContent className="p-5 lg:p-8">
        <h2 className="text-lg font-semibold mb-6 text-center">Set Preferences</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Preferred Topics:</label>
            <Input
              type="text"
              name="preferred_topics"
              value={preferred_topics}
              onChange={(e) => setPreferred_topics(e.target.value)}
              className="w-full px-3 py-2 border border-[0.5px] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter topics (e.g., Technology, Sports)"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Preferred Sources:</label>
            <Input
              type="text"
              name="preferred_sources"
              value={preferred_sources}
              onChange={(e) => setPreferred_sources(e.target.value)}
              className="w-full px-3 py-2 border border-[0.5px] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter sources (e.g., BBC, CNN)"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

