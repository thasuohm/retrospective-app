import moment from 'moment'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import useBoardById from '../../../api/query/board/useBoardById'
import useCommentList from '../../../api/query/board/useCommentList'
import Button from '../../../components/Button'
import JoinBoardForm from '../../../components/forms/JoinBoardForm'
import Input from '../../../components/Input'

const HistoryByIdPage = () => {
  const router = useRouter()
  const {boardId} = router.query

  const {
    data: boardInfo,
    isLoading,
    isError: isBoardError,
    error: boardError,
  } = useBoardById(boardId ? boardId?.toString() : '')

  const {data: retroItemList} = useCommentList(
    boardId ? boardId?.toString() : ''
  )

  const {register, handleSubmit} = useForm<any>()
  const submitComment = (data: any) => {
    console.log(data)
  }

  if (isBoardError && boardError.response) {
    if (boardError.response.status === 401) {
      return <JoinBoardForm boardId={boardId ? boardId?.toString() : ''} />
    }
    return <div>Loading...</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Retro Board History - Retrospective creator</title>
      </Head>
      <main className="bg-slate-100 dark:bg-slate-800 flex flex-col gap-3 max-w-4xl mt-52 lg:mt-28 mx-auto p-4 rounded-2xl duration-150 dark:text-white">
        <h1 className="text-2xl md:w-3/4 break-words font-semibold">
          {boardInfo?.retroBoard.title}
        </h1>

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

          <div className="flex flex-wrap gap-3 mt-1 duration-150">
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

          <div className="mt-8">
            <header className="text-xl">See what we got</header>
          </div>
          <form onSubmit={handleSubmit(submitComment)}>
            <table className="w-full">
              <thead>
                <tr className="hidden md:table-row">
                  {!boardInfo?.retroBoard.anonymous && <th>Sender</th>}
                  <th>Content</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {retroItemList &&
                  retroItemList.retroItem.map((item: any) => (
                    <tr
                      key={item.id}
                      className="flex flex-col gap-1 md:table-row border-solid border-slate-200 dark:border-slate-700 border-b-2"
                    >
                      {!boardInfo?.retroBoard.anonymous && (
                        <td className="w-full md:w-1/3 py-2">
                          <span className="md:hidden text-xl font-bold text-red-600 mr-2">
                            Sender:
                          </span>
                          {item.sender.email ?? 'Secret'}
                        </td>
                      )}
                      <td
                        className={` w-full
                          ${
                            boardInfo?.retroBoard.anonymous
                              ? 'md:w-1/2'
                              : 'md:w-1/3'
                          } py-2 tracking-wider
                        `}
                      >
                        <span className="md:hidden text-xl font-bold text-red-600 mr-2">
                          Content:
                        </span>{' '}
                        {item.content}
                      </td>
                      <td className="w-full md:w-1/3 py-2">
                        <Input
                          type="text"
                          placeHolder="comment..."
                          register={register}
                          registerLabel={item.id}
                          size="sm"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </form>
        </section>
      </main>
    </>
  )
}

export default HistoryByIdPage
