import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import BookDetails from "./pages/BookDetails";
import Signup from "./pages/Signup"; 
import FavoritesPage from "./pages/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";


function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/favorites" element={<FavoritesPage />} />
          
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;