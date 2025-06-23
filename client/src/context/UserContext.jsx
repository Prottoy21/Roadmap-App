import { createContext, useContext, useState } from "react";
import api from "../api/axios";  

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const token = localStorage.getItem("token");  

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user); 
      localStorage.setItem("token", res.data.token);  
      localStorage.setItem("user", JSON.stringify(res.data.user));   
      alert("Login successful!");
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await api.post("/auth/signup", { email, password });
      setUser(res.data.user);  
      localStorage.setItem("token", res.data.token);  
      localStorage.setItem("user", JSON.stringify(res.data.user));  
      alert("Signup successful!");
    } catch (err) {
      console.error("Signup failed:", err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
