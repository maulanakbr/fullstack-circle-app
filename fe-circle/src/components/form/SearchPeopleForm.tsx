import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  HTMLChakraProps,
  Image,
  Input,
} from '@chakra-ui/react';

import useAuth from '@/hooks/useAuth';

interface SearchPeopleProps extends HTMLChakraProps<'form'> {
  changeevent: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchPeopleForm(props: SearchPeopleProps) {
  const { auth } = useAuth({});

  return (
    <Box
      {...props}
      as="form"
      encType="multipart/form-data"
      maxW="100%"
      display="flex"
      alignItems="center"
      px={5}
      py={5}
      gap={4}
      borderBottom="2px solid"
      borderColor="pigments.secondary"
    >
      <Box minW="3rem">
        <Image
          src={auth?.data && (auth.data.user_image as string)}
          alt="profile-pic"
          w="2.5rem"
          h="2.5rem"
          rounded="100%"
          objectFit="cover"
        />
      </Box>
      <FormControl>
        <Input
          type="search"
          name="content"
          placeholder="Search People"
          outline="none"
          ring="none"
          border="none"
          _focusVisible={{ border: 'none' }}
          onChange={props.changeevent}
        />
      </FormControl>
      <FormControl maxW="8rem">
        <Button
          type="submit"
          w="8rem"
          rounded="18px"
          bg="brands.secondary"
          color="suits.primary"
          _hover={{ bg: 'brands.primary' }}
        >
          Search
        </Button>
      </FormControl>
    </Box>
  );
}
