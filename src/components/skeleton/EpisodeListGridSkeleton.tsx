const EpisodeListGridSkeleton = () => {
  return (
    <div className='grid grid-cols-10 md:grid-cols-20 gap-1'>
      {Array(100)
        .fill(null)
        .map((_, index) => (
          <div
            className='border border-blue-300 animate-pulse bg-slate-700 shadow rounded-md w-10 h-10'
            key={index}
          ></div>
        ))}
    </div>
  );
};

export default EpisodeListGridSkeleton;
