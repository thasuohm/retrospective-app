import {useSpring, a} from '@react-spring/web'
import React, {ReactNode} from 'react'
import Button from '../Button'

const ConfirmModal = ({
  head,
  children,
  onSubmit,
  onCancel,
  onShow,
}: {
  head: string
  children: ReactNode
  onSubmit: () => void
  onCancel: () => void
  onShow: boolean
}) => {
  const fadeModal = useSpring({
    y: onShow ? 0 : -1000,
    opacity: onShow ? 0.4 : 0,
  })

  const slideModal = useSpring({
    y: onShow ? 200 : -500,
    transform: 'translateX(-50%)',
  })

  return (
    <>
      <>
        <a.div
          style={fadeModal}
          className="fixed w-screen h-screen bg-gray-900 top-0 left-0 z-10"
        ></a.div>
        <a.div
          style={slideModal}
          className="absolute left-1/2 z-20 bg-gray-300 p-6 rounded-lg max-w-2xl w-full border-solid flex flex-col gap-4"
        >
          <header className="text-2xl font-bold text-center">{head}</header>
          <section className="font-xl font-semibold">{children}</section>
          <footer className="flex gap-2 justify-center w-full">
            <Button
              type="button"
              style="cancel"
              size="md"
              onClick={onCancel}
              customStyle="w-full"
            >
              Cancel
            </Button>
            <Button
              type="button"
              style="secondary"
              applyDark={true}
              size="md"
              onClick={onSubmit}
              customStyle="w-full"
            >
              Confirm !!
            </Button>
          </footer>
        </a.div>
      </>
    </>
  )
}

export default ConfirmModal
