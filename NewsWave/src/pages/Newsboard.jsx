import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ChevronRight, Share2, Download } from "lucide-react"
import breakingnews from "../assets/news.jpg"

const NewsCards = ({ title, description, source, urlToImage, publishedAt, readMoreUrl, theme }) => {
  return (
    <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 w-full h-full group">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative h-40 overflow-hidden">
          <img
            src={urlToImage || breakingnews}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 m-3 rounded-full shadow-lg">
            <span className="text-zinc-100 text-xs font-bold tracking-wide">{source}</span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow bg-gradient-to-b from-zinc-900/50 to-zinc-900">
          <div>
            <h2 className="text-zinc-100 text-xl font-bold leading-tight mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
              {title || "No Title Available"}
            </h2>
            <p className="text-zinc-300 text-xs mb-3 line-clamp-2">{description || "No description available"}</p>
          </div>
          <div className="flex items-center justify-between mt-auto pt-1 border-t border-zinc-700">
            <div className="flex items-center text-zinc-400 text-xs">
              <Clock size={14} className="mr-2 text-blue-400" />
              <span>{publishedAt || "Unknown date"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 transition-colors duration-300"
              >
                <Share2 size={16} />
                <span className="sr-only">Share</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 transition-colors duration-300"
              >
                <Download size={16} />
                <span className="sr-only">Download</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 transition-colors duration-300 group"
              >
                <a href={readMoreUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Read More
                  <ChevronRight
                    size={16}
                    className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NewsCards

