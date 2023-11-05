export const threadIdFromUrl = (pathname: string) => {
  return pathname.replace('/thread/current/', '');
};
