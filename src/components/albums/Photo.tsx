import { Text, Image, Center, Button } from '@chakra-ui/react';
import React from 'react';
import { Data } from '../../types';
import { CustomCard } from './../custom/CustomCard';
import { deletePhoto } from './../../api/index';
import { useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';

export const Photo: React.FC<{ photo: Data.Photo; editPhotoClick: (photoId: number) => void }> = ({ photo, editPhotoClick }) => {
  const dispatch = useDispatch();
  const removeButtonClick = () => {
    dispatch(deletePhoto({ body: photo, id: photo.id }));
  };
  const onImageClick = () => {
    window.open(photo.url);
  };
  return (
    <CustomCard detailsClick={() => editPhotoClick(photo.id)} title={photo.title} onDeleteClick={removeButtonClick}>
      <Center>
        <Button borderRadius="lg" padding="10px" variant="outline" h="160px" onClick={onImageClick} cursor={'grab'}>
          <Image src={photo.thumbnailUrl} fallback={<BeatLoader />} h="150px" />
          Click to open detailed
        </Button>
      </Center>
    </CustomCard>
  );
};
