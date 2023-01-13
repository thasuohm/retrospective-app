import Image from 'next/image'
import React from 'react'
import {useTheme} from '../contexts/theme'
import sunImg from '../public/images/sun.gif'
import moonImg from '../public/images/moon.gif'
import cloudImg from '../public/images/cloud.png'

import {useSpring, animated} from '@react-spring/web'

const ThemeRise = () => {
  const {theme} = useTheme()

  const isDark = () => {
    if (theme === 'dark') {
      return true
    }

    return false
  }

  const moonRise = useSpring({
    from: {y: isDark() ? -200 : 0},
    to: {y: isDark() ? 20 : 0},
  })

  const sunRise = useSpring({
    from: {y: !isDark() ? 0 : -120},
    to: {y: !isDark() ? 0 : 60},
  })

  return (
    <>
      <div className="absolute top-24 left-8 md:left-24  translate-x-0 duration-200">
        {isDark() ? (
          <animated.div style={moonRise} className="w-28 md:w-56 duration-200">
            <Image src={moonImg} alt="moon rise" />
          </animated.div>
        ) : (
          <animated.div style={sunRise} className="w-32 md:w-60 duration-200">
            <Image src={sunImg} alt="sun rise" />
          </animated.div>
        )}
      </div>
    </>
  )
}

export default ThemeRise
