import React, { useEffect, useState } from "react";
import NewsCards from "./Newsboard";

export const Homepage = ({ category, theme, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = searchQuery
          ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=21025d1583d44ba6a0575f90b9d68ac0`
          : `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=21025d1583d44ba6a0575f90b9d68ac0`;

        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, searchQuery]);

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-black text-white w-full overflow-hidden"
          : "bg-white text-black w-full overflow-hidden"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {loading ? (
          // Loader component or simple loader style
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          // Display the articles once loading is false
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-2 py-2">
            {articles.map((article, index) => (
              <NewsCards
                key={index}
                title={article.title}
                description={article.description}
                urlToImage={article.urlToImage}
                source={article.source.name}
                publishedAt={article.publishedAt}
                readMoreUrl={article.url}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
