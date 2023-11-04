import * as React from 'react';
import { Box, Button, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import { Heart, MenuSquare } from 'lucide-react';

import { ReplyRequest } from '@/types/reply';
import timeSince from '@/lib/timeSince';
import { threadApi } from '@/app/apis/threadApi';
import { useAppSelector } from '@/app/hook';
import { selectAuth } from '@/app/slices/authSlice';

import PostReplyForm from '../form/PostReplyForm';

interface ThreadCardProps extends React.ComponentProps<'div'> {}

export default function ThreadCard(props: ThreadCardProps) {
  const { data: threads, isLoading: loadingThread } =
    threadApi.useFetchThreadsQuery(null);

  const [isLike, setIsLike] = React.useState<boolean>(false);
  const [showReplyForm, setShowReplyForm] = React.useState<boolean>(false);
  const [postReply, setPostReply] = React.useState<ReplyRequest>({
    content: '',
    image: '',
    thread: '',
  });

  const authSelector = useAppSelector(selectAuth);
  const auth = authSelector && authSelector.user;

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
      {threads?.data &&
        threads.data.map(thread => (
          <Box
            {...props}
            key={thread.id}
            display="flex"
            gap={4}
            borderBottom="2px solid #313131"
          >
            <Box minW="3rem">
              <Image
                src={thread.user.user_image}
                alt={thread.user.username}
                w="2.5rem"
                h="2.5rem"
                rounded="100%"
                objectFit="cover"
              />
            </Box>
            <Box>
              <Box
                display="flex"
                gap={2}
                fontSize="smaller"
                mb={2}
              >
                <Heading
                  as="h3"
                  fontSize="sm"
                >
                  {thread.user.fullname}
                </Heading>
                <Text
                  color="#797878"
                  fontSize="sm"
                >
                  @{thread.user.username}
                </Text>
                <Text
                  fontSize="sm"
                  color="#797878"
                >
                  {timeSince(thread.posted_at)}
                </Text>
              </Box>
              <Box mb={3}>
                {loadingThread ? (
                  <Spinner />
                ) : thread.image ? (
                  <Image
                    src={thread.image}
                    alt={thread.id}
                    w="40vw"
                    maxH="25rem"
                    objectFit="cover"
                    mb={3}
                  />
                ) : null}
                <Text
                  fontSize="sm"
                  mb={3}
                >
                  {thread.content}
                </Text>
                <Box
                  display="flex"
                  gap={4}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Button
                      bg="none"
                      _hover={{ bg: 'none' }}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleLike(e, thread.id)
                      }
                    >
                      <Heart
                        size={16}
                        color="#e24747"
                        fill={isLike ? '#e24747' : '#141414'}
                      />
                    </Button>
                    <Text fontSize="sm">
                      {thread.likes.length === 0 ? 0 : thread.likes.length}
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Button
                      bg="none"
                      _hover={{ bg: 'none' }}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleShowReplyForm(e)
                      }
                    >
                      <MenuSquare size={16} />
                      <Text fontSize="sm">
                        {thread.replies.length === 0
                          ? 0
                          : thread.replies.length}
                      </Text>
                    </Button>
                    {showReplyForm && (
                      <PostReplyForm
                        changeevent={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleReplyChange(e, 'content')
                        }
                        submitevent={(e: React.MouseEvent<HTMLButtonElement>) =>
                          handleReply(e, thread.id)
                        }
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
    </>
  );
}