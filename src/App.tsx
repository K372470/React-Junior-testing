import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TopPanel } from './components';
import { Posts, PostDetails, Albums, Todos, AlbumDetails } from './containers';

export const App: React.FC = () => {
  return (
    <>
      <TopPanel />
      <main className="main_app">
        <Routes>
          <Route index path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/:id" element={<AlbumDetails />} />
          <Route path="/todo" element={<Todos />} />
        </Routes>
      </main>
    </>
  );
};
