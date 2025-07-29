import React from 'react'
import '../../App.css'

function Input({placeholder,name,handleInput}) {
  return (
    <input type="text" onChange={handleInput} className='inp'
 placeholder={placeholder} name={name} />
  )
}

export default Input;