import { useEffect, useState } from 'react';
import { fetchWrapper } from '../../utils/api';
import EpisodeList from './EpisodeList';
import { Link, useParams } from 'react-router-dom';
import { AnimeFull, AnimeFullResponse } from '../../types/anime';

const AnimeDetail = () => {
  const params = useParams();
  const [animeDetail, setAnimeDetail] = useState<AnimeFull | null>(null);
  const malId = params.malId || '0';

  useEffect(() => {
    const getAnimeDetail = async () => {
      try {
        const animeDetail = (await fetchWrapper(
          `/anime/${malId}/full`
        )) as AnimeFullResponse;
        setAnimeDetail(animeDetail.data);
      } catch (err) {
        setAnimeDetail(null);
      }
    };

    getAnimeDetail();
  }, [params]);

  return (
    <main className='p-2'>
      <div className='flex gap-x-3'>
        <div className='flex flex-col'>
          <Link
            to='/'
            className='hover:underline text-blue-600 hover:text-blue-800'
          >
            &larr; Go Back
          </Link>
          <p className='font-bold text-md max-w-xs'>{animeDetail?.title}</p>
          <img
            src={animeDetail?.images?.jpg?.image_url}
            alt={animeDetail?.title}
            width={300}
          />
          <div className='flex flex-col max-w-xs'>
            {[
              ['Type', animeDetail?.type],
              ['Source', animeDetail?.source],
              ['Episodes', animeDetail?.episodes],
              ['Status', animeDetail?.status],
              ['Rating', animeDetail?.rating],
              ['Score', animeDetail?.score],
              ['Season', animeDetail?.season],
              ['Year', animeDetail?.year]
            ].map(data => (
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
                animeDetail?.studios?.map(studio => studio.name).join(', ')
              ],
              [
                'Genres',
                animeDetail?.genres?.map(genre => genre.name).join(', ')
              ],
              [
                'Themes',
                animeDetail?.themes?.map(theme => theme.name).join(', ')
              ],
              [
                'Demographics',
                animeDetail?.demographics
                  ?.map(demography => demography.name)
                  .join(', ')
              ]
            ].map(data => (
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
          <p className='max-w-3xl'>{animeDetail?.synopsis}</p>
          <div>
            {animeDetail?.relations &&
              animeDetail.relations.length > 0 &&
              animeDetail?.relations.map(relation => (
                <div
                  className='flex flex-col'
                  key={relation.relation}
                >
                  {relation.entry
                    .filter(entry => entry.type === 'anime')
                    .map(entry => (
                      <Link
                        to={`/anime/${entry.mal_id}`}
                        className='hover:underline text-blue-600 hover:text-blue-800'
                        key={entry.mal_id}
                      >
                        {relation.relation}: {entry.name}
                      </Link>
                    ))}
                </div>
              ))}
          </div>
          <EpisodeList
            malId={malId}
            status={animeDetail?.status || ''}
          />
        </div>
      </div>
    </main>
  );
};

export default AnimeDetail;
