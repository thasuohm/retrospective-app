import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import {faMoon} from '@fortawesome/free-regular-svg-icons'
import {faSun} from '@fortawesome/free-solid-svg-icons'
import {useTheme} from '../contexts/theme'

const NavBar: React.FC = () => {
  const {theme, setTheme} = useTheme()
  const changeMode = (mode: string) => {
    setTheme(mode)
  }

  return (
    <nav
      className="fixed top-0 w-full bg-white shadow-md shadow-slate-100 p-2 md:p-4 flex justify-between 
    items-center dark:bg-slate-800 dark:text-white dark:shadow-transparent dark:border-slate-800 dark:border-b-2 duration-200"
    >
      <div className="flex gap-2 md:gap-8 justify-between duration-200 items-center">
        <Link
          href={'/'}
          className="tracking-widest font-semibold text-lg hover:opacity-90"
        >
          RETROSPECTIVE
        </Link>
        <Link
          href={'/history'}
          className="tracking-widest font-semibold text-md md:text-lg hover:opacity-70"
        >
          History
        </Link>
      </div>
      <div className="flex gap-2 md:gap-4 justify-between items-center text-md md:text-lg">
        {theme == 'dark' ? (
          <button
            title="light-mode-switch"
            className="p-1 rounded-full shrink-0 w-8 h-8 hover:opacity-90"
            onClick={() => changeMode('light')}
            type="button"
          >
            <FontAwesomeIcon icon={faSun} />
          </button>
        ) : (
          <button
            title="dark-mode-switch"
            className="p-1 rounded-full shrink-0 w-8 h-8 hover:opacity-90"
            type="button"
            onClick={() => changeMode('dark')}
          >
            <FontAwesomeIcon icon={faMoon} />
          </button>
        )}

        <button
          title="login"
          className="hover:opacity-70  font-semibold"
          type="button"
        >
          Login
        </button>
      </div>
    </nav>
  )
}

export default NavBar
