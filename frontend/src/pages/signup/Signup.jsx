import React, { useState } from 'react';
import Input from '../../components/Basic/Input';
import GenderInput from '../../components/Basic/GenderInput';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Input name: ${name}, Input value: ${value}`);
    setFormData({
      ...formData,
      [name]: type === 'radio' ? (checked ? value : formData[name]) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-80 sm:min-w-96 z-40">
      <div className="w-full p-4 rounded-lg shadow-md bg-orange-900 text-center glass backdrop-blur-3xl bg-opacity-0 bg-clip-padding">
        <h1 className="text-3xl text-gray-300 font-semibold py-6">
          Signup <span className="text-slate-400 font-thin">chatWAER</span>
        </h1>
        <form className="pb-5 gap-4 flex flex-col" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
            name="fullName"
            icon={
              <svg
                className="w-[16px] h-[16px] text-gray-800 dark:text-slate-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />

          <Input
            type="text"
            placeholder="User name"
            value={formData.userName}
            onChange={handleChange}
            name="userName"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
            }
          />

          <Input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />

          <Input
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />

          <div className="flex justify-start text-center gap-4 ps-2">
            <GenderInput
              handleChange={handleChange}
              gender="Male"
              comparison={formData.gender === 'Male'}
            />
            <GenderInput
              handleChange={handleChange}
              gender="Female"
              comparison={formData.gender === 'Female'}
            />
          </div>

          <div className="pt-5">
            <button type="submit" className="w-1/2 btn btn-outline">
              Signup
            </button>
          </div>
        </form>
        <div className="pb-4">
          <Link to="/login"
            className="text-gray-600 hover:text-gray-500 hover:underline"
          >
            Already having an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
