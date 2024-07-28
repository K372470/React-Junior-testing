import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { DataTypes } from '../../types';
import { createPhoto, updatePhoto, deletePhoto, getPhotos } from '../../api';
import { RootState } from '../RootStore';

const photoList = createSlice({
  name: 'photoList',
  reducers: {},
  initialState: { values: [] } as { values: DataTypes.Photo[] },
  extraReducers: builder => {
    builder.addCase(getPhotos.fulfilled, (state, { payload }) => {
      state.values = payload;
    });
    builder.addCase(deletePhoto.fulfilled, (state, { payload }) => {
      let id = state.values.findIndex(x => x.id === payload.id);
      state.values.splice(id, 1);
    });
    builder.addCase(updatePhoto.fulfilled, (state, { payload }) => {
      let id = state.values.findIndex(x => x.id === payload.id);
      state.values[id] = payload;
    });
    builder.addCase(createPhoto.fulfilled, (state, { payload }) => {
      state.values.push(payload);
    });
  },
});

export const selectPhotos = () => useSelector<RootState, DataTypes.Photo[]>(state => state.albums.currentPhotos.values);
export default photoList.reducer;
