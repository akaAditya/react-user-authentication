import React, { useState } from 'react'
import AuthContext from './auth-context'

const AuthProvider = (props) => {
    const initialTokenValue = localStorage.getItem('token')
    const [token, setToken] = useState(initialTokenValue)

    const userIsLoggedIn = !!token;
    const loginHandler = (token)=>{
        setToken(token)
        localStorage.setItem('token', token)

    }
    const logoutHandler = ()=>{
        setToken(null)
        localStorage.removeItem('token')
    }

    const authContext= {
        token : token,
        isLoggedIn : userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }
  return (
    <AuthContext.Provider value={authContext}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider