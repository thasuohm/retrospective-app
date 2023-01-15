import {GetServerSideProps} from 'next'
import Head from 'next/head'
import retrospectiveService from '../../api/request/retrospective'
import {Team} from '../../types/team'

const RetroListPage = (props: any) => {
  const {name, description, code, id} = props.team

  return (
    <>
      <Head>
        <title>Team - Retro Creator</title>
      </Head>
      <main className="bg-slate-100 dark:bg-slate-800 gap-4 max-w-3xl mt-52 lg:mt-28 mx-auto px-3 lg:px-0 rounded-2xl duration-150">
        <div className="p-4 flex flex-col gap-4 justify-center rounded-lg">
          <h1 className="font-semibold font-sanam-deklen tracking-widest text-2xl text-center dark:text-white">
            {name} Team Retro List
          </h1>
        </div>
      </main>
    </>
  )
}

export default RetroListPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const teamCode: string = context.query.teamCode as string
  const team = await retrospectiveService.getTeam(teamCode!).then((res) => {
    return res?.data
  })

  if (!team) {
    return {
      notFound: true,
    }
  }

  return {props: {team}}
}
