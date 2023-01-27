import { Box, Divider, Heading } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export const CustomDroppable: React.FC<{ children; title }> = ({ children, title }) => {
  return (
    <Droppable droppableId={title}>
      {provided => (
        <Box padding="10px" margin="10px" overflow="hidden" borderWidth="3px" borderRadius="lg">
          <Heading>{title}</Heading>
          <Divider margin="15px" />
          <ul className="todos" {...provided.droppableProps} ref={provided.innerRef}>
            {children}
          </ul>
        </Box>
      )}
    </Droppable>
  );
};
