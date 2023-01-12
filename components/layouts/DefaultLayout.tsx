import React from 'react'
import {DefaultLayout} from '../../types/layouts'
import NavBar from '../NavBar'

const DefaultLayout: React.FC<DefaultLayout> = ({children}) => {
  return (
    <>
      <NavBar />
      <section className="pt-24 px-2 lg:px-0 max-w-5xl w-full mx-auto">{children}</section>
    </>
  )
}

export default DefaultLayout
