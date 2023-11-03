import { Link } from 'react-router-dom';

const AnimeCard = ({ anime }: { anime: any }) => {
  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className='flex flex-col justify-between items-center border border-blue-300 shadow rounded-md p-4'
    >
      <picture>
        <img
          src={anime.images.webp.image_url}
          alt={anime.title}
          width={200}
        />
      </picture>
      <p>{anime.title}</p>
    </Link>
  );
};

export default AnimeCard;
