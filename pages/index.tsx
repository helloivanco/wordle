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
