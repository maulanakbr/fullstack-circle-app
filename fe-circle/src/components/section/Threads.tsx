import { Box, Heading, type HTMLChakraProps } from '@chakra-ui/react';

import { ThreadCard } from '../card';
import { PostThreadForm } from '../form';

interface ThreadsProps extends HTMLChakraProps<'section'> {}

export default function Threads(props: ThreadsProps) {
  return (
    <Box
      {...props}
      as="section"
      p="1rem"
      borderRight="1px solid #3d3d3d"
    >
      <Heading
        as="h3"
        mb={8}
        fontSize="3xl"
      >
        Home
      </Heading>
      <Box
        display="flex"
        flexDir="column"
        gap={10}
      >
        <PostThreadForm />
        <ThreadCard />
      </Box>
    </Box>
  );
}
