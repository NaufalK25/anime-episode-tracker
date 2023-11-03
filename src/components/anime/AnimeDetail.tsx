import { useEffect, useState } from 'react';
import { fetchWrapper } from '../../utils/api';

const AnimeDetail = ({ malId }: { malId?: number }) => {
  const [animeDetail, setAnimeDetail] = useState<any>({});

  useEffect(() => {
    const getAnimeDetail = async () => {
      try {
        const animeDetail = await fetchWrapper(`/anime/${malId}`);
        setAnimeDetail(animeDetail.data);
      } catch (err) {
        setAnimeDetail({});
      }
    };

    getAnimeDetail();
  }, []);

  return (
    <>
      <p>{animeDetail.title}</p>
    </>
  );
};

export default AnimeDetail;
