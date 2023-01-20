import {RetroBoard} from '@prisma/client'
import moment from 'moment'
import React from 'react'
import Button from '../Button'

const RetroBoardCard = (props: any) => {
  const {
    id,
    title,
    teamId,
    creatorId,
    anonymous,
    opening,
    password,
    createdAt,
    team,
    creator,
    endDate,
  } = props.retroBoard

  return (
    <div
      className="bg-slate-50 rounded-xl p-4 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33%-0.55rem)] 
    relative dark:text-slate-800 flex flex-col gap-2 shadow-sm shadow-slate-300 hover:shadow-md hover:cursor-pointer"
    >
      <div className="bg-slate-50 absolute top-1 text-green-600 tracking-widest font-semibold left-2/4 -translate-x-1/2  px-4 rounded-b-xl">
        OPENING
      </div>
      <div className="bg-slate-300 w-full h-24 rounded-lg"></div>
      <main className="break-all flex flex-col gap-1">
        <div className="text-sm font-semibold">Title: {title}</div>
        <div className="text-sm font-semibold">Creator: {creator.email}</div>
        <div className="text-sm font-semibold">Team: {team.name}</div>
        <div className="text-sm font-semibold">
          Expire:
          {endDate ? moment(endDate).format('MMMM Do YYYY, h:mm') : 'None'}
        </div>
        <Button
          type="button"
          style="primary"
          size="sm"
          onClick={() => {}}
          isDisabled={false}
          customStyle="w-full font-semibold"
        >
          Let&apos;s write !!
        </Button>
      </main>
    </div>
  )
}

export default RetroBoardCard
