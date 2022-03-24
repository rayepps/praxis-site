export type Dict<T> = { [key: string]: T }

export type TrainingType = 'tactical' | 'medical' | 'survival'

export type EventSearchOrder = 'date:asc' | 'date:desc' | 'price:asc' | 'price:desc'
export type TrainingSearchOrder = 'price:asc' | 'price:desc'
export type EventSearchFilterFields = 'company' | 'date' | 'tags' | 'type' | 'state'

export type PriceUnit = 'per_training' | 'per_hour'

export interface EventSearchOptions {
  pageSize?: number
  page?: number
  order?: EventSearchOrder
  type?: TrainingType
  tags?: string[]
  state?: string
  city?: string
  company?: string
  date?: string
  appointmentOnly?: boolean

  // We track which fields are being overriden. In this use case
  // overriden referrs to a component using the EventSearchForm or
  // EventSearchScene to override options typically selected by a
  // user in the filters panel. This allows us to filter the
  // overrided values out when generating the query string and
  // add them back in when calculating the has for a option set.
  overrides?: EventSearchFilterFields[]
}

export type TrainingSearchOptions = Omit<EventSearchOptions, 'date' | 'order'> & {
  order: TrainingSearchOrder
}

export interface Author {
  id: string
  name: string
}

export interface Location {
  longitude: number
  latitude: number
}

export interface Asset {
  id: string
  url: string
  size: number
  fileName: string
  width: number
  height: number
}

export interface RichText {
  raw: any
  html: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface FeaturedTag {
  tag: Tag
  thumbnail: Asset
}

export interface Company {
  id: string
  name: string
  description: string
  directLink: string
  externalLink: string
  thumbnail: Asset
  slug: string
  instructors: Instructor[]
  trainings: Training[]
}

export interface Training {
  id: string
  name: string
  company: Company
  directLink: string
  externalLink: string
  tags: Tag[]
  price: number
  priceUnit: PriceUnit
  type: TrainingType
  description: RichText
  gallery: Asset[]
  thumbnail: Asset
  events: Event[]
  slug: string
  location: Location
  displayPrice: string | null
  recentlyAdded: boolean
  city: string
  state: string
  appointmentOnly: boolean
}

export interface Instructor {
  id: string
  name: string
  company: Company
  thumbnail: Asset
  bio: string
  events: [Event]
  slug: string
}

export interface Event {
  id: string
  startDate: string
  endDate: string
  training: Training
  location: Location
  directLink: string
  externalLink: string
  slug: string
  city: string
  state: string
  images: Asset[]
  name: string
  soldOut: boolean
  recentlyAdded: boolean
}

export interface FeatureTag {
  tag: Tag
  thumbnail: Asset
}

export type SubscriptionKey = 'new-event-alerts'

export interface Subscription {
  timestamp: number
  key: SubscriptionKey
  email?: string
  phone?: string
}

export interface ContactMetadata {
  ipAddress: string
  city: string
  state: string // Idaho
  stateCode: string // ID
  country: string // United States
  countryCode: string // US
  longitude: number
  latitude: number
  tz: string // America/Boise
  tzAbbreviation: string // MDT
  utcOffset: number // -6
  dst: boolean // day light savings time
}

export interface TrackedSession {
  contactId: string | null
  timestamp: number
  expiration: number
  subscriptions: Subscription[]
  metadata: ContactMetadata | null
  prompted: Subscription[]
}

export interface Giveaway {
  id: string
  name: string
  key: string
  endDate: string
  active: boolean
  events: Event[]
}