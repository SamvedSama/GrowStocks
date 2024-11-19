import { createBrowserRouter, RouterProvider,Navigate,Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Mystocks from './pages/Mystocks.jsx';
import Mutual from './pages/Mutual.jsx';
import About from './pages/About.jsx';
import UponLogin from './pages/UponLogin.jsx';
import Myfunds from './pages/Myfunds.jsx'
import Hamburgernav from './components/Hamburgernav.jsx';
import Watchlist from './pages/Watchlist.jsx'
import StockTrans from './pages/StockTrans.jsx';
import MutualTrans from './pages/MutualTrans.jsx';
import IPOTrans from './pages/IpoTrans.jsx';
import ContactUs from './pages/ContactUs.jsx';

const isAuthenticated = false;

const ProtectedRoute = ({ children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/home',
    element: (
      <>
        <Navbar />
        <Hero />
      </>
    ),
  },
  {
    path: '/login',
    element: (
      <>
        {/* <Navbar /> */}
        <Login />
      </>
    ),
  },
  {
    path: '/signup',
    element: (
      <>
        {/* <Navbar /> */}
        <SignUp />
      </>
    ),
  },
  {
    path: '/about',
    element: (
      <>
        <Navbar />
        <About />
      </>
    ),
  },
  {
    path: '/contactus',
    element: (
      <>
        <Navbar />
        <ContactUs />
      </>
    ),
  },
  {
    path: '/mystocks',
    element: (
      <ProtectedRoute>
      <>
        <Hamburgernav/>
        <Mystocks />
      </>
      </ProtectedRoute>
    ),
  },
  {
    path: '/mutual',
    element: (
      <ProtectedRoute>
      <>
        <Navbar />
        <Mutual />
      </>
      </ProtectedRoute>
    ),
  },
  {
    path: '/welcome',
    element: (
      <ProtectedRoute>
        <UponLogin/>
      </ProtectedRoute>
      
    ),
  },
  {
    path:'/myfunds',
    element: (
      <ProtectedRoute>
         <Myfunds/>
      </ProtectedRoute>
   
    ),
  },
  {
    path:'/watchlist',
    element: (
      <ProtectedRoute>
        <>
        <Hamburgernav/>
        <Watchlist/>
        </>
      </ProtectedRoute>)
  },
  {
    path: '/buy/:stockname',
    element: (
      <ProtectedRoute>
        <StockTrans />
      </ProtectedRoute>  
       )     
  },
  {
    path: '/mutual/:mutualname',
    element: (
      <ProtectedRoute>
        <MutualTrans />
      </ProtectedRoute> )     
  },
  {
    path: '/ipo/:mutualname',
    element: (
      <ProtectedRoute>
        <IPOTrans />
      </ProtectedRoute> )     
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}