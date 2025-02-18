"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { ExternalLink, Trash2 } from "lucide-react"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SavedArticles() {
  const [savedArticles, setSavedArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSavedArticles = async () => {
      const token = Cookies.get("accessToken")
      try {
        const response = await axios.get("http://127.0.0.1:8000/savedArticle/saved-articles/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setSavedArticles(response.data)
      } catch (err) {
        console.error("Error fetching saved articles:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSavedArticles()
  }, [])

  const handleDelete = async (articleId) => {
    const token = Cookies.get("accessToken")
    try {
      await axios.delete(`http://127.0.0.1:8000/savedArticle/saved-articles/${articleId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setSavedArticles(savedArticles.filter((item) => item.id !== articleId))
      toast.success("Article deleted successfully");
    } catch (err) {
      console.error("Error deleting article:", err)
      toast.error("Failed to delete article");
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="mx-auto p-6 bg-gray-50 w-[750px] h-[450px] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">Saved Articles</h1>
      {savedArticles.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No saved articles yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {savedArticles.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-2 flex-1 pr-2">{item.article.title}</h2>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    aria-label="Delete article"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <a
                  href={item.article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mt-4 text-sm"
                >
                  <ExternalLink size={16} />
                  <span className="truncate">{item.article.url}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

