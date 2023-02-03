import {RetroBoard, Team} from '@prisma/client'
import {GetServerSideProps, GetStaticPaths, GetStaticProps} from 'next'
import {useSession} from 'next-auth/react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import useClosedBoardByTeam from '../../api/query/board/useClosedBoardByTeam'
import Button from '../../components/Button'
import RetroBoardCard from '../../components/cards/RetroBoardCard'
import Input from '../../components/Input'
import NotFoundBox from '../../components/NotFoundBox'
import {monthsArrObj} from '../../config/months'
import prisma from '../../prisma'
import Select from 'react-select'
import moment from 'moment'
import {useState} from 'react'
import {ReactSelectState} from '../../types/components'
import {dehydrate, QueryClient, useQuery} from 'react-query'
import retrospectiveService from '../../api/request/retrospective'

const RetroListPage = (props: {query: any; teamInfo: Team}) => {
  const {query, teamInfo} = props
  const teamId = query[0]
  const year = query[1]
  const month = query[2]
  const page = query[3]

  const router = useRouter()
  const {data: boardList, refetch} = useQuery('get-close-board-by-team', () =>
    retrospectiveService
      .getClosedRetroBoardByTeam(teamId, month, year, page)
      .then((res) => {
        console.log(teamId, month, year, page)
        return {
          retroBoard: res.data.retroBoard as RetroBoard[],
          retroBoardCount: res?.data?.retroBoardCount as number,
        }
      })
  )

  console.log(boardList)

  const {register, handleSubmit} = useForm()
  const [selectedMonth, setSelectedMonth] = useState<ReactSelectState | null>({
    label: 'month...',
    value: '',
  })

  if (!teamInfo) {
    return <p>Loading...</p>
  }

  const {name, description} = teamInfo

  const monthsArrObjSelect = [{value: '', label: 'month...'}, ...monthsArrObj]

  const filterBoard = (data: any) => {
    router.push(
      {
        pathname: `/history/${teamInfo.id}/${
          !data.year || data.year.length < 1 ? 'any' : data.year
        }/${
          !selectedMonth!.value || selectedMonth!.value.length < 1
            ? ''
            : selectedMonth!.value
        }`,
      },
      undefined,
      {shallow: false}
    )
  }

  return (
    <>
      <Head>
        <title>Closed Board Team - Retro Creator</title>
      </Head>
      <main className="bg-slate-100 dark:bg-slate-800 flex flex-col gap-3 max-w-3xl mt-52 lg:mt-28 mx-auto p-4 rounded-2xl duration-150 dark:text-white">
        <div className=" flex flex-col gap-2 justify-center rounded-lg">
          <h1 className="font-semibold font-sanam-deklen tracking-widest text-2xl text-center ">
            Closed Board From {name} Team
          </h1>
          <span className="font-semibold text-lg tracking-widest break-all">
            What we do - {description}
          </span>
          <div className="">Filter By</div>
          <form
            className="flex flex-col md:flex-row gap-2 md:items-center justify-between"
            onSubmit={handleSubmit(filterBoard)}
          >
            <div className="flex flex-row gap-2 items-center">
              <Select
                id="month-select"
                onChange={setSelectedMonth}
                options={monthsArrObjSelect}
                instanceId="month-select"
                className="text-black w-1/2"
                placeholder="month..."
              />

              <Input
                type="number"
                defaultValues={query[1] ?? moment().year()}
                register={register}
                registerCustom={{maxLength: 4}}
                registerLabel="year"
                placeHolder="year..."
                size="sm"
                customStyle="w-1/2"
              />
            </div>
            <Button type="submit" size="md" style="primary" applyDark={true}>
              Filter Board
            </Button>
          </form>
        </div>
        <div className="w-full flex justify-between items-center">
          {boardList && boardList?.retroBoardCount > 0 ? (
            <span>Found {boardList?.retroBoardCount} Boards</span>
          ) : (
            <span>Not Found Board</span>
          )}
        </div>

        {boardList?.retroBoard && boardList?.retroBoard.length > 0 ? (
          <div className="flex flex-wrap gap-4 mx-auto w-full">
            {boardList?.retroBoard?.map((board) => (
              <RetroBoardCard key={board.id} retroBoard={board} />
            ))}
          </div>
        ) : (
          <NotFoundBox>No Close Board Found~</NotFoundBox>
        )}
      </main>
    </>
  )
}

export default RetroListPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.slug
  const teamId = query![0] as string
  const year = query![1] as string
  const month = query![2] as string
  const page = +query![3] as number

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('get-close-board-by-team', () =>
    retrospectiveService
      .getClosedRetroBoardByTeam(teamId, month, year, page)
      .then((res) => {
        return {
          retroBoard: res.data.retroBoard as RetroBoard[],
          retroBoardCount: res?.data?.retroBoardCount as number,
        }
      })
  )

  const teamInfo = await prisma.team.findUnique({
    where: {id: teamId?.toString()},
  })

  if (!teamInfo) {
    return {
      notFound: true,
    }
  }

  return {
    props: {dehydratedState: dehydrate(queryClient), query, teamInfo},
  }
}
