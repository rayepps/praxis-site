import _ from 'radash'
import { ReactNode } from 'react'
import * as t from 'src/types'
import Skeleton from 'react-loading-skeleton'
import TrainingCard from './TrainingCard'

export default function EventGrid({
  trainings,
  loading = false,
  fallback = null,
  onTrainingClick
}: {
  trainings: t.Training[]
  fallback?: ReactNode | null
  loading?: boolean
  onTrainingClick?: (training: t.Training) => void
}) {
  const handleTrainingClick = (training: t.Training) => () => {
    onTrainingClick?.(training)
  }
  if (!loading && trainings.length === 0) {
    return <>{fallback}</>
  }
  return (
    <div
      className="grow grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
    >
      {!loading && trainings.map((training) => (
        <TrainingCard key={training.id} training={training} onClick={handleTrainingClick(training)} />
      ))}
      {loading && [0, 1, 2, 3, 4].map((i) => (
        <div key={i}>
          <div className="pb-2">
            <Skeleton
              width='100%'
              height={170}
            />
          </div>
          <div className="pb-2">
            <Skeleton
              width='40%'
              height={24}
            />
          </div>
          <div>
            <Skeleton
              width='67%'
              height={24}
            />
          </div>
        </div>
      ))}
    </div>
  )
}