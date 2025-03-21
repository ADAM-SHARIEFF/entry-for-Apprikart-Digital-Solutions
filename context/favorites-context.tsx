"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface FavoritesContextType {
  favorites: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error)
        setFavorites([])
      }
    }
    setIsInitialized(true)
  }, [])

  // Save favorites to localStorage when they change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [favorites, isInitialized])

  const addFavorite = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev
      return [...prev, id]
    })
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id))
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

