// Book Details Page
// - Displays detailed information about a selected book.
// - Fetches book details from Open Library API using the book ID from URL params.
// - Shows title, author(s), description, subjects, and cover image.

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; 
import { useFavorites } from "../context/FavoritesContext"; // Import context

function BookDetails() {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate(); // For Back Button and Future Reads CTA
  const { addFavorite, removeFavorite, isFavorite } = useFavorites(); // Use the hook

  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch book details
        const response = await fetch(
          `https://openlibrary.org/works/${id}.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }

        const data = await response.json();
        setBook(data);

        // Fetch author names (advanced async handling)
        if (data.authors) {
          const authorPromises = data.authors.map(async (author) => {
            const res = await fetch(
              `https://openlibrary.org${author.author.key}.json`
            );
            const authorData = await res.json();
            return authorData.name;
          });

          const authorNames = await Promise.all(authorPromises);
          setAuthors(authorNames);
        }

      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Unable to load book details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  
  // Toggle Favorite Status
  const favorite = isFavorite(id); // Check context state

  const toggleFavorite = () => {
    const bookData = {
      id: id,
      title: book.title,
      cover: book.covers
        ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
        : "https://via.placeholder.com/300x450?text=No+Cover",
      author: authors.length > 0 ? authors.join(", ") : "Unknown Author",
    };

    favorite ? removeFavorite(id) : addFavorite(bookData);
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center min-h-screen flex items-center justify-center text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (!book) return null;

  // Generate cover image URL
  const coverUrl = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "https://via.placeholder.com/300x450?text=No+Cover";

  return (
    <div className="min-h-screen bg-white py-12 px-6">

      {/* Add Back to Results Button */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          ← Back to Results
        </button>

        {/* View Favorites button to page-level navigation */}
        <Link
          to="/favorites"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          View Favorites
        </Link>
      </div>

      {/* Breadcrumb Navigation */}
      <nav className="max-w-6xl mx-auto text-sm mb-8 text-gray-500">
        <Link to="/" className="hover:underline text-blue-600 font-medium">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{book.title}</span>
      </nav>

      {/* Main Card Layout */}
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl p-10 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Book Cover */}
        <div className="flex justify-center">
          <img
            src={coverUrl}
            alt={book.title}
            className="w-72 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </div>

        {/* Book Information */}
        <div className="md:col-span-2">
          {/* Title and Favorite Star Row */}
          <div className="flex justify-between items-start mb-3 gap-4">
            <h1 className="text-4xl font-bold text-gray-800 leading-tight">
              {book.title}
            </h1>
            
            {/* Clickable Favorite Star */}
            <button
              onClick={toggleFavorite}
              className="text-4xl transition-transform duration-200 hover:scale-110 focus:outline-none"
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <span className={favorite ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"}>
                {favorite ? "★" : "☆"}
              </span>
            </button>
          </div>

          {/* Authors */}
          <p className="text-gray-600 text-lg mb-6">
            {authors.length > 0
              ? authors.join(", ")
              : "Unknown Author"}
          </p>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-8 text-[15px]">
            {book.description
              ? typeof book.description === "string"
                ? book.description
                : book.description.value
              : "No description available."}
          </p>

          {/* Subjects */}
          {book.subjects && (
            <div className="mb-8">
              <h3 className="font-semibold mb-3 text-gray-800 text-lg">
                Subjects
              </h3>

              <div className="flex flex-wrap gap-3">
                {book.subjects.slice(0, 10).map((subject, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 text-xs px-4 py-2 rounded-full font-medium border border-blue-100"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default BookDetails;