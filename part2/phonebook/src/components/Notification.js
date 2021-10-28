import React from 'react'

const Notification = ({message, error}) => {
    if(message === null)
    {
        return null
    }
    else if(error === false)
    {
        return (
            <div className = 'notification'>
                {message}
            </div>
        )
    }
    else
    {
        return (
            <div className = 'error'>
                {message}
            </div>
        )
    }
}

export default Notification;