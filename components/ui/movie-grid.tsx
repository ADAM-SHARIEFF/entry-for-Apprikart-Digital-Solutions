"use client"

import { useEffect, useState } from "react"
import { getPopularMovies } from "@/lib/api"
import type { Movie } from "@/types"
import MovieCard from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function MovieGrid() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    query: "",
    genreId: "",
  })

  // Initial load of popular movies
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      try {
        const data = await getPopularMovies({ page: 1 })
        setMovies(data.results)
        console.log("Fetched Movies:", data.results)
        setFilteredMovies(data.results)
        setTotalPages(data.total_pages)
        setPage(1)
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [])

  // Listen for search/filter changes
  useEffect(() => {
    const handleSearchFilterChange = (event: Event) => {
      const customEvent = event as CustomEvent
      setSearchFilters(customEvent.detail)
    }

    window.addEventListener("searchfilterchange", handleSearchFilterChange)
    return () => {
      window.removeEventListener("searchfilterchange", handleSearchFilterChange)
    }
  }, [])

  // Apply filters when they change
  useEffect(() => {
    console.log("Current Search Filters:", searchFilters)
    console.log("All Movies:", movies)
    
    const fetchFilteredMovies = async () => {
      setIsLoading(true)
      try {
        if (searchFilters.query || searchFilters.genreId) {
          const data = await getPopularMovies({
            page: 1,
            query: searchFilters.query,
            genreId: searchFilters.genreId,
          })
          
          // Filter movies based on genre and search query
          const filtered = data.results.filter(movie => {
            const matchesGenre = searchFilters.genreId ? movie.genre_ids.includes(parseInt(searchFilters.genreId)) : true;
            const matchesQuery = searchFilters.query ? movie.title.toLowerCase().includes(searchFilters.query.toLowerCase()) : true;
            return matchesGenre && matchesQuery;
          })

          setFilteredMovies(filtered)
          console.log("Filtered Movies:", filtered)
          setTotalPages(data.total_pages)
          setPage(1)
        } else {
          setFilteredMovies(movies)
        }
      } catch (error) {
        console.error("Error fetching filtered movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFilteredMovies()
  }, [searchFilters, movies])

  const loadMoreMovies = async () => {
    if (page >= totalPages) return

    setIsLoadingMore(true)
    try {
      const nextPage = page + 1
      const data = await getPopularMovies({
        page: nextPage,
        query: searchFilters.query,
        genreId: searchFilters.genreId,
      })

      if (searchFilters.query || searchFilters.genreId) {
        setFilteredMovies((prev) => [...prev, ...data.results])
      } else {
        setMovies((prev) => [...prev, ...data.results])
        setFilteredMovies((prev) => [...prev, ...data.results])
      }

      setPage(nextPage)
    } catch (error) {
      console.error("Error loading more movies:", error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="aspect-[2/3] rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (filteredMovies.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">No movies found. Try a different search or filter.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {page < totalPages && (
        <div className="flex justify-center pt-4">
          <Button onClick={loadMoreMovies} disabled={isLoadingMore} className="min-w-[150px]">
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

