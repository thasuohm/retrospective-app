import {Team} from '@prisma/client'
import moment from 'moment'
import {useSession} from 'next-auth/react'
import Head from 'next/head'
import React, {useEffect, useMemo, useState} from 'react'
import {useForm} from 'react-hook-form'
import Select from 'react-select'
import {toast} from 'react-toastify'
import useCreateBoard from '../../api/query/board/useCreateBoard'
import useTeamList from '../../api/query/team/useTeamList'
import useUser from '../../api/query/user/useUser'
import Button from '../../components/Button'
import Input from '../../components/Input'
import ConfirmModal from '../../components/Modal/ConfirmModal'
import {ReactSelectState} from '../../types/components'
import {RetroBoardCreate} from '../../types/request'

const CreateRetroPage = () => {
  const {
    register,
    setError,
    formState: {errors},
    handleSubmit,
    getValues,
  } = useForm<any>()
  const {data: session} = useSession()
  const {data: user} = useUser(session ? true : false)
  const [selectedTeam, setSelectedTeam] = useState<ReactSelectState | null>(
    null
  )
  const [createBoardModal, setCreateBoardModal] = useState<boolean>(false)
  const {data: teams} = useTeamList()
  const {mutate: createBoard} = useCreateBoard()

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

  const openConfirmModal = () => {
    if (getValues('title').length < 6) {
      setError('title', {
        type: 'custom',
        message: 'Please Add title at least 6 Character',
      })
      return toast.error('Please add Board Title')
    }

    if (!selectedTeam?.value) {
      setError('team', {
        type: 'custom',
        message: 'Please Select Team for this Board',
      })
      return toast.error('Please Select Team for this board')
    }

    setCreateBoardModal(true)
  }

  const createBoardSubmit = (data: RetroBoardCreate) => {
    createBoard({...data, teamId: selectedTeam!.value})
    setCreateBoardModal(false)
  }

  return (
    <>
      <Head>
        <title>Create new Board</title>
      </Head>
      {createBoardModal && (
        <ConfirmModal
          head="Close Board~"
          onSubmit={handleSubmit(createBoardSubmit)}
          onCancel={() => {
            setCreateBoardModal(false)
          }}
        >
          <>
            Are you sure to Create this Board ? <br />
          </>
        </ConfirmModal>
      )}
      <main className="bg-slate-100 dark:bg-slate-800 flex flex-col gap-3 max-w-3xl mt-52 lg:mt-28 mx-auto p-4 rounded-2xl duration-150 dark:text-white">
        <header className="flex flex-col md:flex-row justify-between gap-2">
          <h1 className="text-2xl md:w-3/4 break-words font-semibold">
            Creating new Board..
          </h1>
        </header>

        <form className="flex flex-col  gap-2 items-start   mt-6 p-3 bg-slate-300 dark:bg-slate-700 rounded-md">
          <Input
            label="Title*"
            type="text"
            placeHolder="board title..."
            register={register}
            registerCustom={{require: true}}
            registerLabel="title"
            customStyle="w-full"
            errorMessage={errors?.title?.message?.toString()}
            defaultValues={`Board At - ${moment().format('MMMM Do YYYY')}`}
          />

          <div className="w-full">Team*</div>
          {selectedTeam && (
            <>
              <Select
                id="team-select"
                defaultValue={selectedTeam}
                onChange={setSelectedTeam}
                options={teamListOption}
                instanceId="team-select"
                className="w-full text-black"
              />
              <div className="text-red-500 font-semibold">
                {errors.team?.message?.toString()}
              </div>
            </>
          )}
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <Input
              label="Close time"
              type="datetime-local"
              placeHolder="update close time..."
              register={register}
              registerLabel="endDate"
              customStyle="w-full md:w-1/2"
            />
            <Input
              label="Password"
              type="password"
              placeHolder="board password..."
              register={register}
              registerLabel="password"
              autoComplete="new-password"
              customStyle="w-full md:w-1/2"
            />
          </div>

          <Input
            label="Anonymous Form(if don't check it will show user who write comment)"
            type="checkbox"
            register={register}
            registerLabel="anonymous"
            customStyle="items-center"
            defaultChecked={true}
            customInputStyle="w-8 h-8"
          />

          <Button
            type="button"
            onClick={openConfirmModal}
            style="primary"
            applyDark={true}
            size="md"
            customStyle="self-center mt-8"
          >
            Create Board
          </Button>
        </form>
      </main>
    </>
  )
}

export default CreateRetroPage
