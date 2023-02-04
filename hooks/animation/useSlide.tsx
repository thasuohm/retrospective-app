import {useSpring} from '@react-spring/web'
import React from 'react'

const useSlide = ({
  fromX,
  fromY,
  toX,
  toY,
  customFrom,
  customTo,
  customProps,
}: {
  fromX?: number
  fromY?: number
  toX?: number
  toY?: number
  customFrom?: any
  customTo?: any
  customProps?: any
}) => {
  const slide = useSpring({
    from: {x: fromX ?? 0, y: fromY ?? 0, ...customFrom},
    to: {x: toX ?? 0, y: toY ?? 0, ...customTo},
    ...customProps,
  })

  return slide
}

export default useSlide
