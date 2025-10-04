import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogIn } from 'react-icons/fi';
import { IoMdLogOut } from 'react-icons/io';
import { Logo, Button, Container } from './index';
import { menuItems } from '../constants/items';
import { useAuth } from '../hooks/useAuth';
const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50  ${
          isScrolled ? 'bg-white backdrop-blur-lg  py-3' : 'py-3 bg-white'
        }`}
      >
        <Container>
          <div className="flex justify-between items-center">
            <Logo />
            <div className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
              {menuItems &&
                menuItems?.map(item => {
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                        location.pathname === item.path
                          ? 'text-indigo-600 bg-indigo-50 font-semibold'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
            </div>

            {isAuthenticated ? (
              <Button className="flex items-center cursor-pointer space-x-2 rounded-md text-sm">
                <IoMdLogOut size={16} />
                <span>Logout</span>
              </Button>
            ) : (
              <div className="hidden md:flex items-center">
                <Button
                  onClick={handleLogin}
                  className="flex items-center cursor-pointer space-x-2 rounded-md text-sm"
                >
                  <FiLogIn size={16} />
                  <span>Sign In</span>
                </Button>
              </div>
            )}

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-3 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100  transition-all duration-300"
              >
                <FiMenu size={24} />
              </button>
            </div>
          </div>
        </Container>

        <div
          className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible bg-black/50 backdrop-blur-sm' : 'opacity-0 invisible'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`fixed left-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Logo />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-all duration-300"
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {menuItems?.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group ${
                      location.pathname === item.path
                        ? 'text-indigo-600 bg-indigo-50 font-semibold border border-indigo-100'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border border-transparent'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    <IconComponent
                      className={`transition-transform duration-300 group-hover:scale-110 ${
                        location.pathname === item.path ? 'scale-110' : ''
                      }`}
                      size={20}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              {isAuthenticated ? (
                <Button className="flex items-center cursor-pointer space-x-2 rounded-md text-sm">
                  <IoMdLogOut size={16} />
                  <span>Logout</span>
                </Button>
              ) : (
                <div className="hidden md:flex items-center">
                  <Button
                    onClick={handleLogin}
                    className="flex items-center cursor-pointer space-x-2 rounded-md text-sm"
                  >
                    <FiLogIn size={16} />
                    <span>Sign In</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
