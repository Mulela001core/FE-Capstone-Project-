import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [pendingBook, setPendingBook] = useState(null);

  // Check if user tried to save a Future Read
  useEffect(() => {
    const savedBook = localStorage.getItem("pendingFutureRead");
    if (savedBook) {
      setPendingBook(JSON.parse(savedBook));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate account creation
    localStorage.setItem("user", "demo-user");
    localStorage.removeItem("pendingFutureRead");

    // Redirect back home
    navigate("/");
  };

  return (

    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      {/* Back Button */}
        <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            ← Back
          </button>

      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full">

        

        <h1 className="text-3xl font-bold text-center mb-4">
           Build Your Personal Library 
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Create an account to save books to your Future Reads list and access your favorites across devices.
        </p>

        {/* Show book they tried to save */}
        {pendingBook && (
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-6">
            <p className="text-sm text-purple-700">
              You were trying to save:
            </p>
            <p className="font-semibold text-purple-900">
              {pendingBook.title}
            </p>
          </div>
        )}

{/* simple form with name, email, password */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Create Account
          </button> 
        </form>

               {/* Optional Login Link */}

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="text-purple-600 font-medium hover:text-purple-700 hover:underline transition duration-300"
          >
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;