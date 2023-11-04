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
          <p className='font-bold text-md max-w-xs'>{animeDetail.title}</p>
          <img
            src={animeDetail.images?.jpg?.image_url}
            alt={animeDetail.title}
            width={300}
          />
          <div className='flex flex-col max-w-xs'>
            {[
              ['Type', animeDetail.type],
              ['Source', animeDetail.source],
              ['Episodes', animeDetail.episodes],
              ['Status', animeDetail.status],
              ['Rating', animeDetail.rating],
              ['Score', animeDetail.score],
              ['Season', animeDetail.season],
              ['Year', animeDetail.year]
            ].map((data: any) => (
              <div
                className='flex justify-between'
                key={data[0]}
              >
                <p className='font-bold'>{data[0]}</p>
                <p className='capitalize'>{data[1] || '-'}</p>
              </div>
            ))}
            {[
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
                className='flex flex-col'
                key={data[0]}
              >
                <p className='font-bold'>{data[0]}</p>
                <p className='capitaliz'>{data[1] || '-'}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-y-3'>
          <p className='max-w-3xl'>{animeDetail.synopsis}</p>
          <div>
            {animeDetail.relations?.length > 0 &&
              animeDetail.relations.map((relation: any) => (
                <div className='flex flex-col'>
                  {relation.entry
                    .filter((entry: any) => entry.type === 'anime')
                    .map((entry: any) => (
                      <a
                        href={`/anime/${entry.mal_id}`}
                        className='hover:underline'
                      >
                        {relation.relation}: {entry.name}
                      </a>
                    ))}
                </div>
              ))}
          </div>
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
