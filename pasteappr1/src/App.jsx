import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Homepage from './component/Homepage';
import Paste from './component/Paste';
import Viewpaste from './component/Viewpaste';
import ErrorPage from './component/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Homepage />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        <Viewpaste />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
