import {GetServerSideProps} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import retrospectiveService from '../../api/request/retrospective'
import Button from '../../components/Button'
import RetroBoardCard from '../../components/cards/RetroBoardCard'

const RetroListPage = (props: any) => {
  const {name, description, code, id} = props.team
  const router = useRouter()

  const createRetro = () => {
    router.push('/create-retro')
  }

  return (
    <>
      <Head>
        <title>Team - Retro Creator</title>
      </Head>
      <main className="bg-slate-100 dark:bg-slate-800 flex flex-col gap-3 max-w-3xl mt-52 lg:mt-28 mx-auto p-4 rounded-2xl duration-150 dark:text-white">
        <div className=" flex flex-col gap-2 justify-center rounded-lg">
          <h1 className="font-semibold font-sanam-deklen tracking-widest text-2xl text-center ">
            {name} Team Retro List
          </h1>
          <span className="font-semibold text-lg tracking-widest break-all">
            What we do - {description}
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          <span>Found 10 Boards</span>
          <Button
            style="primary"
            onClick={createRetro}
            type="button"
            size="sm"
            isDisabled={false}
          >
            <span className="font-sanam-deklen tracking-widest font-semibold">
              Create new Retro
            </span>
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mx-auto w-full">
          <RetroBoardCard />
          <RetroBoardCard />
          <RetroBoardCard />
          <RetroBoardCard />
        </div>
      </main>
    </>
  )
}

export default RetroListPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const teamCode: string = context.query.teamCode as string
  const team = await retrospectiveService
    .getTeam(teamCode!)
    .then((res) => {
      return res?.data
    })
    .catch((err) => {
      if (err.status === 404) {
        return null
      }
    })

  if (!team) {
    return {
      notFound: true,
    }
  }

  return {props: {team}}
}