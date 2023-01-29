import {useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import useUser from '../../api/query/user/useUser'

const HistoryIndexPage = () => {
  const {data: session} = useSession()
  const {data: user} = useUser(session ? true : false)
  const router = useRouter()

  useEffect(() => {
    if (session && user && user.teamId) {
      router.push(`/history/${user.teamId}`)
    }
  }, [router, session, user])

  return <div>index</div>
}

export default HistoryIndexPage
