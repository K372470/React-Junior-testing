import { createAction, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Data } from '../../types';
import { deleteTodo, getTodos } from '../../api';
import { createTodo, updateTodo } from '../../api/index';
import { RootState } from '../RootStore';

export const changeTodoState = createAction<{ id: number; isEnabled: boolean }>('todos/changeState');

//@ts-ignore: ts(2345)
const todoList = createSlice({
  name: 'todoList',
  reducers: {},
  initialState: { values: [] } as { values: Data.Todo[] },
  extraReducers: builder => {
    builder
      .addCase(changeTodoState, (state, { payload }) => {
        state.values[payload.id].completed = payload.isEnabled;
      })
      .addCase(getTodos.fulfilled, (state, { payload }) => {
        state.values = payload;
      })
      .addCase(deleteTodo.fulfilled, (state, { payload }) => {
        let id = state.values.findIndex(x => x.id === payload.id);
        state.values.splice(id, 1);
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        let id = state.values.findIndex(x => x.id === payload.id);
        state.values[id] = payload;
      })
      .addCase(createTodo.fulfilled, (state, { payload }) => {
        state.values.push(payload);
      });
  },
});

export const selectTodos = () => useSelector<RootState, Data.Todo[]>(state => state.todoList.values);
export default todoList.reducer;
