import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Basic/Input";
import { useSetNewPassword } from "../../hooks/useResetPassword";

const lockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd"
    />
  </svg>
);

const SetNewPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { loading, setNewPassword } = useSetNewPassword();
  const [form, setForm] = useState({ newPassword: "", confirmNewPassword: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await setNewPassword({ token, ...form })) navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-80 sm:min-w-96 z-40">
      <div className="w-full p-4 rounded-lg shadow-md bg-orange-900 text-center glass backdrop-blur-3xl bg-opacity-0 bg-clip-padding">
        <h1 className="text-3xl text-gray-300 font-semibold py-6">
          New password <span className="text-slate-400 font-thin">chatWAER</span>
        </h1>
        <form className="pb-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input type="password" placeholder="New password" name="newPassword"
            value={form.newPassword} onChange={handleChange} icon={lockIcon} />
          <Input type="password" placeholder="Confirm new password" name="confirmNewPassword"
            value={form.confirmNewPassword} onChange={handleChange} icon={lockIcon} />
          <button type="submit" className="btn btn-outline" disabled={loading}>
            {loading ? <span className="loading loading-spinner" /> : "Update password"}
          </button>
          <Link to="/login" className="text-gray-600 hover:text-gray-500 hover:underline">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
