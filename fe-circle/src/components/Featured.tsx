import * as React from 'react';
import { Box } from '@chakra-ui/react';

import { ProfileCard, SuggestionCard } from './ui';

interface FeaturedProps extends React.ComponentProps<'div'> {}

export default function Featured(props: FeaturedProps) {
  return (
    <Box
      {...props}
      w="100%"
      display="flex"
      flexDir="column"
      gap={4}
    >
      <ProfileCard />
      <SuggestionCard />
    </Box>
  );
}
