import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import Login from './components/Login';
// import SignUp from './components/SignUp';
import Mystocks from './components/Mystocks';
import Mutual from './components/Mutual';
import About from './components/About';
import UponLogin from './components/UponLogin';
import Myfunds from './components/Myfunds.jsx'
import Hamburgernav from './components/Hamburgernav.jsx';
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
  // {
  //   path: '/login',
  //   element: (
  //     <>
  //       <Navbar />
  //       <Login />
  //     </>
  //   ),
  // },
  // {
  //   path: '/signup',
  //   element: (
  //     <>
  //       <Navbar />
  //       <SignUp />
  //     </>
  //   ),
  // },
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