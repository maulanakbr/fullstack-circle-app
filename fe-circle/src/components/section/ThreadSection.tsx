import { Box, type HTMLChakraProps } from '@chakra-ui/react';

import { ThreadCard } from '../card';
import { PostThreadForm } from '../form';
import { MainHeader } from '../layout';

interface ThreadSectionProps extends HTMLChakraProps<'section'> {}

export default function ThreadSection(props: ThreadSectionProps) {
  return (
    <Box
      {...props}
      as="section"
      position="relative"
      w="100%"
      py="3.5rem"
      borderX="1px solid"
      borderColor="pigments.secondary"
    >
      <MainHeader headertext="home" />
      <Box>
        <PostThreadForm />
        <ThreadCard />
      </Box>
    </Box>
  );
}
