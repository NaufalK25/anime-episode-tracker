import { EpisodeListResponse } from '../../types/episode';

const EpisodeListGrid = ({
  episodeList
}: {
  episodeList: EpisodeListResponse;
}) => {
  return (
    <div className='grid grid-cols-8 md:grid-cols-20 w-fit text-center gap-1'>
      {episodeList.data?.map(episode => (
        <p
          key={episode.mal_id}
          title={episode.title}
          className={`${
            episode.filler
              ? 'bg-yellow-400'
              : episode.recap
              ? 'bg-blue-400'
              : 'bg-gray-400'
          } relative p-2 border border-black rounded text-sm`}
        >
          {episode.mal_id}
        </p>
      ))}
    </div>
  );
};

export default EpisodeListGrid;
