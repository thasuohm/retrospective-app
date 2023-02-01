import {UseFormRegister} from 'react-hook-form/dist/types'

type InputProps = {
  label?: string
  register: UseFormRegister<any>
  type: string
  placeHolder?: string
  isDisabled?: boolean
  registerLabel: string
  required?: boolean
  autoComplete?: string
  defaultValues?: string
}

const Input: React.FC<InputProps> = (props) => {
  const {
    label,
    register,
    type,
    placeHolder,
    isDisabled,
    registerLabel,
    required,
    autoComplete,
    defaultValues,
  } = props

  return (
    <label className="flex flex-col gap-2">
      {label}
      <input
        className="px-2 py-2 rounded-md border-2 border-solid  border-slate-300 focus:border-slate-400 bg-white duration-100
         dark:bg-slate-900 dark:border-slate-600 dark:text-white dark:focus:border-slate-400 outline-none text-lg tracking-wider"
        type={type}
        placeholder={placeHolder}
        disabled={isDisabled}
        {...register(registerLabel, {required})}
        autoComplete={autoComplete}
        defaultValue={defaultValues}
      />
    </label>
  )
}

export default Input
