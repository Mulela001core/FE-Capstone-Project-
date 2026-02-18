import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";


//Home Page
// -Displays search bar and list of books.

function Home() {
  const dummyBooks = [
    {
      key: "OL1M",
      title: "The Great Gatsby",
      author_name: ["F. Scott Fitzgerald"],
      cover_i: 8231856,
    },
    {
      key: "OL2M",
      title: "1984",
      author_name: ["George Orwell"],
      cover_i: 7222246,
    },
    {
      key: "OL3M",
      title: "To Kill a Mockingbird",
      author_name: ["Harper Lee"],
      cover_i: 8225261,
    },
  ];

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        📚 Book Library
      </h1>

      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {dummyBooks.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Home;
