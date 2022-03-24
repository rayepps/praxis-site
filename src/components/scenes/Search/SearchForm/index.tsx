import _ from 'radash'
import { useEffect, useState } from 'react'
import * as t from 'src/types'
import { US_STATES } from 'src/const'
import { HiX } from 'react-icons/hi'
import parseDate from 'date-fns/parse'
import formatDate from 'date-fns/format'
import endOfMonth from 'date-fns/endOfMonth'
import { Checkbox, SelectMenu, Popover, Position } from 'evergreen-ui'
import Recoil from 'recoil'
import { eventSearchOptionsState } from 'src/state/events'
import DateRange from 'src/components/ui/DateRange'

const allFilterFields: t.EventSearchFilterFields[] = ['company', 'date', 'tags', 'type', 'state']

export default function SearchForm({
  tags,
  companies,
  filters: filterFieldList = allFilterFields,
  overrides
}: {
  tags: t.Tag[]
  companies: t.Company[]
  filters?: t.EventSearchFilterFields[]
  overrides?: Partial<t.EventSearchOptions>
}) {
  const [options, setOptions] = Recoil.useRecoilState(eventSearchOptionsState)
  const [showDateRange, setShowDateRange] = useState(false)

  const filters = _.objectify(filterFieldList, x => x)
  useEffect(() => {
    if (!overrides) return
    setOptions({
      ...options,
      ...overrides,
      overrides: Object.keys(overrides) as any
    })
  }, [overrides])

  const setType = (type: t.TrainingType) =>
    setOptions({
      ...options,
      type: type,
      page: 1
    })

  const resetOptions = () =>
    setOptions({
      page: 1,
      pageSize: 25
    })

  const clearType = () =>
    setOptions({
      ...options,
      type: undefined,
      page: 1
    })

  const updateCompany = (companyId: string) => {
    setOptions({
      ...options,
      company: companyId,
      page: 1
    })
  }

  const clearCompany = () => {
    setOptions({
      ...options,
      company: undefined,
      page: 1
    })
  }

  const updateState = (state: string) => {
    setOptions({
      ...options,
      state,
      page: 1
    })
  }

  const clearState = () => {
    setOptions({
      ...options,
      state: undefined,
      page: 1
    })
  }

  const removeTag = (tag: t.Tag) => {
    const newTags = options.tags?.filter(slug => slug !== tag.slug) ?? []
    setOptions({
      ...options,
      tags: newTags.length > 0 ? newTags : undefined,
      page: 1
    })
  }

  const clearTags = () => {
    setOptions({
      ...options,
      page: 1,
      tags: undefined
    })
  }

  const addTag = (tagSlug: string) => {
    setOptions({
      ...options,
      tags: _.unique([...(options.tags ?? []), tagSlug]),
      page: 1
    })
  }

  const clearDate = () => {
    setOptions({
      ...options,
      date: undefined,
      page: 1
    })
  }

  const handleDateRange = (range: { start: Date; end: Date }) => {
    setShowDateRange(false)
    console.log(range)
    const fmt = (date: Date) => formatDate(date, 'dd.MM.yyyy')
    const newDate =
      range.start.getTime() === range.end.getTime() ? fmt(range.start) : `${fmt(range.start)}-${fmt(range.end)}`
    setOptions({
      ...options,
      date: newDate,
      page: 1
    })
  }

  const formatDateDisplay = () => {
    const [startStr, endStr] = options.date?.includes('-')
      ? options.date?.split('-') ?? ['', '']
      : [options.date ?? '', options.date ?? '']
    const start = parseDate(startStr, 'dd.MM.yyyy', new Date())
    const end = parseDate(endStr, 'dd.MM.yyyy', new Date())
    const format = (d: Date) => {
      return formatDate(d, 'MMM do')
    }
    if (start.getTime() === end.getTime()) {
      return format(start)
    }
    return `${format(start)} - ${format(end)}`
  }

  const getDateRangeValue = () => {
    if (!options.date)
      return {
        start: new Date(),
        end: endOfMonth(new Date())
      }
    const [startStr, endStr] = options.date?.includes('-')
      ? options.date?.split('-') ?? ['', '']
      : [options.date ?? '', options.date ?? '']
    return {
      start: parseDate(startStr, 'dd.MM.yyyy', new Date()),
      end: parseDate(endStr, 'dd.MM.yyyy', new Date())
    }
  }

  const hasFiltersSet = (() => {
    if (options.state) return true
    if (options.date) return true
    if (options.tags?.length ?? 0 > 0) return true
    if (options.company) return true
    if (options.type) return true
    return false
  })()

  return (
    <div className="flex flex-col">
      {filters.type && (
        <div className="mb-6">
          <FilterLabel className="mb-1">Type</FilterLabel>
          <Checkbox
            label="Tactical"
            checked={options.type === 'tactical'}
            onChange={e => (e.target.checked ? setType('tactical') : clearType())}
          />
          <Checkbox
            label="Survival"
            checked={options.type === 'survival'}
            onChange={e => (e.target.checked ? setType('survival') : clearType())}
          />
          <Checkbox
            label="Medical"
            checked={options.type === 'medical'}
            onChange={e => (e.target.checked ? setType('medical') : clearType())}
          />
        </div>
      )}
      {filters.company && (
        <div className="mb-6">
          <FilterLabel className="mb-1">Company</FilterLabel>
          <div className="flex flex-row">
            <SelectMenu
              title="Company"
              options={companies.map(c => ({ label: c.name, value: c.slug }))}
              selected={options.company}
              filterPlaceholder="Choose company"
              onSelect={item => updateCompany(item.value as string)}
            >
              <button className="grow border border-black rounded">
                {options.company ? companies.find(c => c.slug === options.company)?.name : 'Select company'}
              </button>
            </SelectMenu>
            <ClearFilterButton disabled={!options.company} onClick={clearCompany} />
          </div>
        </div>
      )}
      {filters.state && (
        <div className="mb-6">
          <FilterLabel className="mb-1">State</FilterLabel>
          <div className="flex flex-row">
            <SelectMenu
              title="State"
              options={Object.entries(US_STATES).map(([abbv, name]) => ({ label: name, value: abbv }))}
              selected={options.state}
              filterPlaceholder="Choose state"
              onSelect={item => updateState(item.value as string)}
            >
              <button className="grow border border-black rounded">
                {options.state ? US_STATES[options.state] : 'Select state'}
              </button>
            </SelectMenu>
            <ClearFilterButton disabled={!options.state} onClick={clearState} />
          </div>
        </div>
      )}
      {filters.date && (
        <div className="mb-6">
          <FilterLabel className="mb-1">Dates</FilterLabel>
          <div className="flex flex-row">
            <button
              className="border grow border-black rounded p-1 w-full text-center"
              onClick={() => setShowDateRange(!showDateRange)}
            >
              {options.date ? formatDateDisplay() : 'Select Dates'}
            </button>
            <ClearFilterButton disabled={!options.date} onClick={clearDate} />
          </div>
          <Popover
            position={Position.BOTTOM_LEFT}
            isShown={showDateRange}
            content={<DateRange value={getDateRangeValue()} onChange={handleDateRange} />}
          >
            <div></div>
          </Popover>
        </div>
      )}
      {filters.tags && (
        <div className="mb-6">
          <FilterLabel className="mb-1">Tags</FilterLabel>
          <div className="flex flex-row">
            <SelectMenu
              title="Tags"
              options={tags.map(tag => ({ label: tag.name, value: tag.slug }))}
              selected={options.tags}
              filterPlaceholder="Choose tags"
              onSelect={item => addTag(item.value as string)}
            >
              <button className="py-1 grow border border-black rounded">Select tag</button>
            </SelectMenu>
            <ClearFilterButton disabled={!options.tags?.length} onClick={clearTags} />
          </div>
          <div>
            {options.tags?.map(tagSlug => {
              const tag = tags.find(t => t.slug === tagSlug)
              return tag && <Checkbox key={tagSlug} checked label={tag.name} onChange={() => removeTag(tag)} />
            })}
          </div>
        </div>
      )}
      <div className="pt-4 flex flex-row justify-center">
        <button
          disabled={!hasFiltersSet}
          onClick={resetOptions}
          className="font-bold text-sm text-black hover:text-red-600 disabled:text-slate-200 disabled:hover:text-slate-200"
        >
          reset
        </button>
      </div>
    </div>
  )
}

const FilterLabel = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <label className={'font-bold text-sm block' + ' ' + className}>{children}</label>
}

const ClearFilterButton = ({ disabled, onClick }: { disabled: boolean; onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="disabled:bg-white rounded border group disabled:border-slate-100 border-black p-2 ml-1 bg-black"
    >
      <HiX size={15} className="group-disabled:text-slate-200 text-white" />
    </button>
  )
}

//
// Attempting to make sexy looking radios without using evergreen-ui
//
// const Radios = ({
//   options,
//   selected,
//   multi = false,
//   onChange
// }: {
//   options: { label: string; value: string }[]
//   selected: string | string[]
//   multi?: boolean
//   onChange?: (selected: string | string[]) => void
// }) => {
//   const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//     event.target.value
//   }
//   const canDeselect = multi ?
//   return (
//     <div>
//       {options.map((opt) => {
//         <div key={opt.value}>
//           <input type="checkbox" value={opt.value} onChange={handleChange} />
//           <span>{opt.label}</span>
//         </div>
//       })}
//     </div>
//   )
// }
