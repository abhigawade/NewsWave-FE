"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Book, Loader2 } from "lucide-react"
import Cookies from "js-cookie";

export default function TranslateArticle({ articleId, language }) {
  const [translatedTitle, setTranslatedTitle] = useState("")
  const [translatedDescription, setTranslatedDescription] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTranslatedArticle = async () => {
      const token = Cookies.get("accessToken");
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/article/translate/${articleId}/?language=${language}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        setTranslatedTitle(response.data.title);
        setTranslatedDescription(response.data.description);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching translated article:", error);
        setIsLoading(false);
      }
    };
  
    fetchTranslatedArticle();
  }, [articleId, language]);
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[400px] h-[400px] bg-gray-50 rounded-lg shadow-lg">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Book className="mr-2" />
          Article Translation
        </h1>
      </div>
      <div className="p-6 space-y-4 border-4 w-[600px] h-[350px] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">{translatedTitle}</h2>
        <p className="text-gray-600 leading-relaxed">{translatedDescription}</p>
      </div>
    </div>
  )
}

