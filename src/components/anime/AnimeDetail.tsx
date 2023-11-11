import { useEffect, useState } from 'react';
import { fetchWrapper } from '../../utils/api';
import EpisodeList from './EpisodeList';
import { Link, useParams } from 'react-router-dom';
import { AnimeFull, AnimeFullResponse } from '../../types/anime';
import AnimeRandomizerButton from './AnimeRandomizerButton';

const AnimeDetail = () => {
  const params = useParams();
  const [animeDetail, setAnimeDetail] = useState<AnimeFull | null>(null);
  const [loading, setLoading] = useState(false);
  const malId = params.malId || '0';

  useEffect(() => {
    const getAnimeDetail = async () => {
      try {
        setLoading(true);
        const animeDetail = (await fetchWrapper(
          `/anime/${malId}/full`
        )) as AnimeFullResponse;
        setAnimeDetail(animeDetail.data);
      } catch (err) {
        setAnimeDetail(null);
      } finally {
        setLoading(false);
      }
    };

    getAnimeDetail();
  }, [params]);

  return (
    <main className='flex flex-col md:flex-row gap-3 p-2'>
      <div className='flex flex-col gap-y-1'>
        <div className='flex w-full items-center justify-between px-2 md:px-0'>
          <Link
            to='/'
            className='text-start hover:underline text-blue-600 hover:text-blue-800'
          >
            &larr; Go Back
          </Link>
          <AnimeRandomizerButton />
        </div>
        <div className='flex flex-col items-center gap-y-1'>
          <p className='font-bold text-md max-w-xs'>{animeDetail?.title}</p>
          {loading ? (
            <div className='border border-blue-300 animate-pulse bg-slate-700 shadow w-72 h-[26rem]'></div>
          ) : (
            <img
              src={animeDetail?.images?.jpg?.image_url}
              alt={animeDetail?.title}
              width={300}
            />
          )}
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
            ].map(([field, value]) => (
              <div
                className='flex flex-col md:flex-row justify-between text-center md:text-start'
                key={field}
              >
                <p className='font-bold'>{field}</p>
                <p className='capitalize'>{value || '-'}</p>
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
            ].map(([field, value]) => (
              <div
                className='flex flex-col text-center md:text-start'
                key={field}
              >
                <p className='font-bold '>{field}</p>
                <p className='capitalize'>{value || '-'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-3'>
        <p className='md:max-w-4xl text-center md:text-start'>
          {animeDetail?.synopsis}
        </p>
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
        <div className='flex gap-x-2'>
          <p className='font-bold'>Color Note:</p>
          <div className='flex gap-x-1 items-center'>
            <div className='bg-gray-400 w-5 h-5'></div>
            <p>Canon</p>
          </div>
          <div className='flex gap-x-1 items-center'>
            <div className='bg-yellow-400 w-5 h-5'></div>
            <p>Filler</p>
          </div>
          <div className='flex gap-x-1 items-center'>
            <div className='bg-blue-400 w-5 h-5'></div>
            <p>Recap</p>
          </div>
        </div>
        <EpisodeList
          malId={malId}
          status={animeDetail?.status || ''}
        />
      </div>
    </main>
  );
};

export default AnimeDetail;
