import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import EpisodeListTable from './EpisodeListTable';
import EpisodeListGrid from './EpisodeListGrid';
import GridViewSVG from '../svg/GridViewSVG';
import TableViewSVG from '../svg/TableViewSVG';
import { fetchWrapper } from '../../utils/api';

dayjs.extend(relativeTime);

const EpisodeList = ({ malId, status }: { malId?: number; status: string }) => {
  const [episodeList, setEpisodeList] = useState<any>({});
  const [displayMode, setDisplayMode] = useState(
    window.localStorage.getItem('displayMode') || 'grid'
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const getAnimeEpisode = async () => {
      try {
        const episodeList = await fetchWrapper(
          `/anime/${malId}/episodes?page=${currentPage}`
        );
        const totalPage = episodeList.pagination.last_visible_page;
        setEpisodeList(episodeList);
        setTotalPage(totalPage);
      } catch (err) {
        setEpisodeList({});
      }
    };

    getAnimeEpisode();
  }, [currentPage, totalPage]);

  const handleGridViewBtnClick = () => {
    window.localStorage.setItem('displayMode', 'grid');
    setDisplayMode('grid');
  };

  const handleTableViewBtnClick = () => {
    window.localStorage.setItem('displayMode', 'table');
    setDisplayMode('table');
  };

  const handlePaginationFirstBtnClick = () => {
    setCurrentPage(1);
  };

  const handlePaginationPrevBtnClick = () => {
    setCurrentPage(prevState => +prevState - 1);
  };

  const handlePaginationNextBtnClick = () => {
    setCurrentPage(prevState => +prevState + 1);
  };

  const handlePaginationLastBtnClick = () => {
    setCurrentPage(totalPage);
  };

  return (
    <div className='flex flex-col gap-y-4'>
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

      {episodeList.data?.length > 0 && (
        <div className='flex gap-x-5 items-center'>
          <button
            className='bg-blue-300 rounded-md p-2'
            onClick={handlePaginationFirstBtnClick}
          >
            First
          </button>
          <button
            className='disabled:bg-blue-100 bg-blue-300 rounded-md p-2'
            onClick={handlePaginationPrevBtnClick}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <p className='border border-blue-300 rounded-md px-4 py-2'>
            {currentPage}/{totalPage}
          </p>
          <button
            className='disabled:bg-blue-100 bg-blue-300 rounded-md p-2'
            onClick={handlePaginationNextBtnClick}
            disabled={currentPage === totalPage}
          >
            Next
          </button>
          <button
            className='bg-blue-300 rounded-md p-2'
            onClick={handlePaginationLastBtnClick}
          >
            Last
          </button>
        </div>
      )}

      {episodeList.data?.length > 0 ? (
        displayMode === 'grid' ? (
          <EpisodeListGrid episodeList={episodeList} />
        ) : (
          displayMode === 'table' && (
            <EpisodeListTable episodeList={episodeList} />
          )
        )
      ) : status?.toLowerCase() === 'not yet aired' ? (
        'Anime Still Has Not Aired Yet'
      ) : (
        'No Episode Found Because This Anime Only Has One Episode'
      )}
    </div>
  );
};

export default EpisodeList;
