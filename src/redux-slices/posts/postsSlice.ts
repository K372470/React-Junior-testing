import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getPosts, deletePost, updatePost, createPost } from '../../api';
import { DataTypes } from '../../types';
import { RootState } from '../RootStore';

//@ts-ignore: ts(2345)
const postList = createSlice({
  name: 'postList',
  reducers: {},
  initialState: { values: [] } as { values: DataTypes.Post[] },
  extraReducers: builder => {
    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.values = payload;
    });
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      let id = state.values.findIndex(x => x.id === payload.id);
      state.values.splice(id, 1);
    });
    builder.addCase(updatePost.fulfilled, (state, { payload }) => {
      let id = state.values.findIndex(x => x.id === payload.id);
      state.values[id] = payload;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.values.push(payload);
    });
  },
});

export const selectPosts = () => useSelector<RootState, DataTypes.Post[]>(state => state.posts.postList.values);
export default postList.reducer;
