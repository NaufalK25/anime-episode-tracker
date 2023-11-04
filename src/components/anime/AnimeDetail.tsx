import { useEffect, useState } from 'react';
import { fetchWrapper } from '../../utils/api';
import EpisodeList from './EpisodeList';

const AnimeDetail = ({ malId }: { malId?: number }) => {
  const [animeDetail, setAnimeDetail] = useState<any>({});

  useEffect(() => {
    const getAnimeDetail = async () => {
      try {
        const animeDetail = await fetchWrapper(`/anime/${malId}/full`);
        setAnimeDetail(animeDetail.data);
      } catch (err) {
        setAnimeDetail({});
      }
    };

    getAnimeDetail();
  }, []);

  return (
    <main className='p-2'>
      <div className='flex gap-x-3'>
        <div className='flex flex-col'>
          <img
            src={animeDetail.images?.jpg?.image_url}
            alt={animeDetail.title}
            width={300}
          />
          <div className='flex flex-col'>
            {[
              ['Title', animeDetail.title],
              ['Type', animeDetail.type],
              ['Source', animeDetail.source],
              ['Episodes', animeDetail.episodes],
              ['Status', animeDetail.status],
              ['Rating', animeDetail.rating],
              ['Score', animeDetail.score],
              ['Season', animeDetail.season],
              ['Year', animeDetail.year],
              [
                'Studios',
                animeDetail.studios
                  ?.map((studio: any) => studio.name)
                  .join(', ')
              ],
              [
                'Genres',
                animeDetail.genres?.map((genre: any) => genre.name).join(', ')
              ],
              [
                'Themes',
                animeDetail.themes?.map((theme: any) => theme.name).join(', ')
              ],
              [
                'Demographics',
                animeDetail.demographics
                  ?.map((demography: any) => demography.name)
                  .join(', ')
              ]
            ].map((data: any) => (
              <div
                className='flex justify-between'
                key={data[0]}
              >
                <p>{data[0]}</p>
                <p className='capitalize'>{data[1] || '-'}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-y-3'>
          <p className='max-w-3xl'>{animeDetail.synopsis}</p>
          <EpisodeList
            malId={malId}
            status={animeDetail.status}
          />
        </div>
      </div>
    </main>
  );
};

export default AnimeDetail;
