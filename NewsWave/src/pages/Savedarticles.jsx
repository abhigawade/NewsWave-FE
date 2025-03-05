"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { ExternalLink, Trash2, Loader2, Bookmark, AlertCircle, Search } from "lucide-react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { API_URL } from "../auth/ApiUrl"

export default function SavedArticles() {
  const [savedArticles, setSavedArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleting, setIsDeleting] = useState(null)

  useEffect(() => {
    const fetchSavedArticles = async () => {
      setIsLoading(true)
      setError(null)

      const token = Cookies.get("accessToken")
      try {
        const response = await axios.get(`${API_URL}/savedArticle/saved-articles/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setSavedArticles(response.data)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching saved articles:", err)
        setError("Failed to load your saved articles. Please try again.")
        setIsLoading(false)
      }
    }

    fetchSavedArticles()
  }, [])

  const handleDelete = async (articleId) => {
    setIsDeleting(articleId)
    const token = Cookies.get("accessToken")
    try {
      await axios.delete(`${API_URL}/savedArticle/saved-articles/${articleId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setSavedArticles(savedArticles.filter((item) => item.id !== articleId))
      toast.success("Article removed from saved collection")
    } catch (err) {
      console.error("Error deleting article:", err)
      toast.error("Failed to remove article")
    } finally {
      setIsDeleting(null)
    }
  }

  // Filter articles based on search term
  const filteredArticles = savedArticles.filter((item) =>
    item.article.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-2">
          <Bookmark className="h-6 w-6" />
          <h2 className="text-xl font-bold">Saved Articles</h2>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-white/70" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/20 text-white placeholder-white/70 text-sm rounded-full py-1.5 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50 w-full max-w-[200px]"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white dark:bg-gray-900 overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading your saved articles...</p>
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
        ) : filteredArticles.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            {searchTerm ? (
              <>
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No matching articles</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  We couldn't find any saved articles matching "{searchTerm}".
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Bookmark className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No saved articles yet</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  Articles you save will appear here for easy access.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredArticles.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                        {item.article.title || "Untitled Article"}
                      </h3>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting === item.id}
                        className={`text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors duration-200 flex-shrink-0 ${isDeleting === item.id ? "opacity-50 cursor-not-allowed" : ""}`}
                        aria-label="Remove from saved"
                      >
                        {isDeleting === item.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                      </button>
                    </div>

                    {item.article.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                        {item.article.description}
                      </p>
                    )}

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">

                      <a
                        href={item.article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 text-sm"
                      >
                        Read
                        <ExternalLink size={14} className="flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer with count */}
        {!isLoading && !error && filteredArticles.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} saved
            </div>

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

