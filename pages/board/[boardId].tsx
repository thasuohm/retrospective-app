import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import useBoardById from '../../api/query/board/useBoardById'
import Button from '../../components/Button'

const BoardPage = (props: any) => {
  const {boardId} = props

  const {data: boardInfo} = useBoardById(boardId)

  const submitForm = () => {}

  const pageTitle = boardInfo?.retroBoard.title + ' - Retrospective Creator'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <main className="bg-slate-100 dark:bg-slate-800 flex flex-col gap-3 max-w-3xl mt-52 lg:mt-28 mx-auto p-4 rounded-2xl duration-150 dark:text-white">
        <h1> {boardInfo?.retroBoard.title}</h1>

        <Button onClick={submitForm} type="submit" style="secondary" size="md">
          Send It!
        </Button>
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
