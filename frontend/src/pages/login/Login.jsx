import React from "react";

const login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-80 sm:min-w-96  z-40">
      <div className="w-full p-4 rounded-lg shadow-md bg-orange-900 text-center glass backdrop-blur-3xl bg-opacity-0 bg-clip-padding">
        <h1 className="text-3xl text-gray-300 font-semibold">
          Login <span className="text-red-700 emboss">chatWAER</span>
        </h1>
        <form className="pb-5" action="">
          <label className="label sm:ps-5" htmlFor="">
            <span className="text-base label-text ">Username</span>
          </label>
          <input
            type="text"
            placeholder="Enter username"     
            className="input input-bordered input-success w-full max-w-xs"
          />
          <label className="label sm:ps-5" htmlFor="">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter password"     
            className="input input-bordered input-success w-full max-w-xs"
          />
        </form>
      </div>
    </div>
  );
};

export default login;
