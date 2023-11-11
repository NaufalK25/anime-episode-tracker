import { useNavigate } from 'react-router-dom';
import { fetchWrapper } from '../../utils/api';
import { RandomAnimeResponse } from '../../types/anime';
import DiceSVG from '../svg/DiceSVG';

const AnimeRandomizerButton = () => {
  const navigate = useNavigate();

  const handleRandomBtnClick = async () => {
    const randomAnime = (await fetchWrapper(
      '/random/anime'
    )) as RandomAnimeResponse;
    navigate(`/anime/${randomAnime.data.mal_id}`);
  };

  return (
    <button
      title='Get Random Anime'
      className='outline-none'
      onClick={handleRandomBtnClick}
    >
      <DiceSVG />
    </button>
  );
};

export default AnimeRandomizerButton;
