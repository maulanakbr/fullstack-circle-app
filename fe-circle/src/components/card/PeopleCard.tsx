import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HTMLChakraProps,
  Image,
  Text,
} from '@chakra-ui/react';
import { Image as ImageIcon } from 'lucide-react';

import useAuth from '@/hooks/useAuth';
import { threadApi } from '@/app/apis/threadApi';

interface PeopleCardProps extends HTMLChakraProps<'div'> {
  passthrough?: string;
}

export default function PeopleCard(props: PeopleCardProps) {
  const { auth } = useAuth({});

  const { data: users } = threadApi.useFetchAllUsersQuery(null);

  const [createFollow, { status }] = threadApi.useCreateFollowMutation();
  const [isFollow, setIsFollow] = React.useState<boolean>(false);

  const handleFollow = (
    e: React.MouseEvent<HTMLButtonElement>,
    userId: string
  ) => {
    e.preventDefault();

    createFollow({
      body: { userId },
      token: auth?.token as string,
    });

    setIsFollow(prevState => !prevState);

    console.log(status);
  };

  return (
    <>
      {users?.data.map(user => (
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
              {props.passthrough === 'search' ? null : (
                <Box>
                  <Button
                    variant="outline"
                    w="5rem"
                    color="inherit"
                    rounded="20px"
                    p="0.5rem"
                    _hover={{ bg: 'pigments.secondary' }}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      handleFollow(e, user.id)
                    }
                  >
                    {isFollow ? 'Following' : 'Follow'}
                  </Button>
                </Box>
              )}
            </Box>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
