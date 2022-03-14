import _ from 'radash'
import { useState } from 'react'
import * as t from 'src/types'
import { Stack, Split } from 'src/components/Layout'
import { US_STATES } from 'src/const'
import { HiX } from 'react-icons/hi'
import addDays from 'date-fns/addDays'
import startOfMonth from 'date-fns/startOfMonth'
import getDate from 'date-fns/getDate'
import addMonths from 'date-fns/addMonths'
import getMonth from 'date-fns/getMonth'
import formatDate from 'date-fns/format'
import endOfMonth from 'date-fns/endOfMonth'
import getYear from 'date-fns/getYear'
import { Checkbox, SelectMenu, IconButton, Popover, Position } from 'evergreen-ui'
import Recoil from 'recoil'
import { eventSearchOptionsState } from 'src/state/events'
import DateRange from 'src/components/ui/DateRange'

export default function SearchForm({ tags, companies }: { tags: t.Tag[]; companies: t.Company[] }) {
  const [options, setOptions] = Recoil.useRecoilState(eventSearchOptionsState)
  const [showDateRange, setShowDateRange] = useState(false)

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

  const addTag = (tagSlug: string) => {
    setOptions({
      ...options,
      tags: _.unique([...(options.tags ?? []), tagSlug]),
      page: 1
    })
  }

  const handleDateRange = (range: { start: Date; end: Date }) => {
    setShowDateRange(false)
    const startsAfter = range.start.toISOString()
    const endsBefore = range.end.toISOString()
    setOptions({
      ...options,
      date: `${startsAfter}<<${endsBefore}`,
      page: 1
    })
  }

  const formatDateDisplay = () => {
    const [startStr, endStr] = options.date?.split('<<') ?? ['', '']
    const start = new Date(startStr)
    const end = new Date(endStr)
    const format = (d: Date) => {
      return formatDate(d, 'MMM do')
    }
    if (start.getTime() === end.getTime()) {
      return format(start)
    }
    return `${format(start)} - ${format(end)}`
  }

  return (
    <Stack className="w-64">
      {/* TYPE */}
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
      {/* COMPANY */}
      <div className="mb-6">
        <FilterLabel className="mb-1">Company</FilterLabel>
        <Split>
          <SelectMenu
            title="Company"
            options={companies.map(c => ({ label: c.name, value: c.slug }))}
            selected={options.company}
            filterPlaceholder="Choose company"
            onSelect={item => updateCompany(item.value as string)}
          >
            <button className="mr-1 grow border border-black rounded">
              {options.company ? companies.find(c => c.slug === options.company)?.name : 'Select company'}
            </button>
          </SelectMenu>
          <IconButton disabled={!options.company} icon={HiX} onClick={clearCompany} />
        </Split>
      </div>
      {/* STATE */}
      <div className="mb-6">
        <FilterLabel className="mb-1">State</FilterLabel>
        <Split>
          <SelectMenu
            title="State"
            options={Object.keys(US_STATES).map(state => ({ label: state, value: state }))}
            selected={options.state}
            filterPlaceholder="Choose state"
            onSelect={item => updateState(item.value as string)}
          >
            <button className="mr-1 grow border border-black rounded">{options.state || 'Select state'}</button>
          </SelectMenu>
          <IconButton disabled={!options.state} icon={HiX} onClick={clearState} />
        </Split>
      </div>
      {/* DATES */}
      <div className="mb-6">
        <FilterLabel className="mb-1">Dates</FilterLabel>
        <button
          className="border border-black rounded p-1 w-full text-center"
          onClick={() => setShowDateRange(!showDateRange)}
        >
          {options.date ? formatDateDisplay() : 'Select Dates'}
        </button>
        <Popover
          position={Position.BOTTOM_LEFT}
          isShown={showDateRange}
          content={
            <DateRange
              value={{
                start: options.date ? new Date(options.date.split('<<')[0]) : new Date(),
                end: options.date ? new Date(options.date.split('<<')[1]) : endOfMonth(new Date())
              }}
              onChange={handleDateRange}
            />
          }
        >
          <div></div>
        </Popover>
      </div>
      {/* TAGS */}
      <div className="mb-6">
        <FilterLabel className="mb-1">Tags</FilterLabel>
        <Split>
          <SelectMenu
            title="Tags"
            options={tags.map(tag => ({ label: tag.name, value: tag.slug }))}
            selected={options.tags}
            filterPlaceholder="Choose tags"
            onSelect={item => addTag(item.value as string)}
          >
            <button className="mr-1 py-1 grow border border-black rounded">Select tag</button>
          </SelectMenu>
        </Split>
        <div>
          {options.tags?.map(tagSlug => {
            const tag = tags.find(t => t.slug === tagSlug)
            return tag && <Checkbox checked label={tag.name} onChange={() => removeTag(tag)} />
          })}
        </div>
      </div>
      <div className="pt-4 flex flex-row justify-center">
        <button onClick={resetOptions} className="font-bold text-sm hover:text-red-600">
          reset
        </button>
      </div>
    </Stack>
  )
}

const FilterLabel = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <label className={'font-bold text-sm block' + ' ' + className}>{children}</label>
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
