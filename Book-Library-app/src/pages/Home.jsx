import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";


//HOME PAGE (LANDING PAGE)
function Home() {
  const navigate = useNavigate();

const handleSearch = (query) => {
  navigate(`/results?q=${encodeURIComponent(query)}`);
};

return (
  <div
    className="relative min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/landing2.jpg')" }}
  >
    
    
    {/* Main content */}
    <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
      
      {/* Glass container */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 md:p-14 text-center text-white">
        
        {/* Badge */}
        <div className="inline-block mb-6 px-5 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-sm tracking-wide">
         📚 Powered by Google Books API
        </div>


        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
          Discover Your Next
          <span className="block text-indigo-300">Great Read</span>
        </h1>


        {/* Subtitle */}
        <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Search through millions of books from around the world.
          Explore detailed information, authors, and subjects — all in one place.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>


        {/* Helper Text */}
        <p className="mt-6 text-gray-300 text-sm tracking-wide">
          Try searching for <span className="text-indigo-300">science</span>, 
          <span className="text-indigo-300"> fiction</span>, 
          or your favorite <span className="text-indigo-300"> author </span>
        </p>

      </div>
    </div>
  </div>
);


}

export default Home;
