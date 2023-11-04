import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useDisclosure,
  type HTMLChakraProps,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@/app/hook';
import { selectAuth } from '@/app/slices/authSlice';

import ProfileEditor from '../modal/ProfileEditorModal';

interface ProfileCardProps extends HTMLChakraProps<'div'> {
  passthrough: string;
}

export default function ProfileCard(props: ProfileCardProps) {
  const authSelector = useAppSelector(selectAuth);
  const auth = authSelector?.user;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bgColor="#313131"
      h={props.passthrough === 'profile' ? '24rem' : '20rem'}
      p={6}
      position="relative"
      display="flex"
      flexDirection="column"
      gap={4}
      rounded="15px"
      {...props}
    >
      <Heading fontSize="md">My Profile</Heading>
      <Box
        w="100%"
        minH={props.passthrough === 'profile' ? '9rem' : '5rem'}
        bgGradient="radial(gray.300, yellow.400, pink.200)"
        rounded="25px"
        mb={14}
      />
      <Box
        position="absolute"
        top={props.passthrough === 'profile' ? '11rem' : '7.5rem'}
      >
        <Box
          display="flex"
          w="100%"
          alignItems="end"
          justifyContent="space-between"
          gap={props.passthrough === 'profile' ? '65.6vw' : '12rem'}
        >
          <Image
            src={auth?.data && (auth.data?.user_image as string)}
            alt="profile-pic"
            top="7rem"
            minW="5rem"
            h="5rem"
            border="3px solid #3d3d3d"
            rounded="100%"
            objectFit="cover"
          />
          <Button
            bgColor="#3d3d3d"
            color="inherit"
            rounded="20px"
            right={props.passthrough === 'profile' ? '13rem' : '3.5rem'}
            minW="6.8rem"
            p="0.5rem"
            border="1px solid "
            onClick={onOpen}
          >
            Edit Profile
          </Button>
          <ProfileEditor
            isOpen={isOpen}
            onClose={onClose}
          />
        </Box>
      </Box>
      <Box>
        <Link to={`/profile/${auth?.data && auth.data.username}`}>
          <Heading
            as="h3"
            fontSize="xl"
          >
            {auth?.data && auth?.data?.fullname}
          </Heading>
        </Link>
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
