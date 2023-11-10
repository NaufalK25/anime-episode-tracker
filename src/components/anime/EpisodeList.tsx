import { useEffect, useState } from 'react';
import EpisodeListTable from './EpisodeListTable';
import EpisodeListGrid from './EpisodeListGrid';
import GridViewSVG from '../svg/GridViewSVG';
import TableViewSVG from '../svg/TableViewSVG';
import { fetchWrapper } from '../../utils/api';
import { EpisodeListResponse } from '../../types/episode';
import EpisodeListGridSkeleton from '../skeleton/EpisodeListGridSkeleton';
import EpisodeListTableSkeleton from '../skeleton/EpisodeListTableSkeleton';

const EpisodeList = ({ malId, status }: { malId: string; status: string }) => {
  const [episodeList, setEpisodeList] = useState<EpisodeListResponse | null>(
    null
  );
  const [displayMode, setDisplayMode] = useState(
    window.localStorage.getItem('displayMode') || 'grid'
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAnimeEpisode = async () => {
      try {
        setLoading(true);
        const episodeList = (await fetchWrapper(
          `/anime/${malId}/episodes?page=${currentPage}`
        )) as EpisodeListResponse;
        const totalPage = episodeList.pagination.last_visible_page;
        setEpisodeList(episodeList);
        setTotalPage(totalPage);
      } catch (err) {
        setEpisodeList(null);
      } finally {
        setLoading(false);
      }
    };

    getAnimeEpisode();
  }, [malId, currentPage, totalPage]);

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
    <div className='flex flex-col gap-y-4 p-2'>
      <div className='flex gap-x-1 border border-gray-600 rounded shadow-md p-1 w-fit'>
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

      {episodeList && episodeList.data?.length > 0 && (
        <div className='flex gap-x-5 items-center justify-center md:justify-start'>
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

      {episodeList && episodeList.data?.length > 0 ? (
        displayMode === 'grid' ? (
          loading ? (
            <EpisodeListGridSkeleton />
          ) : (
            <EpisodeListGrid episodeList={episodeList} />
          )
        ) : (
          displayMode === 'table' &&
          (loading ? (
            <EpisodeListTableSkeleton />
          ) : (
            <EpisodeListTable episodeList={episodeList} />
          ))
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
