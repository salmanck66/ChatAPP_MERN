import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const {setAuthUser} = useAuthContext()

  const handleInputError = ({ fullName, userName, confirmPassword, email, password, gender }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
  
    if (!fullName || !userName || !email || !password || !gender || !confirmPassword) {
      return 'All fields are required.';
    }
    if (!usernameRegex.test(userName)) {
      return 'Username can only contain letters, numbers, and underscores.';
    }
    if (!emailRegex.test(email)) {
      return 'Invalid email format.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (password.trim() !== confirmPassword.trim()) {
      return 'Passwords do not match.';
    }
    if (!['male', 'female', 'other'].includes(gender.toLowerCase())) {
      return 'Invalid gender value. Please select from male, female, or other.';
    }
  
    return null;
  };
  

  const signup = async ({ fullName, userName, email, password, confirmPassword, gender }) => {
    setLoading(true);
    setError(null);

    // Validate input
    const errorMsg = handleInputError({ fullName, userName, email, password, confirmPassword, gender });
    if (errorMsg) {
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, userName, email, password, gender,confirmPassword }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Signup failed');
      }

      const data = await res.json();
      setAuthUser(data)
      setSuccess(true);
      toast.success('Signup successful!');
      localStorage.setItem('chat-user',JSON.stringify(data))
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
    signup,
  };
};

export default useSignup;
