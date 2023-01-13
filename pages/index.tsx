import {useState} from 'react'
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

  const searchRetroList = () => {
    console.log(selectedTeam)
  }

  return (
    <main className="flex flex-col gap-4 max-w-3xl justify-center mx-auto h-screen px-3 lg:px-0 ">
      <div className="p-4 flex flex-col gap-4 justify-center rounded-lg">
        <h1 className="font-semibold font-sanam-deklen tracking-widest text-2xl text-center dark:text-white">
          เลือกทีมของคุณ
        </h1>

        <Select
          defaultValue={selectedTeam}
          onChange={setSelectedTeam}
          options={teamList}
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
            ค้นหา
          </b>
        </Button>
      </div>
    </main>
  )
}
