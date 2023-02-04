import {Team} from '@prisma/client'
import {useTransition, a} from '@react-spring/web'
import {GetStaticPaths, GetStaticProps} from 'next'
import {useSession} from 'next-auth/react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {useQueryClient} from 'react-query'
import {toast} from 'react-toastify'
import useBoardByTeam from '../../api/query/board/useBoardByTeam'
import Button from '../../components/Button'
import RetroBoardCard from '../../components/cards/RetroBoardCard'
import NotFoundBox from '../../components/NotFoundBox'
import {useSocket} from '../../contexts/socket'
import useBooping from '../../hooks/animation/useBooping'
import useSlide from '../../hooks/animation/useSlide'
import prisma from '../../prisma'

const RetroListPage = (props: any) => {
  const {teamInfo} = props
  const router = useRouter()
  const {data: boardList} = useBoardByTeam(teamInfo?.id)
  const {data: session} = useSession()
  const queryClient = useQueryClient()

  const {socket}: any = useSocket()
  const slideUp = useSlide({
    fromY: 100,
    toY: 0,
    customFrom: {opacity: 0},
    customTo: {opacity: 1},
  })
  const cardTransition = useTransition(boardList?.retroBoard, {
    from: {opacity: 0, y: 100},
    enter: {opacity: 1, y: 0},
    trail: 100,
  })

  const slideIn = useSlide({
    fromY: 50,
    toY: 0,
    customFrom: {opacity: 0},
    customTo: {opacity: 1},
  })

  const booping = useBooping({})

  useEffect(() => {
    if (socket) {
      socket.on('refetchBoardList', (data: string) => {
        queryClient.invalidateQueries('get-board-by-team')
      })

      socket.on('boardUpdate', ({teamId}: {teamId: string}) => {
        if (teamInfo?.id === teamId) {
          queryClient.invalidateQueries('get-board-by-team')
        }
      })
    }

    return () => {
      socket?.off('connect')
      socket?.off('disconnect')
    }
  }, [queryClient, socket, teamInfo?.id])

  if (!teamInfo) {
    return <p>Loading...</p>
  }

  const {name, description} = teamInfo

  const createRetro = () => {
    if (!session) {
      return toast.error('Please Login')
    }

    router.push('/board/create')
  }

  return (
    <>
      <Head>
        <title>Team - Retro Creator</title>
      </Head>
      <a.main
        style={slideUp}
        className="bg-slate-100 dark:bg-slate-800 flex flex-col gap-3 max-w-3xl mt-52 lg:mt-28 mx-auto p-4 rounded-2xl duration-150 dark:text-white"
      >
        <a.div
          style={slideIn}
          className=" flex flex-col gap-2 justify-center rounded-lg"
        >
          <a.h1
            style={booping}
            className="font-semibold font-sanam-deklen tracking-widest text-2xl text-center "
          >
            {name} Team Retro List
          </a.h1>
          <span className="font-semibold text-lg tracking-widest break-all">
            What we do - {description}
          </span>
        </a.div>
        <div className="w-full flex justify-between items-center">
          {boardList && boardList?.retroBoardCount > 0 ? (
            <span>Found {boardList?.retroBoardCount} Boards</span>
          ) : (
            <span>Not Found Board</span>
          )}

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

        {boardList?.retroBoard && boardList?.retroBoard.length > 0 ? (
          <div className="flex flex-wrap gap-4 mx-auto w-full">
            {cardTransition((props, item) => (
              <a.div
                style={props}
                key={item?.id}
                className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33%-0.55rem)]"
              >
                <RetroBoardCard retroBoard={item} />
              </a.div>
            ))}
          </div>
        ) : (
          <NotFoundBox>No Board Opening Now~</NotFoundBox>
        )}
      </a.main>
    </>
  )
}

export default RetroListPage

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context

  const teamId: string = params!.teamId as string

  const teamInfo = await prisma.team.findUnique({
    where: {id: teamId?.toString()},
  })

  if (!teamInfo) {
    return {
      notFound: true,
    }
  }

  return {
    props: {teamInfo},
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allTeam = await prisma.team.findMany().catch(() => [])

  const staticPath = allTeam?.map((team: Team) => {
    return {params: {teamId: team?.id}}
  })

  return {
    paths: staticPath,
    fallback: true,
  }
}
