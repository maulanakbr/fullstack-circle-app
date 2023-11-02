import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4,
      py: 3,
    },
    md: {
      fontSize: 'sm',
      p: 6,
    },
  },
  variants: {
    outline: {
      border: '2px solid',
      borderColor: '.500',
      color: 'pigments.secondary',
    },
    solid: {
      bg: 'brands.primary',
      color: 'white',
      _hover: { bg: 'brands.secondary' },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
});

export default Button;
