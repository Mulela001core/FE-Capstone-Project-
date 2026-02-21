import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

//HOME PAGE (LANDING PAGE)
function Home() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/results?q=${query}`);
  };

  return (
    
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Landing.jpg')" }}
    >


      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-slate-900/80 via-blue-900/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center text-white">
        
        {/* Badge */}
        <div className="mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm">
          ✨ Powered by Google Books API
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Discover Your Next <br /> Great Read
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg md:text-xl text-gray-200 mb-8">
          Search through millions of books from around the world.
          Find detailed information and previews all in one place.
        </p>

         <div className="w-full max-w-2xl">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Helper Text */}
        <p className="mt-4 text-gray-300 text-sm">
          Try searching for "science", "fiction", or your favorite author
        </p>

        
      </div>
    </div>
  );
}

export default Home;
