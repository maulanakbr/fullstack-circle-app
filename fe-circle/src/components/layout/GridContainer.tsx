import { Grid, GridItem, type HTMLChakraProps } from '@chakra-ui/react';

import { SidebarLeft, SidebarRight } from '@/components/layout';

interface GridContainerProps extends HTMLChakraProps<'div'> {
  children: React.ReactNode;
}

export default function GridContainer({
  children,
  ...props
}: GridContainerProps) {
  return (
    <Grid
      {...props}
      position="relative"
      maxW="100%"
      h="100vh"
      templateColumns="repeat(6, 1fr)"
      templateRows="repeat(5, 1fr)"
      columnGap="0px"
      rowGap="0px"
    >
      <GridItem colSpan={1}>
        <SidebarLeft />
      </GridItem>
      {children}
      <GridItem
        colStart={5}
        colEnd={6}
      >
        <SidebarRight />
      </GridItem>
    </Grid>
  );
}
