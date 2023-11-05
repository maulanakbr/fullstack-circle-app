import * as React from 'react';
import { Box, Card, CardBody, Heading, Image, Text } from '@chakra-ui/react';
import { Image as ImageIcon } from 'lucide-react';

import useAuth from '@/hooks/useAuth';

interface FollowCardProps extends React.ComponentProps<'div'> {
  passthrough: 'following' | 'followers';
}

export default function FollowCard(props: FollowCardProps) {
  const { auth } = useAuth({});

  const followingsData = auth?.data.followings;
  const followersData = auth?.data.followers;

  const renderFollowData = (
    data: typeof followingsData | typeof followersData
  ) => {
    return (
      <>
        {data?.map(data => (
          <Card
            key={data.id}
            bg="pigments.primary"
            color="suits.primary"
          >
            <CardBody>
              <Box
                {...props}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  gap={3}
                >
                  {data.user_image ? (
                    <Image
                      src={data.user_image}
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
                      {data.fullname}
                    </Heading>
                    <Text
                      color="#797878"
                      fontSize="sm"
                    >
                      {data.username}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </CardBody>
          </Card>
        ))}
      </>
    );
  };

  return (
    <>
      {props.passthrough === 'following'
        ? renderFollowData(followingsData)
        : renderFollowData(followersData)}
    </>
  );
}
