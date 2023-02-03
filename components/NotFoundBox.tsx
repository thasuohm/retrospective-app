import Image from 'next/image'
import React, {ReactNode} from 'react'
import ufoImage from '../public/images/ufo.png'

const NotFoundBox = ({children}: {children: ReactNode}) => {
  return (
    <div
      className=" flex flex-col gap-3 items-center w-full text-2xl font-bold bg-slate-300 dark:bg-slate-700 p-6 rounded-lg
  "
    >
      <div className="w-36 h-36">
        <Image src={ufoImage} alt="not found ufo" />
      </div>
      {children}
    </div>
  )
}

export default NotFoundBox
