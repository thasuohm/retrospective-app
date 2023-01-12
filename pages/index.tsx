import {useEffect, useState} from 'react'
import Button from '../components/Button'
import Select from 'react-select'
import {ReactSelectState} from '../types/components'

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<ReactSelectState | null>(
    null
  )

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

  return (
    <main className="flex flex-col gap-8 max-w-3xl justify-center mx-auto h-screen px-3 lg:px-0">
      <Select
        defaultValue={selectedTeam}
        onChange={setSelectedTeam}
        options={teamList}
      />

      <Button
        type="button"
        style="primary"
        size="sm"
        onClick={() => {}}
        isDisabled={false}
      >
        <b className="font-semibold font-sanam-deklen tracking-widest text-2xl  px-12  ">
          ค้นหา
        </b>
      </Button>
    </main>
  )
}
