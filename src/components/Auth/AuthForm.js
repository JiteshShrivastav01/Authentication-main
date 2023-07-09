import { useState, useRef , useEffect, useContext } from 'react';
import AuthContext from '../../Store/AuthContext';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const enteredEmail=useRef()
  const enteredPassword=useRef()
  const [isLogin, setIsLogin] = useState(true);
  const [passError,setPassError]=useState('')
  const [isPassError,setIsPassError]=useState(false)
  const [isSubmit,setIsSubmit]=useState(false)
  const ctx=useContext(AuthContext)

  useEffect(() => {
    if (isSubmit) {
      const timer = setTimeout(() => {
        setIsSubmit(false);
      }, 1000); 
      return () => clearTimeout(timer);
    }
    if (isPassError) {
      const timer = setTimeout(() => {
        setIsPassError(false);
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [isPassError,isSubmit]);

 
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

 const SubmitHandler=(e)=>{
  e.preventDefault()
  setIsSubmit(true)
  setIsPassError(false)
  const Email=enteredEmail.current.value
  const Password=enteredPassword.current.value

  if(Password.trim().length<6){
    setIsPassError(true)
    setPassError('Password length must be greater than 6')
  }

  if(isPassError){

  }
  else{
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0usF_SA_UnVC10SN__U6lRALDJWrihu8'
    }
    else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0usF_SA_UnVC10SN__U6lRALDJWrihu8'
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: Email,
        password: Password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        setIsLogin(false)
        if (res.ok) {
         return res.json()
          //alert('Logged In');
        } else {
          return res.json().then((data) => {
            const error = 'Authentication Error';
            // if(data && data.error && data.error.message){
            //   setError(data.error.message)
            // }
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        console.log(data);
        ctx.login(data.idToken);
      })
      .catch((error) => {
        alert(error.message);
      });
    
  enteredEmail.current.value=''
  enteredPassword.current.value=''
  }
 }



  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={enteredEmail}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password' >Your Password</label>
          <input
            type='password'
            id='password'
            ref={enteredPassword}
            required
          />
          {isPassError && <small className={classes.passError}>{passError}</small>}
        </div>
        <div className={classes.actions}> 
          {!isSubmit && <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>}
          {isSubmit && <p>Sending Request ...</p>}
        </div>
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm
