import { Grid, GridItem, type HTMLChakraProps } from '@chakra-ui/react';

import { SidebarLeft, SidebarRight } from '@/components/layout';

interface GridContainerProps extends HTMLChakraProps<'div'> {
  children: React.ReactNode;
  include?: 'timeline' | 'profile';
}

export default function GridContainer({
  children,
  include = 'timeline',
  ...props
}: GridContainerProps) {
  return (
    <Grid
      {...props}
      maxW="100%"
      position="relative"
      h="100vh"
      templateColumns="repeat(6, 1fr)"
      templateRows={include === 'profile' ? 'repeat(1, 1fr)' : 'repeat(5, 1fr)'}
      columnGap={include === 'profile' ? '0px' : '0px'}
      rowGap={include === 'profile' ? '5rem' : '0px'}
    >
      <GridItem colSpan={1}>
        <SidebarLeft />
      </GridItem>
      {children}
      {include === 'profile' ? null : (
        <GridItem
          colStart={5}
          colEnd={6}
        >
          <SidebarRight />
        </GridItem>
      )}
    </Grid>
  );
}
