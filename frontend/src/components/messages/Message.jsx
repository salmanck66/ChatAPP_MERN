import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
            <img className=" hover:size-14" src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png" alt="user avatar" srcSet="" />
            </div>
        </div>
        <div className='chat-bubble text-white bg-blue-500'>Hi! whats up</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
    </div>
  )
}

export default Message