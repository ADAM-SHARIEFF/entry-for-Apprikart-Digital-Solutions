import type { Genre, MovieCredits, MovieDetails, MovieResponse } from "@/types"

const API_KEY = "f945b2355e1c73d8477385d70a4210c4"
const BASE_URL = "https://api.themoviedb.org/3"

const headers = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTQ1YjIzNTVlMWM3M2Q4NDc3Mzg1ZDcwYTQyMTBjNCIsIm5iZiI6MTc0MDA2MTk3OC44NTksInN1YiI6IjY3YjczZDFhZTQ4NGZjMjE1NDFhMWQwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RwCWpnnTjeIe95nl8kFCkdXWZsHRapevlh-p5pLoQLA`,
  "Content-Type": "application/json",
}

interface GetPopularMoviesParams {
  page?: number
  query?: string
  genreId?: string
}

export async function getPopularMovies({
  page = 1,
  query = "",
  genreId = "",
}: GetPopularMoviesParams = {}): Promise<MovieResponse> {
  let url = ""

  if (query) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  } else {
    url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  }

  if (genreId) {
    url += `&with_genres=${genreId}`
  }

  console.log("Fetching Movies URL:", url);

  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`)
  }

  return response.json()
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.status}`)
  }

  return response.json()
}

export async function getGenres(): Promise<Genre[]> {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error(`Failed to fetch genres: ${response.status}`)
  }

  const data = await response.json()
  return data.genres
}

export async function getMovieCredits(id: string): Promise<MovieCredits> {
  const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error(`Failed to fetch movie credits: ${response.status}`)
  }

  return response.json()
}

export async function getSimilarMovies(id: string): Promise<MovieResponse> {
  const url = `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error(`Failed to fetch similar movies: ${response.status}`)
  }

  return response.json()
}

