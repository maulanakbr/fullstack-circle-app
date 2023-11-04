import { Home, Profile, Timeline } from '@/pages';
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
      path: '/timeline',
      element: <Timeline />,
    },
    {
      path: '/profile/:id',
      element: <Profile />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
