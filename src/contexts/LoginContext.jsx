/* eslint-disable react/prop-types */
import React, { useState } from "react";

export const LoginContext = React.createContext();

const LoginState = ({ children }) => {
    const [loginState, setLoginState] = useState(false);
    console.log(loginState);
    return (
        <LoginContext.Provider value={loginState}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginState;
