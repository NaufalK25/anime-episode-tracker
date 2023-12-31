import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import SearchSVG from '../components/svg/SearchSVG';
import { fetchWrapper } from '../utils/api';
import AnimeCard from '../components/anime/AnimeCard';
import AnimeCardSkeleton from '../components/skeleton/AnimeCardSkeleton';
import { AnimeSearchResponse, RandomAnimeResponse } from '../types/anime';
import AnimeRandomizerButton from '../components/anime/AnimeRandomizerButton';

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [animeSearch, setAnimeSearch] = useState<AnimeSearchResponse | null>(
    null
  );
  const [animeTitle, setAnimeTitle] = useState('');
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAnimeTitle = async () => {
      try {
        const animeTitle = (await fetchWrapper(
          '/random/anime'
        )) as RandomAnimeResponse;
        setAnimeTitle(animeTitle.data.title);
      } catch (err) {
        setAnimeTitle('');
      }
    };

    getAnimeTitle();
  }, []);

  useEffect(() => {
    const getAnimeSearch = async () => {
      try {
        if (keyword.length > 0) {
          setLoading(true);
          const animeSearch = (await fetchWrapper(
            `/anime?q=${keyword}&page=${currentPage}&limit=16&sfw`
          )) as AnimeSearchResponse;
          setAnimeSearch(animeSearch);
          setTotalPage(animeSearch.pagination.last_visible_page);
          navigate(`?q=${keyword}`);
        }
      } catch (err) {
        setAnimeSearch(null);
      } finally {
        setLoading(false);
      }
    };

    getAnimeSearch();
  }, [searchParams, keyword, currentPage, totalPage]);

  const handleInputEnterKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const key = event.key;
    const keyword = event.currentTarget.value.trim();

    if (keyword && keyword.length > 0 && key === 'Enter') {
      setKeyword(keyword);
      setCurrentPage(1);
    }
  };

  const handleSearchBtnClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const parent = event.currentTarget.parentElement as HTMLDivElement;
    const input = parent?.firstChild as HTMLInputElement;
    const keyword = input.value.trim();

    if (keyword && keyword.length > 0) {
      setKeyword(keyword);
      setCurrentPage(1);
    }
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
    <>
      <Header />
      <main className='flex justify-center items-center flex-col gap-y-5 p-2'>
        <div className='flex gap-x-2 justify-center items-center'>
          <input
            className='outline-none bg-transparent p-1 border border-b-black border-transparent text-md'
            type='search'
            placeholder={animeTitle}
            onKeyDown={event => handleInputEnterKeyPress(event)}
          />

          <button
            title='Search'
            className='outline-none'
            onClick={event => handleSearchBtnClick(event)}
          >
            <SearchSVG />
          </button>

          <AnimeRandomizerButton />
        </div>

        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 pb-10 px-10 w-full'>
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <AnimeCardSkeleton key={index} />
              ))}
          </div>
        ) : animeSearch && animeSearch.data?.length > 0 ? (
          <>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 pb-10 px-10 w-full'>
              {animeSearch.data.map(anime => (
                <AnimeCard
                  key={anime.mal_id}
                  anime={anime}
                />
              ))}
            </div>

            <div className='flex gap-x-5 pb-5 items-center'>
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
          </>
        ) : keyword && animeSearch && animeSearch.data?.length === 0 ? (
          <p className='text-xl text-center px-1'>
            No anime found, please try again!
          </p>
        ) : (
          <>
            <p className='text-xl text-center px-1'>
              Try searching for an anime!
            </p>
            <p className='text-xl text-center px-1'>
              Or, click the dice icon for a random anime page
            </p>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
