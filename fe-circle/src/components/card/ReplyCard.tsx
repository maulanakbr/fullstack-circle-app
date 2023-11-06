import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
  type HTMLChakraProps,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import timeSince from '@/lib/timeSince';
import { threadIdFromUrl } from '@/lib/utils';
import { threadApi } from '@/app/apis/threadApi';

interface ReplyCardProps extends HTMLChakraProps<'div'> {}

export default function ThreadDetailsCard(props: ReplyCardProps) {
  const { pathname } = useLocation();

  const { data: thread } = threadApi.useFetchThreadIdQuery(
    threadIdFromUrl(pathname)
  );

  return (
    <>
      {thread?.data.replies.map(reply => (
        <Card
          bg="pigments.primary"
          color="suits.primary"
          borderBottom="2px solid"
          borderColor="pigments.secondary"
          rounded="none"
          _hover={{ bg: 'pigments.secondary' }}
          key={reply.id}
        >
          <CardBody>
            <Flex
              {...props}
              key={reply.id}
              gap={4}
            >
              <Box minW="3rem">
                <Image
                  src={reply.user.user_image}
                  alt={reply.user.username}
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
                    {reply.user.fullname}
                  </Heading>
                  <Text
                    color="suits.secondary"
                    fontSize="md"
                  >
                    @{reply.user.username}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="suits.tertiary"
                  >
                    {timeSince(reply.created_at as Date)}
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
                    {reply.content}
                  </Text>
                  {reply.image ? (
                    <Image
                      src={reply.image}
                      alt={reply.id}
                      w="40vw"
                      maxH="25rem"
                      rounded="lg"
                      objectFit="cover"
                      mb={3}
                    />
                  ) : null}
                </Box>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
