import { Box, type HTMLChakraProps } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { ProfileCard, SuggestionCard } from '../card';

interface SidebarRightProps extends HTMLChakraProps<'div'> {}

export default function SidebarRight(props: SidebarRightProps) {
  const { pathname } = useLocation();
  const isProfile = pathname.includes('profile');

  return (
    <Box
      {...props}
      position="fixed"
      top={isProfile ? '4rem' : undefined}
      right="0"
      p="1rem"
      display="flex"
      flexDir="column"
      gap={isProfile ? 4 : undefined}
    >
      {!isProfile ? (
        <ProfileCard
          passthrough="sidebarright"
          mt="4rem"
        />
      ) : null}
      <SuggestionCard />
    </Box>
  );
}
