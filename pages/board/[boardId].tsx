import {BoardType, RetroItem} from '@prisma/client'
import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import {useForm} from 'react-hook-form'
import useBoardById from '../../api/query/board/useBoardById'
import useUser from '../../api/query/user/useUser'
import Button from '../../components/Button'
import Input from '../../components/Input'

const BoardPage = (props: any) => {
  const {boardId} = props
  const {register, handleSubmit, reset} = useForm()
  const {data: user} = useUser()
  const {data: boardInfo} = useBoardById(boardId)

  const submitForm = (data: any) => {
    const retroItemList: RetroItem[] = []

    Object.keys(data).forEach((key) => {
      if (data[key] !== '') {
        retroItemList.push({
          type: BoardType[key as keyof typeof BoardType],
          content: data[key],
          senderId: user!.id,
          boardId: boardId,
        })
      }
    })

    console.log(retroItemList)

    reset()
  }

  const pageTitle = boardInfo?.retroBoard.title
    ? boardInfo?.retroBoard.title + ' - Retrospective Creator'
    : 'Retrospective Creator'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <main className="bg-slate-100 dark:bg-slate-800 flex flex-col gap-3 max-w-3xl mt-52 lg:mt-28 mx-auto p-4 rounded-2xl duration-150 dark:text-white">
        <header className="flex flex-col md:flex-row justify-between gap-2">
          <h1 className="text-2xl md:w-3/4 break-words font-semibold">
            {boardInfo?.retroBoard.title}
          </h1>
          <div className="flex md:flex-col md:w-1/4 gap-2  font-semibold">
            <div className="flex gap-1 items-center">
              <div className="w-1/2">time left</div>{' '}
              <div className="text-lg bg-slate-300 dark:bg-slate-900 px-2 rounded-lg w-1/2 text-center">
                20:00
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-1/2">total item</div>{' '}
              <div className="text-lg bg-slate-300 dark:bg-slate-900 px-2 rounded-lg w-1/2 text-center">
                50
              </div>
            </div>
          </div>
        </header>
        <section className="flex flex-col gap-2 font-semibold">
          <div className="flex gap-2 items-center">
            <div>Creator</div>{' '}
            <div className="text-lg bg-slate-300 dark:bg-slate-900 px-3 rounded-lg">
              {boardInfo?.retroBoard.creator.email}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div>Close At </div>{' '}
            <div className="text-lg bg-slate-300 dark:bg-slate-900 px-2 rounded-lg">
              {boardInfo?.retroBoard.endDate ?? 'This web gone XD'}
            </div>
          </div>
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

          <Button
            type="submit"
            style="primary"
            size="md"
            customStyle="font-semibold mt-12"
            applyDark={true}
          >
            Send It!
          </Button>
        </form>
      </main>
    </>
  )
}

export default BoardPage

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context

  const boardId: string = params!.boardId as string

  if (!boardId) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      boardId,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
