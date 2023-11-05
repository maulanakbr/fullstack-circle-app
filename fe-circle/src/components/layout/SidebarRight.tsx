import { Box, type HTMLChakraProps } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { ProfileCard, SuggestionCard } from '../card';

interface SidebarRightProps extends HTMLChakraProps<'div'> {}

export default function SidebarRight(props: SidebarRightProps) {
  const { pathname } = useLocation();
  const isProfilePage = pathname.includes('profile');
  const isCurrentThreadPage = pathname.includes('thread');

  return (
    <Box
      {...props}
      position="fixed"
      top={isProfilePage || isCurrentThreadPage ? '4rem' : undefined}
      right="0"
      p="1rem"
      display="flex"
      flexDir="column"
      gap={isProfilePage || isCurrentThreadPage ? undefined : 4}
    >
      {!isProfilePage && !isCurrentThreadPage ? (
        <ProfileCard
          passthrough="sidebarright"
          mt="4rem"
        />
      ) : null}
      <SuggestionCard />
    </Box>
  );
}
