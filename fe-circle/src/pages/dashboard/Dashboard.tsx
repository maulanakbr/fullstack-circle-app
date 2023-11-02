import * as React from 'react';
import { Featured, Threads } from '@/components';
import { Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/app/hook';
import { selectAuth, selectLoading } from '@/app/slices/authSlice';
import { Navbar } from '@/components/ui';

export default function UserDashboard() {
  const loading = useAppSelector(selectLoading);
  const user = useAppSelector(selectAuth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (loading) {
    return <h1>Loaidng</h1>;
  }

  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      templateRows="repeat(5, 1fr)"
      columnGap="2rem"
      rowGap="0px"
      p="1rem"
      gap={6}
    >
      <Navbar style={{ gridArea: '1 / 1 / 6 / 2', maxWidth: '100%' }} />
      <Threads style={{ gridArea: '1 / 2 / 6 / 5', maxWidth: '100%' }} />
      <Featured style={{ gridArea: '1 / 5 / 6 / 7', maxWidth: '100%' }} />
    </Grid>
  );
}
