import { Box, HTMLChakraProps } from '@chakra-ui/react';

import { ProfileCard, ThreadCard } from '../card';
import { PostThreadForm } from '../form';
import { MainHeader } from '../layout';

interface ProfileSectionProps extends HTMLChakraProps<'section'> {}

export default function ProfileSection(props: ProfileSectionProps) {
  return (
    <Box
      {...props}
      as="section"
      position="relative"
      w="100%"
      py="1rem"
      borderX="1px solid"
      borderColor="pigments.secondary"
    >
      <MainHeader headertext="profile" />
      <Box
        w="100%"
        mt="4rem"
      >
        <ProfileCard passthrough="profile" />
        <PostThreadForm />
        <ThreadCard />
      </Box>
    </Box>
  );
}
