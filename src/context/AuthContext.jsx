import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = (e, p) => signInWithEmailAndPassword(auth, e, p);
  const signup = (e, p) => createUserWithEmailAndPassword(auth, e, p);
  const logout = () => signOut(auth);
  const googleLogin = () => signInWithPopup(auth, googleProvider);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, googleLogin, loading }}>
      {!loading ? children : <div className="loader">Verifying Session...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);