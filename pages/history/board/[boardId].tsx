import {BoardType} from '@prisma/client'
import moment from 'moment'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {useEffect, useMemo, useState} from 'react'
import {QueryClient, useQueryClient} from 'react-query'
import {toast} from 'react-toastify'
import useBoardById from '../../../api/query/board/useBoardById'
import useCommentHistory from '../../../api/query/board/useCommentHistory'
import useCommentList from '../../../api/query/board/useCommentList'
import retrospectiveService from '../../../api/request/retrospective'
import JoinBoardForm from '../../../components/forms/JoinBoardForm'
import NormalInput from '../../../components/NormalInput'

const HistoryByIdPage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const {boardId} = router.query
  const {
    data: boardInfo,
    isLoading,
    isError: isBoardError,
    error: boardError,
  } = useBoardById(boardId ? boardId?.toString() : '')
  const [filterType, setFilterType] = useState<BoardType>('GOOD')

  const {data: retroItemList} = useCommentList(
    boardId ? boardId?.toString() : ''
  )
  const [commentingItem, setCommentingItem] = useState<{
    id: string
    comment: string
  } | null>(null)

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (commentingItem) {
        await retrospectiveService
          .commentHistoryRetrospective(
            commentingItem!.id,
            commentingItem!.comment
          )
          .then(() => {
            toast.success('Comment has been save')
            queryClient.invalidateQueries('get-board-comment-list')
          })
      }
    }, 1000)

    return () => clearTimeout(debounce)
  }, [commentingItem, queryClient])

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
            <header className="text-xl flex flex-col md:flex-row justify-between pb-6 items-center">
              <div className="flex  p-2 bg-slate-700 items-center gap-2 rounded-md text-white">
                {Object.keys(BoardType).map((key, idx) => {
                  const val: BoardType =
                    BoardType[key as keyof typeof BoardType]
                  return (
                    <span
                      key={key}
                      className={`${
                        filterType === val && 'bg-slate-500'
                      }  cursor-pointer px-3 hover:bg-slate-400 rounded-md`}
                      onClick={() => setFilterType(val)}
                    >
                      {val}
                    </span>
                  )
                })}
              </div>
              <div>
                total{' '}
                {
                  retroItemList?.retroItem.filter(
                    (item: any) => item.type === filterType
                  ).length
                }{' '}
                items
              </div>
            </header>

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
                  retroItemList.retroItem
                    .filter((item: any) => item.type === filterType)
                    .map((item: any) => (
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
                          {boardInfo.isOwner ? (
                            <NormalInput
                              type="text"
                              placeHolder="comment..."
                              onChange={(e) => {
                                setCommentingItem({
                                  id: item.id,
                                  comment: e.target.value,
                                })
                              }}
                              size="sm"
                              defaultValue={item.comment ?? ''}
                            />
                          ) : (
                            <>{item.comment ?? ''}</>
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  )
}

export default HistoryByIdPage
