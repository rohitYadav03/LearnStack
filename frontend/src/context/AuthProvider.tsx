import type React from "react";
import { useEffect, useState } from "react";
import { authContext } from "./authContext";
import axiosInstance from "../api/axiosInstance";

type User = {
    avatarUrl : string;
    id : number;
    username : string;
    isShared : boolean,
    shareLink : string | null
}

const AuthProvider = ({children} : {children : React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null); // yha user me wo api se aaya hua details store krenge;
  const [loading, setLoading] = useState(true)
  
   const login = (userData : User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }
  
  useEffect(() => {
  const userInfo = async() => {
    try {
   const res = await axiosInstance.get("/auth/me", {withCredentials : true});
   login(res.data)
  setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  userInfo();
  }, [])

    return (
<authContext.Provider value={{user , login, logout, loading , setLoading}}>
    {children}
</authContext.Provider>
    )

}

export default AuthProvider;