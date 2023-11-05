import {
  Box,
  Card,
  CardBody,
  Heading,
  HTMLChakraProps,
} from '@chakra-ui/react';

import PeopleCard from './PeopleCard';

interface ProfileCardProps extends HTMLChakraProps<'div'> {}

export default function SuggestionCard(props: ProfileCardProps) {
  return (
    <Card
      bg="pigments.secondary"
      color="suits.primary"
    >
      <CardBody>
        <Box
          {...props}
          position="relative"
          display="flex"
          flexDirection="column"
          gap={4}
          rounded="15px"
        >
          <Heading fontSize="md">Suggested for you</Heading>
          <PeopleCard />
        </Box>
      </CardBody>
    </Card>
  );
}
