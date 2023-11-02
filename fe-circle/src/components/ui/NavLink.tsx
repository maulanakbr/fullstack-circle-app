import { Link as ChakraLink, type LinkProps } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface NavLink extends React.ComponentProps<'a'> {
  target: string;
}

export default function NavLink(props: NavLink) {
  let params: string = '';

  if (props.target.includes(' ')) {
    params = props.target.replace(' ', '').toLowerCase();
  }

  if (props.target.includes('Sign in')) {
    params = '';
  }

  return (
    <ChakraLink
      {...(props as LinkProps)}
      as={ReactRouterLink}
      to={`/${params}`}
      target="_self"
      color="brands.primary"
      fontWeight="bold"
    >
      {props.target}
    </ChakraLink>
  );
}
