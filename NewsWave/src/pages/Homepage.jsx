import React, { useEffect, useState } from "react";
import NewsCards from "./Newsboard";

export const Homepage = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=21025d1583d44ba6a0575f90b9d68ac0`
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div className="w-full bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-2">
          {articles.map((article, index) => (
            <NewsCards
              key={index}
              title={article.title}
              description={article.description}
              urlToImage={
                article.urlToImage
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
