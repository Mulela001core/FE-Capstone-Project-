import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { fetchBooks } from "../services/openLibraryApi";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle book search
  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);

      const results = await fetchBooks(query);
      setBooks(results.slice(0, 20));

    } catch (err) {
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
  backgroundImage: "url('/Landing.jpg')",
}}

    >
    
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 text-white">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            📚 My Book Library
          </h1>
          <p className="text-lg text-gray-200">
            Search and discover your favorite books instantly
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10 flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
            <p className="mt-4 text-gray-200">Searching books...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <p className="text-center mt-6 text-red-400">
            {error}
          </p>
        )}

        {/* Results Count */}
        {!loading && books.length > 0 && (
          <p className="text-gray-200 mb-6">
            Showing {books.length} results
          </p>
        )}

        {/* No Results State */}
        {!loading && books.length === 0 && !error && (
          <p className="text-center text-gray-300 mt-10">
            No books found. Try searching for something else.
          </p>
        )}

        {/* Books Grid */}
        {!loading && books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 pb-16">
            {books.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;
