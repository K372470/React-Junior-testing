import React from 'react';
import { Box, Button, StatHelpText, Text, Tooltip } from '@chakra-ui/react';
import { DataTypes } from '../../types';
import { deleteTodo } from '../../api';
import { DeleteIcon } from '@chakra-ui/icons';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

export const Todo: React.FC<{ todo: DataTypes.Todo, index: number }> = ({ todo, index }) => {
  const dispatch = useDispatch();
  const removeButtonClick = () => {
    dispatch(deleteTodo({ body: todo, id: todo.id }));
  };
  if (!todo) {
    return <></>;
  }
  return (
    <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
      {provided => (
        <Box
          alignItems="center"
          display="flex"
          flex-direction="row"
          h="100px"
          overflow="hidden"
          border={`2px solid ${todo.completed ? 'lime' : 'orange'}`}
          borderRadius="lg"
          margin="10px"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Text margin="5px" w="250px">
            {todo.title}
          </Text>
          <Button variant="outline" marginRight="20px" onClick={removeButtonClick} colorScheme="red">
            <DeleteIcon w="15px" />
          </Button>
          <Text fontSize='xs' margin="5px" opacity={0.6}>
            {index + 1}
          </Text>
        </Box>
      )}
    </Draggable>
  );
};
