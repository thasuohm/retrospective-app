import {useSpring} from '@react-spring/web'

const useBooping = ({
  fromScale,
  toScale,
  customFrom,
  customTo,
  customProps,
}: {
  fromScale?: number
  toScale?: number
  customFrom?: any
  customTo?: any
  customProps?: any
}) => {
  const booping = useSpring({
    from: {scale: fromScale ?? 1.5, ...customFrom},
    to: {scale: toScale ?? 1, ...customTo},
    ...customProps,
  })

  return booping
}

export default useBooping
