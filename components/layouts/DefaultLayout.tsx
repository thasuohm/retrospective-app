import React from 'react'
import {DefaultLayout} from '../../types/layouts'
import Footer from '../Footer'
import NavBar from '../NavBar'
import ThemeRise from '../ThemeRise'

const DefaultLayout: React.FC<DefaultLayout> = ({children}) => {
  return (
    <>
      <NavBar />
      <ThemeRise />
      <section className="max-w-5xl w-full mx-auto relative h-screen">
        {children}
      </section>
      <Footer />
    </>
  )
}

export default DefaultLayout
