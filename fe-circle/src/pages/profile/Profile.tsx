import { GridItem } from '@chakra-ui/react';

import { GridContainer } from '@/components/layout';
import { ProfileSection } from '@/components/section';

export default function Profile() {
  return (
    <GridContainer>
      <GridItem
        colStart={2}
        colEnd={5}
      >
        <ProfileSection />
      </GridItem>
    </GridContainer>
  );
}
