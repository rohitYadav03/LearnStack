import { BookOpen, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function redirectToLogin() {
    navigate("/login");
    setIsMobileMenuOpen(false);
  }

  function redirectToSignup() {
    navigate("/signup");
    setIsMobileMenuOpen(false);
  }

  function redirectToHome() {
    navigate("/");
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={redirectToHome}
          >
            <div className="relative">
              <BookOpen className="h-9 w-9 text-blue-600 group-hover:text-blue-700 transition-colors" />
              <div className="absolute inset-0 bg-blue-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              LearnStack
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={redirectToLogin}
              className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50"
            >
              Login
            </button>
            
            <button 
              onClick={redirectToSignup}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-3 border-t border-gray-100">
            <button
              onClick={redirectToLogin}
              className="block w-full text-left text-gray-600 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50"
            >
              Login
            </button>
            
            <button 
              onClick={redirectToSignup}
              className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 text-center"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;