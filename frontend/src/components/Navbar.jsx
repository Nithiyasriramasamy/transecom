// Navigation bar component
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-[#131921] text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo area */}
          <Link to="/" className="flex items-center gap-1 border border-transparent hover:border-white rounded-sm p-2 cursor-pointer">
            <span className="text-2xl font-bold tracking-tighter">newecom</span>
            <span className="text-xs relative top-1"></span>
          </Link>



          {/* Right Links */}
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="hidden lg:block">
              <div className="text-xs text-gray-300"></div>
              <div className="font-bold"></div>
            </div>

            <div className="hidden lg:block">
              <div className="text-xs text-gray-300"></div>
              <div className="font-bold"></div>
            </div>

            <Link to="/cart" className="flex items-end gap-1 hover:border border-white p-2 rounded-sm">
              <span className="text-3xl font-bold text-[#f90] leading-none">🛒</span>
              <span className="font-bold">Cart</span>
            </Link>

            {/* Simple User Controls */}
            <div className="flex items-center gap-3 border-l border-gray-600 pl-4">
              {isLoggedIn ? (
                <>
                  <Link to="/admin" className="hover:text-[#f90]">Admin</Link>
                  <Link to="/add-product" className="hover:text-[#f90]">Add Product</Link>
                  <button onClick={handleLogout} className="hover:text-red-400">Sign Out</button>
                </>
              ) : (
                <Link to="/login" className="hover:text-[#f90]">Sign In</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sub-navbar */}
      <div >

      </div>
    </nav>
  );
}

export default Navbar;
