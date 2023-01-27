import { RepeatIcon } from '@chakra-ui/icons';
import { Center, Text, Box, Button } from '@chakra-ui/react';
import React from 'react';

export const NoDataText: React.FC<{ onClick?: any }> = ({ onClick }) => (
  <Center>
    <Box borderColor="red.300" padding="5px" borderWidth="2px" borderRadius="lg" overflow="hidden">
      <Text>No Data Available</Text>
      <Button leftIcon={<RepeatIcon />} onClick={onClick}>
        Refresh
      </Button>
    </Box>
  </Center>
);
