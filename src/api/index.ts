/// '~' symbol is used to pass 'id' argument in needed position
/// ex. getPosts({id:55}) => {...apiEndpoint: '/users/55/posts'...}

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DataTypes } from '../types';
import { isObjectEmpty } from '../isObjectEmpty';

type requestMethodType = 'get' | 'post' | 'patch' | 'delete';
const BASE_URL: string = 'https://jsonplaceholder.typicode.com/';
export const formatString = (str: string, replacePattern?: any) => {
  if (replacePattern) return str.replace('~', replacePattern.toString());
  else return str;
};

export function createRequestAction<T>(apiEndpoint: string, method: requestMethodType) {
  return createAsyncThunk<T, { body?: any; id?: number }>(apiEndpoint + method, async requestData => {
    const result = (
      await axios<T>({
        method: method,
        baseURL: BASE_URL,
        url: formatString(apiEndpoint, requestData.id),
        data: requestData.body,
      })
    ).data;
    if (isObjectEmpty(result)) {
      return requestData.body;
    }
    return result;
  });
}

// Posts
export const getPosts = createRequestAction<DataTypes.Post[]>('/users/~/posts', 'get');
export const createPost = createRequestAction<DataTypes.Post>('/posts', 'post');
export const getPost = createRequestAction<DataTypes.Post>('/posts/~', 'get');
export const updatePost = createRequestAction<DataTypes.Post>('/posts/~', 'patch');
export const deletePost = createRequestAction<DataTypes.Post>('/posts/~', 'delete');

// Posts/Comments
export const getComments = createRequestAction<DataTypes.Comment[]>('/posts/~/comments', 'get');
export const createComment = createRequestAction<DataTypes.Comment>('/comments', 'post');
export const updateComment = createRequestAction<DataTypes.Comment>('/posts/~', 'patch');
export const deleteComment = createRequestAction<DataTypes.Comment>('/comments/~', 'delete');

// Albums
export const getAlbumThumbnails = createAsyncThunk<string[], { startIndex: number; count: number }>(
  'getAlbumThumbnails',
  async ({ startIndex, count }) => {
    let result: string[] = [];
    for (let i = startIndex; i <= startIndex + count; i++) {
      let data = (
        await axios<DataTypes.Photo>({
          method: 'get',
          baseURL: BASE_URL,
          url: formatString('/photos/~', 1 + 50 * (i - 1)),
        })
      ).data.thumbnailUrl;
      result.push(data);
    }
    return result;
  }
);
export const getAlbums = createRequestAction<DataTypes.Album[]>('/users/~/albums', 'get');
export const createAlbum = createRequestAction<DataTypes.Album>('/albums', 'post');
export const getAlbum = createRequestAction<DataTypes.Album>('/albums/~', 'get');
export const updateAlbum = createRequestAction<DataTypes.Album>('/albums/~', 'patch');
export const deleteAlbum = createRequestAction<DataTypes.Album>('/albums/~', 'delete');

// Albums/Photos
export const getPhotos = createRequestAction<DataTypes.Photo[]>('/albums/~/photos', 'get');
export const getPhoto = createRequestAction<DataTypes.Photo>('/photos/~', 'get');
export const createPhoto = createRequestAction<DataTypes.Photo>('/albums', 'post');
export const updatePhoto = createRequestAction<DataTypes.Photo>('/albums/~', 'patch');
export const deletePhoto = createRequestAction<DataTypes.Photo>('/albums/~', 'delete');

// Todos
export const getTodos = createRequestAction<DataTypes.Todo[]>('/users/~/todos', 'get');
export const createTodo = createRequestAction<DataTypes.Todo>('/todos', 'post');
export const updateTodo = createRequestAction<DataTypes.Todo>('/todos/~', 'patch');
export const deleteTodo = createRequestAction<DataTypes.Todo>('/todos/~', 'delete');
