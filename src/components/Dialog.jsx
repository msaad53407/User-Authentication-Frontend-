/* eslint-disable react/prop-types */


const Dialog = ({ message, option1, option2, dialogRef, dialogState }) => {
    return (
        <dialog open={dialogState} ref={dialogRef} >
            <div className="flex flex-col gap-4">
                <p className="text-center text-2xl">{message}</p>
                <div className="flex flex-row justify-end gap-3">
                    {option1 && <button className="px-3 p-2 rounded-lg border-2 hover:shadow-xl" onClick={option1.optionFunction}>{option1.optionName}</button>}
                    {option2 && <button className="p-2 px-3 bg-red-500 rounded-lg text-white hover:shadow-xl" onClick={option2.optionFunction}>{option2.optionName}</button>}
                </div>
            </div>
        </dialog>
    )
}

export default Dialog