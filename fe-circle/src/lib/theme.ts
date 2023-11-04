import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'pigments.primary',
        color: 'suits.primary',
        fontSize: '14px',
      },
      input: {
        fontSize: '14px',
      },
    },
  },
  colors: {
    brands: {
      primary: '#04951B',
      secondary: '#026812',
      tertiary: '#013B0A',
    },
    pigments: {
      primary: '#141414',
      secondary: '#1D1D1D',
    },
    suits: {
      primary: '#EBEBEB',
      secondary: '#A4A4A4',
      tertiary: '#464646',
    },
  },
  fonts: {
    heading: `'Oxygen', sans-serif`,
    body: `'Chivo', sans-serif`,
  },
});

export default theme;
