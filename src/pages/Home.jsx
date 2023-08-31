/* eslint-disable react/prop-types */
import { Navbar } from "../components"

const Home = ({ loginState, setLoginState, dialogRef }) => {

  return (
    <div className="container w-screen flex flex-col">
      <Navbar loginState={loginState} setLoginState={setLoginState} dialogRef={dialogRef} />
    </div>
  )
}

export default Home;