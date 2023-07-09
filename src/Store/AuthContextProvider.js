import { useState } from "react";
import AuthContext from "./AuthContext";


const AuthContextProvider = (props) =>{
    const [Token , setToken]=useState(null)
    const userIsLoggedIn= !!Token 

    const LoginHandler=(token)=>{
       setToken(token)
    }

    const LogoutHandler=()=>{
       setToken(null)
    }
    

    const TokenDetails={
        token : Token ,
        isLoggedIn : userIsLoggedIn ,
        login : LoginHandler ,
        logout : LogoutHandler
    }

    return  (
    <AuthContext.Provider value={TokenDetails}>
        {props.children}
    </AuthContext.Provider>
   )
}

export default AuthContextProvider