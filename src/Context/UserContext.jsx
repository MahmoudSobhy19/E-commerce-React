import React, { createContext, useState } from "react";
import { decode } from "jsonwebtoken";
import swal from "sweetalert";

export const UserContext = createContext();

export function UserProvider(props) {
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);

  const decodeToken = (token) => {
    const decoded = decode(token);
    return decoded;
  };

  const login = (jwt) => {
    setToken(jwt);
    localStorage.setItem("jwt", jwt);
  };

  const logout = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((signout) => {
      if (signout) {
        setToken(null);
        localStorage.removeItem("jwt");
      } else {
        swal("You didn't logout");
      }
    });
  };

  return (
    <UserContext.Provider value={{ token, login, logout, ...decodeToken(token) }}>
      {props.children}
    </UserContext.Provider>
  );
}