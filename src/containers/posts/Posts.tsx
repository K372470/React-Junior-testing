import { SimpleGrid, Button, Text, Box, Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Post, NoDataText } from '../../components/';
import { getPosts } from '../../api';
import { selectPosts } from '../../redux-slices';
import { RepeatIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';

export const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const posts = selectPosts();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getPosts({ id: 1 }));
    }
  }, []);
  if (!posts || (posts && posts.length === 0)) {
    return <NoDataText onClick={() => dispatch(getPosts({ id: 1 }))} />;
  }
  return (
    <>
      <Button leftIcon={<RepeatIcon />} onClick={() => dispatch(getPosts({ id: 1 }))}>
        Refresh
      </Button>
      <SimpleGrid className="post_list" columns={2} spacing="4" margin="10px">
        {posts.map(post => (
          <Post post={post} />
        ))}
      </SimpleGrid>
    </>
  );
};
