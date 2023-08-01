const SuccessNotification = ({message}) =>{
    if(message === null){
        return
    }

    return(
        <div className="success">
            {message}
        </div>
    )
}

export default SuccessNotification