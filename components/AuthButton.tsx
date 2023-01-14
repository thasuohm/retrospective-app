'use client'
import {useSession, signIn, signOut} from 'next-auth/react'

const AuthButton = () => {
  const {data: session} = useSession()

  if (session) {
    return (
      <button
        title="logout"
        className="hover:opacity-70 font-semibold"
        type="button"
        onClick={() => {
          signOut()
        }}
      >
        Logout
      </button>
    )
  } else {
    return (
      <button
        title="login"
        className="hover:opacity-70 font-semibold"
        type="button"
        onClick={() => {
          signIn('google')
        }}
      >
        Login
      </button>
    )
  }
}

export default AuthButton
