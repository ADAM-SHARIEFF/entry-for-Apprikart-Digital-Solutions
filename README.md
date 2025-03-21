# Movie Database Explorer

## Project Overview

The Movie Database Explorer is a web application designed to provide an IMDb-like interface for browsing movies. It utilizes TheMovieDB API to fetch and display movie data, allowing users to explore popular movies, search by title, and filter by genre. The application is developed using React and Next.js.

## Objectives

- Develop a fully functional, responsive, and user-friendly movie browsing application.
- Integrate TheMovieDB API for fetching movie data.
- Implement features such as searching, filtering, and saving favorites.
- Ensure high code quality, documentation, and maintainability.

## Installation Steps

To set up the project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ADAM-SHARIEFF/entry-for-Apprikart-Digital-Solutions.git
   cd entry-for-Apprikart-Digital-Solutions
   ```

2. **Install Dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   Start the application in development mode:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` to view the application.

## Features

- **Movie Listing Page**: Displays a grid layout of popular movies with search and genre filtering.
- **Movie Details Page**: Shows detailed information about each movie, including title, plot summary, rating, and cast.
- **Favorites Page**: Allows users to save and view their favorite movies.
- **Responsive Design**: Fully responsive and accessible across different devices.

## File Explanations

### `app/layout.tsx`
- **Purpose**: Sets up the main layout of the application, including the theme provider and global styles.
- **Functions**: Wraps the application in a `ThemeProvider` and includes a `Toaster` for notifications.

### `app/page.tsx`
- **Purpose**: The home page of the application.
- **Functions**: Displays the main content, including the movie grid and search filters.

### `components/footer.tsx`
- **Purpose**: Renders the footer of the application.
- **Functions**: Contains links to GitHub and TheMovieDB, along with a brief description of the project.

### `components/header.tsx`
- **Purpose**: (Assumed) Renders the header of the application.
- **Functions**: Typically includes navigation links and branding.

### `components/movie-grid.tsx`
- **Purpose**: Displays a grid of movies fetched from the API.
- **Functions**: Handles fetching popular movies, applying filters, and managing loading states.

### `components/movie-card.tsx`
- **Purpose**: Represents a single movie card in the grid.
- **Functions**: Displays movie information such as title, poster, and rating.

### `components/movie-cast.tsx`
- **Purpose**: Displays the cast information for a specific movie.
- **Functions**: Fetches and renders the cast details based on the selected movie.

### `components/similar-movies.tsx`
- **Purpose**: Shows a list of movies similar to the currently viewed movie.
- **Functions**: Fetches similar movies based on genre or other criteria.

### `components/favorite-button.tsx`
- **Purpose**: Allows users to save a movie to their favorites.
- **Functions**: Manages adding/removing movies from localStorage.

### `lib/api.ts`
- **Purpose**: Contains functions for interacting with TheMovieDB API.
- **Functions**: Fetches popular movies, movie details, and genres.

### `lib/utils.ts`
- **Purpose**: Utility functions for formatting data.
- **Functions**: Includes functions like `formatDate` and `formatRuntime` for displaying movie information.

### `types/index.ts`
- **Purpose**: Defines TypeScript interfaces for movie data structures.
- **Functions**: Provides type definitions for movies, movie details, and responses from the API.

### `README.md`
- **Purpose**: Provides documentation for the project.
- **Functions**: Includes project overview, installation instructions, features, and file explanations.

## Conclusion

This project aims to deliver a high-quality, user-friendly movie browsing experience while demonstrating strong technical and development skills. Adhering to the outlined specifications will ensure a well-structured, responsive, and scalable application.
