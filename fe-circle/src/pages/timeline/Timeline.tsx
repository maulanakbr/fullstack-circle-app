// import { Grid } from '@chakra-ui/react';

import { GridItem } from '@chakra-ui/react';

import useAuth from '@/hooks/useAuth';
import { GridContainer } from '@/components/layout';
import { Threads } from '@/components/section';

export default function Timeline() {
  useAuth({});

  return (
    <GridContainer>
      <GridItem
        colStart={2}
        colEnd={5}
      >
        <Threads />
      </GridItem>
    </GridContainer>
  );
}
