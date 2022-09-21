export default function Example({ words, rank }) {
  let tryWords = [];
  if (rank.length !== 0 || words.length !== 0) {
    let score = [];
    //loop through words
    for (let i = 0; i < words.length; i++) {
      let points = 0;
      //loop through characters
      for (let j = 0; j < words[i].length; j++) {
        points += rank[j]?.[words[i][j]];
      }
      let obj = {};
      obj[words[i]] = points;

      score.push(obj);
    }

    score.sort((a, b) => {
      return Object.values(b)[0] - Object.values(a)[0];
    });

    for (let i = 0; i < 10; i++) {
      if (score[i] !== undefined) {
        tryWords.push(Object.keys(score[i])[0]);
      }
    }
    tryWords = tryWords.sort(() => Math.random() - 0.5);
  }

  return (
    <div className='mx-4 my-12'>
      <h2 className='text-2xl text-center font-bold mb-1'>Words to try</h2>
      <div className='text-sm text-center text-gray-500 mb-4 '>
        Based on popularity of letters & good for deducing
      </div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-6 gap-2'>
        {tryWords.slice(0, 6).map((word) => (
          <div
            key={word}
            className='relative flex items-center space-x-3 rounded-lg border border-green-300 bg-green-100 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:border-gray-400'>
            <div className='flex-shrink-0'>
              <div className='h-10 w-10 font-bold rounded-full bg-green-50 flex items-center justify-center'>
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
}
