import * as React from 'react';
import { Box, Heading } from '@chakra-ui/react';

import { PostThreadForm, ThreadCard } from './ui';

interface ThreadsProps extends React.ComponentProps<'div'> {}

export default function Threads(props: ThreadsProps) {
  return (
    <Box
      {...props}
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
