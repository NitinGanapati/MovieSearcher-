"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]); // For default movies
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch default movies on page load
  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=b1ab823d`);
        const data = await res.json();
        if (data.Search) {
          setMovies(data.Search);
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchDefaultMovies();
  }, []);

  const fetchMovie = async () => {
    if (!title.trim()) {
      setError("Please enter a movie title!");
      return;
    }

    setLoading(true);
    setError("");
    setMovie(null);

    try {
      const res = await fetch(`/api/movie?title=${title}`);
      const data = await res.json();

      if (res.ok) {
        setMovie(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Movie Search 🎬</h1>

      <div className="flex flex-col items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title..."
          className="border p-2 rounded w-72 text-center"
        />

        <button
          onClick={fetchMovie}
          className="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Display searched movie */}
      {movie && movie.Title && (
        <div className="mt-6 text-center border p-4 rounded shadow-lg bg-gray-100 max-w-xs sm:max-w-md">
          <h2 className="text-xl font-bold">{movie.Title} ({movie.Year})</h2>
          <img src={movie.Poster} alt={movie.Title} className="mt-2 w-64 rounded" />
          <p className="font-semibold text-red-500">Director: {movie.Director}</p>
          <p className="text-black">Genre: {movie.Genre}</p>
          <p className="text-black">Plot: {movie.Plot}</p>
          <p className="text-black">IMDb Rating: ⭐ {movie.imdbRating}</p>
          <p className="text-black">
            Rotten Tomatoes: 🍅 {movie.Ratings?.find((r) => r.Source === "Rotten Tomatoes")?.Value || "N/A"}
          </p>
          <p className="text-black">Box Office: 💰 {movie.BoxOffice || "N/A"}</p>
        </div>
      )}

      {/* Display default movies in a flexbox grid */}
      <h2 className="text-2xl font-bold mt-8">Popular Movies</h2>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {movies.map((m) => (
          <div key={m.imdbID} className="w-60 bg-gray-800 text-white p-3 rounded-lg">
            <img src={m.Poster} alt={m.Title} className="w-full h-80 object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-2">{m.Title}</h3>
            <p className="text-sm">{m.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
