"use client"

import type { Movie } from "@/types"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useFavorites } from "@/context/favorites-context"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  movie: Movie
}

export default function FavoriteButton({ movie }: FavoriteButtonProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const { toast } = useToast()

  const isFavorite = favorites.includes(movie.id.toString())

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.id.toString())
      toast({
        title: "Removed from favorites",
        description: `${movie.title} has been removed from your favorites.`,
      })
    } else {
      addFavorite(movie.id.toString())
      toast({
        title: "Added to favorites",
        description: `${movie.title} has been added to your favorites.`,
      })
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleFavorite}
      className={cn(
        "h-10 w-10 transition-all duration-300",
        isFavorite ? "bg-primary/10 text-primary hover:bg-primary/20" : "hover:bg-primary/10 hover:text-primary",
      )}
    >
      <Heart className={cn("h-5 w-5 transition-all duration-300", isFavorite && "fill-primary animate-heartbeat")} />
      <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
    </Button>
  )
}

