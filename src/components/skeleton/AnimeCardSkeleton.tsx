const AnimeCardSkeleton = () => {
  return (
    <div className='border border-blue-300 shadow rounded-md p-4'>
      <div className='animate-pulse'>
        <div className='space-y-6 py-1'>
          <div className='h-72 bg-slate-700 rounded'></div>
          <div className='h-4 bg-slate-700 rounded'></div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCardSkeleton;
