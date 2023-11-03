import dayjs from 'dayjs';

const EpisodeListTable = ({ episodeList }: { episodeList: any }) => {
  const handleAiredOnRowMouseEnter = (
    event: React.MouseEvent<HTMLTableCellElement, MouseEvent>
  ) => {
    const tooltip = event.currentTarget.lastChild as HTMLParagraphElement;
    tooltip.classList.remove('hidden');
  };

  const handleAiredOnRowMouseLeave = (
    event: React.MouseEvent<HTMLTableCellElement, MouseEvent>
  ) => {
    const tooltip = event.currentTarget.lastChild as HTMLParagraphElement;
    tooltip.classList.add('hidden');
  };

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
            <td
              className='border border-slate-700 p-1'
              onMouseEnter={event => handleAiredOnRowMouseEnter(event)}
              onMouseLeave={event => handleAiredOnRowMouseLeave(event)}
            >
              <p className='text-center'>{dayjs(episode.aired).fromNow()}</p>
              <p className='hidden absolute -top-5 right-7 bg-slate-200 p-1 rounded border z-10 text-xs'>
                {dayjs(episode.aired).format('DD MMM YYYY hh:mm:ss A')}
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
