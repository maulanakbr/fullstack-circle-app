import { GridItem } from '@chakra-ui/react';

import { GridContainer } from '@/components/layout';
import { ThreadDetailsSection } from '@/components/section';

export default function Thread() {
  return (
    <GridContainer>
      <GridItem
        colStart={2}
        colEnd={5}
      >
        <ThreadDetailsSection />
      </GridItem>
    </GridContainer>
  );
}
