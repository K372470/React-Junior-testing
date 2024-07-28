import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { DataTypes } from '../../types';
import { deleteAlbum, getAlbums } from '../../api';
import { createAlbum, updateAlbum } from '../../api/index';
import { getAlbumThumbnails } from './../../api/index';
import { RootState } from '../RootStore';

const albumList = createSlice({
  name: 'albumList',
  reducers: {},
  initialState: { albums: [] as DataTypes.Album[], thumbPhotos: [] as string[] },
  extraReducers: builder => {
    builder.addCase(getAlbums.fulfilled, (state, { payload }) => {
      state.albums = payload;
    });
    builder.addCase(deleteAlbum.fulfilled, (state, { payload }) => {
      let id = state.albums.findIndex(x => x.id === payload.id);
      state.albums.splice(id, 1);
    });
    builder.addCase(updateAlbum.fulfilled, (state, { payload }) => {
      let id = state.albums.findIndex(x => x.id === payload.id);
      state.albums[id] = payload;
    });
    builder.addCase(createAlbum.fulfilled, (state, { payload }) => {
      state.albums.push(payload);
    });

    builder.addCase(getAlbumThumbnails.fulfilled, (state, { payload }) => {
      state.thumbPhotos = payload;
    });
  },
});
export const selectAlbums = () => useSelector<RootState, DataTypes.Album[]>(state => state.albums.albumList.albums);
export const selectAlbumThumbs = () => useSelector<RootState, string[]>(state => state.albums.albumList.thumbPhotos);
export default albumList.reducer;
