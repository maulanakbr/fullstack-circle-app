import { Home, Profile, Search, Thread, Timeline } from '@/pages';
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
      path: '/search',
      element: <Search />,
    },
    {
      path: '/timeline',
      element: <Timeline />,
    },
    {
      path: '/profile/:id',
      element: <Profile />,
    },
    {
      path: 'thread/current/:id',
      element: <Thread />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
