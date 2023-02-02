import React, {ReactNode} from 'react'
import Button from '../Button'

const ConfirmModal = ({
  head,
  children,
  onSubmit,
  onCancel,
}: {
  head: string
  children: ReactNode
  onSubmit: () => void
  onCancel: () => void
}) => {
  return (
    <>
      <div className="fixed w-screen h-screen bg-gray-900 top-0 left-0 z-10 opacity-40"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-gray-300 p-6 rounded-lg max-w-2xl w-full border-solid flex flex-col gap-4">
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
      </div>
    </>
  )
}

export default ConfirmModal
