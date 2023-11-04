// import { Grid } from '@chakra-ui/react';

import useAuth from '@/hooks/useAuth';
import { MainContainer } from '@/components/layout';
import { Threads } from '@/components/section';

export default function Timeline() {
  useAuth({});

  return (
    <MainContainer>
      <Threads
        gridArea="1/2/6/5"
        maxW="100%"
      />
    </MainContainer>
  );
}
