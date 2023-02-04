import {useSpring} from '@react-spring/web'

const useFade = ({
  from,
  to,
  customProps,
}: {
  from?: number
  to?: number
  customProps?: any
}) => {
  const fade = useSpring({
    from: {opacity: from ?? 0},
    to: {opacity: to ?? 1},
    ...customProps,
  })

  return fade
}

export default useFade
