import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessages from '../../hooks/useSendMessages';

const MessageInput = () => {
  const [message,setMessage] = useState("")
  
  const { loading,sendMessage}=useSendMessages()
  const handleSubmit =async (e)=>
  {
    e.preventDefault()
    if(!message) return
    await sendMessage(message)
    setMessage("")
  }
  return (
    <div>
      <form className='px-4 my-3' action="" onSubmit={handleSubmit}>
        <div className='relative w-full'>
          <input
            type="text"
            className='ps-3 border text-sm rounded-lg block h-10 w-full bg-gray-700 border-gray-600 text-white pe-10'
            placeholder='Type a message' value={message}  onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type='submit'
            className='absolute inset-y-0 right-0 flex items-center pe-3 text-white'
          >
            {loading ? <div className='loading loading-spinner'></div> :<BsSend />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
