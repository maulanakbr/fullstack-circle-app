import { Dashboard, Home } from '@/pages';
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
