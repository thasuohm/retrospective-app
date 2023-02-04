import {RetroBoard, Team} from '@prisma/client'
import {GetServerSideProps} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import useClosedBoardByTeam from '../../api/query/board/useClosedBoardByTeam'
import Button from '../../components/Button'
import RetroBoardCard from '../../components/cards/RetroBoardCard'
import NotFoundBox from '../../components/NotFoundBox'
import {monthsArrObj} from '../../config/months'
import prisma from '../../prisma'
import Select from 'react-select'
import moment from 'moment'
import {useState} from 'react'
import {ReactSelectState} from '../../types/components'
import {dehydrate, QueryClient} from 'react-query'
import retrospectiveService from '../../api/request/retrospective'
import useSlide from '../../hooks/animation/useSlide'
import {a, useTransition} from '@react-spring/web'
import useBooping from '../../hooks/animation/useBooping'
import {currentYear, yearArrObject} from '../../config/years'

const RetroListPage = (props: {
  teamId: string
  year: string
  month: string
  page: number
  teamInfo: Team
}) => {
  const {teamId, year, month, page, teamInfo} = props
  const slideUp = useSlide({
    fromY: 100,
    toY: 0,
    customFrom: {opacity: 0},
    customTo: {opacity: 1},
  })
  const router = useRouter()
  const {data: boardList} = useClosedBoardByTeam(teamId, year, month, page)

  const [selectedMonth, setSelectedMonth] = useState<ReactSelectState | null>({
    label: 'month...',
    value: '',
  })

  const [selectedYear, setSelectedYear] = useState<ReactSelectState | null>({
    label: 'year...',
    value: '',
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

  if (!teamInfo) {
    return <p>Loading...</p>
  }

  const {name, description} = teamInfo

  const monthsArrObjSelect = [{value: '', label: 'month...'}, ...monthsArrObj]

  const yearsArrObjSelect = [{value: '', label: 'year...'}, ...yearArrObject]

  const filterBoard = () => {
    router.push(
      {
        pathname: `/history/${teamInfo.id}/${
          !selectedYear!.value || selectedYear!.value.length < 1
            ? 'any'
            : selectedYear!.value
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
            Closed Board From {name} Team
          </a.h1>
          <span className="font-semibold text-lg tracking-widest break-all">
            What we do - {description}
          </span>
          <div className="">Filter By</div>
          <form className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <Select
                id="month-select"
                onChange={setSelectedMonth}
                options={monthsArrObjSelect}
                instanceId="month-select"
                className="text-black w-1/2"
                placeholder="month..."
                defaultValue={monthsArrObj[+month - 1]}
              />

              <Select
                id="year-select"
                onChange={setSelectedYear}
                options={yearsArrObjSelect}
                instanceId="year-select"
                className="text-black w-1/2"
                placeholder="year..."
                defaultValue={
                  {label: year, value: year} ?? {
                    label: currentYear,
                    value: currentYear,
                  }
                }
              />
            </div>
            <Button
              type="button"
              onClick={filterBoard}
              size="md"
              style="primary"
              applyDark={true}
            >
              Filter Board
            </Button>
          </form>
        </a.div>
        <div className="w-full flex justify-between items-center">
          {boardList && boardList?.retroBoardCount > 0 ? (
            <span>Found {boardList?.retroBoardCount} Boards</span>
          ) : (
            <span>Not Found Board</span>
          )}
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
          <NotFoundBox>No Close Board Found~</NotFoundBox>
        )}
      </a.main>
    </>
  )
}

export default RetroListPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.slug
  const teamId = query![0] as string
  const year = (query![1] ?? '') as string
  const month = (query![2] ?? '') as string
  const page = (+query![3] ?? 1) as number

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('get-close-board-by-team', () =>
    retrospectiveService
      .getClosedRetroBoardByTeam({teamId, month, year, page})
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
    props: {
      dehydratedState: dehydrate(queryClient),
      teamId,
      year,
      month,
      page,
      teamInfo,
    },
  }
}
