import { Link } from "react-router-dom";

//
//BookCard Component

// Receives book data as props and renders a card with title, author, and cover image

function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

  // Extract clean work ID from book key for routing
  
  const workId = book.key.split("/").pop();

  return (
    <Link to={`/book/${workId}`} className="block">
      <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-56 object-cover rounded-md mb-4"
        />

        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {book.title}
        </h3>

        <p className="text-sm text-gray-600">
          {book.author_name?.join(", ") || "Unknown Author"}
        </p>
      </div>
    </Link>
  );
}

export default BookCard;
