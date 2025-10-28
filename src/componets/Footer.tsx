import { FiPhone, FiMail as FiEmail, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { footerMenus, socialLinks } from '../constants/items';
import { Container, Button, Logo } from '../index';
import { useState } from 'react';
import { subscribeApi } from '../api/subscribeService';
import { handleError, handleSuccess } from '../utils/toastHandler';
const Footer = () => {

  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const msg: any = await subscribeApi(email);
      handleSuccess(msg.message || "");
      setEmail('');
    } catch (err: any) {
      handleError(err.message || "This email is already subscribed to our newsletter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Creating beautiful and functional web experiences. Specializing in modern web
              technologies, responsive design, and user-centered development approaches.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                <FiPhone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                <FiEmail size={18} />
                <span>hello@sanjay.dev</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                <FiMapPin size={18} />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>

          {footerMenus &&
            footerMenus.map((menu, index) => (
              <div key={index} className="lg:col-span-1">
                <h4 className="text-lg font-semibold mb-6 text-white">{menu.title}</h4>
                <ul className="space-y-3">
                  {menu.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          <div className="lg:col-span-2 md:col-span-2">
            <h4 className="text-lg font-semibold mb-6 text-white">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>

            <form onSubmit={handleSubscribe}>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <input
                  value={email}
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                />
                <Button isLoading={loading} type="submit">
                  Subscribe
                </Button>
              </div>
            </form>

            <div>
              <h5 className="text-lg font-semibold mb-4 text-white">Follow Us</h5>
              <div className="flex flex-wrap gap-4">
                {socialLinks &&
                  socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1  hover:bg-gray-700 shadow-lg hover:shadow-xl`}
                        aria-label={social.name}
                      >
                        <IconComponent size={20} />
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} SANJAY. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
