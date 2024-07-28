import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { selectTodos, changeTodoState } from '../../redux-slices';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { NoDataText, Todo, CustomDroppable } from '../../components';
import { Button, Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { RepeatIcon } from '@chakra-ui/icons';
import { DataTypes } from '../../types';

export const Todos: React.FC = () => {
  const dispatch = useDispatch();
  const todos = selectTodos();
  //It’s a set of sorted lists of indexes from a todo list, representing data that will be displayed in columns.
  const [sortedTodosIndexes, setSortedTodosIndexes] = useState({ pending: new Array<DataTypes.Todo>, completed: new Array<DataTypes.Todo> });

  const updateTodos = () => {
    dispatch(getTodos({ id: 1 }));
  }

  useEffect(() => {
    let listChanged = false;
    const tempList = structuredClone(sortedTodosIndexes);
    todos.forEach((todo) => {
      const tag = todo.completed ? 'completed' : 'pending';
      if (tempList[tag].findIndex((x) => todo.id === x.id && todo.completed === x.completed) === -1) {
        tempList[tag].push(todo);
        listChanged = true;
      }
    });
    for (let key in tempList) {
      tempList[key].forEach((todo, i) => {
        if (todos.findIndex((x) => todo.id === x.id && todo.completed === x.completed) === -1) {
          tempList[key].splice(i, 1);
          listChanged = true;

        }
      })
    };
    if (listChanged) {
      setSortedTodosIndexes(tempList);
    }
  }, [todos]);


  useEffect(() => {
    if (todos.length === 0) {
      updateTodos();
    }
  }, []);


  const onDragEnd: (result: DropResult) => void = (result) => {
    const source = result.source!;
    const destination = result.destination!;

    if ((source.droppableId === destination.droppableId && source.index === destination.index) || !sortedTodosIndexes) {
      return;
    }

    const isTodoCompleted = destination.droppableId === 'completed';

    const targetTodo = structuredClone(sortedTodosIndexes[source.droppableId][source.index]);
    targetTodo.completed = isTodoCompleted;

    const newSortedList = structuredClone(sortedTodosIndexes);
    newSortedList[source.droppableId].splice(source.index, 1);
    newSortedList[destination.droppableId].splice(destination.index, 0, targetTodo);
    setSortedTodosIndexes(newSortedList);

    if (result.destination?.droppableId !== source.droppableId) {
      dispatch(changeTodoState({ id: +result.draggableId, isEnabled: isTodoCompleted }));
    }
  };

  if (!todos || (todos.length == 0) || !sortedTodosIndexes) {
    return <NoDataText onClick={() => updateTodos()} />;
  }

  return (<>
    <Button leftIcon={<RepeatIcon />} onClick={() => updateTodos()}>
      Refresh
    </Button>
    <Flex margin="20px" w="auto" justifyContent="space-around">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(sortedTodosIndexes).map((key) => <CustomDroppable id={key}>{sortedTodosIndexes[key].map((todo, i) => <Todo index={i} todo={todo} />)}</CustomDroppable>)}
      </DragDropContext>
    </Flex>
  </>
  );
};
