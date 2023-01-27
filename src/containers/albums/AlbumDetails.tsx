import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CustomForm, NoDataText, Photos } from '../../components/';
import { selectAlbums } from '../../redux-slices';
import { updatePhoto } from './../../api';

export const AlbumDetails: React.FC = () => {
  const id = parseInt(useParams().id!);
  const dispatch = useDispatch();
  const album = selectAlbums()[id];

  const submitForm = values => {
    dispatch(updatePhoto({ body: values, id: values.id }));
  };

  if (!album) {
    return <NoDataText onClick={console.log('no data')} />;
  }
  return (
    <>
      <CustomForm initialValues={{ title: album.title }} onSubmit={submitForm} />
      <Photos albumId={album.id} />
    </>
  );
};
