import { Box, type HTMLChakraProps } from '@chakra-ui/react';

import { SearchCard } from '../card';
import { MainHeader } from '../layout';

interface SearchSectionProps extends HTMLChakraProps<'section'> {}

export default function SearchSection(props: SearchSectionProps) {
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
      <MainHeader headertext="search" />
      <Box>
        <SearchCard />
      </Box>
    </Box>
  );
}
