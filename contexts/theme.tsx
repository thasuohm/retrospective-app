import {useContext, createContext, useState, useEffect} from 'react'

interface AppContextInterface {
  theme: string
  setTheme: (state: string) => void
}

const ThemeContext = createContext<
  AppContextInterface | {theme: ''; setTheme: (state: string) => {}}
>({
  theme: '',
  setTheme: () => {},
})

export const ThemeProvider = (props: any) => {
  const [theme, setTheme] = useState<string>('')

  useEffect(() => {
    if (localStorage.theme !== '' && theme !== '') {
      localStorage.theme = theme
      setTheme(theme)
    } else if (localStorage.theme !== '' && theme === '') {
      setTheme(localStorage.theme)
    } else {
      localStorage.theme = 'light'
      setTheme('light')
    }

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setTheme: (state: string) => setTheme(state),
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
