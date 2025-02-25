import React, { useState, useEffect } from "react";
import axios from "axios";
import { Book, Loader2 } from "lucide-react"
import Cookies from "js-cookie";
import { API_URL } from "../auth/ApiUrl"

export default function Summerisearicle({ articleId }) {
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = Cookies.get("accessToken");
      try {
        const response = await axios.get(
          `${API_URL}/article/summary/${articleId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setSummary(response.data.summary);
        setTitle(response.data.title); // Set the summary from the response
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching summary:", error);
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [articleId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[400px] h-[400px] bg-gray-50 rounded-lg shadow-lg">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Book className="mr-2" />
            Article Summary
          </h1>
        </div>
        <div className="p-6 space-y-4 border-4 w-[600px] h-[350px] overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
            {title}
          </h2>
          <p className="text-gray-600 leading-relaxed">{summary}</p>
        </div>
      </div>
    </>
  );
}
