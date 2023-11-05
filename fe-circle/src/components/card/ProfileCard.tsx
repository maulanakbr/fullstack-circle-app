import {
  Box,
  Button,
  Card,
  Heading,
  Image,
  Text,
  useDisclosure,
  type HTMLChakraProps,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

import ProfileEditor from '../modal/ProfileEditorModal';

interface ProfileCardProps extends HTMLChakraProps<'div'> {
  passthrough: string;
}

export default function ProfileCard(props: ProfileCardProps) {
  const { auth } = useAuth({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card
      {...props}
      position="relative"
      w={props.passthrough === 'profile' ? '100%' : undefined}
      h={props.passthrough === 'profile' ? '20rem' : '20rem'}
      bgColor="pigments.secondary"
      color="suits.primary"
      display="flex"
      flexDirection="column"
      gap={4}
      overflow="hidden"
    >
      <Box
        w="100%"
        minH="10.5rem"
        bgGradient="radial(gray.300, yellow.400, pink.200)"
        mb={14}
      />
      <Box
        position="absolute"
        top={props.passthrough === 'profile' ? '6rem' : '6rem'}
        left="1.2rem"
      >
        <Box
          display="flex"
          w="100%"
          alignItems="end"
          justifyContent="space-between"
          gap={props.passthrough === 'profile' ? '32vw' : '10rem'}
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
            variant="outline"
            w="5rem"
            rounded="20px"
            bg="pigments.primary"
            color="inherit"
            p="0.5rem"
            borderColor="suits.secondary"
            _hover={{ bg: 'pigments.secondary' }}
            onClick={onOpen}
          >
            Edit
          </Button>
          <ProfileEditor
            isOpen={isOpen}
            onClose={onClose}
          />
        </Box>
      </Box>
      <Box
        position="absolute"
        top={props.passthrough === 'profile' ? '13.5rem' : '13rem'}
        left="1.5rem"
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
    </Card>
  );
}
