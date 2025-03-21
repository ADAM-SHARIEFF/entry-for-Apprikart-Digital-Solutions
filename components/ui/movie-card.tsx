"use client"

import type { Movie } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { motion } from "framer-motion"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center p-4 text-center">
              No poster available
            </div>
          )}

          {movie.vote_average > 0 && (
            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="mt-2">
          <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">{movie.title}</h3>
          {movie.release_date && <p className="text-xs text-muted-foreground">{formatDate(movie.release_date)}</p>}
        </div>
      </Link>
    </motion.div>
  )
}

