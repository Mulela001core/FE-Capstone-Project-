// Book Details Page
// - Displays detailed information about a selected book.
// - Fetches book details from Open Library API using the book ID from URL params.
// - Shows title, author(s), description, subjects, and cover image.


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function BookDetails() {
  const { id } = useParams(); // Extract book ID from URL

  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

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

        // Check if book is already in favorites
        const savedFavorites =
          JSON.parse(localStorage.getItem("favorites")) || [];

        if (savedFavorites.includes(id)) {
          setIsFavorite(true);
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

  
    //Toggle Favorite Status
   
  const toggleFavorite = () => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    let updatedFavorites;

    if (savedFavorites.includes(id)) {
      updatedFavorites = savedFavorites.filter(
        (favId) => favId !== id
      );
      setIsFavorite(false);
    } else {
      updatedFavorites = [...savedFavorites, id];
      setIsFavorite(true);
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center mt-20 text-red-600 font-medium">
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
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Breadcrumb Navigation */}
      <nav className="text-sm mb-6 text-gray-600">
        <Link to="/" className="hover:underline text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{book.title}</span>
      </nav>

      {/* Main Card Layout */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Book Cover */}
        <div className="flex justify-center">
          <img
            src={coverUrl}
            alt={book.title}
            className="w-64 rounded-lg shadow-md"
          />
        </div>

        {/* Book Information */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {book.title}
          </h1>

          {/* Authors */}
          <p className="text-gray-600 mb-4">
            {authors.length > 0
              ? authors.join(", ")
              : "Unknown Author"}
          </p>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {book.description
              ? typeof book.description === "string"
                ? book.description
                : book.description.value
              : "No description available."}
          </p>

          {/* Subjects */}
          {book.subjects && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-800">
                Subjects
              </h3>

              {/* Display up to 10 subjects as badges */}
              <div className="flex flex-wrap gap-2">
                {book.subjects.slice(0, 10).map((subject, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className={`px-4 py-2 rounded-lg text-white transition ${
              isFavorite
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >

            {/* Button text changes based on favorite status */}
            {isFavorite
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
