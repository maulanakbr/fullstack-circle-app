import React from 'react';
import { Box, type HTMLChakraProps } from '@chakra-ui/react';

import { PeopleCard } from '../card';
import { SearchPeopleForm } from '../form';
import { MainHeader } from '../layout';

interface SearchSectionProps extends HTMLChakraProps<'section'> {}

export default function SearchSection(props: SearchSectionProps) {
  const [searchForm, setSearchForm] = React.useState<string>('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm(e.target.value);
  };

  console.log(searchForm);

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
        <SearchPeopleForm changeevent={onChangeSearch} />
        <PeopleCard passthrough="search" />
      </Box>
    </Box>
  );
}
