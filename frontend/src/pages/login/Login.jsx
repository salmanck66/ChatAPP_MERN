import React, { useState } from 'react';
import Input from '../../components/Basic/Input';
import { Link } from 'react-router-dom';
import useSignin from '../../hooks/useLogin'; // Correctly importing useSignin hook

const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  
  const { signin, loading } = useSignin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin({
      userName: formData.userName,
      password: formData.password,
    });

    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-80 sm:min-w-96 z-40">
      <div className="w-full p-4 rounded-lg shadow-md bg-orange-900 text-center glass backdrop-blur-3xl bg-opacity-0 bg-clip-padding">
        <h1 className="text-3xl text-gray-300 font-semibold py-6">
          Login <span className="text-slate-400 font-thin">chatWAER</span>
        </h1>
        <form className="pb-5 flex flex-col gap-4" onSubmit={handleSubmit}>
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

          <div className="pt-2 flex items-center justify-center">
            <button
              type="submit"
              className={`btn btn-outline w-1/2 flex items-center justify-center ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full mr-2"></div>
              ) : null}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div className='flex flex-col'>
            <Link to="/signup" className="text-gray-600 hover:text-gray-500 hover:underline">
              Don't have an account?
            </Link>
            <Link to="/reset" className="text-gray-600 hover:text-gray-500 hover:underline">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
