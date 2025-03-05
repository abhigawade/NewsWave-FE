"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Book, Loader2, FileText, AlertCircle, Clock, ArrowRight } from "lucide-react"
import Cookies from "js-cookie"
import { API_URL } from "../auth/ApiUrl"

export default function Summerisearicle({ articleId }) {
  const [summary, setSummary] = useState("")
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [readingTime, setReadingTime] = useState("1 min")

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true)
      setError(null)

      const token = Cookies.get("accessToken")
      try {
        const response = await axios.get(`${API_URL}/article/summary/${articleId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        setSummary(response.data.summary)
        setTitle(response.data.title)

        // Calculate approximate reading time
        const words = response.data.summary.split(/\s+/).length
        const time = Math.max(1, Math.ceil(words / 200))
        setReadingTime(`${time} min${time > 1 ? "s" : ""}`)

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching summary:", error)
        setError("Failed to fetch article summary. Please try again.")
        setIsLoading(false)
      }
    }

    fetchSummary()
  }, [articleId])

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h2 className="text-xl font-bold">Article Summary</h2>
        </div>

        {!isLoading && !error && (
          <div className="flex items-center bg-white/20 px-3 py-1 rounded-full text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{readingTime} read</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white dark:bg-gray-900 overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Generating summary...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Summary Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Title with decorative underline */}
                <div className="mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                </div>

                {/* Summary paragraphs with better formatting */}
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  {summary.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

