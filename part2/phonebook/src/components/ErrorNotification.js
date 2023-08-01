const ErrorNotification = ({message}) =>{
    if(message === null){
        return
    }

    return(
        <div className="error">
            {message}
        </div>
    )
}

export default ErrorNotification