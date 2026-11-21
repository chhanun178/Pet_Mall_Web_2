import { ref, computed } from 'vue'
import type {
  DateRange,
  AudienceSegment,
  PetFilter,
  AnalyticsMetrics,
  FunnelStep,
  PetDemographic,
  SearchIntentQuery,
  DemandCadenceDay,
  HeroProduct,
  StaffSlot,
} from '~/types/analytics'
import { useProducts } from '~/composables/useProducts'

// Base mock dataset for 30 days matching screenshot numbers exactly
const baseMetrics: AnalyticsMetrics = {
  storefrontVisits: {
    value: '38,420',
    delta: '+12.4%',
    isPositive: true,
    subtextLeft: 'Prev: 34,180',
    subtextRight: '84% mobile',
  },
  uniquePetOwners: {
    value: '14,290',
    delta: '+9.1%',
    isPositive: true,
    subtextLeft: 'New: 9,840',
    subtextRight: 'Verified Profiles',
  },
  storefrontConversion: {
    value: '3.82%',
    delta: '+0.4%',
    isPositive: true,
    subtextLeft: 'Benchmark: 2.91%',
    subtextRight: '+31% above avg',
    subtextRightHighlight: true,
  },
  repeatCustomerRate: {
    value: '41.5%',
    delta: '+2.3%',
    isPositive: true,
    subtextLeft: 'Loyalty Members: 612',
    subtextRight: '148h Retention',
  },
}

const baseFunnel: FunnelStep[] = [
  {
    stepNumber: 1,
    title: 'Storefront Visitors',
    subtitle: '(Organic, Search & Referrals)',
    count: 38420,
    displayCount: '38,420',
    percentage: 100,
    displayPercentage: '100%',
    colorClass: 'bg-sky-500',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200/60',
  },
  {
    stepNumber: 2,
    title: 'Catalog & Service Exploration',
    subtitle: '(Interacted with listings)',
    count: 22100,
    displayCount: '22,100',
    percentage: 57.5,
    displayPercentage: '57.5%',
    colorClass: 'bg-sky-400',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200/60',
  },
  {
    stepNumber: 3,
    title: 'Added to Cart / Slotted Appointment',
    subtitle: '(Purchase intent)',
    count: 4200,
    displayCount: '4,200',
    percentage: 10.9,
    displayPercentage: '10.9%',
    colorClass: 'bg-amber-500',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/60',
  },
  {
    stepNumber: 4,
    title: 'Completed Orders & Bookings',
    subtitle: '(Confirmed payment)',
    count: 1468,
    displayCount: '1,468',
    percentage: 3.82,
    displayPercentage: '3.82% Total',
    colorClass: 'bg-[#EA580C]',
    badgeClass: 'bg-orange-100 text-[#D46213] border-orange-200',
  },
]

const baseDemographics: PetDemographic[] = [
  {
    species: 'dogs',
    displayName: 'Canine (Dogs)',
    count: 9145,
    percentage: 64,
    color: '#C2410C', // deep warm orange/amber
  },
  {
    species: 'cats',
    displayName: 'Feline (Cats)',
    count: 4410,
    percentage: 31,
    color: '#0284C7', // sky blue
  },
  {
    species: 'other',
    displayName: 'Small Pets / Equine',
    count: 715,
    percentage: 5,
    color: '#F59E0B', // amber yellow
  },
]

const allSearchQueries: SearchIntentQuery[] = [
  {
    id: 'q-1',
    query: 'paw balm for allergies',
    matchedItem: 'Matched: Chamomile & Oat Salve',
    category: 'products',
    searchVolume: 4210,
    trend: '+24%',
    isPositive: true,
  },
  {
    id: 'q-2',
    query: 'calming tincture for thunder',
    matchedItem: 'Matched: Valerian & Skullcap Drops',
    category: 'products',
    searchVolume: 3180,
    trend: '+38%',
    isPositive: true,
  },
  {
    id: 'q-3',
    query: 'holistic groomer',
    matchedItem: 'Matched: Low-Stress Coat Spa',
    category: 'services',
    searchVolume: 2640,
    trend: 'Stable',
    isPositive: true,
  },
  {
    id: 'q-4',
    query: 'lick safe ointment',
    matchedItem: 'Matched: Raw Beeswax Snout Stick',
    category: 'products',
    searchVolume: 1890,
    trend: '+11%',
    isPositive: true,
  },
  {
    id: 'q-5',
    query: 'gentle herbal ear cleaner',
    matchedItem: 'Matched: Gentle Herbal Ear Rinse (120ml)',
    category: 'products',
    searchVolume: 1420,
    trend: '+16%',
    isPositive: true,
  },
  {
    id: 'q-6',
    query: 'canine acupressure specialist',
    matchedItem: 'Matched: Holistic Canine Acupressure',
    category: 'services',
    searchVolume: 1150,
    trend: '+29%',
    isPositive: true,
  },
  {
    id: 'q-7',
    query: 'organic probiotic gut chews',
    matchedItem: 'Matched: Probiotic Skin & Gut Chews',
    category: 'products',
    searchVolume: 980,
    trend: '+8%',
    isPositive: true,
  },
  {
    id: 'q-8',
    query: 'aromatherapy anxiety mist for rescue dogs',
    matchedItem: 'Matched: Organic Lavender Calming Mist',
    category: 'products',
    searchVolume: 820,
    trend: '+42%',
    isPositive: true,
  },
]

const baseWeeklyCadence: DemandCadenceDay[] = [
  { day: 'Mon', isPeak: false, productsOrders: 142, servicesBookings: 18 },
  { day: 'Tue', isPeak: false, productsOrders: 178, servicesBookings: 24 },
  { day: 'Wed', isPeak: false, productsOrders: 210, servicesBookings: 31 },
  { day: 'Thu', isPeak: false, productsOrders: 235, servicesBookings: 42 },
  { day: 'Fri', isPeak: true, peakLabel: 'Peak', productsOrders: 310, servicesBookings: 54 },
  { day: 'Sat', isPeak: false, productsOrders: 276, servicesBookings: 72 },
  { day: 'Sun', isPeak: false, productsOrders: 160, servicesBookings: 38 },
]

const baseHeroProducts: HeroProduct[] = [
  {
    id: 'hero-1',
    title: 'Chamomile & Oat Soothing Balm',
    type: 'product',
    badgeLabel: 'TOP SELLER',
    badgeColorClass: 'bg-amber-100 text-amber-800 border-amber-200/60',
    conversionRate: '5.4% conv',
    unitsOrBookings: 612,
    unitsLabel: '612 units sold',
    revenue: 9792,
    image: 'https://images.unsplash.com/photo-1608248597359-2ffb91a9f02c?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'hero-2',
    title: 'Valerian & Skullcap Drops',
    type: 'product',
    badgeLabel: 'TRENDING HIGH',
    badgeColorClass: 'bg-blue-100 text-blue-800 border-blue-200/60',
    conversionRate: '4.8% conv',
    unitsOrBookings: 428,
    unitsLabel: '428 units sold',
    revenue: 7276,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'hero-3',
    title: 'Stress-Free Coat & Skin Spa',
    type: 'service',
    badgeLabel: 'SERVICE STAR',
    badgeColorClass: 'bg-orange-100 text-[#D46213] border-orange-200/60',
    conversionRate: '6.2% conv',
    unitsOrBookings: 184,
    unitsLabel: '184 bookings',
    revenue: 14720,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=160&auto=format&fit=crop&q=80',
  },
]

const initialStaffSlots: StaffSlot[] = [
  { id: 'slot-1', timeRange: '08:00 AM – 10:00 AM (Early Intake)', assignedStaff: 2, neededStaff: 2, status: 'optimal' },
  { id: 'slot-2', timeRange: '10:00 AM – 02:00 PM (Saturday Peak)', assignedStaff: 4, neededStaff: 5, status: 'understaffed' },
  { id: 'slot-3', timeRange: '02:00 PM – 05:00 PM (Afternoon Recovery)', assignedStaff: 3, neededStaff: 3, status: 'optimal' },
  { id: 'slot-4', timeRange: '05:00 PM – 07:00 PM (Evening Pickups)', assignedStaff: 2, neededStaff: 2, status: 'optimal' },
]

export const useAnalytics = () => {
  const { showToast } = useProducts()

  // Persistent Reactive State
  const selectedDateRange = useState<DateRange>('petmall_analytics_date_range', () => '30days')
  const selectedAudience = useState<AudienceSegment>('petmall_analytics_audience', () => 'all')
  const selectedPetFilter = useState<PetFilter>('petmall_analytics_pet_filter', () => 'all')

  // Modals state
  const isDropOffModalOpen = useState<boolean>('petmall_analytics_dropoff_modal', () => false)
  const isSearchModalOpen = useState<boolean>('petmall_analytics_search_modal', () => false)
  const isStaffModalOpen = useState<boolean>('petmall_analytics_staff_modal', () => false)
  const staffSlots = useState<StaffSlot[]>('petmall_analytics_staff_slots', () => initialStaffSlots)

  // Multipliers based on date range
  const rangeMultiplier = computed(() => {
    switch (selectedDateRange.value) {
      case '7days': return 0.28
      case '90days': return 2.85
      case '12months': return 11.4
      case '30days':
      default: return 1.0
    }
  })

  // Filtered & dynamic metrics
  const metrics = computed<AnalyticsMetrics>(() => {
    const mult = rangeMultiplier.value
    if (mult === 1.0) return baseMetrics

    const visits = Math.round(38420 * mult)
    const prevVisits = Math.round(34180 * mult)
    const owners = Math.round(14290 * mult)
    const newOwners = Math.round(9840 * mult)

    return {
      storefrontVisits: {
        value: visits.toLocaleString(),
        delta: mult > 1 ? '+15.2%' : '+11.8%',
        isPositive: true,
        subtextLeft: `Prev: ${prevVisits.toLocaleString()}`,
        subtextRight: '84% mobile',
      },
      uniquePetOwners: {
        value: owners.toLocaleString(),
        delta: mult > 1 ? '+10.4%' : '+8.6%',
        isPositive: true,
        subtextLeft: `New: ${newOwners.toLocaleString()}`,
        subtextRight: 'Verified Profiles',
      },
      storefrontConversion: {
        value: mult > 1 ? '3.94%' : '3.82%',
        delta: '+0.4%',
        isPositive: true,
        subtextLeft: 'Benchmark: 2.91%',
        subtextRight: '+31% above avg',
        subtextRightHighlight: true,
      },
      repeatCustomerRate: {
        value: mult > 1 ? '43.2%' : '41.5%',
        delta: '+2.3%',
        isPositive: true,
        subtextLeft: `Loyalty Members: ${Math.round(612 * mult)}`,
        subtextRight: '148h Retention',
      },
    }
  })

  // Funnel steps
  const funnelSteps = computed<FunnelStep[]>(() => {
    const mult = rangeMultiplier.value
    return baseFunnel.map(step => {
      const scaledCount = Math.round(step.count * mult)
      return {
        ...step,
        count: scaledCount,
        displayCount: scaledCount.toLocaleString(),
      }
    })
  })

  // Pet demographics (filtered by pet button if specified)
  const demographics = computed<PetDemographic[]>(() => {
    if (selectedPetFilter.value === 'dogs') {
      return [
        { species: 'dogs', displayName: 'Canine (Dogs)', count: 9145, percentage: 100, color: '#C2410C' },
      ]
    }
    if (selectedPetFilter.value === 'cats') {
      return [
        { species: 'cats', displayName: 'Feline (Cats)', count: 4410, percentage: 100, color: '#0284C7' },
      ]
    }
    return baseDemographics
  })

  const totalPetsLogged = computed(() => {
    if (selectedPetFilter.value === 'dogs') return '9.1k'
    if (selectedPetFilter.value === 'cats') return '4.4k'
    return '14.2k'
  })

  // Search queries list
  const searchQueries = computed(() => {
    if (selectedPetFilter.value === 'dogs') {
      return allSearchQueries.filter(q => q.category === 'products' || q.query.includes('canine') || q.query.includes('groomer'))
    }
    if (selectedPetFilter.value === 'cats') {
      return allSearchQueries.filter(q => q.query.includes('gentle') || q.query.includes('ear') || q.query.includes('holistic'))
    }
    return allSearchQueries
  })

  // Weekly cadence
  const weeklyCadence = computed(() => baseWeeklyCadence)

  // Hero products
  const heroProducts = computed(() => {
    const mult = rangeMultiplier.value
    return baseHeroProducts.map(p => ({
      ...p,
      unitsOrBookings: Math.round(p.unitsOrBookings * mult),
      unitsLabel: p.type === 'service'
        ? `${Math.round(p.unitsOrBookings * mult)} bookings`
        : `${Math.round(p.unitsOrBookings * mult)} units sold`,
      revenue: Math.round(p.revenue * mult),
    }))
  })

  // Action methods
  const setDateRange = (range: DateRange) => {
    selectedDateRange.value = range
    const labels: Record<DateRange, string> = {
      '7days': 'Past 7 Days',
      '30days': 'Past 30 Days',
      '90days': 'Past 90 Days',
      '12months': 'Past 12 Months',
    }
    showToast(`Telemetry updated for ${labels[range]}`)
  }

  const setAudience = (segment: AudienceSegment) => {
    selectedAudience.value = segment
    const labels: Record<AudienceSegment, string> = {
      all: 'All Visitors',
      new: 'New Visitors',
      returning: 'Returning Buyers',
      vip: 'VIP Members',
    }
    showToast(`Filter applied: ${labels[segment]}`)
  }

  const setPetFilter = (filter: PetFilter) => {
    selectedPetFilter.value = filter
    const labels: Record<PetFilter, string> = {
      all: 'All Pets',
      dogs: 'Dogs (Canine)',
      cats: 'Cats (Feline)',
    }
    showToast(`Cohort switched to ${labels[filter]}`)
  }

  // Export Analytics Report
  const exportAnalyticsReport = (format: 'csv' | 'json' = 'csv') => {
    const filename = `Storefront_Analytics_ArtisanPaws_${selectedDateRange.value}_${new Date().toISOString().slice(0, 10)}.${format}`
    
    if (format === 'csv') {
      const headers = ['Category', 'Metric', 'Value', 'Delta', 'Benchmark']
      const rows = [
        ['KPIs', 'Total Storefront Visits', metrics.value.storefrontVisits.value, metrics.value.storefrontVisits.delta, metrics.value.storefrontVisits.subtextLeft],
        ['KPIs', 'Unique Pet Owners', metrics.value.uniquePetOwners.value, metrics.value.uniquePetOwners.delta, metrics.value.uniquePetOwners.subtextLeft],
        ['KPIs', 'Storefront Conversion', metrics.value.storefrontConversion.value, metrics.value.storefrontConversion.delta, metrics.value.storefrontConversion.subtextLeft],
        ['KPIs', 'Repeat Customer Rate', metrics.value.repeatCustomerRate.value, metrics.value.repeatCustomerRate.delta, metrics.value.repeatCustomerRate.subtextLeft],
        ['Funnel', 'Storefront Visitors', '38,420', '100%', 'Organic & Direct'],
        ['Funnel', 'Catalog Exploration', '22,100', '57.5%', 'Active Browsers'],
        ['Funnel', 'Added to Cart / Slotted', '4,200', '10.9%', 'Purchase Intent'],
        ['Funnel', 'Completed Orders & Bookings', '1,468', '3.82%', 'Final Conversion'],
        ['Demographics', 'Canine (Dogs)', '9,145', '64%', 'Top: Golden Retrievers'],
        ['Demographics', 'Feline (Cats)', '4,410', '31%', 'Top: Maine Coons'],
        ['Demographics', 'Small Pets / Equine', '715', '5%', 'Rabbits, Horses'],
      ]
      
      const csvContent = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    } else {
      const data = {
        report: 'Storefront Analytics & Telemetry',
        generatedAt: new Date().toISOString(),
        dateRange: selectedDateRange.value,
        audience: selectedAudience.value,
        petFilter: selectedPetFilter.value,
        metrics: metrics.value,
        funnel: funnelSteps.value,
        demographics: demographics.value,
        searchQueries: searchQueries.value,
        weeklyCadence: weeklyCadence.value,
        heroProducts: heroProducts.value,
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    }

    showToast(`Exported ${filename} successfully!`)
  }

  // Modal controls
  const openDropOffModal = () => { isDropOffModalOpen.value = true }
  const closeDropOffModal = () => { isDropOffModalOpen.value = false }

  const openSearchModal = () => { isSearchModalOpen.value = true }
  const closeSearchModal = () => { isSearchModalOpen.value = false }

  const openStaffModal = () => { isStaffModalOpen.value = true }
  const closeStaffModal = () => { isStaffModalOpen.value = false }

  const updateStaffSlot = (id: string, delta: number) => {
    const slot = staffSlots.value.find(s => s.id === id)
    if (slot) {
      slot.assignedStaff = Math.max(1, slot.assignedStaff + delta)
      slot.status = slot.assignedStaff >= slot.neededStaff ? 'optimal' : 'understaffed'
    }
  }

  const saveStaffSchedule = () => {
    isStaffModalOpen.value = false
    showToast('Staff coverage schedule updated for Saturday peak demand!')
  }

  return {
    selectedDateRange,
    selectedAudience,
    selectedPetFilter,
    metrics,
    funnelSteps,
    demographics,
    totalPetsLogged,
    searchQueries,
    allSearchQueries,
    weeklyCadence,
    heroProducts,
    staffSlots,
    isDropOffModalOpen,
    isSearchModalOpen,
    isStaffModalOpen,
    setDateRange,
    setAudience,
    setPetFilter,
    exportAnalyticsReport,
    openDropOffModal,
    closeDropOffModal,
    openSearchModal,
    closeSearchModal,
    openStaffModal,
    closeStaffModal,
    updateStaffSlot,
    saveStaffSchedule,
  }
}
