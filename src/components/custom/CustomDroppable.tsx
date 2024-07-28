import { Box, Divider, Heading } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { capitalizeFirstLetter } from './utils';

export const CustomDroppable: React.FC<{ children; id: string }> = ({ children, id }) => {
  return (
    <Droppable droppableId={id}>
      {provided => (
        <Box padding="10px" margin="10px" overflow="hidden" borderWidth="3px" borderRadius="lg">
          <Heading>{capitalizeFirstLetter(id)}</Heading>
          <Divider margin="15px" />
          <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
            {children}
          </div>
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
