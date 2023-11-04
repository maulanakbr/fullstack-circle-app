import { Box } from '@chakra-ui/react';

import { ProfileCard, ThreadCard } from '@/components/card';
import { PostThreadForm } from '@/components/form';
import { MainContainer } from '@/components/layout';

export default function Profile() {
  return (
    <MainContainer include="profile">
      <ProfileCard
        w="100%"
        passthrough="profile"
        gridArea="1/3/3/6"
        minW="68vw"
      />
      <Box
        display="flex"
        flexDir="column"
        gap={10}
        gridArea="3/3/6/6"
        maxW="100%"
      >
        <PostThreadForm />
        <ThreadCard />
      </Box>
    </MainContainer>
  );
}
