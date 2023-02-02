import {RetroItem} from '@prisma/client'
import moment from 'moment'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import useBoardById from '../../../api/query/board/useBoardById'
import useCommentList from '../../../api/query/board/useCommentList'
import Button from '../../../components/Button'
import JoinBoardForm from '../../../components/forms/joinBoardForm'
import Input from '../../../components/Input'

const HistoryByIdPage = () => {
  const router = useRouter()
  const {boardId} = router.query

  const {
    data: boardInfo,
    isError: isBoardError,
    error: boardError,
  } = useBoardById(boardId ? boardId?.toString() : '')

  const {data: retroItemList} = useCommentList(
    boardId ? boardId?.toString() : ''
  )

  const {register, handleSubmit} = useForm<any>()

  if (isBoardError && boardError.response) {
    if (boardError.response.status === 403) {
      return <JoinBoardForm boardId={boardId ? boardId?.toString() : ''} />
    }
  }

  const submitComment = (data: any) => {
    console.log(data)
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
            <table>
              <thead>
                <tr>
                  {!boardInfo?.retroBoard.anonymous && <th>Sender</th>}

                  <th>Content</th>
                  <th>Other</th>
                  <th>Pin</th>
                </tr>
              </thead>
              <tbody>
                {retroItemList &&
                  retroItemList.retroItem.map((item: any) => (
                    <tr key={item.id}>
                      {!boardInfo?.retroBoard.anonymous && (
                        <td>{item.sender.email ?? 'Secret'}</td>
                      )}
                      <td>{item.content}</td>
                      <td>
                        <Input
                          type="text"
                          placeHolder="comment..."
                          register={register}
                          registerLabel={item.id}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <Button type="submit" style="primary" size="md">
              Save
            </Button>
          </form>
        </section>
      </main>
    </>
  )
}

export default HistoryByIdPage
