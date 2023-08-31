/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

export const UserContext = React.createContext();

const UserState = ({ children }) => {
    const [user, setUser] = useState({});
    const loginState = localStorage.getItem('loginState')
    console.log(loginState)

    useEffect(() => {
        if (loginState === 'true') {
            (async () => {
                const userId = localStorage.getItem('user')
                try {
                    const response = await fetch(`http://localhost:3000/login?id=${userId}`)
                    const data = await response.json();
                    console.log(data)
                    setUser({
                        username: data.loginData.user.username,
                        password: data.loginData.user.password
                    });
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [loginState])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserState;
