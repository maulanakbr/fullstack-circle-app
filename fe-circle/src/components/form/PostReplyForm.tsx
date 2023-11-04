import * as React from 'react';
import { Box, Button, Input } from '@chakra-ui/react';

interface PostReplyFormProps extends React.ComponentProps<'div'> {
  changeevent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitevent: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PostReplyForm = React.forwardRef<HTMLDivElement, PostReplyFormProps>(
  (props, ref) => {
    return (
      <Box ref={ref}>
        <Input
          type="text"
          name="content"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.changeevent(e)
          }
        />
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            props.submitevent(e)
          }
        >
          Post Reply
        </Button>
      </Box>
    );
  }
);

PostReplyForm.displayName = 'PostReplyForm';

export default PostReplyForm;
