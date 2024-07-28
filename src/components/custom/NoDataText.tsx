import { Center, Text, Box } from '@chakra-ui/react';
import React from 'react';
import { Toolbar } from '.';

export const NoDataText: React.FC<{ onClick?: any }> = ({ onClick }) => (
  <Center position="absolute" top="50vh" left="45%">
    <Box borderColor="red.300" padding="5px" borderWidth="2px" borderRadius="lg" overflow="hidden">
      <Text>No Data Available</Text>
      <Toolbar onRefreshButtonClick={onClick} onAddNewButtonClick={undefined} />
    </Box>
  </Center>
);
