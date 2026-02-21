import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBooks } from "../services/openLibraryApi";
import BookCard from "../components/BookCard";

function Results() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  //State for books, loading, and error
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch books when query changes
  useEffect(() => {
    const searchBooks = async () => {
      try {
        setLoading(true);
        const results = await fetchBooks(query);
        setBooks(results.slice(0, 20));
      } catch (err) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

//Only search if there's a query
    if (query) searchBooks();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
   <div className="max-w-7xl mx-auto">

{/* Heading with search query */}
        <h2 className="text-3xl font-bold mb-6">
          Results for "{query}"
        </h2>

        
{/* Loading and Error States */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

{/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;