import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Data } from '../../types';
import { deleteTodo } from '../../api';
import { DeleteIcon } from '@chakra-ui/icons';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

export const Todo: React.FC<{ todo: Data.Todo }> = ({ todo }) => {
  const dispatch = useDispatch();
  const removeButtonClick = () => {
    dispatch(deleteTodo({ body: todo, id: todo.id }));
  };
  return (
    <Draggable draggableId={todo.id.toString()} index={todo.id}>
      {provided => (
        <Box
          alignItems="center"
          display="flex"
          flex-direction="row"
          h="100px"
          overflow="hidden"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          border={`2px solid ${todo.completed ? 'lime' : 'orange'}`}
          borderRadius="lg"
          margin="10px"
        >
          <Text margin="5px" w="250px">
            {todo.title}
          </Text>
          <Button variant="outline" marginRight="20px" onClick={removeButtonClick} colorScheme="red">
            <DeleteIcon w="15px" />
          </Button>
        </Box>
      )}
    </Draggable>
  );
};
