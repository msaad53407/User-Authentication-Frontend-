/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { Dialog } from './';
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Navbar = ({ loginState, setLoginState, dialogRef }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { user: { username } } = useContext(UserContext)

    const dialogOpenFunction = () => {
        setIsDialogOpen(true)
        dialogRef.current.showModal();
    };
    const dialogCloseFunction = () => {
        setIsDialogOpen(false)
        dialogRef.current.close();
    };
    const logoutFunction = () => {
        setLoginState(false);
        console.log(loginState)
        localStorage.setItem('loginState', false);
    }

    return (
        <header className="bg-emerald-800 flex justify-between items-center p-3 h-16 w-screen gap-3" >
            <Link to='/'><img src="/src/assets/react.svg" alt="logo" className="flex-initial" /></Link>
            <nav>
                <ul className="flex flex-auto justify-end gap-3 text-xl text-white">
                    {loginState && <li className="list-none p-1 px-3 text-lg self-center"><Link to='/dashboard'>DashBoard</Link></li>}
                    {!loginState ?
                        <>
                            <li className="list-none rounded-full p-1 px-3 border-black text-lg bg-transparent"><Link to='/login' >Login</Link></li>
                            <li className="list-none bg-blue-600 rounded-full w-fit p-1 px-3 border-blue-800"><Link to='/signup'>SignUp</Link></li>
                        </> :
                        <div className="flex flex-col h-full justify-center items-center text-sm mr-2">
                            <i className="bi bi-person-circle text-xl"></i>
                            <p>{username}</p>
                        </div>
                    }
                    {loginState && <li className="list-none self-center cursor-pointer" onClick={dialogOpenFunction}><i className="bi bi-box-arrow-right"></i>
                        <Dialog message="Do you want to Logout?" option1={{ optionName: 'Cancel', optionFunction: dialogCloseFunction }} option2={{ optionName: 'Logout', optionFunction: logoutFunction }} dialogRef={dialogRef} dialogState={isDialogOpen} />
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;