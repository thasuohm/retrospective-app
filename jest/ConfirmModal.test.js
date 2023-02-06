import React from 'react'
import {render} from '@testing-library/react'
import ConfirmModal from '../components/Modal/ConfirmModal'
import '@testing-library/jest-dom'

it('should show correct Modal', async () => {
  let data = {
    head: 'test',
    onSubmit: () => {
      console.log('test success')
      data.onShow = false
    },
    onCancel: () => (data.onShow = false),
    onShow: true,
  }

  const confirmModal = render(
    <ConfirmModal
      head={data.test}
      onSubmit={data.onSubmit}
      onCancel={data.onCancel}
      onShow={data.onShow}
    >
      Hello Testing
    </ConfirmModal>
  )

  expect(confirmModal.getAllByText("Hello Testing"))
})
