import { GridItem } from '@chakra-ui/react';

import useAuth from '@/hooks/useAuth';
import { GridContainer } from '@/components/layout';
import { ThreadSection } from '@/components/section';

export default function Timeline() {
  useAuth({});

  return (
    <GridContainer>
      <GridItem
        colStart={2}
        colEnd={5}
      >
        <ThreadSection />
      </GridItem>
    </GridContainer>
  );
}
