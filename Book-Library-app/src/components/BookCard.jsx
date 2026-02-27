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
    <div className="relative group bg-white rounded-lg shadow-md overflow-hidden p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* the Favorite Star Button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200"
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <span className={`text-2xl ${favorite ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"}`}>
          {favorite ? "★" : "☆"}
        </span>
      </button>

      {/* The Main Link Area */}
      <Link
        to={`/book/${workId}`}
        className="block"
        aria-label={`View details for ${book.title}`}
      >
        <div className="overflow-hidden rounded">
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            className="w-full h-64 object-cover rounded transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <h3 className="text-lg font-semibold mt-4 mb-1 line-clamp-2 text-gray-800">
          {book.title}
        </h3>

        <p className="text-sm text-gray-600 mb-2">
          {author}
        </p>

        <p className="mt-2 text-blue-600 hover:underline text-sm font-medium">
          View Details
        </p>
      </Link>

      {/* The Future Reads Button */}
      <button
        onClick={handleFutureReadsClick}
        className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-medium"
      >
        Add to Future Reads
      </button>
    </div>
  );
}

export default BookCard;