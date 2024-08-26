import React from 'react'

const GenderInput = ({ handleChange, gender, comparison }) => {
  return (
    <div className=''>
      <input
        type="radio"
        name="gender"
        value={gender}
        checked={comparison}
        onChange={handleChange}
      />
      <label className='p-2'>{gender}</label>
    </div>
  );
};

export default GenderInput
