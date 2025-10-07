import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // if (loading) return <div className='flex min-h-screen items-center justify-center'><Loader size='medium' label='Loading...' /> </div>

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnFocusLoss />
    </>
  );
};

export default App;
