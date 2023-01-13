import {useMemo, useState} from 'react'
import Button from '../components/Button'
import Select from 'react-select'
import {ReactSelectState} from '../types/components'
import {toast} from 'react-toastify'
import axios from 'axios'
import useTeamList from '../api/query/useTeamList'
import {Team} from '../types/team'

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<ReactSelectState | null>(
    null
  )

  const {data} = useTeamList()

  const teamList = [
    {
      value: 'dev',
      label: 'Developer',
    },
    {
      value: 'design',
      label: 'Designer',
    },
    {
      value: 'tester',
      label: 'Tester',
    },
  ]

  const teamListOption = useMemo(() => {
    return data?.data.map((item: Team) => {
      return {value: item.code, label: item.name}
    })
  }, [data])

  const searchRetroList = () => {
    if (selectedTeam === null) {
      return toast.error('Please Select your TEAM!!', {
        position: toast.POSITION.TOP_CENTER,
      })
    }

    toast.success('Wait for update~', {
      position: toast.POSITION.TOP_CENTER,
    })
  }

  return (
    <main className="flex flex-col gap-4 max-w-3xl justify-center mx-auto h-screen px-3 lg:px-0 ">
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
  )
}
