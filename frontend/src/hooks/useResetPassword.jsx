import { useState } from "react";
import toast from "react-hot-toast";

const postJson = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
};

// Step 1: request a reset link by username or email
export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const resetPassword = async ({ identifier }) => {
    if (!identifier?.trim()) return toast.error("Enter your username or email");
    setLoading(true);
    try {
      const data = await postJson("/api/auth/resetpasswordrequest", { identifier });
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};

// Step 2: set a new password using the token from the emailed link
export const useSetNewPassword = () => {
  const [loading, setLoading] = useState(false);

  const setNewPassword = async ({ token, newPassword, confirmNewPassword }) => {
    setLoading(true);
    try {
      const data = await postJson(`/api/auth/reset-password/${token}`, {
        newPassword,
        confirmNewPassword,
      });
      toast.success(data.message);
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, setNewPassword };
};

export default useResetPassword;
