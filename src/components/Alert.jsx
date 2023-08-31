/* eslint-disable react/prop-types */

const Alert = ({ icon, message }) => {
    const iconColorStatus = icon.includes('check')

    return (
        <div className="w-max h-max p-4 rounded-lg bg-white fixed items-center top-3 flex gap-3 text-2xl">
            <i className={`${icon} text-${iconColorStatus ? 'lime' : 'red'}-500`}></i>
            <p className="text-lg font-semibold">{message}</p>
        </div>
    )
}

export default Alert