import { BookOpen, LogOut, User, Settings, Menu, X } from "lucide-react";
import { useContext, useState, useRef, useEffect } from "react";
import { authContext } from "../context/authContext";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const LoggedInHeader = () => {
  const { user, logout } = useContext(authContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const logoutClick = async () => {
    setIsLoggingOut(true);
    try {
      await axiosInstance.post("/auth/logout");
      logout();
    } catch (error) {
      console.error("Logout error:", error);
      logout(); // Force logout even if API fails
    } finally {
      setIsLoggingOut(false);
      setIsDropdownOpen(false);
    }
  };

  const redirectToHome = () => {
    navigate("/dashboard");
    setIsMobileMenuOpen(false);
  };

  const navigateToProfile = () => {
    navigate("/profile");
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navigateToSettings = () => {
    navigate("/settings");
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
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

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
              >
                <div className="relative">
                  <img 
                    src={user?.avatarUrl} 
                    alt={`${user?.username}'s avatar`}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-blue-300 transition-colors"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${user?.username}&background=3b82f6&color=fff&size=40`;
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {user?.username}
                  </p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={user?.avatarUrl} 
                        alt={`${user?.username}'s avatar`}
                        className="w-12 h-12 rounded-full border-2 border-gray-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${user?.username}&background=3b82f6&color=fff&size=48`;
                        }}
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{user?.username}</p>
                        <p className="text-sm text-gray-500">Learner</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button 
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      onClick={navigateToProfile}
                    >
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">Profile</span>
                    </button>

                    <button 
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      onClick={navigateToSettings}
                    >
                      <Settings className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">Settings</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-100 py-2">
                    <button 
                      onClick={logoutClick}
                      disabled={isLoggingOut}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoggingOut ? (
                        <>
                          <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Signing out...</span>
                        </>
                      ) : (
                        <>
                          <LogOut className="w-5 h-5" />
                          <span>Sign Out</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
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

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-4 border-t border-gray-100">
            {/* User Info */}
            <div className="flex items-center space-x-3 px-4 py-2">
              <img 
                src={user?.avatarUrl} 
                alt={`${user?.username}'s avatar`}
                className="w-12 h-12 rounded-full border-2 border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${user?.username}&background=3b82f6&color=fff&size=48`;
                }}
              />
              <div>
                <p className="font-semibold text-gray-900">{user?.username}</p>
                <p className="text-sm text-gray-500">Learner</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors rounded-lg"
                onClick={navigateToProfile}
              >
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Profile</span>
              </button>

              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors rounded-lg"
                onClick={navigateToSettings}
              >
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Settings</span>
              </button>

              <button 
                onClick={logoutClick}
                disabled={isLoggingOut}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors rounded-lg text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing out...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoggedInHeader;
