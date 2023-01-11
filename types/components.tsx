interface InputOnChange {
  (value: string): any
}
export interface InputProps {
  onChange: InputOnChange
  value: string
  isDisabled: boolean
}
