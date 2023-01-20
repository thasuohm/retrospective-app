import {useEffect, useMemo, useState} from 'react'
import Button from '../components/Button'
import Select from 'react-select'
import {ReactSelectState} from '../types/components'
import {toast} from 'react-toastify'
import useTeamList from '../api/query/team/useTeamList'
import Head from 'next/head'
import {useRouter} from 'next/router'
import useUserChangeTeam from '../api/query/user/useUserChangeTeam'
import {useSession} from 'next-auth/react'
import useUser from '../api/query/user/useUser'
import {dehydrate, QueryClient} from 'react-query'
import retrospectiveService from '../api/request/retrospective'
import {Team} from '@prisma/client'

export default function Home() {
  const {data: teams} = useTeamList()
  const router = useRouter()
  const {data: session} = useSession()
  const {data: user} = useUser(session ? true : false)
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

  const searchRetroList = () => {
    if (selectedTeam === null) {
      return toast.error('Please Select your TEAM!!', {
        position: toast.POSITION.TOP_CENTER,
      })
    }

    if (session) {
      userChangeTeam(selectedTeam.value)
    }

    router.push({pathname: '/retro-list/' + selectedTeam.value})
  }

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
            isDisabled={false}
          >
            <b className="font-semibold font-sanam-deklen tracking-widest text-2xl px-12">
              Search
            </b>
          </Button>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('get-team-list', async () => {
    return await retrospectiveService
      .getTeamList()
      .then((res) => res.data as Team[])
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  }
}
