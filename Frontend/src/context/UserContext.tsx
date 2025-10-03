import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContextValue";
import type { User, Role } from "./UserContextValue";

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  // wrapper de setUser que persiste en localStorage
  const setUser: React.Dispatch<React.SetStateAction<User | null>> = (u) => {
    if (typeof u === "function") {
      setUserState(prev => {
        const newUser = u(prev);
        if (newUser) localStorage.setItem("user", JSON.stringify(newUser));
        else localStorage.removeItem("user");
        return newUser;
      });
    } else {
      if (u) localStorage.setItem("user", JSON.stringify(u));
      else localStorage.removeItem("user");
      setUserState(u);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // si no tiene rol, mapearlo desde rol_id
      if (!parsedUser.rol) {
        let rol: Role = "lector";
        if (parsedUser.rol_id === 2) rol = "escritor";
        if (parsedUser.rol_id === 3) rol = "editor";
        parsedUser.rol = rol;
        localStorage.setItem("user", JSON.stringify(parsedUser));
      }
      setUser(parsedUser);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
