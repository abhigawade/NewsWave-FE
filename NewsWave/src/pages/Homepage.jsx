import React, { useEffect, useState } from "react";
import NewsCards from "./Newsboard";

export const Homepage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=21025d1583d44ba6a0575f90b9d68ac0"
        );
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="w-full bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <NewsCards
              key={index}
              title={article.title}
              description={article.description}
              urlToImage={
                article.urlToImage || "https://via.placeholder.com/300"
              }
              source={article.source.name}
              publishedAt={article.publishedAt}
              readMoreUrl={article.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};