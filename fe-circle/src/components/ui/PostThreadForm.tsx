import * as React from 'react';
import type { SignInResponse } from '@/types';
import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  // InputGroup,
} from '@chakra-ui/react';

import { threadApi } from '@/app/apis/threadApi';
import { useAppSelector } from '@/app/hook';
import { selectAuth } from '@/app/slices/authSlice';

export default function PostThread() {
  const authSelector = useAppSelector(selectAuth) as SignInResponse | null;
  const auth = authSelector && authSelector.user;
  const [form, setForm] = React.useState<{
    content: string;
    image: File | string;
  }>({
    content: '',
    image: '',
  });
  const [createThread, { isLoading }] = threadApi.useCreateThreadMutation();

  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => ({
      ...prevState,
      content: e.target.value,
    }));
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => ({
      ...prevState,
      image: e.target.files! && (e.target.files[0] as File),
    }));
  };

  const handleCreateThread = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('content', form.content);

    if (form.image) {
      formData.append('image', form.image as File);
    }

    createThread({
      body: formData,
      token: auth?.token as string,
    });

    setForm({
      content: '',
      image: '',
    });

    console.log(isLoading);
  };

  return (
    <Box
      as="form"
      encType="multipart/form-data"
      display="flex"
      alignItems="center"
      gap={4}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleCreateThread(e)}
    >
      <Box>
        <Image
          src={auth?.data && (auth.data.user_image as string)}
          alt="profile-pic"
          w="3.4rem"
          h="2.5rem"
          rounded="100%"
          objectFit="cover"
        />
      </Box>
      <FormControl>
        <Input
          type="text"
          name="content"
          placeholder="What's happening?"
          maxW="100%"
          outline="none"
          ring="none"
          border="none"
          _focusVisible={{ border: 'none' }}
          onChange={onChangeContent}
          // {...register('content')}
        />
      </FormControl>
      <FormControl>
        {/* <InputGroup> */}
        <Input
          type="file"
          name="image"
          onChange={onChangeImage}
        />
      </FormControl>
      <Button
        bg="brand.700"
        type="submit"
      >
        Post
      </Button>
    </Box>
  );
}
