import { SimpleGrid, Button, Text, Box, Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Post, NoDataText, Toolbar } from '../../components/';
import { getPosts } from '../../api';
import { selectPosts } from '../../redux-slices';
import { useDispatch } from 'react-redux';

export const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const posts = selectPosts();

  const updatePosts = () => dispatch(getPosts({ id: 1 }));

  useEffect(() => {
    if (posts.length === 0) {
      updatePosts();
    }
  }, []);

  if (!posts || (posts && posts.length === 0)) {
    return <NoDataText onClick={updatePosts} />;
  }

  return (
    <>
      <Toolbar onAddNewButtonClick={undefined} onRefreshButtonClick={updatePosts} />
      <SimpleGrid className="post_list" columns={2} spacing="4" margin="10px">
        {posts.map(post => (
          <Post post={post} />
        ))}
      </SimpleGrid>
    </>
  );
};
