import {  useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";

const PrivateRoute = ({children} :{children : React.ReactNode}) => {
  
const navigate = useNavigate()
const {user  , loading} = useContext(authContext);

useEffect(() => {
  if (!loading && !user) {
    navigate("/login");
  }
}, [loading, user, navigate]);

if(loading) {
   return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">Checking authentication...</p>
      </div>
    );
}

if(loading === false && user != null){
  return children;
};
if (!user) return null;

}

export default PrivateRoute