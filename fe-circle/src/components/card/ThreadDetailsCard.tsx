import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  type HTMLChakraProps,
} from '@chakra-ui/react';
import { Heart, MenuSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ReplyRequest } from '@/types/reply';
import timeSince from '@/lib/timeSince';
import useAuth from '@/hooks/useAuth';
import { threadApi } from '@/app/apis/threadApi';

import PostReplyForm from '../form/PostReplyForm';

interface ThreadDetailsCardProps extends HTMLChakraProps<'div'> {}

export default function ThreadDetailsCard(props: ThreadDetailsCardProps) {
  const { auth } = useAuth({});
  const { data: thread } = threadApi.useFetchThreadIdQuery(null);

  const [isLike, setIsLike] = React.useState<boolean>(false);
  const [showReplyForm, setShowReplyForm] = React.useState<boolean>(false);
  const [postReply, setPostReply] = React.useState<ReplyRequest>({
    content: '',
    image: '',
    thread: '',
  });

  const [createLike] = threadApi.useCreateLikeMutation();
  const [createReply] = threadApi.useCreateReplyMutation();

  const handleShowReplyForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowReplyForm(prevState => !prevState);
  };

  const handleLike = (
    e: React.MouseEvent<HTMLButtonElement>,
    thread: string
  ) => {
    e.preventDefault();
    createLike({ token: auth?.token as string, body: { thread } });

    setIsLike(prevState => !prevState);
  };

  const handleReplyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof ReplyRequest
  ) => {
    setPostReply(prevState => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  const handleReply = (
    e: React.MouseEvent<HTMLButtonElement>,
    thread: string
  ) => {
    e.preventDefault();
    createReply({
      token: auth?.token as string,
      body: { content: postReply.content, image: postReply.image, thread },
    });
  };

  return (
    <>
      <Link to={`/thread/current/${thread?.data.id}`}>
        <Card
          bg="pigments.primary"
          color="suits.primary"
          borderBottom="2px solid"
          borderColor="pigments.secondary"
          rounded="none"
          _hover={{ bg: 'pigments.secondary' }}
          key={thread?.data.id}
        >
          <CardBody>
            <Flex
              {...props}
              key={thread?.data.id}
              gap={4}
            >
              <Box minW="3rem">
                <Image
                  src={thread?.data.user.user_image}
                  alt={thread?.data.user.username}
                  w="2.5rem"
                  h="2.5rem"
                  rounded="100%"
                  objectFit="cover"
                />
              </Box>
              <Box>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={4}
                  fontSize="smaller"
                  mb={2}
                >
                  <Heading
                    as="h3"
                    fontSize="md"
                    fontWeight="bold"
                  >
                    {thread?.data.user.fullname}
                  </Heading>
                  <Text
                    color="suits.secondary"
                    fontSize="md"
                  >
                    @{thread?.data.user.username}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="suits.tertiary"
                  >
                    {timeSince(thread?.data.posted_at as Date)}
                  </Text>
                </Box>
                <Box
                  minW="100%"
                  mb={3}
                >
                  <Text
                    fontSize="md"
                    mb={3}
                  >
                    {thread?.data.content}
                  </Text>
                  {thread?.data.image ? (
                    <Image
                      src={thread?.data.image}
                      alt={thread?.data.id}
                      w="40vw"
                      maxH="25rem"
                      rounded="lg"
                      objectFit="cover"
                      mb={3}
                    />
                  ) : null}
                  <Box
                    display="flex"
                    gap={4}
                  >
                    <Box>
                      <Button
                        variant="unstyled"
                        _hover={{ bg: 'none' }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          handleLike(e, thread?.data.id as string)
                        }
                      >
                        <Stack
                          direction="row"
                          align="center"
                        >
                          <Heart
                            size={16}
                            fill={isLike ? '#E24747' : '#1D1D1D'}
                          />
                          <Text fontSize="sm">
                            {thread?.data.likes.length === 0
                              ? 0
                              : thread?.data.likes.length}
                          </Text>
                        </Stack>
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        bg="none"
                        _hover={{ bg: 'none' }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          handleShowReplyForm(e)
                        }
                      >
                        <Stack
                          direction="row"
                          align="center"
                          color="#EBEBEB"
                        >
                          <MenuSquare size={16} />
                          <Text fontSize="sm">
                            {thread?.data.replies.length === 0
                              ? 0
                              : thread?.data.replies.length}
                          </Text>
                        </Stack>
                      </Button>
                      {showReplyForm && (
                        <PostReplyForm
                          changeevent={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => handleReplyChange(e, 'content')}
                          submitevent={(
                            e: React.MouseEvent<HTMLButtonElement>
                          ) => handleReply(e, thread?.data.id as string)}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </Link>
    </>
  );
}
