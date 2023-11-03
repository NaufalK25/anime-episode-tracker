import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import EpisodeListTable from './EpisodeListTable';
import EpisodeListGrid from './EpisodeListGrid';
import GridViewSVG from '../svg/GridViewSVG';
import TableViewSVG from '../svg/TableViewSVG';
import { fetchWrapper } from '../../utils/api';

dayjs.extend(relativeTime);

const EpisodeList = ({ malId }: { malId?: number }) => {
  const [episodeList, setEpisodeList] = useState<any>({});
  const [displayMode, setDisplayMode] = useState(
    window.localStorage.getItem('displayMode') || 'grid'
  );

  useEffect(() => {
    const getAnimeEpisode = async () => {
      try {
        const episodeList = await fetchWrapper(`/anime/${malId}/episodes`);
        const totalPage = episodeList.pagination.last_visible_page;

        for (let i = 2; i <= totalPage; i++) {
          const episodeListI = await fetchWrapper(
            `/anime/${malId}/episodes?page=${i}`
          );
          episodeList.data = episodeList.data.concat(episodeListI.data);
        }

        setEpisodeList(episodeList);
      } catch (err) {
        setEpisodeList({});
      }
    };

    getAnimeEpisode();
  }, []);

  const handleGridViewBtnClick = () => {
    window.localStorage.setItem('displayMode', 'grid');
    setDisplayMode('grid');
  };

  const handleTableViewBtnClick = () => {
    window.localStorage.setItem('displayMode', 'table');
    setDisplayMode('table');
  };

  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex gap-x-1 border border-black rounded shadow-md p-2 w-fit'>
        <button
          onClick={handleGridViewBtnClick}
          className='cursor-pointer'
          title='Grid View'
        >
          <GridViewSVG />
        </button>

        <button
          onClick={handleTableViewBtnClick}
          className='cursor-pointer'
          title='Table View'
        >
          <TableViewSVG />
        </button>
      </div>

      {displayMode === 'grid' && <EpisodeListGrid episodeList={episodeList} />}
      {displayMode === 'table' && (
        <EpisodeListTable episodeList={episodeList} />
      )}
    </div>
  );
};

export default EpisodeList;
