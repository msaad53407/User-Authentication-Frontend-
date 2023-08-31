import { Route, Routes } from "react-router-dom"
import { useRef, useState } from "react"
import { Home, SignUp, Login, Dashboard } from './pages'

function App() {
    const loginVal = localStorage.getItem('loginState')
    console.log(loginVal)
    const [loginState, setLoginState] = useState(() => {
        if (loginVal === 'false') {
            return false;
        } else {
            return true;
        }
    });

    console.log(loginState)
    const dialogRef = useRef();

    return (
        <Routes>
            <Route path='/' element={<Home loginState={loginState} setLoginState
                ={setLoginState} dialogRef={dialogRef} />} />
            <Route path='/login' element={<Login loginState={loginState} setLoginState={setLoginState} />} />
            <Route path='/signup' element={<SignUp loginState={loginState} setLoginState={setLoginState} />} />
            <Route path='/dashboard' element={<Dashboard loginState={loginState} />} />
        </Routes>
    )
}

export default App;
