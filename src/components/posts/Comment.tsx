import { EmailIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import React from 'react';
import { Data } from '../../types';
import { CustomCard } from '../';
import { deleteComment } from '../../api';
import { useDispatch } from 'react-redux';

export const Comment: React.FC<{ comment: Data.Comment; editCommentClick: (commentId: number) => void }> = ({ comment, editCommentClick }) => {
  const dispatch = useDispatch();
  const removeButtonClick = () => {
    dispatch(deleteComment({ body: comment, id: comment.id }));
  };
  return (
    <CustomCard detailsClick={() => editCommentClick(comment.id)} title={comment.name} onDeleteClick={removeButtonClick}>
      <Text>{comment.body}</Text>
      <Text>
        <EmailIcon /> {comment.email}
      </Text>
    </CustomCard>
  );
};
