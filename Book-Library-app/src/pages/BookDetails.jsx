// Book Details Page
// - Displays detailed information about a selected book.
import { useParams } from "react-router-dom";

function BookDetails() {
  const { id } = useParams();
// In a real app, you'd fetch book details using the ID here.
  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">
        Book Details Page
      </h2>
      <p>Book ID: {id}</p>
    </div>
  );
}

export default BookDetails;
