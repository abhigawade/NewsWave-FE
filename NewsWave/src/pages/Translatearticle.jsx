import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Translatearticle({ articleId, language }) {
  const [translatedTitle, setTranslatedTitle] = useState("");
  const [translatedDescription, setTranslatedDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTranslatedArticle = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/article/translate/${articleId}/?language=${language}`
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
      <div className="flex justify-center items-center w-[350px] h-[300px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
   }

  return (
    <>
       <div className="p-5 bg-white text-gray-800 rounded-lg shadow-lg w-[350px] h-[300px]">
        <h1>Article Translation</h1>
        <h1>{translatedTitle}</h1>
        <p>{translatedDescription}</p>
       </div>
    </>
  )
}
