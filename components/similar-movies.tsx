"use client"

import { useEffect, useState } from "react"
import { getSimilarMovies } from "@/lib/api"
import type { Movie } from "@/types"
import MovieCard from "@/components/movie-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface SimilarMoviesProps {
  movieId: string
}

export default function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      setIsLoading(true)
      try {
        const data = await getSimilarMovies(movieId)
        setMovies(data.results.slice(0, 10)) // Limit to 10 similar movies
      } catch (error) {
        console.error("Error fetching similar movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSimilarMovies()
  }, [movieId])

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
        <div className="flex gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-[180px] flex-shrink-0">
              <div className="aspect-[2/3] rounded-lg bg-muted animate-pulse" />
              <div className="h-4 w-3/4 mt-2 bg-muted animate-pulse rounded" />
              <div className="h-3 w-1/2 mt-1 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (movies.length === 0) {
    return null
  }

  return (
    <div className="mt-12 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {movies.map((movie) => (
            <div key={movie.id} className="w-[180px] flex-shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

