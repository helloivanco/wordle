import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import DisplayWords from '../components/displayWords';

const TryWords = dynamic(() => import('../components/tryWords'), {
  ssr: false,
});

import Words from '../utils/nyt_words.json';
export default function Home() {
  const [contains, setContains] = useState('');
  const [notContains, setNotContains] = useState('');
  const [words, setWords] = useState(Words);
  const [rank, setRank] = useState({});
  const [updated, setUpdated] = useState(false);
  const [character0, setCharacter0] = useState('');
  const [character1, setCharacter1] = useState('');
  const [character2, setCharacter2] = useState('');
  const [character3, setCharacter3] = useState('');
  const [character4, setCharacter4] = useState('');
  const characters = [
    character0,
    character1,
    character2,
    character3,
    character4,
  ];

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      setWords(Words);
      //delay to allow state to update
      setTimeout(() => {
        setUpdated(!updated);
      }, 50);
    }
    console.log('key', event.key);
  };

  useEffect(() => {
    if (contains.length > 0) {
      setWords(
        words.filter((word) => {
          for (let i = 0; i < contains.length; i++) {
            if (!word.includes(contains[i])) {
              return false;
            }
          }
          return true;
        })
      );
    }
    console.log('Updating contaings');
  }, [contains, updated]);

  useEffect(() => {
    if (notContains.length > 0) {
      setWords(
        words.filter((word) => {
          for (let i = 0; i < notContains.length; i++) {
            if (word.includes(notContains[i])) {
              return false;
            }
          }
          return true;
        })
      );
    }
    console.log('Updating notContains');
  }, [notContains, updated]);

  useEffect(() => {
    characters.forEach((character, index) => {
      if (character.length > 0) {
        setWords((words) => words.filter((word) => word[index] === character));
      }
    });
    console.log('Updating characters');
  }, [JSON.stringify(characters), updated]);

  useEffect(() => {
    let occurences = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {} };
    let dict = words;

    const updateOccurences = () => {
      //Get Occurences of each letter
      for (var i = 0; i < dict.length; i++) {
        var word = dict[i];
        //loop through word
        for (var j = 0; j < word.length; j++) {
          var letter = word[j];
          //if letter is in occurences
          if (occurences[j][letter]) {
            occurences[j][letter]++;
          } else {
            occurences[j][letter] = 1;
          }
        }
      }
    };

    updateOccurences();
    setRank(occurences);
  }, [words]);

  return (
    <>
      <h1 className='flex justify-center items-center text-5xl font-mono font-bold text-green-500 text-center py-6 bg-green-200'>
        <img src='/ring.png' className='w-14' />
        <div className='ml-4'>Wordle Helper</div>
        <a
          href='https://github.com/hellopaidco/wordle'
          target={'_blank'}
          className='ml-4'>
          <svg
            viewBox='0 0 24 24'
            aria-hidden='true'
            className='h-6 w-6 fill-green-500'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z'></path>
          </svg>
        </a>
      </h1>

      <div className='min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-50 to-gray-200'>
        <div className='flex flex-col items-center min-h-screen py-2'>
          <div className='flex mt-8'>
            <div>
              <input
                type='text'
                name='character0'
                id='character0'
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setCharacter0(
                    e.target.value.replace(/[^a-z]/gi, '').slice(0, 1)
                  )
                }
                value={character0}
                className='w-12 h-12 font-bold mx-2 text-center rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              />
            </div>
            <div>
              <input
                type='text'
                name='character1'
                id='character1'
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setCharacter1(
                    e.target.value.replace(/[^a-z]/gi, '').slice(0, 1)
                  )
                }
                value={character1}
                className='w-12 h-12 font-bold mx-2 text-center rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              />
            </div>

            <div>
              <input
                type='text'
                name='character2'
                id='character2'
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setCharacter2(
                    e.target.value.replace(/[^a-z]/gi, '').slice(0, 1)
                  )
                }
                value={character2}
                className='w-12 h-12 font-bold mx-2 text-center rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              />
            </div>
            <div>
              <input
                type='text'
                name='character3'
                id='character3'
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setCharacter3(
                    e.target.value.replace(/[^a-z]/gi, '').slice(0, 1)
                  )
                }
                value={character3}
                className='w-12 h-12 font-bold mx-2 text-center rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              />
            </div>
            <div>
              <input
                type='text'
                name='character4'
                id='character4'
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setCharacter4(
                    e.target.value.replace(/[^a-z]/gi, '').slice(0, 1)
                  )
                }
                value={character4}
                className='w-12 h-12 font-bold mx-2 text-center rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              />
            </div>
          </div>

          <div className='my-8'>
            <label
              htmlFor='email'
              className='block text-md font-medium text-gray-700'>
              Contains
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='contains'
                id='contains'
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setContains(e.target.value.replace(/[^a-z]/gi, ''))
                }
                value={contains}
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              />
            </div>
          </div>
          <div className='mt'>
            <label
              htmlFor='email'
              className='block text-md font-medium text-gray-700'>
              Doesn't Contain
            </label>
            <div className='mb-4'>
              <input
                type='text'
                name='notcontains'
                id='notcontains'
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setNotContains(e.target.value.replace(/[^a-z]/gi, ''))
                }
                value={notContains}
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
              />
            </div>
          </div>
          <TryWords words={words} rank={rank} />
          <DisplayWords words={words} />
        </div>
      </div>
    </>
  );
}
