import {ButtonProps} from '../types/components'

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type,
    style,
    children,
    size,
    isDisabled,
    onClick,
    customStyle,
    applyDark,
  } = props

  const styleSwitch = () => {
    switch (style) {
      case 'primary':
        return `bg-slate-800 text-white ${applyDark && 'dark:bg-slate-100 dark:text-slate-700'}`
      case 'secondary':
        return `bg-slate-100 text-slate-700 ${applyDark && 'dark:bg-slate-800 dark:text-white'}`
      default:
        return `bg-slate-800 text-white ${applyDark && 'dark:bg-slate-100 dark:text-slate-700'}`
    }
  }

  const sizeSwitch = () => {
    switch (size) {
      case 'sm':
        return 'p-1 rounded-md text-sm'
      default:
        return 'p-2 rounded-lg'
    }
  }

  return (
    <button
      type={type}
      className={`${styleSwitch()} ${sizeSwitch()} ${customStyle} hover:opacity-80 duration-150`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
