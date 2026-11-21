export type DateRange = '7days' | '30days' | '90days' | '12months'
export type AudienceSegment = 'all' | 'new' | 'returning' | 'vip'
export type PetFilter = 'all' | 'dogs' | 'cats'

export interface AnalyticsMetricItem {
  value: string
  delta: string
  isPositive: boolean
  subtextLeft: string
  subtextRight: string
  subtextRightHighlight?: boolean
}

export interface AnalyticsMetrics {
  storefrontVisits: AnalyticsMetricItem
  uniquePetOwners: AnalyticsMetricItem
  storefrontConversion: AnalyticsMetricItem
  repeatCustomerRate: AnalyticsMetricItem
}

export interface FunnelStep {
  stepNumber: number
  title: string
  subtitle: string
  count: number
  displayCount: string
  percentage: number
  displayPercentage: string
  colorClass: string
  badgeClass: string
}

export interface PetDemographic {
  species: string
  displayName: string
  count: number
  percentage: number
  color: string
}

export interface SearchIntentQuery {
  id: string
  query: string
  matchedItem: string
  category: 'products' | 'services'
  searchVolume: number
  trend: string
  isPositive: boolean
}

export interface DemandCadenceDay {
  day: string
  isPeak: boolean
  peakLabel?: string
  productsOrders: number
  servicesBookings: number
}

export interface HeroProduct {
  id: string
  title: string
  type: 'product' | 'service'
  badgeLabel: string
  badgeColorClass: string
  conversionRate: string
  unitsOrBookings: number
  unitsLabel: string
  revenue: number
  image: string
}

export interface StaffSlot {
  id: string
  timeRange: string
  assignedStaff: number
  neededStaff: number
  status: 'optimal' | 'understaffed' | 'full'
}
