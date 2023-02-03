import {ReactNode} from 'react'
import React from 'react'
import Link from 'next/link'

export interface ButtonProps {
  id?: string
  href: string
  children: ReactNode
  style: 'primary' | 'secondary' | 'cancel'
  size: string
  customStyle?: string
  applyDark?: boolean
}

const LinkButton: React.FC<ButtonProps> = (props) => {
  const {id, style, children, size, href, customStyle, applyDark} = props

  const styleSwitch = () => {
    switch (style) {
      case 'primary':
        return `bg-slate-800 text-white font-semibold ${
          applyDark && 'dark:bg-slate-100 dark:text-slate-700'
        }`
      case 'secondary':
        return `bg-slate-100 text-slate-700 font-semibold ${
          applyDark && 'dark:bg-slate-800 dark:text-white'
        }`
      default:
        return `bg-slate-800 text-white font-semibold ${
          applyDark && 'dark:bg-slate-100 dark:text-slate-700'
        }`
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
    <Link
      href={href}
      id={id}
      className={`${styleSwitch()} ${sizeSwitch()} ${customStyle} hover:opacity-80 duration-150 text-center`}
    >
      {children}
    </Link>
  )
}

export default LinkButton
