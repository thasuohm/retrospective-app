import {useMemo, useState} from 'react'
import Button from '../components/Button'
import Select from 'react-select'
import {ReactSelectState} from '../types/components'
import {toast} from 'react-toastify'
import useTeamList from '../api/query/useTeamList'
import {Team} from '../types/team'
import Head from 'next/head'
import {useRouter} from 'next/router'

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<ReactSelectState | null>(
    null
  )

  const {data: teams} = useTeamList()
  const router = useRouter()

  const teamListOption = useMemo(() => {
    return teams?.map((item: Team) => {
      return {value: item.code, label: item.name}
    })
  }, [teams])

  const searchRetroList = () => {
    if (selectedTeam === null) {
      return toast.error('Please Select your TEAM!!', {
        position: toast.POSITION.TOP_CENTER,
      })
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

          <Select
            defaultValue={selectedTeam}
            onChange={setSelectedTeam}
            options={teamListOption}
            instanceId="team-select"
          />

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
