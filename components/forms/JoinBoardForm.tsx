import Head from 'next/head'
import React from 'react'
import {useForm} from 'react-hook-form'
import useJoinBoard from '../../api/query/board/useJoinBoard'
import Button from '../Button'
import Input from '../Input'

const JoinBoardForm = ({boardId}: {boardId: string}) => {
  const {register: joinBoardRegister, handleSubmit: joinBoardHandleSubmit} =
    useForm<any>()
  const {mutate: joinBoard} = useJoinBoard()

  const joinBoardSubmit = (data: {password: string}) => {
    joinBoard({
      boardId: boardId ? boardId?.toString() : '',
      password: data?.password,
    })
  }

  return (
    <>
      <Head>
        <title>No permission to see board</title>
      </Head>
      <div className="bg-slate-100 dark:bg-slate-800 flex flex-col gap-3 max-w-2xl mt-52 lg:mt-28 mx-auto p-4 rounded-2xl duration-150 dark:text-white">
        <h1 className="text-xl font-semibold">
          Enter board password to Join this Retrospective
        </h1>
        <form
          onSubmit={joinBoardHandleSubmit(joinBoardSubmit)}
          className="flex flex-col gap-4"
        >
          <Input
            type="password"
            placeHolder="Enter Board Password..."
            register={joinBoardRegister}
            registerLabel="password"
            new-password
          />
          <Button
            type="submit"
            style="primary"
            applyDark={true}
            size="md"
            customStyle="font-semibold"
          >
            Join Board
          </Button>
        </form>
      </div>
    </>
  )
}

export default JoinBoardForm
