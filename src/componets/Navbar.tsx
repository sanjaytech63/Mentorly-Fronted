import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiLogIn } from 'react-icons/fi';
import { Logo, Button, Container, Avatar } from '../index';
import { menuItems } from '../constants/items';
import { useAuth } from '../hooks/useAuth';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, handleLogout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setIsMenuOpen(false), [location]);
  const handleLogin = () => navigate('/login');

  return (
    <nav className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 bg-white`}>
      <Container>
        <div className="flex justify-between items-center sm:py-1 py-3  relative">
          <Logo />

          <div className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
            {menuItems?.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${location.pathname === item.path
                    ? 'text-indigo-600 bg-indigo-50 font-semibold'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                  }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <Avatar
                src={user.avatar}
                fullName={user.fullName}
                email={user.email}
                size={44}
                onLogout={handleLogout}
              />
            ) : (
              <Button
                onClick={handleLogin}
                className="flex items-center gap-2 rounded-md text-sm font-medium"
              >
                <FiLogIn size={16} />
                <span>Sign In</span>
              </Button>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2 ">
            <div className="md:hidden">
              {isAuthenticated && user && (
                <FaUserCircle
                  onClick={() => navigate('/profile')}
                  size={22}
                  className="text-gray-700"
                />
              )}
            </div>

            <div
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-all duration-300"
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </div>
          </div>
        </div>
      </Container>

      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 z-[999] ${isMenuOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
          }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`absolute left-0 top-0 h-full w-full bg-white  transition-transform duration-300 ease-in-out z-[9999] ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          onClick={e => e.stopPropagation()}
        >
          <Container>
            <div className="flex justify-between items-center py-3 relative">
              <Logo />
              <div onClick={() => setIsMenuOpen(false)} className="md:hidden ">
                <IoIosCloseCircleOutline
                  size={24}
                  className="text-gray-700 hover:bg-gray-100 transition-all duration-300"
                />
              </div>
            </div>
          </Container>

          <div className="p-6 space-y-3 overflow-y-auto max-h-[calc(100vh-140px)]">
            {menuItems?.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 border ${location.pathname === item.path
                      ? 'text-indigo-600 bg-indigo-50 border-indigo-100'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border-transparent'
                    }`}
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <IconComponent
                    size={20}
                    className={`transition-transform duration-300 ${location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
