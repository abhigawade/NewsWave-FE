"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { Book, Loader2, Globe, ArrowRight, AlertCircle, Check } from "lucide-react"
import Cookies from "js-cookie"
import { API_URL } from "../auth/ApiUrl"

export default function TranslateArticle({ articleId, language = "hi" }) {
  const [translatedTitle, setTranslatedTitle] = useState("")
  const [translatedDescription, setTranslatedDescription] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [translationComplete, setTranslationComplete] = useState(false)

  const languages = [
    { code: "hi", name: "Hindi" },
    { code: "mr", name: "Marathi"},
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ja", name: "Japanese" },
    { code: "zh", name: "Chinese" },
  ]

  const fetchTranslatedArticle = useCallback(
    async (lang) => {
      setIsLoading(true)
      setError(null)
      setTranslationComplete(false)

      const token = Cookies.get("accessToken")
      try {
        const response = await axios.get(`${API_URL}/article/translate/${articleId}/?language=${lang}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        setTranslatedTitle(response.data.title)
        setTranslatedDescription(response.data.description)
        setTranslationComplete(true)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching translated article:", error)
        setError("Failed to translate article. Please try again.")
        setIsLoading(false)
      }
    },
    [articleId],
  )

  useEffect(() => {
    fetchTranslatedArticle(selectedLanguage)
  }, [selectedLanguage, fetchTranslatedArticle])

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
      {/* Header with Language Selection */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 text-white">
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          <h2 className="text-xl font-bold">Article Translation</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedLanguage === lang.code ? "bg-white text-purple-700" : "bg-white/20 hover:bg-white/30"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white dark:bg-gray-900 overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              Translating to {languages.find((l) => l.code === selectedLanguage)?.name}...
            </p>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-4">{error}</p>
            <button
              onClick={() => fetchTranslatedArticle(selectedLanguage)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Translation Status */}
            {translationComplete && (
              <div className="flex justify-center p-3 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-900/50">
                <span className="inline-flex items-center text-sm text-green-700 dark:text-green-400">
                  <Check className="w-4 h-4 mr-1" />
                  Translated to {languages.find((l) => l.code === selectedLanguage)?.name}
                </span>
              </div>
            )}

            {/* Translated Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{translatedTitle}</h3>
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{translatedDescription}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

