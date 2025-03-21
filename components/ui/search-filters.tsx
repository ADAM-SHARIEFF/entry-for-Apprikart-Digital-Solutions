"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getGenres } from "@/lib/api"
import type { Genre } from "@/types"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"

export default function SearchFilters() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const [isLoading, setIsLoading] = useState(true)

  // Event emitter for search/filter changes
  const emitSearchFilterChange = () => {
    const event = new CustomEvent("searchfilterchange", {
      detail: {
        query: debouncedSearchQuery,
        genreId: selectedGenre === "all" ? "" : selectedGenre,
      },
    })
    console.log("Emitting Search Filters:", {
      query: debouncedSearchQuery,
      genreId: selectedGenre === "all" ? "" : selectedGenre,
    })
    window.dispatchEvent(event)
  }

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true)
      try {
        const genreData = await getGenres()
        setGenres(genreData)
      } catch (error) {
        console.error("Error fetching genres:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGenres()
  }, [])

  useEffect(() => {
    emitSearchFilterChange()
  }, [debouncedSearchQuery, selectedGenre])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedGenre("")
  }

  const hasFilters = searchQuery || selectedGenre

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedGenre} onValueChange={setSelectedGenre} disabled={isLoading}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearFilters}
            className="hidden sm:flex hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear filters</span>
          </Button>
        )}
      </div>
      {hasFilters && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {searchQuery && <span>Search: "{searchQuery}"</span>}
            {searchQuery && selectedGenre && <span> • </span>}
            {selectedGenre && (
              <span>Genre: {genres.find((g) => g.id.toString() === selectedGenre)?.name || "All Genres"}</span>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="sm:hidden text-xs">
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}

