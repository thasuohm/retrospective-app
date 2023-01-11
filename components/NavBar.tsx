import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import {faMoon} from '@fortawesome/free-regular-svg-icons'
import {faSun} from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
  const changeMode = (mode: string) => {
    localStorage.theme = mode

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
      console.log('hello')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <nav
      className="fixed top-0 w-full bg-white shadow-md shadow-slate-100 p-4 flex justify-between 
    items-center dark:bg-slate-800 dark:text-white dark:shadow-transparent dark:border-slate-800 dark:border-b-2 duration-200"
    >
      <Link href={'/'} className="tracking-widest font-semibold text-lg">
        RETROSPECTIVE APP
      </Link>
      <div className="flex gap-2 justify-between">
        <button
          title="dark-mode-switch"
          className="bg-slate-900 text-white p-1 rounded-full"
          onClick={() => changeMode('dark')}
        >
          <FontAwesomeIcon icon={faMoon} size="xl" />
        </button>
        <button title="light-mode-switch" onClick={() => changeMode('light')}>
          <FontAwesomeIcon icon={faSun} size="xl" />
        </button>

        {/* <button className="hover:opacity-90">Login</button> */}
      </div>
    </nav>
  )
}

export default NavBar
