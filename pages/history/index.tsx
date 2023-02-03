import {Team} from '@prisma/client'
import moment from 'moment'
import {useSession} from 'next-auth/react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import React, {useEffect, useMemo, useState} from 'react'
import Select from 'react-select'
import {toast} from 'react-toastify'
import useTeamList from '../../api/query/team/useTeamList'
import useUser from '../../api/query/user/useUser'
import useUserChangeTeam from '../../api/query/user/useUserChangeTeam'
import Button from '../../components/Button'
import {ReactSelectState} from '../../types/components'

const HistoryIndexPage = () => {
  const {data: session} = useSession()
  const {data: user, isLoading: isLoadingUser} = useUser(session ? true : false)
  const router = useRouter()

  useEffect(() => {
    if (session && user && user.teamId) {
      router.push(`/history/${user.teamId}/${moment().year()}`)
    }
  }, [router, session, user])

  const {data: teams} = useTeamList()
  const {mutate: userChangeTeam} = useUserChangeTeam()

  const [selectedTeam, setSelectedTeam] = useState<ReactSelectState | null>(
    null
  )

  useEffect(() => {
    if (user && teams) {
      const team = teams.find((item) => user.teamId === item.id)
      if (team) {
        setSelectedTeam({value: team.id, label: team.name})
      }
    }
  }, [user, teams])

  const teamListOption = useMemo(() => {
    return teams?.map((item: Team) => {
      return {value: item.id, label: item.name}
    })
  }, [teams])

  if (isLoadingUser) {
    return <div>Loading...</div>
  }

  const searchRetroList = () => {
    if (selectedTeam === null) {
      return toast.error('Please Select your TEAM!!', {
        position: toast.POSITION.TOP_CENTER,
      })
    }

    if (session) {
      userChangeTeam(selectedTeam.value)
    }

    router.push({pathname: `/history/${selectedTeam.value}/${moment().year()}`})
  }

  if (!session || (user && !user.teamId)) {
    return (
      <>
        <Head>
          <title>Choose your team - Retro Creator</title>
        </Head>
        <main className="flex flex-col gap-4 max-w-3xl justify-center mx-auto h-screen px-3 lg:px-0">
          <div className="p-4 flex flex-col gap-4 justify-center rounded-lg">
            <h1 className="font-semibold font-sanam-deklen tracking-widest text-2xl text-center dark:text-white">
              Choose your Team
            </h1>

            {((teamListOption && !user?.teamId) ||
              (teamListOption && selectedTeam)) && (
              <Select
                id="team-select"
                defaultValue={selectedTeam}
                onChange={setSelectedTeam}
                options={teamListOption}
                instanceId="team-select"
              />
            )}

            <Button
              type="button"
              style="primary"
              size="sm"
              onClick={searchRetroList}
            >
              <b className="font-semibold font-sanam-deklen tracking-widest text-2xl px-12">
                Find History
              </b>
            </Button>
          </div>
        </main>
      </>
    )
  }

  return <div>Loading...</div>
}

export default HistoryIndexPage
