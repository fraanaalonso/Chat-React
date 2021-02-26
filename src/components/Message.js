import React from 'react'
import { formatRelative } from 'date-fns';

export const Message = ({CreatedAt = null, text = '', displayName= '', photoURL = ''}) => {
    return (
        <div>
            {
                photoURL
                ?
                <img src={photoURL} alt="Avatar" width={45} height={45} />
                : 
                null
            }
            {
                displayName
                ?
                <p>{displayName}</p>
                :
                null
            }
            {
                CreatedAt?.seconds
                ?
                (
                    <span>{formatRelative(new Date(CreatedAt.seconds * 1000), new Date())}</span>
                )
                :
                null
            }
            <p>{text}</p>
        </div>
    )
}
