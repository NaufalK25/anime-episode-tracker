import { EpisodeListResponse } from '../../types/episode';

const EpisodeListGrid = ({
  episodeList
}: {
  episodeList: EpisodeListResponse;
}) => {
  return (
    <div className='grid grid-cols-10 md:grid-cols-20 w-fit text-center gap-1'>
      {episodeList.data?.map(episode => (
        <div
          key={episode.mal_id}
          title={`${episode.title} (${
            episode.filler ? 'Filler' : episode.recap ? 'Recap' : 'Canon'
          })`}
          className={`${
            episode.filler
              ? 'bg-yellow-400'
              : episode.recap
              ? 'bg-blue-400'
              : 'bg-gray-400'
          } relative p-1 border border-black rounded text-xs`}
        >
          <p className='text-sm p-1'>{episode.mal_id}</p>
        </div>
      ))}
    </div>
  );
};

export default EpisodeListGrid;
