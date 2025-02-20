"use client"

import { useEffect, useState } from "react"
import NewsCards from "./Newsboard"

export const Homepage = ({ category, theme, searchQuery }) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = `http://127.0.0.1:8000/article/article/`

        if (searchQuery) {
          url = `http://127.0.0.1:8000/article/article/?search=${searchQuery}`
        } else if (category) {
          url = `http://127.0.0.1:8000/article/article/?category=${category}`
        }

        const response = await fetch(url)
        const data = await response.json()
        setArticles(Array.isArray(data) ? data : [])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching news:", error)
        setLoading(false)
      }
    }

    fetchNews()
  }, [category, searchQuery])

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen w-full`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div
              className={`animate-spin rounded-full h-16 w-16 border-t-4 ${
                theme === "dark" ? "border-blue-500" : "border-blue-600"
              }`}
            ></div>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <NewsCards
                key={index}
                id={article.id}
                title={article.title}
                description={article.description}
                urlToImage={article.url_to_image}
                source={article.source}
                publishedAt={article.published_at}
                readMoreUrl={article.url}
                theme={theme}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-lg font-semibold py-8">
            No Articles Available
          </div>
        )}
      </div>
    </div>
  )
}
