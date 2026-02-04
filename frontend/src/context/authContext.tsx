import { createContext } from "react";

type User = {
     id : number;
     username : string,
     avatarUrl : string,
     isShared : boolean,
    shareLink : string | null
}

type AuthContextType ={
    user : User | null;
    login : (userData : User) => void;
    logout : () => void;
    loading : boolean;
    setLoading : (loading : boolean) => void;
    };

export const authContext = createContext<AuthContextType>({
    user : null,
    login : () => {},
    logout : () => {},
    loading : true,
    setLoading :() => {},
})

