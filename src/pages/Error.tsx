import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Error = () => {
  return (
    <>
      <Header />
      <main className='flex flex-col gap-y-14 justify-center items-center h-[90vh]'>
        <h1 className='text-5xl font-bold'>Oops! </h1>
        <p className='text-xl'>No Anime Here 🦗🦗🦗</p>
        <Link
          to='/'
          className='text-xl underline text-blue-600 hover:text-blue-800'
        >
          &larr; Go Back
        </Link>
      </main>
    </>
  );
};

export default Error;
