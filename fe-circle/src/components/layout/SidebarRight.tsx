import { Box, type HTMLChakraProps } from '@chakra-ui/react';

import { ProfileCard, SuggestionCard } from '../card';

interface SidebarRightProps extends HTMLChakraProps<'div'> {}

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
      <ProfileCard passthrough="sidebarright" />
      <SuggestionCard />
    </Box>
  );
}
