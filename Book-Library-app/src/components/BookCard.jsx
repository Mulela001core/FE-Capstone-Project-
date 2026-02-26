import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

//
// BookCard Component
// Receives book data as props and renders a card with title, author, and cover image
//

function BookCard({ book }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate(); // NEW: For Future Reads CTA

  // Normalize book ID
  // Works for both Open Library API results and stored favorites
  const workId = book.key
    ? book.key.split("/").pop()
    : book.id;
    
  const coverUrl =
    book.cover ||
    (book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "/placeholder-book.png"); // fallback if no cover

  // Normalize author
  // API results use author_name (array)
  // Favorites use author (string)
  const author =
    book.author_name?.join(", ") ||
    book.author ||
    "Unknown Author";

  const favorite = isFavorite(workId);

  // Handle favorite click without navigating to details page
  const handleFavoriteClick = (e) => {
    e.preventDefault(); // stop Link navigation
    e.stopPropagation();

    const bookData = {
      id: workId,
      title: book.title,
      cover: coverUrl,
      author: author,
    };

    favorite
      ? removeFavorite(workId)
      : addFavorite(bookData);
  };

  // to handle "future reads" click
  const handleFutureReadsClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const bookData = {
      id: workId,
      title: book.title,
      cover: coverUrl,
      author: author,
    };

    // Save pending book in localStorage
    localStorage.setItem("pendingFutureRead", JSON.stringify(bookData));

    // Redirect to signup page
    navigate("/signup");
  };

  return (
    <Link
      to={`/book/${workId}`}
      className="block relative group"
      aria-label={`View details for ${book.title}`} // NEW: accessibility label
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group-hover:scale-[1.01]">
        
        {/* Favorite Badge */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 text-2xl text-yellow-400 hover:text-yellow-500 transition-colors duration-200"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"} // NEW: accessible label
        >
          {favorite ? "★" : "☆"}
        </button>

        <div className="overflow-hidden rounded">
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`} // NEW: improved alt text
            className="w-full h-64 object-cover rounded transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Title with line clamp for overflow */}
        <h3 className="text-lg font-semibold mt-4 mb-1 line-clamp-2 text-gray-800">
          {book.title}
        </h3>

        {/* Authors may be an array, so we join them with commas */}
        <p className="text-sm text-gray-600 mb-2">
          {author}
        </p>

        {/* "View Details" link */}
        <p className="mt-2 text-blue-600 hover:underline text-sm font-medium">
          View Details
        </p>

        {/* NEW: Add to Future Reads CTA */}
        <button
          onClick={handleFutureReadsClick}
          className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Add to Future Reads
        </button>

      </div>
    </Link>
  );
}

export default BookCard;