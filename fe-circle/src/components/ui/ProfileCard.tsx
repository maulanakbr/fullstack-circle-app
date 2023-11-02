import * as React from 'react';
import { SignInResponse } from '@/types';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';

import { useAppSelector } from '@/app/hook';
import { selectAuth } from '@/app/slices/authSlice';

interface ProfileCardProps extends React.ComponentProps<'div'> {}

export default function ProfileCard(props: ProfileCardProps) {
  const authSelector = useAppSelector(selectAuth) as SignInResponse | null;
  const auth = authSelector && authSelector.user;

  console.log(auth);

  return (
    <Box
      {...props}
      bgColor="#313131"
      h="20rem"
      p={6}
      position="relative"
      display="flex"
      flexDirection="column"
      gap={4}
      rounded="15px"
    >
      <Heading fontSize="md">My Profile</Heading>
      <Box
        w="100%"
        h="6rem"
        bgGradient="radial(gray.300, yellow.400, pink.200)"
        rounded="20px"
        mb={14}
      />
      <Box
        position="absolute"
        top="7.5rem"
      >
        <Box
          display="flex"
          alignItems="end"
          justifyContent="space-between"
          gap="12.2rem"
        >
          <Image
            src={auth?.data && (auth.data?.user_image as string)}
            alt="profile-pic"
            top="7rem"
            w="4.8rem"
            h="4.8rem"
            border="3px solid #3d3d3d"
            rounded="100%"
            objectFit="cover"
          />
          <Button
            // w="7rem"
            bgColor="#3d3d3d"
            color="inherit"
            rounded="20px"
            p="0.5rem"
            border="1px solid "
          >
            Edit Profile
          </Button>
        </Box>
      </Box>
      <Box>
        <Heading
          as="h3"
          fontSize="xl"
        >
          {auth?.data && auth?.data?.fullname}
        </Heading>
        <Text
          color="#797878"
          fontSize="sm"
        >
          @{auth?.data && auth?.data?.username}
        </Text>
        <Text fontSize="sm">Semi personal woman</Text>
        <Box
          display="flex"
          gap={2}
        >
          <Box
            display="flex"
            gap={1}
          >
            <Text fontSize="sm">
              {auth?.data && auth?.data?.followings.length}
            </Text>
            <Text
              fontSize="sm"
              color="#797878"
            >
              Following
            </Text>
          </Box>
          <Box
            display="flex"
            gap={1}
          >
            <Text fontSize="sm">
              {auth?.data && auth?.data?.followers.length}
            </Text>
            <Text
              fontSize="sm"
              color="#797878"
            >
              Followers
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
