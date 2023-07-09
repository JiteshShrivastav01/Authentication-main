import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../Store/AuthContext';

const ProfileForm = () => {
  const changePassword=useRef()
  const ctx=useContext(AuthContext)

  
  const SubmitHandler=(e)=>{
    e.preventDefault()
    const newPassword=changePassword.current.value

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD0usF_SA_UnVC10SN__U6lRALDJWrihu8',{
      method:'POST',
      body: JSON.stringify({
        idToken : ctx.token,
        password : newPassword ,
        returnSecureToken : false
      }),
      headers:{
        'Content-type' : 'application/json'
      }
    }).then((res)=>{
      if(res.ok){
        console.log('password changed')
      }
    }).catch((err)=>{
      alert(err)
    })
  }

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={changePassword}/>
      </div>
      <div className={classes.action}>
        <button onClick={SubmitHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
