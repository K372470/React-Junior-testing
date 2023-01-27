import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todosSlice from './todos/todosSlice';
import currentPhotos from './albums/photosSlice';
import albumList from './albums/albumsSlice';
import postList from './posts/postsSlice';
import currentComments from './posts/commentSlice';

const rootReducer = combineReducers({
  albums: combineReducers({ albumList, currentPhotos }),
  posts: combineReducers({ postList, currentComments }),
  todoList: todosSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
