import { Link, useNavigate } from 'react-router-dom';

const Header = ({}: {}) => {
  const handleBrandClick = () => {
    const navigate = useNavigate();
    navigate('');
  };

  return (
    <nav className='px-10 py-5 bg-slate-200'>
      <Link
        to='/'
        className='outline-none text-xl text-gray-800 font-bold'
        onClick={handleBrandClick}
      >
        Anime Episode Tracker
      </Link>
    </nav>
  );
};

export default Header;
