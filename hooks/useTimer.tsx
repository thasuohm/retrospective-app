import React, {useEffect, useState} from 'react'

const useTimer = (timeLeft: number) => {
  const [time, setTime] = useState<number>(0)

  useEffect(() => {
    if (timeLeft && timeLeft > 0) {
      setTime(timeLeft)
    }
  }, [timeLeft])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time > 0) {
        setTime((prev) => prev - 1)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [time])

  if (!timeLeft) {
    return {
      timer: '--:--:--',
      timeOut: time <= 0 ? true : false,
    }
  }

  return {
    timer:
      Math.floor(time / 3600) +
      ':' +
      ('0' + (Math.floor(time / 60) % 60)).slice(-2) +
      ':' +
      ('0' + (time % 60)).slice(-2),
    timeOut: time <= 0 ? true : false,
  }
}

export default useTimer
