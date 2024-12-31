import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ChevronRight } from 'lucide-react'

export default function NewsCards({ title, description, source, urlToImage, publishedAt, readMoreUrl }) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-zinc-800/50 w-full h-full">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative h-48">
          <img
            src={urlToImage || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bg-black/60 px-3 py-1 m-2 rounded">
            <span className="text-zinc-100 text-xs font-medium">{source}</span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div>
            <h2 className="text-zinc-100 text-xl font-semibold leading-tight mb-2 line-clamp-2">
              {title || "No Title Available"}
            </h2>
            <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
              {description || "No description available"}
            </p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-zinc-500 text-xs">
              <Clock size={14} className="mr-1" />
              <span>{publishedAt || "Unknown date"}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 transition-colors duration-300"
            >
              <a href={readMoreUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Read More
                <ChevronRight size={16} className="ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

