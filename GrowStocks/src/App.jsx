import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Stocks from './components/Stocks';
import IPOs from './components/IPOs';
import Mutual from './components/Mutual';
import About from './components/About';

const router = createBrowserRouter([
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
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: '/signup',
    element: (
      <>
        <Navbar />
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
    path: '/stocks',
    element: (
      <>
        <Navbar />
        <Stocks />
      </>
    ),
  },
  {
    path: '/ipos',
    element: (
      <>
        <Navbar />
        <IPOs />
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
]);

export default function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}