import { Grid, type HTMLChakraProps } from '@chakra-ui/react';

import { SidebarLeft, SidebarRight } from '@/components/layout';

interface MainContainerProps extends HTMLChakraProps<'div'> {
  children: React.ReactNode;
  include?: 'timeline' | 'profile';
}

export default function MainContainer({
  children,
  include = 'timeline',
  ...props
}: MainContainerProps) {
  return (
    <Grid
      {...props}
      templateColumns="repeat(6, 1fr)"
      templateRows={include === 'profile' ? 'repeat(1, 1fr)' : 'repeat(5, 1fr)'}
      columnGap={include === 'profile' ? '0px' : '1rem'}
      rowGap={include === 'profile' ? '5rem' : '0px'}
      p="1rem"
      gap={2}
    >
      <SidebarLeft
        style={{
          gridArea: '1 / 1 / 6 / 2',
          maxWidth: '100%',
          minHeight: '100vh',
        }}
      />
      {children}
      {include === 'profile' ? null : (
        <SidebarRight
          style={{
            gridArea: '1 / 5 / 6 / 7',
            maxWidth: '100%',
            minHeight: '100vh',
          }}
        />
      )}
    </Grid>
  );
}
