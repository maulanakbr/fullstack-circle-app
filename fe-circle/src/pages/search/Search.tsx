import { GridItem } from '@chakra-ui/react';

import { ReplyCard } from '@/components/card';
import { GridContainer } from '@/components/layout';
import { SearchSection } from '@/components/section';

export default function Search() {
  return (
    <GridContainer>
      <GridItem
        colStart={2}
        colEnd={5}
      >
        <SearchSection />
        <ReplyCard />
      </GridItem>
    </GridContainer>
  );
}
