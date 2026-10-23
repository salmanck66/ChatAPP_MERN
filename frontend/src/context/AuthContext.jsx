import { createContext, useState, useContext, useCallback } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("chat-user")) || null;
  } catch {
    return null;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUserState] = useState(readStoredUser);

  const setAuthUser = useCallback((user) => {
    if (user) localStorage.setItem("chat-user", JSON.stringify(user));
    else localStorage.removeItem("chat-user");
    setAuthUserState(user);
  }, []);

  // Called when the server says the session cookie is missing or expired
  const clearSession = useCallback(() => setAuthUser(null), [setAuthUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
};
