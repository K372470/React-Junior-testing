import { Box, Divider, Heading } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export const CustomDroppable: React.FC<{ children; id: string }> = ({ children, id }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
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
