export type Dict<T> = { [key: string]: T }

export type TrainingType = 'tactical' | 'medical' | 'survival'

export type SearchOrder = 'date:asc' | 'date:desc' | 'price:asc' | 'price:desc'

export interface EventSearchOptions {
  pageSize?: number
  page?: number
  order?: SearchOrder
  type?: TrainingType
  tags?: string[]
  state?: string
  city?: string
  company?: string
  date?: string
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
  type: TrainingType
  description: RichText
  gallery: Asset[]
  thumbnail: Asset
  events: Event[]
  slug: string
  displayPrice: string | null
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
  timestamp: number
  expiration: number
  subscriptions: Subscription[]
  metadata: ContactMetadata | null
  prompted: Subscription[]
}