import React from 'react';
import { DataTypes } from '../../types';
import { deleteAlbum } from '../../api';
import { Center, Image } from '@chakra-ui/react';
import { MoonLoader } from 'react-spinners';
import { CustomCard } from '../custom/CustomCard';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Album: React.FC<{ album: DataTypes.Album; previewUrl?: string }> = ({ album, previewUrl }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeButtonClick = () => {
    dispatch(deleteAlbum({ body: album, id: album.id }));
  };
  const onDetailsClick = () => {
    navigate(`/albums/${album.id}`);
  };

  return (
    <CustomCard detailsClick={onDetailsClick} title={album.title} onDeleteClick={removeButtonClick}>
      <Center>
        <Image src={previewUrl} borderRadius="lg" maxH="200px" borderWidth="1px" fallback={<MoonLoader />} />
      </Center>
    </CustomCard>
  );
};
