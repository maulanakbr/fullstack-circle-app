import * as React from 'react';
import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  type HTMLChakraProps,
} from '@chakra-ui/react';
import { Image as ImageIcon } from 'lucide-react';

import useAuth from '@/hooks/useAuth';
import { threadApi } from '@/app/apis/threadApi';

import { SearchPeopleForm } from '../form';

interface SearchCardProps extends HTMLChakraProps<'div'> {}

export default function SearchCard(props: SearchCardProps) {
  const [searchForm, setSearchForm] = React.useState<string>('');
  const { auth } = useAuth({});

  const { data: items } = threadApi.useFetchAllUsersQuery(null);
  const filteredUser = items?.data.filter(user => {
    return searchForm.toLowerCase() === ''
      ? null
      : user.fullname.toLowerCase().includes(searchForm);
  });

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchForm(e.target.value);
  };

  return (
    <>
      <SearchPeopleForm changeevent={onChangeSearch} />
      {filteredUser
        ?.filter(filter => filter.fullname !== auth?.data.fullname)
        .map(user => (
          <Card
            key={user.id}
            bg="pigments.primary"
            color="suits.primary"
          >
            <CardBody>
              <Box
                {...props}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                key={user.id}
              >
                <Box
                  display="flex"
                  gap={3}
                >
                  {user.user_image ? (
                    <Image
                      src={user.user_image}
                      alt="profile-pic"
                      w="2.5rem"
                      h="2.5rem"
                      rounded="100%"
                      objectFit="cover"
                    />
                  ) : (
                    <ImageIcon
                      width="40px"
                      size="27px"
                    />
                  )}
                  <Box w="10rem">
                    <Heading
                      as="h3"
                      fontSize="sm"
                    >
                      {user.fullname}
                    </Heading>
                    <Text
                      color="#797878"
                      fontSize="sm"
                    >
                      {user.username}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </CardBody>
          </Card>
        ))}
    </>
  );
}
