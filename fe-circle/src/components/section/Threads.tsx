import { Box, type HTMLChakraProps } from '@chakra-ui/react';

import { ThreadCard } from '../card';
import { PostThreadForm } from '../form';
import { MainHeader } from '../layout';

interface ThreadsProps extends HTMLChakraProps<'section'> {}

export default function Threads(props: ThreadsProps) {
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
      <MainHeader headertext="home" />
      <Box mt="5rem">
        <PostThreadForm mb="2rem" />
        <ThreadCard />
      </Box>
    </Box>
  );
}
