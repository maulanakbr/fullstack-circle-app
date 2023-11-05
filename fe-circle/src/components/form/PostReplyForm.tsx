import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  HTMLChakraProps,
  Image,
  Input,
  Stack,
} from '@chakra-ui/react';
import { ImagePlus } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { threadIdFromUrl } from '@/lib/utils';
import { threadApi } from '@/app/apis/threadApi';
import { useAppSelector } from '@/app/hook';
import { selectAuth } from '@/app/slices/authSlice';

interface PostReplyFormProps extends HTMLChakraProps<'form'> {}

export default function PostReplyForm(props: PostReplyFormProps) {
  const authSelector = useAppSelector(selectAuth);
  const auth = authSelector && authSelector.user;
  const { pathname } = useLocation();
  const [form, setForm] = React.useState<{
    content: string;
    image: File | string;
    thread: string;
  }>({
    content: '',
    image: '',
    thread: '',
  });

  const inputFile = React.useRef<HTMLInputElement>(null);

  const [createReply, { isLoading }] = threadApi.useCreateReplyMutation();

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

  const handleCreateReply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('content', form.content);

    if (form.image) {
      formData.append('image', form.image as File);
    }

    formData.append('thread', threadIdFromUrl(pathname));

    createReply({
      body: formData,
      token: auth?.token as string,
    });

    setForm({
      content: '',
      image: '',
      thread: '',
    });
  };

  return (
    <Box
      {...props}
      as="form"
      encType="multipart/form-data"
      maxW="100%"
      display="flex"
      alignItems="center"
      px={5}
      py={5}
      gap={4}
      borderBottom="2px solid"
      borderColor="pigments.secondary"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleCreateReply(e)}
    >
      <Box minW="3rem">
        <Image
          src={auth?.data && (auth.data.user_image as string)}
          alt="profile-pic"
          w="2.5rem"
          h="2.5rem"
          rounded="100%"
          objectFit="cover"
        />
      </Box>
      <FormControl>
        <Input
          type="text"
          name="content"
          placeholder="Reply to thread"
          outline="none"
          ring="none"
          border="none"
          _focusVisible={{ border: 'none' }}
          onChange={onChangeContent}
        />
      </FormControl>
      <FormControl maxW="10.5rem">
        <Stack
          direction="row"
          spacing={6}
        >
          <Button
            w="7rem"
            rounded="18px"
            bg="brands.secondary"
            _hover={{ bg: 'brands.primary' }}
            onClick={() => {
              inputFile.current?.click();
            }}
          >
            <Box color="suits.primary">
              <ImagePlus />
            </Box>
          </Button>
          <Input
            type="file"
            name="image"
            display="none"
            ref={inputFile}
            onChange={onChangeImage}
          />
          <Button
            isLoading={isLoading}
            type="submit"
            w="12rem"
            rounded="18px"
            bg="brands.secondary"
            color="suits.primary"
            _hover={{ bg: 'brands.primary' }}
          >
            Post
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
}
