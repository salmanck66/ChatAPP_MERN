import React from 'react'

const Input = ({type, placeholder, value, onChange, name, icon}) => {
  return (
    <><label className="input input-bordered flex items-center gap-2"> 
    {
        icon
    }
    <input className="grow " type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
         />
  </label>
    </>
  )
}
export default Input
