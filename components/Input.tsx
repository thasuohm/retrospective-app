import {UseFormRegister} from 'react-hook-form/dist/types'

type InputProps = {
  id?: string
  label?: string
  register: UseFormRegister<any>
  type: string
  placeHolder?: string
  isDisabled?: boolean
  registerLabel: string
  registerCustom?: any
  autoComplete?: string
  defaultValues?: string | number
  size?: 'sm' | 'md' | 'lg'
  customStyle?: string
  customInputStyle?: string
}

const Input: React.FC<InputProps> = (props) => {
  const {
    label,
    register,
    id,
    type,
    placeHolder,
    isDisabled,
    registerLabel,
    registerCustom,
    autoComplete,
    defaultValues,
    size,
    customStyle,
    customInputStyle,
  } = props

  const switchSize = () => {
    switch (size) {
      case 'sm':
        return 'p-1 rounded-md'
      default:
        return 'p-2 rounded-md'
    }
  }

  return (
    <label className={`flex flex-col gap-2 ${customStyle ?? ''}`}>
      {label}
      <input
        className={`${switchSize()} ${
          customInputStyle ?? ''
        } border-2 border-solid  border-slate-300 focus:border-slate-400 bg-white duration-100
         dark:bg-slate-900 dark:border-slate-600 dark:text-white dark:focus:border-slate-400 outline-none text-lg tracking-wider`}
        id={id}
        type={type}
        placeholder={placeHolder}
        disabled={isDisabled}
        {...register(registerLabel, registerCustom)}
        autoComplete={autoComplete}
        defaultValue={defaultValues}
      />
    </label>
  )
}

export default Input
