import { useState , useEffect} from "react";
import AuthContext from "./AuthContext";


const AuthContextProvider = (props) =>{
    const initialToken=localStorage.getItem('token')
    const [Token , setToken]=useState(initialToken)
    const userIsLoggedIn= !!Token 
    const [startTime, setStartTime] = useState(new Date().getTime());
    const [expireTokenIn, setExpireTokenIn] = useState(null); 

    const LoginHandler=(token)=>{
       setToken(token)
       localStorage.setItem('token',token)
       setStartTime(new Date().getTime());
       setExpireTokenIn(new Date().getTime() + 5 * 60 * 1000);
    }

    const LogoutHandler=()=>{
       setToken(null)
       localStorage.removeItem('token')
    }
    
    const resetExpireTime=()=>{
        setExpireTokenIn(new Date().getTime() + 5 * 60 * 1000);
    }

    document.addEventListener('mousemove', resetExpireTime);
    document.addEventListener('keypress', resetExpireTime);
   
    useEffect(() => {
        const logoutTimer = setTimeout(LogoutHandler, expireTokenIn - startTime);
        return () => clearTimeout(logoutTimer);
      }, [expireTokenIn, startTime]);



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