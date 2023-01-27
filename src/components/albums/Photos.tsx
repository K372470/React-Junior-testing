import { Box, Center, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getPhotos, updatePhoto } from '../../api';
import { CustomEditableContent as CustomEditor, NoDataText } from '../';
import { useDispatch } from 'react-redux';
import { Photo } from './Photo';
import { selectPhotos } from './../../redux-slices';

export const Photos: React.FC<{ albumId: number }> = ({ albumId: postId }) => {
  const dispatch = useDispatch();
  const photos = selectPhotos();
  const [editedPhoto, setEditedPhoto] = useState(-1);

  const editPhoto = photoId => {
    setEditedPhoto(photos.findIndex(x => x.id === photoId));
  };
  const onEditSubmit = data => {
    setEditedPhoto(-1);
    dispatch(updatePhoto({ body: data, id: data.id }));
  };
  useEffect(() => {
    dispatch(getPhotos({ id: postId }));
  }, []);

  if (photos) {
    return (
      <Box padding="10px" margin="10px" overflow="hidden" borderWidth="1px" borderColor="cyan.200" borderRadius="lg">
        <Center>
          <Heading>Photos</Heading>
        </Center>
        <Divider margin="8px" />

        <SimpleGrid marginBottom="10px" spacing="4" margin="10px" columns={3} className="photos">
          {photos.map(photo => (
            <Photo photo={photo} editPhotoClick={editPhoto} />
          ))}
        </SimpleGrid>

        <CustomEditor isOpen={editedPhoto > -1} onSubmit={onEditSubmit} onClose={() => setEditedPhoto(-1)} initialValues={photos[editedPhoto]} />
      </Box>
    );
  }
  return <NoDataText />;
};
