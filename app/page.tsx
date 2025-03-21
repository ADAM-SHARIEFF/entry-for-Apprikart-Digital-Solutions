import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Globe, Layers, Zap } from "lucide-react"
import Link from "next/link"
import MovieGrid from "@/components/movie-grid"
import SearchFilters from "@/components/search-filters"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-8">
          <section className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Movie Database Explorer</h1>
            <p className="text-muted-foreground">Discover popular movies, search by title, and filter by genre</p>
          </section>

          <SearchFilters />
          <MovieGrid />
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <Layers className="h-5 w-5" />
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 MovieDB. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

