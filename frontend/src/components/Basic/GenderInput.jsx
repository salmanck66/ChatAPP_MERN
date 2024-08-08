import React from 'react'

const GenderInput = ({handleChange,gender,comparison}) => {
  return (
    <>

            <label className="flex justify-center items-center text-center gap-4">
              <input
                type="radio"
                name="gender"
                value={gender}
                className="radio"
                checked={comparison}
                onChange={handleChange}
              />
              {gender}
            </label>
    </>
  )
}

export default GenderInput
