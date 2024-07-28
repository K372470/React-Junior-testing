import { AddIcon, RepeatIcon } from '@chakra-ui/icons';
import React from 'react';
import { Button, Flex } from '@chakra-ui/react';

export const Toolbar: React.FC<{ onRefreshButtonClick: () => void; onAddNewButtonClick: (() => void) | undefined }> = ({
  onRefreshButtonClick,
  onAddNewButtonClick,
}) => (
  <Flex justifyContent="space-around">
    {onAddNewButtonClick && (
      <Button leftIcon={<AddIcon />} onClick={onAddNewButtonClick}>
        Add New
      </Button>
    )}
    <Button leftIcon={<RepeatIcon />} onClick={onRefreshButtonClick}>
      Refresh
    </Button>
  </Flex>
);
