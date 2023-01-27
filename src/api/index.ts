/// '~' symbol is used to pass 'id' argument in needed position
/// ex. getPosts({id:55}) => {...apiEndpoint: '/users/55/posts'...}

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Data } from '../types';
import { isObjectEmpty } from '../isObjectEmpty';

type requestMethodType = 'get' | 'post' | 'patch' | 'delete';
const BASE_URL: string = 'https://jsonplaceholder.typicode.com/';
export const formatString = (str: string, replacePattern?: any) => {
  if (replacePattern) str.replace('~', replacePattern.toString());
  return str;
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
export const getPosts = createRequestAction<Data.Post[]>('/users/~/posts', 'get');
export const createPost = createRequestAction<Data.Post>('/posts', 'post');
export const getPost = createRequestAction<Data.Post>('/posts/~', 'get');
export const updatePost = createRequestAction<Data.Post>('/posts/~', 'patch');
export const deletePost = createRequestAction<Data.Post>('/posts/~', 'delete');

// Posts/Comments
export const getComments = createRequestAction<Data.Comment[]>('/posts/~/comments', 'get');
export const createComment = createRequestAction<Data.Comment>('/comments', 'post');
export const updateComment = createRequestAction<Data.Comment>('/posts/~', 'patch');
export const deleteComment = createRequestAction<Data.Comment>('/comments/~', 'delete');

// Albums
export const getAlbumThumbnails = createAsyncThunk<string[], { startIndex: number; count: number }>(
  'getAlbumThumbnails',
  async ({ startIndex, count }) => {
    let result: string[] = [];
    for (let i = startIndex; i <= startIndex + count; i++) {
      let data = (
        await axios<Data.Photo>({
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
export const getAlbums = createRequestAction<Data.Album[]>('/users/~/albums', 'get');
export const createAlbum = createRequestAction<Data.Album>('/albums', 'post');
export const getAlbum = createRequestAction<Data.Album>('/albums/~', 'get');
export const updateAlbum = createRequestAction<Data.Album>('/albums/~', 'patch');
export const deleteAlbum = createRequestAction<Data.Album>('/albums/~', 'delete');

// Albums/Photos
export const getPhotos = createRequestAction<Data.Photo[]>('/albums/~/photos', 'get');
export const getPhoto = createRequestAction<Data.Photo>('/photos/~', 'get');
export const createPhoto = createRequestAction<Data.Photo>('/albums', 'post');
export const updatePhoto = createRequestAction<Data.Photo>('/albums/~', 'patch');
export const deletePhoto = createRequestAction<Data.Photo>('/albums/~', 'delete');

// Todos
export const getTodos = createRequestAction<Data.Todo[]>('/users/~/todos', 'get');
export const createTodo = createRequestAction<Data.Todo>('/todos', 'post');
export const updateTodo = createRequestAction<Data.Todo>('/todos/~', 'patch');
export const deleteTodo = createRequestAction<Data.Todo>('/todos/~', 'delete');
