import { Flex, Heading, HTMLChakraProps } from '@chakra-ui/react';

interface MainHeaderProps extends HTMLChakraProps<'header'> {
  headertext: 'circle' | 'home' | 'profile';
}

export default function MainHeader(props: MainHeaderProps) {
  const upperCaseFirstLetter = (letter: string) => {
    const firstLetter = letter.at(0)?.toUpperCase();
    const tail = letter.replace(letter.at(0) as string, firstLetter as string);

    return tail;
  };

  return (
    <Flex
      as="header"
      position="fixed"
      bg="pigments.primary"
      w="100%"
      h="4rem"
      top="0"
      px={props.headertext === 'circle' ? undefined : 5}
      align="center"
      zIndex="sticky"
      borderBottom="2px solid"
      borderColor="pigments.secondary"
    >
      <Heading
        as="h3"
        fontSize="3xl"
        color={props.headertext === 'circle' ? 'brands.primary' : undefined}
      >
        {upperCaseFirstLetter(props.headertext)}
      </Heading>
    </Flex>
  );
}
