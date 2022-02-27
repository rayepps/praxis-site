import { Center } from 'src/components/Layout'
import { Pagination } from 'evergreen-ui'

export default function PaginationBar({
  total,
  page,
  pageSize,
  onPageChange
}: {
  total: number
  page: number
  pageSize: number
  onPageChange: (newPage: number) => void
}) {
  const totalPages = Math.ceil(total / pageSize)
  const onNext = () => {
    onPageChange(page + 1)
  }
  const onPrevious = () => {
    onPageChange(page - 1)
  }
  const onChange = (newPage: number) => {
    onPageChange(newPage)
  }
  return (
    <Center className="py-4">
      <Pagination
        page={page}
        totalPages={totalPages}
        onNextPage={onNext}
        onPreviousPage={onPrevious}
        onPageChange={onChange}
      />
    </Center>
  )
}
