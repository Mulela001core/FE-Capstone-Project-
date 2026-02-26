import { useState } from "react";

//SEARCHING (YOU INPUT AND TRIGGERS YOU TO SEARCH)

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    //handle form submission & prevent empty searches
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        onSearch(searchTerm);
    };

    return (
        <form 
        onSubmit={handleSubmit}
         className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl mx-auto">
        
        {/* Search input */}
        <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search books"
        />

            {/* Search Button */}
       <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
        Search
      </button>
    </form>
    );
    
}

export default SearchBar;