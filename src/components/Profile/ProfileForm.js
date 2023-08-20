import { useContext, useRef, useState } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../store/auth-context";


const ProfileForm = () => {
  const [updatePsw, setUpdatePsw]= useState(false);
  
  const authCtx = useContext(AuthContext);
  const changePasswordInputRef = useRef();

  const updatePasswordHandler = ()=>{
    setUpdatePsw(true)
    alert('Password changed Successfully', updatePsw)
  }
  const submitChangedPasswordHandler = (event) => {
    event.preventDefault();
    const newEnteredPasswordInput = changePasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAHjtPMFjOLbXkoB0dDTZdVJk-RZjZuOaY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newEnteredPasswordInput,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res);
    });
  };
  return (
    <form className={classes.form} onSubmit={submitChangedPasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={changePasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button onClick={updatePasswordHandler}>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
