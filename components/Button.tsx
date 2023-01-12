import React from 'react'
import {ButtonProps} from '../types/components'

const Button: React.FC<ButtonProps> = (props) => {
  const {type, style, children, size, isDisabled} = props

  const styleSwitch = () => {
    switch (style) {
      case 'primary':
        return 'p-2 bg-slate-800 text-white rounded-lg'

      case 'secondary':
        return 'p-2 bg-slate-100 text-slate-700 rounded-lg '
    }
  }

  const primaryStyle = ''

  return (
    <button
      type={type}
      className={`${styleSwitch()} ${size} hover:opacity-80`}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Button
