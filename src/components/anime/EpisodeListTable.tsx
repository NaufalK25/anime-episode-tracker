import dayjs from 'dayjs';
import { EpisodeListResponse } from '../../types/episode';

const EpisodeListTable = ({
  episodeList
}: {
  episodeList: EpisodeListResponse;
}) => {
  return (
    <table className='table-auto w-fit text-xs md:text-sm'>
      <thead>
        <tr>
          <th className='border border-slate-700 p-1'>Episode</th>
          <th className='border border-slate-700 p-1'>Title</th>
          <th className='border border-slate-700 p-1'>Aired On</th>
          <th className='border border-slate-700 p-1'>Score</th>
        </tr>
      </thead>
      <tbody>
        {episodeList.data?.map(episode => (
          <tr
            key={episode.mal_id}
            className={`${
              episode.filler
                ? 'bg-yellow-400'
                : episode.recap
                ? 'bg-blue-400'
                : 'bg-gray-400'
            } relative`}
          >
            <td className='text-center border border-slate-700 p-1'>
              {episode.mal_id}
            </td>
            <td className='border border-slate-700 p-1'>{episode.title}</td>
            <td className='border border-slate-700 p-1'>
              <p className='text-center'>
                {episode.aired
                  ? dayjs(episode.aired).format('ddd, DD MMM YYYY')
                  : '-'}
              </p>
            </td>
            <td className='text-center border border-slate-700 p-1'>
              {episode.score || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EpisodeListTable;
