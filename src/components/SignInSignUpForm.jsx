/* eslint-disable react/prop-types */

import { useNavigate, Link } from "react-router-dom"
import { useState, useContext } from "react";
import { UserContext } from '../contexts/UserContext'
import fetchFromApi from '../utils/fetchFromApi'

const LoginForm = ({
    setLoginState,
    loginForm,
    signupForm
}) => {
    const [loader, setLoader] = useState(false);
    const [passwordFieldState, setPasswordFieldState] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorObject, setErrorObject] = useState({
        errorState: false,
        errorMessage: ''
    });
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate();

    const handleLoginSubmit = async e => {
        e.preventDefault();
        setLoader(true);
        const { loginCondition, loginData } = await fetchFromApi('/login', username, password)
        if (!loginCondition) {
            setLoader(false)
            setErrorObject({
                errorState: true,
                errorMessage: loginData
            });
            setTimeout(() => {
                setErrorObject({
                    errorState: false,
                    errorMessage: ''
                })
            }, 2000)
        } else if (loginData.user.password !== password) {
            setLoader(false)
            setErrorObject({
                errorState: true,
                errorMessage: 'Wrong Password. Try again'
            });
            setTimeout(() => {
                setErrorObject({
                    errorState: false,
                    errorMessage: ''
                })
            }, 2000)
        } else if (loginData.user.username === username && loginData.user.password == password) {
            console.log(loginData)
            setLoader(false)
            setLoginState(true)
            localStorage.setItem('user', loginData._id)
            localStorage.setItem('loginState', true)
            setUser({
                username: loginData.user.username,
                password: loginData.user.password
            })
            navigate('/')
        }
    }
    const signUp = (signUpData) => {
        setUser({
            username,
            password
        })
        localStorage.setItem('user', signUpData._id)
        navigate('/login')
    }
    const handleSignUpSubmit = async e => {
        e.preventDefault();
        setLoader(true)
        if (password === confirmPassword) {
            const { signUpCondition, signUpData } = await fetchFromApi('/signup', username, password)
            if (!signUpCondition) {
                setLoader(false)
                setErrorObject({
                    errorState: true,
                    errorMessage: signUpData
                })
                setTimeout(() => {
                    setErrorObject({
                        errorState: false,
                        errorMessage: ''
                    })
                }, 2000)
            } else {
                signUp(signUpData);
                setLoader(false)
            }

        } else {
            setLoader(false)
            setErrorObject({
                errorState: true,
                errorMessage: 'Passwords Don\'t Match. Please try again'
            })
            setTimeout(() => {
                setErrorObject({
                    errorState: false,
                    errorMessage: ''
                })
            }, 2000)
        }
    }

    return (

        <form onSubmit={loginForm ? handleLoginSubmit : handleSignUpSubmit} className={`flex flex-col justify-center rounded-lg w-[400px] h-[${loginForm ? '380px' : '450px'}] gap-3 bg-white p-4`}>
            <h3 className="text-center text-3xl font-bold">{loginForm ? 'Login' : 'SignUp'}</h3>
            {errorObject.errorState && <p className="w-fit h-fit text-red-500">{errorObject.errorMessage}</p>}
            <section className="flex flex-col gap-5 flex-1 justify-center w-full">
                <label htmlFor="username" className="w-full relative">Enter Username Here:
                    <input
                        required
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        className=" border-black rounded-md border-[1.5px] border-solid outline-black p-2 w-full"
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="password" className="relative">{loginForm ? 'Enter Your Password Here' : 'Enter a Password here'}
                    <input
                        required
                        placeholder="Enter Password"
                        id="password"
                        type={!passwordFieldState ? 'password' : 'text'}
                        className=" border-black rounded-md border-[1.5px] border-solid p-2 outline-black w-full"
                        onChange={e => setPassword(e.target.value)} />
                    <i
                        className={`bi bi-${!passwordFieldState ? 'eye' : 'eye-slash'} cursor-pointer absolute top-8 right-4`}
                        onClick={() => setPasswordFieldState(!passwordFieldState)}></i>
                </label>
                {signupForm && <label
                    htmlFor="confirmPassword"
                    className="relative"
                >Enter Password Again to Confirm:
                    <input
                        required
                        placeholder="Enter Password again to confirm"
                        id="confirmPassword"
                        type={!passwordFieldState ? 'password' : 'text'}
                        className=" border-black rounded-md border-[1.5px] border-solid p-2 outline-black w-full"
                        onChange={e => setConfirmPassword(e.target.value)} />
                    <i
                        className={`bi bi-${!passwordFieldState ? 'eye' : 'eye-slash'} cursor-pointer absolute top-8 right-4`}
                        onClick={() => setPasswordFieldState(!passwordFieldState)}></i>
                </label>}
            </section>
            <section
                className="flex justify-center items-center">
                <p>{loginForm ? `Don't Have an Account?` : 'Already Have an Account?'} <Link to={loginForm ? '/signup' : '/login'}
                    className={`${loader ? 'hidden' : 'inherit'} underline text-blue-600`}>{loginForm ? 'SignUp' : 'Login'}</Link>
                </p>
            </section>
            <button
                type="submit"
                disabled={loader}
                className={`w-full self-center ${loader && 'loaderColor'} bg-blue-500 rounded-lg p-3 text-white text-lg font-medium shadow-black shadow-sm active:shadow-sm border-none active:shadow-black active:scale-95  hover:shadow-black hover:shadow-sm`}>
                {!loader ? (loginForm ? 'Login' : 'SignUp') : <i className="bi bi-arrow-clockwise loader"></i>}
            </button>
        </form >

    )
}

export default LoginForm;