import { AuthForm } from '@/components';
import { Box, Grid, Image } from '@chakra-ui/react';

export interface HomeProps {
  auth: 'signin' | 'signup';
}

export default function Home(props: HomeProps) {
  return (
    <Grid
      as="section"
      templateColumns="repeat(2, 1fr)"
    >
      <Box>
        <Image
          src="asset_1.jpg"
          alt="asset_1"
          w="100%"
          h="100vh"
          objectFit="cover"
        />
      </Box>
      <AuthForm auth={props.auth} />
    </Grid>
  );
}
