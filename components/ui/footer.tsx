import Link from "next/link"
import { Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          Built with Next.js and TheMovieDB API. This is a demo project.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            TMDB
          </Link>
        </div>
      </div>
    </footer>
  )
}

