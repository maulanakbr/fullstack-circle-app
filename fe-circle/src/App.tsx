import { Dashboard, Home, Profile } from '@/pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home auth="signin" />,
    },
    {
      path: '/signup',
      element: <Home auth="signup" />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/profile/:id',
      element: <Profile />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
