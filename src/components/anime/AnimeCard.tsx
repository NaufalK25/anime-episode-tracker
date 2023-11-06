import { Link } from 'react-router-dom';
import { Anime } from '../../types/anime';

const AnimeCard = ({ anime }: { anime: Anime }) => {
  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className='flex flex-col justify-between items-center border border-blue-300 shadow rounded-md p-4'
    >
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        width={200}
      />
      <p>{anime.title}</p>
    </Link>
  );
};

export default AnimeCard;
