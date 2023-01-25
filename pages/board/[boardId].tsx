import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import useBoardById from '../../api/query/board/useBoardById'
import Button from '../../components/Button'

const BoardPage = (props: any) => {
  const {boardId} = props

  const {data: boardInfo} = useBoardById(boardId)

  const submitForm = () => {}

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

        <form action="" className="flex flex-col gap-3 font-semibold mt-8">
          <label htmlFor="" className="flex flex-col gap-2">
            Good :)
            <input type="text" placeholder="" />
          </label>

          <label htmlFor="" className="flex flex-col gap-2">
            Bad T^T
            <input type="text" placeholder="" />
          </label>

          <label htmlFor="" className="flex flex-col gap-2">
            Try _/|\_
            <input type="text" placeholder="" />
          </label>

          <Button
            onClick={submitForm}
            type="submit"
            style="secondary"
            size="md"
            customStyle="font-semibold mt-12"
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
