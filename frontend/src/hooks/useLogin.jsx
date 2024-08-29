import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signin = async ({ userName, password }) => {
    setLoading(true);
    setError(null);

    // Basic input validation
    if (!userName || !password) {
      const errorMsg = 'Both username and password are required.';
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Signin failed');
      }

      const data = await res.json();
      setAuthUser(data);
      setSuccess(true);
      toast.success('Signin successful!');
      localStorage.setItem('chat-user', JSON.stringify(data));
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
    success,
    signin,
  };
};

export default useSignin;
