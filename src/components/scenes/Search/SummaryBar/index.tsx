import * as t from 'src/types'
import { Split } from 'src/components/Layout'
import { HiOutlineFilter } from 'react-icons/hi'

export default function SummaryBar({
  total,
  pageNumber,
  pageSize,
  orderBy,
  orderAs,
  onOrderChange,
  onToggleFilters
}: {
  total: number
  pageNumber: number
  pageSize: number
  orderBy: t.OrderBy
  orderAs: t.OrderAs
  onOrderChange: (orderBy: t.OrderBy, orderAs: t.OrderAs) => void
  onToggleFilters?: () => void
}) {
  const onChange = (key: string) => {
    const [by, as] = key.split('-') as [t.OrderBy, t.OrderAs]
    onOrderChange(by, as)
  }
  const options: { label: string; value: string }[] = [
    { label: 'Date - Today First', value: 'date-asc' },
    { label: 'Date - Today Last', value: 'date-desc' },
    { label: 'Price - Lowest First', value: 'price-asc' },
    { label: 'Price - Lowest Last', value: 'price-desc' }
  ]
  const value = `${orderBy}-${orderAs}`
  const start = (pageNumber - 1) * pageSize
  return (
    <div className="pt-4 flex flex-row items-center">
      <div className="md:hidden">
        <button className='rounded bg-slate-200 p-2 mr-4' onClick={onToggleFilters}>
          <HiOutlineFilter size={24} className='text-slate-600' />
        </button>
      </div>
      <div className="grow flex items-center">
        <span className="font-bold mr-2 hidden md:inline">Results:</span>
        <span>
          {start}-{Math.min(start + pageSize, total)} of {total}
        </span>
      </div>
      <div>
        <span className="font-bold mr-2 hidden md:inline">Sort:</span>
        <select value={value} onChange={e => onChange(e.target.value)}>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
