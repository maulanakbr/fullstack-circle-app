import { Box, Heading } from '@chakra-ui/react';

import PeopleCard from './PeopleCard';

interface ProfileCardProps extends React.ComponentProps<'div'> {}

export default function SuggestionCard(props: ProfileCardProps) {
  return (
    <Box
      {...props}
      bgColor="#313131"
      p={6}
      position="relative"
      display="flex"
      flexDirection="column"
      gap={4}
      rounded="15px"
    >
      <Heading fontSize="md">Suggested for you</Heading>
      <PeopleCard />
    </Box>
  );
}
