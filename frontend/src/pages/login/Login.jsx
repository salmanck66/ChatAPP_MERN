import React from "react";

const login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto z-40">
      <div className="w-full p-4 rounded-lg shadow-md bg-orange-900 text-center glass backdrop-blur-3xl bg-opacity-0 bg-clip-padding">
        <h1 className="text-3xl text-gray-300 font-semibold">
          Login <span>chatWAER</span>
        </h1>
        <form action="">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-success w-full max-w-xs"
          />
        </form>
      </div>
    </div>
  );
};

export default login;
