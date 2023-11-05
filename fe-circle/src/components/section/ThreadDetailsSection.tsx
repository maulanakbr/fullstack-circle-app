import { Box, type HTMLChakraProps } from '@chakra-ui/react';

import { ThreadDetailsCard } from '../card';
import { PostReplyForm } from '../form';
import { MainHeader } from '../layout';

interface ThreadDetailsSection extends HTMLChakraProps<'section'> {}

export default function ThreadSection(props: ThreadDetailsSection) {
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
      <MainHeader headertext="thread" />
      <Box>
        <ThreadDetailsCard />
        <PostReplyForm />
      </Box>
    </Box>
  );
}
