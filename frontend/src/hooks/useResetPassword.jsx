import { useState } from 'react';
import toast from 'react-hot-toast';

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetPassword = async ({ identifier }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Reset password request failed');
      }

      toast.success('Reset password instructions have been sent!');
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred. Please try again later.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    resetPassword,
  };
};

export default useResetPassword;
