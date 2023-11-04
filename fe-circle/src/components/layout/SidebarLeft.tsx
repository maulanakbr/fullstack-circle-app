import * as React from 'react';
import {
  Box,
  Button,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useToast,
  type HTMLChakraProps,
} from '@chakra-ui/react';
import { Heart, Home, LogOut, Search, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { navMenu } from '@/lib/menu';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/app/hook';
import { signOut } from '@/app/slices/authSlice';

import { MainHeader } from '.';

interface SidebarLeftProps extends HTMLChakraProps<'nav'> {}

export default function SidebarLeft(props: SidebarLeftProps) {
  const { auth } = useAuth({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toast = useToast();

  const handleSignout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(signOut());
    navigate('/');
    toast({
      title: 'You have successfully signed out',
      position: 'bottom-right',
    });
  };

  return (
    <Box
      {...props}
      as="nav"
      position="fixed"
      h="100%"
      p="1rem"
      display="flex"
      flexDirection="column"
      placeContent="space-between"
      borderColor="pigments.secondary"
    >
      <UnorderedList
        margin={0}
        listStyleType="none"
      >
        <ListItem mt="4rem">
          <MainHeader
            headertext="circle"
            color="brands.primary"
            border="1px solid white"
          />
        </ListItem>
        {navMenu.map(({ label, path }, index) => (
          <ListItem
            key={index}
            mb={4}
          >
            <Link
              to={
                path === '/profile' ? `/profile/${auth?.data.username}` : path
              }
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing="6"
                mb="2.5rem"
              >
                {label === 'Home' ? (
                  <Home />
                ) : label === 'Search' ? (
                  <Search />
                ) : label === 'Follows' ? (
                  <Heart />
                ) : (
                  <User2 />
                )}
                <Text
                  fontSize="md"
                  fontWeight="medium"
                >
                  {label}
                </Text>
              </Stack>
            </Link>
          </ListItem>
        ))}
        <ListItem>
          <Button
            leftIcon={<LogOut width="100%" />}
            w="8rem"
            h="2.7rem"
            rounded="18px"
            bg="brands.secondary"
            color="suits.primary"
            _hover={{ bg: 'brands.primary' }}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleSignout(e)
            }
          >
            Logout
          </Button>
        </ListItem>
      </UnorderedList>
    </Box>
  );
}
