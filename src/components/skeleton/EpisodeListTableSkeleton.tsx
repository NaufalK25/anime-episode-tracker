const EpisodeListTableSkeleton = () => {
  return (
    <div className='border border-blue-300 w-fit p-1'>
      {Array(101)
        .fill(null)
        .map((_, index) => (
          <div
            className='flex gap-x-1 animate-pulse shadow w-fit'
            key={index}
          >
            <div className='border border-blue-300 w-12 md:w-14 h-6 bg-slate-700'></div>
            <div className='border border-blue-300 w-48 md:w-[32rem] h-6 bg-slate-700'></div>
            <div className='border border-blue-300 w-16 md:w-[7.5rem] h-6 bg-slate-700'></div>
            <div className='border border-blue-300 w-8 md:w-10 h-6 bg-slate-700'></div>
          </div>
        ))}
    </div>
  );
};

export default EpisodeListTableSkeleton;
