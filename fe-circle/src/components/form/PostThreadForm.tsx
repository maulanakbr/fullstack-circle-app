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

import useAuth from '@/hooks/useAuth';
import { threadApi } from '@/app/apis/threadApi';

interface PostThreadFormProps extends HTMLChakraProps<'form'> {}

export default function PostThreadForm(props: PostThreadFormProps) {
  const { auth } = useAuth({});
  const [form, setForm] = React.useState<{
    content: string;
    image: File | string;
  }>({
    content: '',
    image: '',
  });

  const inputFile = React.useRef<HTMLInputElement>(null);

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
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleCreateThread(e)}
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
          placeholder="What's happening?"
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
