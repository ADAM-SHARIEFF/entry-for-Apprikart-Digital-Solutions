"use client"

import { useEffect, useState } from "react"
import { getMovieCredits } from "@/lib/api"
import type { Cast } from "@/types"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface MovieCastProps {
  movieId: string
}

export default function MovieCast({ movieId }: MovieCastProps) {
  const [cast, setCast] = useState<Cast[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true)
      try {
        const credits = await getMovieCredits(movieId)
        setCast(credits.cast.slice(0, 20)) // Limit to top 20 cast members
      } catch (error) {
        console.error("Error fetching cast:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCast()
  }, [movieId])

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Cast</h2>
        <div className="flex gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-[150px] flex-shrink-0">
              <div className="aspect-[2/3] rounded-lg bg-muted animate-pulse" />
              <div className="h-4 w-3/4 mt-2 bg-muted animate-pulse rounded" />
              <div className="h-3 w-1/2 mt-1 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (cast.length === 0) {
    return null
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Cast</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {cast.map((person) => (
            <div key={person.id} className="w-[150px] flex-shrink-0 group">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl">
                {person.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                    alt={person.name}
                    fill
                    sizes="150px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center p-4 text-center text-sm">
                    No image
                  </div>
                )}
              </div>
              <h3 className="mt-2 font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                {person.name}
              </h3>
              {person.character && <p className="text-xs text-muted-foreground line-clamp-1">{person.character}</p>}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

