import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackToTop from './componets/BackToTop';

const App = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnFocusLoss />
      <BackToTop />
    </>
  );
};

export default App;
