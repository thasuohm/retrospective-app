import {BoardType, Team} from '@prisma/client'
import {GetServerSideProps} from 'next'
import Head from 'next/head'
import {useEffect, useMemo, useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import useBoardById from '../../api/query/board/useBoardById'
import useSendBoard from '../../api/query/board/useSendBoard'
import useTeamList from '../../api/query/team/useTeamList'
import useUser from '../../api/query/user/useUser'
import Button from '../../components/Button'
import Input from '../../components/Input'
import {RetroItemCreate} from '../../types/request'
import Select from 'react-select'
import {ReactSelectState} from '../../types/components'
import {useSession} from 'next-auth/react'
import useUpdateBoard from '../../api/query/board/useUpdateBoard'
import moment from 'moment'
import {useRouter} from 'next/router'
import {unstable_getServerSession} from 'next-auth'
import {authOptions} from '../api/auth/[...nextauth]'
import useTimer from '../../hooks/useTimer'
import ConfirmModal from '../../components/Modal/ConfirmModal'
import useCloseBoard from '../../api/query/board/useCloseBoard'
import JoinBoardForm from '../../components/forms/JoinBoardForm'
import {useSocket} from '../../contexts/socket'
import {useQueryClient} from 'react-query'
import LinkButton from '../../components/LinkButton'

const BoardPage = () => {
  const router = useRouter()
  const {boardId} = router.query

  const {data: session} = useSession()

  const {register, handleSubmit, reset} = useForm()
  const {data: user} = useUser(session ? true : false)
  const {
    data: boardInfo,
    isLoading: isLoadingBoard,
    isError: isBoardError,
    error: boardError,
  } = useBoardById(boardId ? boardId?.toString() : '')

  const {mutate: sendBoard} = useSendBoard()
  const {data: teams} = useTeamList()
  const {mutate: updateBoard} = useUpdateBoard()
  const {register: ownerRegister, handleSubmit: ownerHandleSubmit} =
    useForm<any>()
  const [selectedTeam, setSelectedTeam] = useState<ReactSelectState | null>()
  const {timer, timeOut} = useTimer(boardInfo ? boardInfo!.timeLeft : 0)
  const [closeBoardModal, setCloseBoardModal] = useState<boolean>(false)
  const {mutate: closeBoard} = useCloseBoard()
  const queryClient = useQueryClient()
  const {socket}: any = useSocket()

  useEffect(() => {
    if (teams && boardInfo?.retroBoard.teamId && boardInfo?.isOwner) {
      const team = teams.find(
        (item) => boardInfo?.retroBoard.teamId === item.id
      )

      if (team) {
        setSelectedTeam({value: team.id, label: team.name})
      }
    }
  }, [teams, boardInfo?.retroBoard.teamId, boardInfo?.isOwner])

  useEffect(() => {
    if (socket) {
      socket.on(
        'boardUpdate',
        ({boardId, alert}: {boardId: string; alert?: boolean}) => {
          if (boardId === boardInfo?.retroBoard.id) {
            queryClient.invalidateQueries('get-board-by-id')
            if (alert) {
              toast.success('Board has been Update')
            }
          }
        }
      )
    }

    return () => {
      socket?.off('connect')
      socket?.off('disconnect')
    }
  }, [socket, queryClient, boardInfo?.retroBoard.id])

  const teamListOption = useMemo(() => {
    if (boardInfo?.isOwner) {
      return teams?.map((item: Team) => {
        return {value: item.id, label: item.name}
      })
    }
  }, [boardInfo?.isOwner, teams])

  if (isLoadingBoard) {
    return <div className="">Loading...</div>
  }

  if (isBoardError && boardError.response) {
    if (boardError.response.status === 401) {
      return <JoinBoardForm boardId={boardId ? boardId?.toString() : ''} />
    }
  }

  const submitForm = (data: any) => {
    if (!boardInfo.retroBoard.opening) {
      return toast.error('This Board was Close :(')
    }

    const retroItemList: RetroItemCreate[] = []

    Object.keys(data).forEach((key) => {
      if (data[key] !== '') {
        retroItemList.push({
          type: BoardType[key as keyof typeof BoardType],
          content: data[key],
          senderId: user!.id,
          boardId: boardId ? boardId?.toString() : '',
        })
      }
    })

    if (retroItemList.length > 0) {
      sendBoard({boardId: boardId ? boardId?.toString() : '', retroItemList})
    } else {
      toast.error('Please add some of your comment')
    }
    reset()
  }

  const submitUpdate = (data: {endDate: string; password: string}) => {
    const {endDate, password} = data

    updateBoard({
      boardId: boardId ? boardId?.toString() : '',
      boardInfo: {endDate, password, teamId: selectedTeam!.value},
    })
  }

  const closeBoardSubmit = () => {
    if (boardId) {
      closeBoard(boardId?.toString())
    } else {
      toast.error('Board not found')
    }
    setCloseBoardModal(false)
  }

  const pageTitle = boardInfo?.retroBoard?.title
    ? boardInfo?.retroBoard?.title + ' - Retrospective Creator'
    : 'Retrospective Creator'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {closeBoardModal && (
        <ConfirmModal
          head="Close Board~"
          onSubmit={closeBoardSubmit}
          onCancel={() => {
            setCloseBoardModal(false)
          }}
        >
          Are you sure to Close this Board ? <br />
          <span className="text-red-600">
            *Other people will unable to send more comment
          </span>
        </ConfirmModal>
      )}
      <main className="bg-slate-100 dark:bg-slate-800 flex flex-col gap-3 max-w-3xl mt-52 lg:mt-28 mx-auto p-4 rounded-2xl duration-150 dark:text-white">
        <header className="flex flex-col md:flex-row justify-between gap-2">
          <h1 className="text-2xl md:w-3/4 break-words font-semibold">
            {boardInfo?.retroBoard.title}
          </h1>
          <div className="flex md:flex-col md:w-1/4 gap-2 font-semibold">
            <div className="flex gap-1 items-center">
              <div className="w-1/2">time left</div>{' '}
              <div
                className={`text-lg font-bold  text-white px-2 rounded-lg w-1/2 text-center ${
                  !timeOut ? 'bg-green-400' : 'bg-red-600 '
                }`}
              >
                {!timeOut ? timer : 'TimeOut'}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-1/2">total item</div>{' '}
              <div className="text-lg bg-slate-300 dark:bg-slate-900 px-2 rounded-lg w-1/2 text-center">
                {boardInfo?.retroItemCount}
              </div>
            </div>
          </div>
        </header>
        <section className="flex flex-col gap-2 font-semibold">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex gap-2">
              <div>Creator</div>{' '}
              <div className="text-lg bg-slate-300 dark:bg-slate-900 px-3 rounded-lg">
                {boardInfo?.retroBoard.creator.email}
              </div>
            </div>
            <div className="flex gap-2">
              <div>Board Status</div>{' '}
              {boardInfo?.retroBoard.opening ? (
                <div className="text-lg dark:bg-slate-900 px-3 rounded-lg bg-green-600 text-white">
                  OPENING
                </div>
              ) : (
                <div className="text-lg dark:bg-slate-900 px-3 rounded-lg bg-red-600 text-white">
                  CLOSED
                </div>
              )}
            </div>
          </div>
          {boardInfo?.isOwner ? (
            <form
              onSubmit={ownerHandleSubmit(submitUpdate)}
              className="flex flex-col md:flex-row flex-wrap gap-2 items-start md:items-end mt-6 p-3 bg-slate-300 dark:bg-slate-700 rounded-md"
            >
              <h3 className="text-lg font-semibold">Update your Board here</h3>
              <div className="w-full">Team</div>
              {selectedTeam && (
                <Select
                  id="team-select"
                  defaultValue={selectedTeam}
                  onChange={setSelectedTeam}
                  options={teamListOption}
                  instanceId="team-select"
                  className="w-full
                  "
                />
              )}
              <Input
                label="Close time"
                type="datetime-local"
                placeHolder="update close time..."
                register={ownerRegister}
                registerLabel="endDate"
                defaultValues={
                  boardInfo?.retroBoard?.endDate?.substring(0, 16) ?? ''
                }
              />
              <Input
                label="Password"
                type="password"
                placeHolder="update password..."
                register={ownerRegister}
                registerLabel="password"
                autoComplete="current-password"
                defaultValues={boardInfo?.retroBoard?.password}
              />
              <Button type="submit" style="primary" applyDark={true} size="md">
                Update Board
              </Button>
            </form>
          ) : (
            <div className="flex flex-col md:flex-row gap-3 mt-1 duration-150">
              <div className="flex gap-2 items-center">
                <div>Team </div>{' '}
                <div className="text-lg bg-slate-300 dark:bg-slate-900 px-2 rounded-lg">
                  {boardInfo?.retroBoard.team.name}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div>End At</div>{' '}
                <div className="text-lg bg-slate-300 dark:bg-slate-900 px-2 rounded-lg">
                  {moment(boardInfo?.retroBoard.endDate).format(
                    'MMMM Do YYYY, h:mm a'
                  ) ?? 'This web gone XD'}
                </div>
              </div>
            </div>
          )}
        </section>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-3 font-semibold mt-8"
        >
          <Input
            label="Good :)"
            type="text"
            placeHolder="tell about good thing..."
            register={register}
            registerLabel="GOOD"
          />

          <Input
            label="Bad T^T"
            type="text"
            placeHolder="tell about bad thing..."
            register={register}
            registerLabel="BAD"
          />

          <Input
            label="Try _/|\_"
            type="text"
            placeHolder="what you want to do..."
            register={register}
            registerLabel="TRY"
          />

          {!timeOut && boardInfo.retroBoard.opening ? (
            <div className="flex flex-col md:flex-row gap-2 items-center">
              {boardInfo?.isOwner && (
                <Button
                  type="button"
                  style="cancel"
                  size="md"
                  customStyle="font-semibold mt-12 w-full"
                  applyDark={true}
                  isDisabled={!boardInfo.retroBoard.opening}
                  onClick={() => setCloseBoardModal(true)}
                >
                  Close Board
                </Button>
              )}

              <Button
                type="submit"
                style="primary"
                size="md"
                customStyle="font-semibold mt-12 w-full"
                applyDark={true}
                isDisabled={timeOut || !boardInfo.retroBoard.opening}
              >
                Send It!
              </Button>
            </div>
          ) : (
            <LinkButton
              href={`/history/board/${boardInfo?.retroBoard?.id}`}
              style="primary"
              size="md"
              customStyle="font-semibold mt-12"
              applyDark={true}
            >
              See Result!!
            </LinkButton>
          )}
        </form>
      </main>
    </>
  )
}

export default BoardPage

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/?requireAuth=true',
      },
    }
  }

  return {
    props: {},
  }
}
