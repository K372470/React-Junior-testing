import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { DataTypes } from '../../types';
import { createComment, updateComment, deleteComment, getComments } from '../../api';
import { RootState } from '../RootStore';

const commentList = createSlice({
  name: 'commentList',
  reducers: {},
  initialState: { values: [] } as { values: DataTypes.Comment[] },
  extraReducers: builder => {
    builder.addCase(getComments.fulfilled, (state, { payload }) => {
      state.values = payload;
    });
    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      let id = state.values.findIndex(x => x.id === payload.id);
      state.values.splice(id, 1);
    });
    builder.addCase(updateComment.fulfilled, (state, { payload }) => {
      let id = state.values.findIndex(x => x.id === payload.id);
      state.values[id] = payload;
    });
    builder.addCase(createComment.fulfilled, (state, { payload }) => {
      state.values.push(payload);
    });
  },
});

export const selectComments = () => useSelector<RootState, DataTypes.Comment[]>(state => state.posts.currentComments.values);
export default commentList.reducer;
