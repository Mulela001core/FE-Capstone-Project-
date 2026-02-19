import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { fetchBooks } from "../services/openLibraryApi";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Handle book search
   
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        📚 Book Library
      </h1>

      <SearchBar onSearch={handleSearch} />

      {/* Loading State */}
      {loading && (
        <p className="text-center mt-6 text-blue-600">
          Loading books...
        </p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center mt-6 text-red-600">
          {error}
        </p>
      )}
        {/* No Results State */}

      
      
      {loading && (
      <div className="flex justify-center mt-10">
       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
       </div>
       )}

 
      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Home;
