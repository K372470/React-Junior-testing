import { Text, Image, Center, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { DataTypes } from '../../types';
import { CustomCard } from './../custom/CustomCard';
import { deletePhoto } from './../../api/index';
import { useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';

export const Photo: React.FC<{ photo: DataTypes.Photo; editPhotoClick: (photoId: number) => void }> = ({ photo, editPhotoClick }) => {
  const dispatch = useDispatch();
  const removeButtonClick = () => {
    dispatch(deletePhoto({ body: photo, id: photo.id }));
  };
  const onImageClick = () => {
    window.open(photo.url);
  };
  return (
    <CustomCard detailsClick={() => editPhotoClick(photo.id)} title={photo.title} onDeleteClick={removeButtonClick}>
      <Center flexDirection="column">
        <Button borderRadius="lg" padding="10px" variant="outline" h="170px" onClick={onImageClick} cursor="grab">
          <Image src={photo.thumbnailUrl} fallback={<BeatLoader />} h="150px" />
        </Button>
        <Text>Click to open detailed</Text>
      </Center>
    </CustomCard>
  );
};
