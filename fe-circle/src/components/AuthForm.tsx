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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/hook';
import {
  // selectError,
  // selectLoading,
  selectAuth,
  signIn,
  signUp,
} from '@/app/slices/authSlice';

import { FormInput, NavLink } from './ui';

export default function AuthForm(props: HomeProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      username: '',
      fullname: '',
    },
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuth);
  const navigate = useNavigate();

  const handleAuth = handleSubmit(
    async ({ email, password, username, fullname }) => {
      if (props.auth === 'signup') {
        dispatch(signUp({ email, password, username, fullname }));
        navigate('/');
      } else {
        dispatch(signIn({ email, password }));
        navigate('/dashboard');

        if (user && 'token' in user) {
          localStorage.setItem('token', JSON.stringify(user.token));
        }
      }
    }
  );

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
            placeholder="Enter your email address"
            {...register('email')}
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password')}
          />
          {props.auth === 'signup' && (
            <>
              <FormInput
                label="Username"
                type="text"
                placeholder="Enter your username"
                {...register('username')}
              />
              <FormInput
                label="Fullname"
                type="text"
                placeholder="Enter your fullname"
                {...register('fullname')}
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
