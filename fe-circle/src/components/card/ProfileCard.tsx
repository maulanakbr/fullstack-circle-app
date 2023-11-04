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
      {...props}
      position="relative"
      w={props.passthrough === 'profile' ? '100%' : undefined}
      h="20rem"
      bgColor="pigments.secondary"
      display="flex"
      flexDirection="column"
      gap={4}
      rounded="15px"
      overflow="hidden"
    >
      <Box
        w="100%"
        minH="10rem"
        bgGradient="radial(gray.300, yellow.400, pink.200)"
        mb={14}
      />
      <Box
        position="absolute"
        top={props.passthrough === 'profile' ? '5.8rem' : '6rem'}
        left="1.7rem"
      >
        <Box
          display="flex"
          w="100%"
          alignItems="end"
          justifyContent="space-between"
          gap={props.passthrough === 'profile' ? '30vw' : '8rem'}
        >
          <Image
            src={auth?.data && (auth.data?.user_image as string)}
            alt="profile-pic"
            w="6rem"
            h="6rem"
            border="3px solid #3d3d3d"
            rounded="100%"
            objectFit="cover"
          />
          <Button
            w="3rem"
            h="2.7rem"
            rounded="18px"
            bg="brands.secondary"
            color="suits.primary"
            _hover={{ bg: 'brands.primary' }}
            minW="6.8rem"
            p="0.5rem"
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
      <Box
        position="absolute"
        top="13rem"
        left="1rem"
      >
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
