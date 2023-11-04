import dayjs from 'dayjs';

const EpisodeListTable = ({ episodeList }: { episodeList: any }) => {
  return (
    <table className='table-auto w-fit'>
      <thead>
        <tr>
          <th className='border border-slate-700 p-1'>Episode</th>
          <th className='border border-slate-700 p-1'>Title</th>
          <th className='border border-slate-700 p-1'>Aired On</th>
          <th className='border border-slate-700 p-1'>Score</th>
        </tr>
      </thead>
      <tbody>
        {episodeList.data?.map((episode: any) => (
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
            <td className='border border-slate-700 p-1'>{`${episode.title} (${
              episode.filler ? 'Filler' : episode.recap ? 'Recap' : 'Canon'
            })`}</td>
            <td className='border border-slate-700 p-1'>
              <p
                className='text-center'
                title={dayjs(episode.aired).format('ddd, DD MMM YYYY')}
              >
                {dayjs(episode.aired).fromNow()}
              </p>
            </td>
            <td className='text-center border border-slate-700 p-1'>
              {episode.score}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EpisodeListTable;
