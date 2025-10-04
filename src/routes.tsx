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
} from './pages';
import { Navbar, Footer } from './componets';
const AppRoutes = () => (
  <Router>
    <div className="App">
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default AppRoutes;
