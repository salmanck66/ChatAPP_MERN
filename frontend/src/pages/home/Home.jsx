import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
const home = () => {
  return (
    <div className='z-50 flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '>
      <Sidebar/>
      {/* <MessageContainer/> */}
    </div>
  )
}

export default home