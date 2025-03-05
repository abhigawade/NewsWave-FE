"use client";

import { useEffect, useState } from "react";
import NewsCards from "./Newsboard";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../auth/ApiUrl"

export const Homepage = ({ category, theme, searchQuery, UserPreference }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null); // Store next page URL
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchNews = async (url, isLoadMore = false) => {
    try {
      if (!isLoadMore) setLoading(true);
      else setLoadingMore(true);

      const token = Cookies.get("accessToken");

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const {data} = await axios.get(url, { headers });

      setArticles((prevArticles) =>
        isLoadMore ? [...prevArticles, ...data.results] : data.results
      );

      setNextPage(data.next); // Update next page URL
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {

    let url = `{ API_URL }/article/article/`;

    if (searchQuery) {
      url = `${API_URL}/article/article/?search=${searchQuery}`;
    } else if (category) {
      url = `${API_URL}/article/article/?category=${category}`;
    } else if (UserPreference === "user-preference") {
      url = `${API_URL}/article/by-user-preference/`;
    }

    fetchNews(url);
  }, [category, searchQuery, UserPreference]);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen w-full`}
    >
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
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            {/* Load More Button */}
            {nextPage && (
              <div className="flex justify-center my-6">
                <button
                  onClick={() => fetchNews(nextPage, true)}
                  disabled={loadingMore}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-lg font-semibold py-8">
            No Articles Available
          </div>
        )}
      </div>
    </div>
  );
};
