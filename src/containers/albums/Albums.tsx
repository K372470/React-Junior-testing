import { SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { getAlbums, getAlbumThumbnails } from '../../api';
import { selectAlbums, selectAlbumThumbs } from '../../redux-slices';
import { NoDataText, Album, Toolbar } from '../../components';
import { useDispatch } from 'react-redux';

export const Albums: React.FC = () => {
  const dispatch = useDispatch();
  const albums = selectAlbums();
  const previewUrls = selectAlbumThumbs();
  const albumsNotLoaded = useMemo(() => !albums || (albums && albums.length === 0), [albums]);

  useEffect(() => {
    if (albumsNotLoaded) {
      refreshAlbums();
    }
  }, []);

  useEffect(() => {
    if (previewUrls.length == 0 && !albumsNotLoaded) {
      dispatch(getAlbumThumbnails({ startIndex: albums[0].id, count: albums.length }));
    }
  }, [albums]);

  const refreshAlbums = () => {
    dispatch(getAlbums({ id: 1 }));
  };

  if (albumsNotLoaded) {
    return <NoDataText onClick={refreshAlbums} />;
  }
  return (
    <>
      <Toolbar onRefreshButtonClick={refreshAlbums} onAddNewButtonClick={undefined} />
      <SimpleGrid className="Album_list" columns={3} spacing="4" margin="10px">
        {albums.map(album => (
          <Album album={album} previewUrl={previewUrls[album.id - 1] ?? undefined} />
        ))}
      </SimpleGrid>
    </>
  );
};
