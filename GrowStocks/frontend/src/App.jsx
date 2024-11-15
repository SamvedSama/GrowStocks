import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom';
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
    path: '/mystocks',
    element: (
      <>
        <Hamburgernav/>
        <Mystocks />
      </>
    ),
  },
  {
    path: '/mutual',
    element: (
      <>
        <Navbar />
        <Mutual />
      </>
    ),
  },
  {
    path: '/welcome',
    element: (
      <>
        <UponLogin/>
      </>
    ),
  },
  {
    path:'/myfunds',
    element: (
        <>
        {/* <Navbar/> */}
        <Myfunds/>
        </>    )
  },
  {
    path:'/watchlist',
    element: (
        <>
        <Hamburgernav/>
        <Watchlist/>
        </>    )
  },
  {
    path: '/buy/:stockname',
    element: (
      <>
        <StockTrans />
      </> )     
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