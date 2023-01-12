import React from 'react'
import {DefaultLayout} from '../../types/layouts'
import NavBar from '../NavBar'

const DefaultLayout: React.FC<DefaultLayout> = ({children}) => {
  return (
    <>
      <NavBar />
      <section className="max-w-5xl w-full mx-auto">{children}</section>
    </>
  )
}

export default DefaultLayout
