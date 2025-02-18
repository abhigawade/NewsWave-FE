"use client";

import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight, Share2, Download, Bookmark, MoreVertical } from "lucide-react";
import breakingnews from "../assets/news.jpg";
import CommonPopup from "../components/common/CommonPopup";
import Sharepage from "./Sharepage";
import Translatearticle from "./Translatearticle";
import Summerisearicle from "./Summerisearicle";
import Cookies from "js-cookie";
import axios from "axios";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsCards = ({
  id,
  title,
  description,
  source,
  urlToImage,
  publishedAt,
  readMoreUrl,
  theme,
}) => {
  const contentRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showSummeriseOptions, setShowSummeriseOptions] = useState(false);
  const [showTranslateOptions, setShowTranslateOptions] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: title || "News Article",
  });

  const saveArticle = async () => {
    const token = Cookies.get("accessToken");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/savedArticle/saved-articles/",
        { article_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Article saved successfully");
        setIsSaved(true);
      } else {
        console.log("Error saving article");
        alert("Error saving article");
        setIsSaved(false);
      }
    } catch (error) {
      console.error(
        "Error saving article:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to save the article.");
      setIsSaved(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <>
      <CommonPopup isOpen={showShareOptions} setOpen={setShowShareOptions}>
        <Sharepage url={readMoreUrl} />
      </CommonPopup>
      <CommonPopup isOpen={showSummeriseOptions} setOpen={setShowSummeriseOptions}>
        <Summerisearicle articleId={id} />
      </CommonPopup>
      <CommonPopup isOpen={showTranslateOptions} setOpen={setShowTranslateOptions}>
        <Translatearticle articleId={id} language='hi' />
      </CommonPopup>
      <div className="w-full" ref={contentRef}>
        <Card
          className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${
            isDark
              ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:shadow-blue-500/10"
              : "bg-white border-gray-200 hover:shadow-blue-500/20"
          } group`}
        >
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row h-auto sm:h-[200px]">
              {/* Image Section */}
              <div className="w-full sm:w-1/3 h-48 sm:h-full relative overflow-hidden">
                <img
                  src={urlToImage || breakingnews}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 m-3 rounded-full shadow-lg">
                  <span className="text-white text-xs font-bold tracking-wide">
                    {source}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full sm:w-2/3 p-3 flex flex-col justify-between">
                {/* Title and Description */}
                <div className="space-y-2 mb-3">
                  <h2
                    className={`text-lg sm:text-lg font-bold leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {title || "No Title Available"}
                  </h2>
                  <p
                    className={`text-xs leading-relaxed line-clamp-3 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {description || "No description available you can read news by clicking on the read more"}
                  </p>
                </div>

                {/* Bottom Section with Date and Actions */}
                <div
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pt-2 border-t ${
                    isDark ? "border-gray-700/50" : "border-gray-200"
                  }`}
                >
                  {/* Date */}
                  <div
                    className={`flex items-center text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <Clock size={16} className="mr-2 text-blue-400" />
                    <span>{publishedAt || "Unknown date"}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-0 w-full sm:w-auto justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${
                        isDark
                          ? "text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                          : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                      } transition-colors duration-300`}
                      onClick={saveArticle}
                    >
                      <Bookmark
                        size={18}
                        className={`transition-all duration-300 ${
                          isSaved ? "fill-current" : ""
                        }`}
                      />
                      <span className="sr-only">Save for Later</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${
                        isDark
                          ? "text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                          : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                      } transition-colors duration-300`}
                      onClick={() => setShowShareOptions(true)}
                    >
                      <Share2 size={18} />
                      <span className="sr-only">Share</span>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handlePrint}
                      size="icon"
                      className={`${
                        isDark
                          ? "text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                          : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                      } transition-colors duration-300`}
                    >
                      <Download size={18} />
                      <span className="sr-only">Download</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${
                            isDark
                              ? "text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                              : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                          } transition-colors duration-300`}
                        >
                          <MoreVertical size={18} />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="top"
                        align="end"
                        className="w-[200px] bg-white"
                      >
                        <DropdownMenuItem onClick={() => setShowSummeriseOptions(true)}>
                          Summarize Article
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowTranslateOptions(true)}>
                          Translate Article
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${
                        isDark
                          ? "text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                          : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                      } transition-colors duration-300 group whitespace-nowrap`}
                    >
                      <a
                        href={readMoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Read
                        <ChevronRight
                          size={18}
                          className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NewsCards;
