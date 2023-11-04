import * as React from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/app/hook';
import { selectAuth } from '@/app/slices/authSlice';

type useAuthProps = {
  behave?: 'signin' | 'session';
};

const useAuth = ({ behave = 'session' }: useAuthProps) => {
  const authSelector = useAppSelector(selectAuth);
  const auth = authSelector?.user;

  const navigate = useNavigate();

  const toast = useToast();

  const sessionAuth = React.useCallback(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const signinAuth = React.useCallback(() => {
    if (auth) {
      navigate('/timeline');
      toast({
        title: 'You have successfully signed in',
        position: 'bottom-right',
      });
    }
  }, [auth, navigate, toast]);

  React.useEffect(() => {
    switch (behave) {
      case 'session':
        sessionAuth();
        break;
      case 'signin':
        signinAuth();
        break;
      default:
        null;
    }
  }, [behave, sessionAuth, signinAuth]);

  return { auth, navigate, toast };
};

export default useAuth;
