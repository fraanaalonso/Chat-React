import React from 'react'

const Button = ({ onClick= null, children = null}) => (
    <button class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 motion-reduce:transform-none" onClick={onClick}>{children}</button>
)

export default Button
