import React, { useState } from "react";
import Input from "../../components/Basic/Input";
import { Link } from "react-router-dom";
import useResetPassword from "../../hooks/useResetPassword";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    identifier: "",
  });

  const { resetPassword, loading } = useResetPassword();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword({
      identifier: formData.identifier,
    });

    console.log("Password reset requested for:", formData.identifier);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-80 sm:min-w-96 z-40">
      <div className="w-full p-4 rounded-lg shadow-md bg-orange-900 text-center glass backdrop-blur-3xl bg-opacity-0 bg-clip-padding">
        <h1 className="text-3xl text-gray-300 font-semibold py-6">
          Reset Password{" "}
          <span className="text-slate-400 font-thin">chatWAER</span>
        </h1>
        <form className="pb-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Email, Phone Number, or Username"
            value={formData.identifier}
            onChange={handleChange}
            name="identifier"
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

          <div className="pt-2">
            <button
              type="submit"
              className={`btn btn-outline w-1/2 ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Requesting..." : "Reset Password"}
            </button>
          </div>
          <div className="flex flex-col">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-500 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
