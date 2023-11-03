import * as React from 'react';
import { Box } from '@chakra-ui/react';

import { ProfileCard, SuggestionCard } from '.';

interface SidebarRightProps extends React.ComponentProps<'div'> {}

export default function SidebarRight(props: SidebarRightProps) {
  return (
    <Box
      {...props}
      position="fixed"
      right="2"
      p="1rem"
      display="flex"
      flexDir="column"
      gap={4}
    >
      <ProfileCard />
      <SuggestionCard />
    </Box>
  );
}
