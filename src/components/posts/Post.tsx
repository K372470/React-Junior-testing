import React from 'react';
import { DataTypes } from '../../types';
import { deletePost } from '../../api';
import { CustomCard } from '../';
import { Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const Post: React.FC<{ post: DataTypes.Post }> = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const removeButtonClick = () => {
    dispatch(deletePost({ body: post, id: post.id }));
  };
  const detailsClick = () => {
    navigate(`/posts/${post.id - 1}`);
  };
  return (
    <CustomCard title={post.title} detailsClick={detailsClick} onDeleteClick={removeButtonClick}>
      <Text>{post.body}</Text>
    </CustomCard>
  );
};
