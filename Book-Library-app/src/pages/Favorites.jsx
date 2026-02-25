import { useFavorites } from "../context/FavoritesContext";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";

function FavoritesPage() {

const navigate = useNavigate();

  // Get favorites array from context
  const { favorites } = useFavorites();

  // If favorites is empty or undefined
  if (!favorites || favorites.length === 0) {
    return (
      <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">My Favorite Books</h1>
        <p className="text-gray-600">You have no favorite books yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Back Button */}
<button
  onClick={() => navigate(-1)}
  className="mb-4 text-blue-600 hover:underline"
>
  ← Back
</button>


      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        My Favorite Books
      </h1>

      {/* Responsive Grid Layout */}
      {/* 1 column on small screens, 2 on small devices, 4 on medium+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {favorites.map((book) => {
          return (
            // Render each favorite book using BookCard component
            <BookCard
              key={book.id}
              book={book} // Pass stored favorite directly
            />
          );
        })}
      </div>
    </div>
  );
}

export default FavoritesPage;