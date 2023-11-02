import * as React from 'react';
import type { HomeProps } from '@/pages/home/Home';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { authApi } from '@/app/apis';
import { useAppSelector } from '@/app/hook';
import { selectAuth } from '@/app/slices/authSlice';

import { FormInput, NavLink } from './ui';

export default function AuthForm(props: HomeProps) {
  const [authForm, setAuthForm] = React.useState({
    email: '',
    password: '',
    username: '',
    fullname: '',
  });

  const toast = useToast();

  const [signUp] = authApi.useSignUpMutation();
  const [signIn, { error }] = authApi.useSignInMutation();

  const user = useAppSelector(selectAuth);
  const navigate = useNavigate();

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof authForm
  ) => {
    setAuthForm(prevState => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  const handleAuth = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const { email, password, username, fullname } = authForm;

    if (props.auth === 'signup') {
      signUp({ body: { email, password, username, fullname } });
      navigate('/');
    } else {
      signIn({ body: { email, password } }).unwrap();
    }
  };

  if (error && error instanceof Error) {
    toast({
      title: error.message,
      position: 'bottom-right',
      colorScheme: 'red',
    });
  }

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
      toast({ title: 'Success sign in!', position: 'bottom-right' });
    }
  }, [user, navigate, toast]);

  return (
    <Card
      m="auto"
      bg="pigments.secondary"
      p={5}
      borderRadius="20px"
    >
      <CardHeader>
        <Heading
          size="xl"
          color="suits.primary"
          textAlign="center"
          letterSpacing="8px"
        >
          CIRCLE
        </Heading>
      </CardHeader>
      <CardBody>
        <Flex
          as="form"
          flexDir="column"
          minW="20rem"
          gap={6}
          onSubmit={(e: React.FormEvent<HTMLDivElement>) => handleAuth(e)}
        >
          <FormInput
            label="Email address"
            type="email"
            name="email"
            placeholder="Enter your email address"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e, 'email')
            }
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(e, 'password')
            }
          />
          {props.auth === 'signup' && (
            <>
              <FormInput
                label="Username"
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFormChange(e, 'username')
                }
              />
              <FormInput
                label="Fullname"
                type="text"
                name="fullname"
                placeholder="Enter your fullname"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFormChange(e, 'fullname')
                }
              />
            </>
          )}
          <Button
            w="100%"
            type="submit"
          >
            {props.auth === 'signin' ? 'Sign in' : 'Sign up'}
          </Button>
          <HStack justifyContent="center">
            <Text color="suits.primary">
              {props.auth === 'signin'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </Text>
            <NavLink
              target={props.auth === 'signin' ? 'Sign up' : 'Sign in'}
              color="suits.secondary"
            />
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
}
