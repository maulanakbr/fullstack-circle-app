import * as React from 'react';
import { Threads } from '@/components';
import { Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/app/hook';
import { selectAuth, selectLoading } from '@/app/slices/authSlice';
import { SidebarLeft, SidebarRight } from '@/components/ui';

export default function UserDashboard() {
  const loading = useAppSelector(selectLoading);
  const authSelector = useAppSelector(selectAuth);
  const auth = authSelector?.user;

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  if (loading) {
    return <h1>Loaidng</h1>;
  }

  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      templateRows="repeat(5, 1fr)"
      columnGap="1rem"
      rowGap="0px"
      p="1rem"
      gap={2}
    >
      <SidebarLeft
        style={{
          gridArea: '1 / 1 / 6 / 2',
          maxWidth: '100%',
          minHeight: '100vh',
        }}
      />
      <Threads style={{ gridArea: '1 / 2 / 6 / 5', maxWidth: '100%' }} />
      <SidebarRight
        style={{
          gridArea: '1 / 5 / 6 / 7',
          maxWidth: '100%',
          minHeight: '100vh',
        }}
      />
    </Grid>
  );
}
