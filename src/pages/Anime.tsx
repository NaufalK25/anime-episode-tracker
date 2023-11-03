import { useParams } from 'react-router-dom';
import AnimeDetail from '../components/anime/AnimeDetail';
import EpisodeList from '../components/anime/EpisodeList';
import Header from '../components/Header';

const Anime = () => {
  const params = useParams();
  const paramsMalId = params.malId || 0;
  const malId = +paramsMalId;

  return (
    <>
      <Header />
      <main>
        <AnimeDetail malId={malId} />
        <EpisodeList malId={malId} />
      </main>
    </>
  );
};

export default Anime;
