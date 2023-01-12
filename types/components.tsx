import { ReactNode } from "react"

interface InputOnChange {
  (value: string): void
}
export interface InputProps {
  onChange: InputOnChange
  value: string
  isDisabled: boolean
}

interface onClickFunction {
  (): void
}
export interface ButtonProps {
  onClick: onClickFunction
  children: ReactNode
  type: 'button' | 'submit' | 'reset' | undefined
  style: 'primary' | 'secondary'
  size: string
  isDisabled: boolean | undefined
}
