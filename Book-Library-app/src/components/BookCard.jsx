import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

//
// BookCard Component
// Receives book data as props and renders a card with title, author, and cover image
//

function BookCard({ book }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Normalize book ID
  // Works for both Open Library API results and stored favorites
  const workId = book.key
    ? book.key.split("/").pop()
    : book.id;

  // Normalize cover image
  // Case 1: Favorite already has full cover URL stored
  // Case 2: API result has cover_i (numeric ID)
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
      cover: coverUrl, // store full URL for simplicity
      author: author,
    };

    favorite
      ? removeFavorite(workId)
      : addFavorite(bookData);
  };

  return (
    <Link to={`/book/${workId}`} className="block relative">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg translate-y-1 transition-all duration-300 p-4">

        {/* Favorite Badge */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 text-xl"
        >
          {favorite ? "★" : "☆"}
        </button>

        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-64 object-cover rounded"
        />

        {/* Title with line clamp for overflow */}
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {book.title}
        </h3>

        {/* Authors may be an array, so we join them with commas */}
        <p className="text-sm text-gray-600">
          {author}
        </p>

        {/* Optional: Add a "View Details" button or link */}
        <p className="mt-4 text-blue-600 hover:underline text-sm">
          View Details
        </p>

      </div>
    </Link>
  );
}

export default BookCard;