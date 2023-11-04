import { useParams } from 'react-router-dom';
import AnimeDetail from '../components/anime/AnimeDetail';
import Header from '../components/Header';

const Anime = () => {
  const params = useParams();
  const paramsMalId = params.malId || 0;
  const malId = +paramsMalId;

  return (
    <>
      <Header />
      <AnimeDetail malId={malId} />
    </>
  );
};

export default Anime;
