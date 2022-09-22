import { memo, useState } from 'react';
const displayWords = ({ words }) => {
  const [showAllWords, setShowAllWords] = useState(false);
  const [showText, setShowText] = useState('Show All');

  const handleShowAllWords = () => {
    setShowAllWords(!showAllWords);
    showText === 'Show All' ? setShowText('Hide') : setShowText('Show All');
  };

  return (
    <div className='mx-4 mb-12'>
      <h2 className='flex items-center justify-center text-2xl font-bold mb-1 text-center'>
        {words.length} Words{' '}
        <div
          className='ml-2 cusor-pointer text-sm text-gray-500'
          onClick={(e) => {
            handleShowAllWords();
          }}>
          {showText}
        </div>
      </h2>
      <div className='text-sm text-center text-gray-500 mb-4 '>
        Try familiar words first
      </div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-6 gap-2'>
        {words.slice(0, !showAllWords ? 60 : words.length).map((word) => (
          <div
            key={word}
            className='relative flex items-center space-x-3 rounded-lg border border-green-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:border-gray-400'>
            <div className='flex-shrink-0'>
              <div className='h-10 w-10 font-bold rounded-full bg-green-100 flex items-center justify-center'>
                {word[0].toUpperCase()}
              </div>
            </div>
            <div className='min-w-0 flex-1'>
              <a href='#' className='focus:outline-none'>
                <span className='absolute inset-0' aria-hidden='true' />
                <p className='text-sm font-medium text-gray-900'>
                  {word.toUpperCase()}
                </p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(displayWords);
