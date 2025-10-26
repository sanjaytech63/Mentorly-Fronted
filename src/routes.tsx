import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  Login,
  Register,
  Help,
  Faq,
  Terms,
  Privacy,
  ProtectedRoute,
  NotFound,
} from './index';
import { Navbar, Footer, NetworkStatusBanner } from './index';
import Dashboard from './componets/Dashboard';
import BlogDetails from './componets/Home/BlogDetails';
const AppRoutes = () => (
  <Router>
    <div className="App">
      <NetworkStatusBanner />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/help" element={<Help />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);

export default AppRoutes;
