import React, { useEffect } from 'react';
import { getTodos } from '../../api';
import { selectTodos, changeTodoState } from '../../redux-slices';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { NoDataText, Todo, CustomDroppable } from '../../components';
import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

export const Todos: React.FC = () => {
  const dispatch = useDispatch();
  const todos = selectTodos();

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(getTodos({ id: 1 }));
    }
  }, []);

  const onDragEnd: (result: DropResult) => void = result => {
    let enabled = result.destination?.droppableId == 'Pending' ? false : true;
    dispatch(changeTodoState({ id: todos.findIndex(x => x.id == +result.draggableId), isEnabled: enabled }));
  };

  if (!todos || (todos && todos.length === 0)) {
    return <NoDataText onClick={() => dispatch(getTodos({ id: 1 }))} />;
  }
  return (
    <Flex margin="20px" w="auto" justifyContent="space-around">
      <DragDropContext onDragEnd={onDragEnd}>
        <CustomDroppable title="Pending">{todos.map(data => !data.completed && <Todo todo={data} />)}</CustomDroppable>
        <CustomDroppable title="Completed">{todos.map(data => data.completed && <Todo todo={data} />)}</CustomDroppable>
      </DragDropContext>
    </Flex>
  );
};
