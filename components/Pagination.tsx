import React from 'react'

export type PaginationType = {
  currentPage: number
  totalPage: number
  onPageClick: () => void
  pageRange: number
}

const Pagination: React.FC<PaginationType> = (props) => {
  const {currentPage, totalPage, onPageClick, pageRange} = props

  return <div>Pagination</div>
}

export default Pagination
