import moment from 'moment'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
import React from 'react'
import {toast} from 'react-toastify'
import Button from '../Button'

const RetroBoardCard = (props: any) => {
  const {id, title, opening, password, team, creator, endDate} =
    props.retroBoard
  const {data: session} = useSession()
  const router = useRouter()

  const joinMeeting = () => {
    if (!password || password !== '') {
    }

    if (!session) {
      return toast.error('Please Login to Join this Board')
    }

    return router.push(`/board/${id}`)
  }

  const seeResult = () => {
    if (!session) {
      return toast.error('Please Login to Join this Board')
    }

    return router.push(`/history/board/${id}`)
  }

  return (
    <div
      id={`${id}`}
      className="bg-slate-50 rounded-xl p-4 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33%-0.55rem)] 
    relative dark:text-slate-800 flex flex-col gap-2 shadow-sm shadow-slate-300 hover:shadow-md hover:cursor-pointer"
    >
      {opening ? (
        <div className="bg-slate-50 absolute top-1 text-green-600 tracking-widest font-semibold left-2/4 -translate-x-1/2  px-4 rounded-b-xl">
          OPENING
        </div>
      ) : (
        <div className="bg-slate-50 absolute top-1 text-red-600 tracking-widest font-semibold left-2/4 -translate-x-1/2  px-4 rounded-b-xl">
          CLOSED
        </div>
      )}

      <div className="bg-slate-300 w-full h-24 rounded-lg"></div>
      <main className="break-all flex flex-col gap-1">
        <div className="text-sm font-semibold">Title: {title}</div>
        <div className="text-sm font-semibold">Creator: {creator.email}</div>
        <div className="text-sm font-semibold">Team: {team.name}</div>
        <div className="text-sm font-semibold">
          Expire:
          {endDate ? moment(endDate).format('MMMM Do YYYY, h:mm') : 'None'}
        </div>

        {opening ? (
          <Button
            id=""
            type="button"
            style="primary"
            size="sm"
            onClick={joinMeeting}
            isDisabled={false}
            customStyle="w-full font-semibold"
          >
            Let&apos;s write !!
          </Button>
        ) : (
          <Button
            type="button"
            style="primary"
            size="sm"
            onClick={seeResult}
            isDisabled={false}
            customStyle="w-full font-semibold"
          >
            See Result !!
          </Button>
        )}
      </main>
    </div>
  )
}

export default RetroBoardCard
