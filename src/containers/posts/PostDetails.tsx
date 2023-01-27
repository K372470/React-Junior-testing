import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { updatePost } from '../../api';
import { CustomForm, NoDataText, Comments } from '../../components';
import { selectPosts } from '../../redux-slices';

export const PostDetails: React.FC = () => {
  const id = useParams().id;
  if (!id) {
    Navigate({ to: '/', replace: true });
  }
  const dispatch = useDispatch();
  const post = selectPosts()[id!];

  const submitForm = values => {
    dispatch(updatePost({ body: values, id: +values.id }));
  };

  if (!post) {
    return <NoDataText />;
  }
  return (
    <>
      <CustomForm initialValues={{ title: post.title, body: post.body }} onSubmit={submitForm} />
      <Comments postId={post.id} />
    </>
  );
};
