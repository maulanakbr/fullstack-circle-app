import * as React from 'react';
import {
  Box,
  Button,
  Heading,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { Heart, Home, LogOut, Search, User2 } from 'lucide-react';

import { navMenu } from '@/lib/menu';
import { useAppDispatch } from '@/app/hook';
import { signOut } from '@/app/slices/authSlice';

interface SidebarLeftProps extends React.ComponentProps<'nav'> {}

export default function SidebarLeft(props: SidebarLeftProps) {
  const dispatch = useAppDispatch();

  const handleSignout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(signOut());
  };

  return (
    <Box
      {...props}
      as="nav"
      position="fixed"
      p="1rem"
      display="flex"
      flexDirection="column"
      placeContent="space-between"
      borderRight="1px solid #3d3d3d"
    >
      <UnorderedList
        margin={0}
        listStyleType="none"
      >
        <ListItem mb={8}>
          <Heading
            color="brands.primary"
            fontSize="3xl"
          >
            circle
          </Heading>
        </ListItem>
        {navMenu.map((menu, index) => (
          <ListItem
            key={index}
            mb={4}
          >
            <Box
              display="inline-flex"
              mr={3}
            >
              {menu === 'Home' ? (
                <Home />
              ) : menu === 'Search' ? (
                <Search />
              ) : menu === 'Follows' ? (
                <Heart />
              ) : (
                <User2 />
              )}
            </Box>
            {menu}
          </ListItem>
        ))}
        <ListItem>
          {/* <Button color="inherit">Create Account</Button> */}
          <Button
            leftIcon={<LogOut width="100%" />}
            color="inherit"
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
