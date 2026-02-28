// Open Library API Service
  // Fetch books from Open Library API based on search query
 
export const fetchBooks = async (query) => {
  try {
    const response = await fetch(
  `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
);

    // Check if response is successful

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await response.json();
    
// Return the array of book results
    return data.docs.slice(0, 15);
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

