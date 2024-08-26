import React from 'react';
import { BsSend } from 'react-icons/bs';

const MessageInput = () => {
  return (
    <div>
      <form className='px-4 my-3' action="">
        <div className='relative w-full'>
          <input
            type="text"
            className='ps-3 border text-sm rounded-lg block h-10 w-full bg-gray-700 border-gray-600 text-white pe-10'
            placeholder='Type a message'
          />
          <button
            type='submit'
            className='absolute inset-y-0 right-0 flex items-center pe-3 text-white'
          >
            <BsSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
