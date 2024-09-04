import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { setAuthUser } = useAuthContext();

  // Input validation function with strict rules
  const handleInputValidation = ({ userName, password }) => {
    const passwordRegex = /^\d{6,}$/; // At least 6 digits
    const usernameRegex = /^\S+$/; // No whitespace allowed

    if (!userName || !password) {
      const errorMsg = 'Both username and password are required.';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    if (!usernameRegex.test(userName)) {
      const errorMsg = 'Username should not contain any whitespace.';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    if (!passwordRegex.test(password)) {
      const errorMsg = 'Password must be at least 6 digits.';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    return true;
  };

  const signin = async ({ userName, password }) => {
    setLoading(true);
    setError(null);

    // Validate inputs before proceeding
    if (!handleInputValidation({ userName, password })) {
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
