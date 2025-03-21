"use client"

import { useEffect, useState } from "react"
import { useFavorites } from "@/context/favorites-context"
import MovieCard from "@/components/movie-card"
import type { Movie } from "@/types"
import { getMovieDetails } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites()
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      setIsLoading(true)
      try {
        const movies = await Promise.all(
          favorites.map(async (id) => {
            const movie = await getMovieDetails(id)
            return movie
          }),
        )
        setFavoriteMovies(movies.filter(Boolean) as Movie[])
      } catch (error) {
        console.error("Error fetching favorite movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (favorites.length > 0) {
      fetchFavoriteMovies()
    } else {
      setFavoriteMovies([])
      setIsLoading(false)
    }
  }, [favorites])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Your Favorites</h1>
          <p className="text-muted-foreground">
            {favorites.length > 0
              ? `You have ${favorites.length} favorite movie${favorites.length > 1 ? "s" : ""}`
              : "You haven't added any favorites yet"}
          </p>
        </div>
        {favorites.length > 0 && (
          <Button variant="destructive" onClick={clearFavorites} className="group">
            <Trash2 className="w-4 h-4 mr-2 group-hover:animate-shake" />
            Clear All
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="aspect-[2/3] rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">Start exploring movies and add some to your favorites!</p>
        </div>
      )}
    </div>
  )
}

