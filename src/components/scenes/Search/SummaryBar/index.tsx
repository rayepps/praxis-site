import * as t from 'src/types'
import { Split } from 'src/components/Layout'

export default function SummaryBar({
  total,
  pageNumber,
  pageSize,
  orderBy,
  orderAs,
  onOrderChange
}: {
  total: number
  pageNumber: number
  pageSize: number
  orderBy: t.OrderBy
  orderAs: t.OrderAs
  onOrderChange: (orderBy: t.OrderBy, orderAs: t.OrderAs) => void
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
    <Split className="pt-4">
      <div className="grow flex items-center">
        <span className="font-bold mr-2">Results:</span>
        <span>
          {start}-{Math.min(start + pageSize, total)} of {total}
        </span>
      </div>
      <div>
        <span className="font-bold mr-2">Sort:</span>
        <select value={value} onChange={e => onChange(e.target.value)}>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </Split>
  )
}
