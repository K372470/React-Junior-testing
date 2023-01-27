import { SimpleGrid, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { getAlbums, getAlbumThumbnails } from '../../api';
import { selectAlbums, selectAlbumThumbs } from '../../redux-slices';
import { RepeatIcon } from '@chakra-ui/icons';
import { NoDataText, Album } from '../../components';
import { useDispatch } from 'react-redux';

export const Albums: React.FC = () => {
  const dispatch = useDispatch();
  const albums = selectAlbums();
  const previewUrls = selectAlbumThumbs();

  useEffect(() => {
    if (albums.length == 0) {
      refreshAlbums();
    }
  }, []);

  useEffect(() => {
    if (previewUrls.length == 0 && albums.length > 0) {
      dispatch(getAlbumThumbnails({ startIndex: albums[0].id, count: albums.length }));
    }
  }, [albums]);

  const refreshAlbums = () => {
    dispatch(getAlbums({ id: 1 }));
  };

  if (albums.length === 0) {
    return <NoDataText onClick={refreshAlbums} />;
  }
  return (
    <>
      <Button leftIcon={<RepeatIcon />} onClick={refreshAlbums}>
        Refresh
      </Button>
      <SimpleGrid className="Album_list" columns={3} spacing="4" margin="10px">
        {albums.map(album => (
          <Album album={album} previewUrl={previewUrls[album.id - 1] ?? undefined} />
        ))}
      </SimpleGrid>
    </>
  );
};
