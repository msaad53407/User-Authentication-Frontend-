/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar"

const Dashboard = ({ loginState }) => {
  if (!loginState) {
    return (
      <div className="container w-screen flex flex-col">
        <Navbar loginState={loginState} />
        <h1>Login To See Dashboard</h1>
      </div>
    )
  } else {
    return (
      <div className="container w-screen flex flex-col">
        DashBoard
      </div>
    )
  }
}

export default Dashboard