import Image from 'next/image'
import React from 'react'
import {useTheme} from '../contexts/theme'
import sunImg from '../public/images/sun.gif'
import moonImg from '../public/images/moon.gif'
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
    from: {y: isDark() ? -150 : 0},
    to: {y: isDark() ? 60 : 0},
  })

  const sunRise = useSpring({
    from: {y: !isDark() ? 0 : -120},
    to: {y: !isDark() ? 0 : 80},
  })

  return (
    <div className="absolute top-24 left-24">
      {isDark() ? (
        <animated.div style={moonRise} className="w-56">
          <Image src={moonImg} alt="moon rise" />
        </animated.div>
      ) : (
        <animated.div style={sunRise} className="w-60">
          <Image src={sunImg} alt="sun rise" />
        </animated.div>
      )}
    </div>
  )
}

export default ThemeRise
