import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Summerisearicle({ articleId }) {
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/article/summary/${articleId}/`
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
      <div className="flex justify-center items-center w-[350px] h-[300px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <>
      <div className="p-5 bg-white text-gray-800 rounded-lg shadow-lg w-[350px] h-[300px]">
        <h1>Article Summary</h1>
        <h1>{title}</h1>
        <p>{summary}</p>
      </div>
    </>
  );
}
