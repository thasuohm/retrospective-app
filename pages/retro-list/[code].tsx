import Head from 'next/head'
import {useRouter} from 'next/router'
import {ParsedUrlQuery} from 'querystring'
import React from 'react'
import useTeam from '../../api/query/useTeam'

export interface TeamCode extends ParsedUrlQuery {
  code: string
}

const RetroListPage = () => {
  const router = useRouter()
  const {code} = router.query as TeamCode

  const {data: teamInfo} = useTeam(code!)

  console.log(code, teamInfo)

  return (
    <>
      <Head>
        <title>{teamInfo?.data?.name} Team - Retro Creator</title>
      </Head>
      <main className="bg-slate-100 dark:bg-slate-800 gap-4 max-w-3xl mt-28 mx-auto px-3 lg:px-0 rounded-2xl">
        <div className="p-4 flex flex-col gap-4 justify-center rounded-lg">
          <h1 className="font-semibold font-sanam-deklen tracking-widest text-2xl text-center dark:text-white">
            {teamInfo?.data?.name} Team Retro List
          </h1>
        </div>
      </main>
    </>
  )
}

export default RetroListPage
