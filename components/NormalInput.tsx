type InputProps = {
  id?: string
  label?: string
  onChange: (e) => void
  type: string
  placeHolder?: string
  isDisabled?: boolean
  autoComplete?: string
  defaultValue?: string | number
  size?: 'sm' | 'md' | 'lg'
  customStyle?: string
  customInputStyle?: string
  errorMessage?: string
}

const NormalInput: React.FC<InputProps> = (props) => {
  const {
    label,
    onChange,
    id,
    type,
    placeHolder,
    isDisabled,
    autoComplete,
    defaultValue,
    size,
    customStyle,
    customInputStyle,
    errorMessage,
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
    <label className={`flex flex-col   gap-2 ${customStyle ?? ''}`}>
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
        onChange={onChange}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
      />

      <div className="text-red-500 font-semibold">{errorMessage}</div>
    </label>
  )
}

export default NormalInput
