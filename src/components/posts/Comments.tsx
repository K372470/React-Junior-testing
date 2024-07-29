import { Box, Center, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getComments, updateComment } from '../../api';
import { CustomModalForm as CustomEditor, NoDataText, Comment } from '../';
import { useDispatch } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import { selectComments } from './../../redux-slices/';

export const Comments: React.FC<{ postId: number }> = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = selectComments();
  const [editedComment, setEditedComment] = useState(-1);

  const editComment = commentId => {
    setEditedComment(comments.findIndex(x => x.id === commentId));
  };
  const onEditSubmit = data => {
    setEditedComment(-1);
    dispatch(updateComment({ body: data, id: data.id }) as unknown as AnyAction);
  };
  useEffect(() => {
    dispatch(getComments({ id: postId }) as unknown as AnyAction);
  }, []);

  if (comments) {
    return (
      <Box padding="10px" margin="10px" overflow="hidden" borderWidth="1px" borderColor="green.200" borderRadius="lg">
        <Center>
          <Heading>Comments</Heading>
        </Center>

        <SimpleGrid marginBottom="10px" spacing="4" margin="10px" columns={2} className="comments">
          {comments.map(comment => (
            <Comment comment={comment} editCommentClick={editComment} />
          ))}
        </SimpleGrid>

        <CustomEditor
          isOpen={editedComment > -1}
          onSubmit={onEditSubmit}
          onClose={() => setEditedComment(-1)}
          initialValues={comments[editedComment]}
        />
      </Box>
    );
  }
  return <NoDataText />;
};
